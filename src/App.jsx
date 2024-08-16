import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems(items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)));
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <List items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    setDescription("");
    setQuantity(1);
    onAddItem(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What do you need for your 🏖️ trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function List({ items, onDeleteItem, onToggleItem }) {
  const [sort, setSort] = useState("input");
  let sortedItems;

  if (sort === "input") sortedItems = items;
  if (sort === "description")
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sort === "packed")
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
        ))}
      </ul>
      <div className="actions">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="input">Sort items by input</option>
          <option value="description">Sort items by description</option>
          <option value="packed">Sort items by packed</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding items 🚀</em>
      </footer>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentagePacked = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentagePacked === 100
          ? "You're all good to go! Have fun ✈️"
          : `💼 You have ${numItems} items on your list, and you've already packed ${numPacked} (
        ${percentagePacked}%)`}
      </em>
    </footer>
  );
}
