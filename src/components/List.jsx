import {useState} from "react";
import Item from "./Item";


export default function List({ items, onDeleteItem, onToggleItem, onClearAll }) {
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
        <button onClick={onClearAll}>Clear all</button>
      </div>
    </div>
  );
}
