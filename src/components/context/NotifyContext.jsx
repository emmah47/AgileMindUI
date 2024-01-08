import React, { createContext, useState } from 'react';

const NotifyContext = createContext();

// use for notifying components of api calls
function NotifyContextProvider({ children }) {
  const [lastNotifTime, setLastNotifyTime] = useState(0);

  function notify() {
    setLastNotifyTime(new Date().getTime());
  }

  return (
    <NotifyContext.Provider value={{ lastNotifTime, notify }}>
      {children}
    </NotifyContext.Provider>
  );
}

export { NotifyContextProvider }
export default NotifyContext;



