// this is supposed to render when u click on the add project button 
function AddProjectPopup({ togglePopup }) {
  return (
  <div>
    <p>Add A Project</p>
    <button onClick={togglePopup}>Cancel</button>
    <button onClick={togglePopup}>Add</button>
  </div>
  );
}

export default AddProjectPopup;