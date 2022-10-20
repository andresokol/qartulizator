import React from "react";

import "./App.css";
import DayPage from "./pages/DayPage";

const App = () => {
  const [dayNum, setDayNum] = React.useState(0);

  return (
    <div>
      <div className="header">
        <h1>ქართულიზატორ</h1>
        <h1 style={{ fontSize: "36px" }}>&nbsp;/&nbsp;</h1>
        <h1 style={{ color: "var(--q-main-color)" }}>картулизатор</h1>
      </div>

      <DayPage dayNum={dayNum} />
    </div>
  );
};

export default App;
