import React from "react";
import { CONVERSION_RULES } from "./consts";

import "./DayButtons.css";

const CONVERSIONS_BY_DAYS = [
  ["a", "i"],
  ["o", "e"],
  ["v", "c"],
  ["g", "z"],
  ["s", "t-pow"],
  ["a", "i"],
  ["a", "i"],
  ["a", "i"],
  ["a", "i"],
];

const Button = ({ rules, dayIdx }) => {
  const ruleDescriptions = rules.map((ruleIdx) => {
    const rule = CONVERSION_RULES.get(ruleIdx);
    return `${rule.from} → ${rule.to}`;
  });

  return (
    <button>
      <p>День {dayIdx + 1}.</p>
      <p>{ruleDescriptions.join(", ")}</p>
    </button>
  );
};

const DayButtons = () => {
  return (
    <div className="day_buttons_container">
      {CONVERSIONS_BY_DAYS.map((rules, dayIdx) => (
        <Button rules={rules} dayIdx={dayIdx}></Button>
      ))}
    </div>
  );
};

export default DayButtons;
