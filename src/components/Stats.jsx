export default function Stats({ items }) {
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
