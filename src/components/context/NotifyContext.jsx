import React, { createContext, useState } from 'react';

const NotifyContext = createContext();

// use for notifying components of api calls
function NotifyContextProvider({ children }) {
  const [lastApiCallTime, setLastApiCallTime] = useState(0);

  function notify() {
    setLastApiCallTime(new Date().getTime());
  }

  return (
    <NotifyContext.Provider value={{ lastApiCallTime, notify }}>
      {children}
    </NotifyContext.Provider>
  );
}

export { NotifyContextProvider }
export default NotifyContext;



