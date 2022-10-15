import React from "react";

import "./App.css";
import DayButtons from "./DayButtons";

function App() {
  return (
    <div>
      <div className="header">
        <h1>ქართულიზატორ</h1>
        <h1>картулизатор</h1>
      </div>

      <div>
        <button>Go!</button>
      </div>

      <DayButtons />
    </div>
  );
}

export default App;
