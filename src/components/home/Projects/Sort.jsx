function Sort({ onFilter }) {
  return (
    <div className="sort-selection">
      <div className="sort-label">Sort </div>
      <select className="sort-options" name="sort-options" onChange={(e) => onFilter(e)}>
       <option value="by-recent" name="by-recent">By Recent</option>
       <option value="by-name" name="by-name">By Name</option>
       <option value="creation-time" name="creation-time">Creation Time</option>
     </select>
    </div>
  );
}

export default Sort