import { useState, useEffect } from "react";

import { NotifyContextProvider } from "../context/NotifyContext";
import UserSummary from "./UserSummary";
import Projects from "./Projects";
import UpcomingTasks from "./UpcomingTasks";

import './home.css';


function Home() {
  
  return (
    <div className="home-page">
      <NotifyContextProvider>
        <UserSummary />
        <Projects />
        <UpcomingTasks />
      </NotifyContextProvider>
    </div>
  );
}

export default Home;