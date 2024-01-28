import './home.css';

import { useState, useEffect } from "react";

import { NotifyContextProvider } from "../context/NotifyContext";
import ProjectSummary from "./ProjectSummary/ProjectSummary";
import Projects from "./Projects/Projects";
import UpcomingTasks from "./UpcomingTasks/UpcomingTasks";


function Home() {
  
  return (
    <div className="home-page">
      <NotifyContextProvider>
        <ProjectSummary />
        <Projects />
        <UpcomingTasks />
      </NotifyContextProvider>
    </div>
  );
}

export default Home;