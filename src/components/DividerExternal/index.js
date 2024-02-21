import { Button } from "antd";
import { ArrowDownCircle } from "assets/icons";
import style from "./style.module.scss";
import React, { useState } from "react";
import classNames from "classnames";

export default function DividerExternal({ children }) {
  const [hide, setHide] = useState(false);

  return (
    <div>
      <div className={style.bar}>
        <div className="divider" />
        <div
          className={classNames(style.btnExchange, {
            [style.up]: !hide,
            [style.down]: hide,
          })}
          onClick={() => setHide((e) => !e)}
          role="button"
          tabIndex={0}
        >
          <ArrowDownCircle />
        </div>
        <div className="divider" />
      </div>

      <div style={{ transition: 'all .3s linear'}} className={hide ? style.hide : style.show}>{children}</div>
    </div>
  );
}
