import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleInit } from "actions/appAction";
import "./index.scss";

export default function WelcomePage() {
  const [countTimer, setCountTimer] = useState();
  const [countNumber, setCountNumber] = useState();
  const dispatch = useDispatch();
  const timer = function () {
    if (countNumber >= 0) {
      setCountNumber(countTimer - 1);
    } else {
      dispatch(handleInit());
      clearInterval(countTimer);
    }
    setCountNumber(countTimer - 1);
  };
  useEffect(() => {
    const intervalId = setInterval(timer, 3000);
    setCountTimer(intervalId);
    return () => {
      clearInterval(countTimer);
    };
  }, []);
  return (
    <div className="init-page">
      {/* <img src={"/assets/images/initPage.png"} alt="initImg" /> */}
    </div>
  );
}
