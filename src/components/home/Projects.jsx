import React, {useEffect, useState, useContext} from "react";

import NotifyContext from "../context/NotifyContext";


function Projects() {
  const [count, setCount] = useState(0);
  const { lastApiCallTime, notify } = useContext(NotifyContext);

  useEffect(() => {
    let prevCount = count;
    setCount(prevCount + 1);
  }, [lastApiCallTime]);


  return (
    <div className="user-summary">
      Projects: {count}
      <button onClick={notify}>Click here</button>
    </div>
  );
}

export default Projects;