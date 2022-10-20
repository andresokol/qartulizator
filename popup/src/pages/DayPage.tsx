import React from "react";
import { CONVERSION_RULES, IRule } from "../consts";

import styles from "./DayPage.module.css";

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

const DayPage = ({ dayNum }: { dayNum: number }) => {
  const todaysRules = CONVERSIONS_BY_DAYS[dayNum].map((ruleId) =>
    CONVERSION_RULES.get(ruleId)
  ) as IRule[];

  return (
    <div>
      <h1 className={styles.title}>День {dayNum + 1}</h1>

      <div className={styles.letter_box}>
        {todaysRules.map((rule) => (
          <p key={rule.idx}>
            {rule.from} &rarr; {rule.to}
          </p>
        ))}
      </div>

      <p className={styles.comment}>
        Не забывайте, что в грузинском нет мягких а и твердых согласных -
        читайте все звуки в средней мягкости.
      </p>

      <div className={styles.qartulize_button_container}>
        <button className={styles.qartulize_button}>
          картулизовать страницу
        </button>
      </div>

      <div className={styles.paginator}>
        <span>день {dayNum - 1}</span>
        <span>все дни</span>
        <span>день {dayNum + 1}</span>
      </div>
    </div>
  );
};

export default DayPage;
