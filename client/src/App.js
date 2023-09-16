import React from "react";

import "./App.css";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";
import Wrapper from "./components/Wrapper";
function App() {
  return (
    <div className="container" id="app">
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid bg-transparent w-full">
          <span class="navbar-brand mb-0 h1">Chat Appplication</span>
        </div>
      </nav>

      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
}

export default App;
