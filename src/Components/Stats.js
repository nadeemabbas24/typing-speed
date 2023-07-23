import React, { useEffect, useState } from "react";
import Graph from "./Graph";
import { db, auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import ToolTip from "./ToolTip";

const Stats = ({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  graphData,
}) => {
  const [show, setShow] = useState("hidden");
  let timeSet = new Set();
  const newgraph = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

  const pushDataToDB = () => {
    if (isNaN(accuracy) || accuracy === 0) {
      toast.error("test is invalid to save! try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    const { uid } = auth.currentUser;
    const resultRef = db.collection("Results");

    resultRef
      .add({
        wpm: wpm,
        accuracy: accuracy,
        timeStamp: new Date(),
        characters: `${correctChars} / ${incorrectChars} / ${missedChars} / ${extraChars}`,
        userId: uid,
      })
      .then((res) => {
        toast.success("result saved to DB", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error("something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  useEffect(() => {
    if (auth.currentUser) {
      pushDataToDB();
    } else {
      toast.warning("first login to save results", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, []);
  const showTooltip = () => {
    setShow("visible");
  };

  const hideTooltip = () => {
    setShow("hidden");
  };

  return (
    <div className="stats-box">
      <div className="left-stats">
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}%</div>
        <div className="title">Characters</div>
        <div
          className="subtitle chars-detail"
          onMouseOver={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {correctChars}/{incorrectChars}/{missedChars}/{extraChars}
        </div>
        <ToolTip
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          missedChars={missedChars}
          extraChars={extraChars}
          show={show}
        />
      </div>
      <div className="right-stats">
        <Graph graphData={newgraph} />
      </div>
    </div>
  );
};

export default Stats;
