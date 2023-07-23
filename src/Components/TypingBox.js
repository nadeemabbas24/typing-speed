import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import UpperMenu from "./UpperMenu";
import { generate } from "random-words";
import Stats from "./Stats";
import { useTestMode } from "../Context/TestModeContext";

const TypingBox = () => {
  const inputRef = useRef(null);
  const { testTime } = useTestMode();
  const [countDown, setCountDown] = useState(testTime);
  const [intervalId, setIntervalId] = useState(null);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [wordsArray, setWordsArray] = useState(() => {
    return generate(10);
  });

  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [graphData, setGraphData] = useState([]);

  const wordSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map(() => {
        return createRef(null);
      });
  }, [wordsArray]);

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
    function timer() {
      setCountDown((latestCountDown) => {
        setCorrectChars((correctChars) => {
          setGraphData((graphData) => {
            return [
              ...graphData,
              [
                testTime - latestCountDown + 1,
                correctChars / 5 / ((testTime - latestCountDown + 1) / 60),
              ],
            ];
          });
          return correctChars;
        });
        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return latestCountDown - 1;
      });
    }
  };

  const resetTest = () => {
    clearInterval(intervalId);
    setCountDown(testTime);
    setCurrWordIndex(0);
    setCurrCharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(generate(10));
    resetWordSpanRefClassname();
    focusInput();
  };

  const resetWordSpanRefClassname = () => {
    wordSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        j.className = "";
      });
    });
    wordSpanRef[0].current.childNodes[0].className = "current";
  };

  const calculateWPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };

  const calculateAcc = () => {
    console.log("accuracy", correctWords, currWordIndex);
    return Math.round((correctWords / currWordIndex) * 100);
  };
  const focusInput = () => {
    inputRef.current.focus();
  };
  useEffect(() => {
    resetTest();
    // setCountDown(testTime);
  }, [testTime]);

  useEffect(() => {
    focusInput();
    wordSpanRef[0].current.childNodes[0].className = "current";
  }, []);

  const handleUserInput = (e) => {
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    //check if all the words finished typing or pressed enter
    if (!wordSpanRef[currWordIndex + 1] || e.keyCode === 13) {
      setTestEnd(true);
      clearInterval(intervalId);
      setTestStart(false);
      return;
    }
    if (!wordSpanRef[currWordIndex].current) return;
    const allCurrChars = wordSpanRef[currWordIndex].current.childNodes;

    //when space key is pressed
    if (e.keyCode === 32) {
      let correctCharsInWords =
        wordSpanRef[currWordIndex].current.querySelectorAll(".correct");

      console.log(
        "coorect words",
        correctCharsInWords.length,
        allCurrChars.length
      );
      if (correctCharsInWords.length === allCurrChars.length)
        setCorrectWords(correctWords + 1);
      //logic for space
      if (allCurrChars.length <= currCharIndex) {
        //remove cursor from last places of the word
        allCurrChars[currCharIndex - 1].classList.remove("current-right");
      }
      //remove cursor from in between the word
      else allCurrChars[currCharIndex].classList.remove("current");
      setMissedChars(missedChars + (allCurrChars.length - currCharIndex));

      wordSpanRef[currWordIndex + 1].current.childNodes[0].classList =
        "current";
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);
      return;
    }

    if (e.keyCode === 8) {
      //backspce handling for deletion of characters
      if (currCharIndex !== 0) {
        if (allCurrChars[currCharIndex - 1].classList.contains("extra")) {
          allCurrChars[currCharIndex - 1].remove();
          allCurrChars[currCharIndex - 2].className += " current-right";
        } else {
          if (allCurrChars[currCharIndex])
            allCurrChars[currCharIndex].className = "";
          allCurrChars[currCharIndex - 1].className = "current";
          console.log("in else part");
        }
        setCurrCharIndex(currCharIndex - 1);
        return;
      }

      return;
    }

    //if key pressed matches the current character
    if (currCharIndex === allCurrChars.length) {
      let newspan = document.createElement("span");
      newspan.innerText = e.key;
      newspan.className = "incorrect current-right extra";
      allCurrChars[currCharIndex - 1].classList.remove("current-right");
      wordSpanRef[currWordIndex].current.append(newspan);
      setCurrCharIndex(currCharIndex + 1);
      setExtraChars(extraChars + 1);
      return;
    }

    if (e.key === allCurrChars[currCharIndex].innerText) {
      allCurrChars[currCharIndex].className = "correct";
      setCorrectChars(correctChars + 1);
      console.log("correct", e.key);
    } else {
      allCurrChars[currCharIndex].className = "incorrect";
      setIncorrectChars(incorrectChars + 1);
      console.log("incorrect", e.key);
    }

    if (currCharIndex + 1 === allCurrChars.length) {
      allCurrChars[currCharIndex].classList.add("current-right");
    } else allCurrChars[currCharIndex + 1].classList = "current";

    setCurrCharIndex(currCharIndex + 1);
  };

  return (
    <div>
      <UpperMenu countDown={countDown} />
      {testEnd ? (
        <Stats
          wpm={calculateWPM()}
          accuracy={calculateAcc()}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          extraChars={extraChars}
          missedChars={missedChars}
          graphData={graphData}
        />
      ) : (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {wordsArray.map((word, index) => (
              <span className="word" ref={wordSpanRef[index]}>
                {word.split("").map((char) => {
                  return <span>{char}</span>;
                })}
              </span>
            ))}
          </div>
        </div>
      )}
      <input
        type="text"
        className="hiden-input"
        ref={inputRef}
        onKeyDown={handleUserInput}
      />
    </div>
  );
};

export default TypingBox;
