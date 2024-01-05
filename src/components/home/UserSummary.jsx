import React, {useEffect, useState, useContext} from "react";

import NotifyContext from "../context/NotifyContext";

function UserSummary() {
  const [count, setCount] = useState(0);
  const { lastApiCallTime, notify } = useContext(NotifyContext)

  useEffect(() => {
    const prevCount = count;
    setCount(prevCount + 1);
  }, [lastApiCallTime]);

  return (
    <div className="user-summary">
      User Summary: {count}
      <button onClick={notify}>Click here</button>
    </div>
  );
}

export default UserSummary;