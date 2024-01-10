// this is supposed to render when u click on the add project button 
function AddProjectPopup({ togglePopup }) {
  return (
  <div>
    <p>Add A Project</p>
    <button onClick={togglePopup}>Done</button>
  </div>
  );
}

export default AddProjectPopup;