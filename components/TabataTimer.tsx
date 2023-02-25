import { useState, useEffect } from "react";

function TabataTimer() {
  const [workTime, setWorkTime] = useState(20); // work time in seconds
  const [restTime, setRestTime] = useState(10); // rest time in seconds
  const [totalIntervals, setTotalIntervals] = useState(8); // total number of intervals
  const [currentInterval, setCurrentInterval] = useState(0); // current interval index
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    if (timeLeft === 0) {
      if (currentInterval < totalIntervals - 1) {
        // switch to rest time
        setCurrentInterval((prevInterval) => prevInterval + 1);
        setTimeLeft(currentInterval % 2 === 0 ? restTime : workTime);
        if (currentInterval % 2 === 0) {
          const audioRest = new Audio("/sounds/rest-interval.mp3");

          audioRest.play();
        } else {
          const audioWork = new Audio("/sounds/work-interval.mp3");

          audioWork.play();
        }
      } else {
        // end of last interval
        setIsRunning(false);
        setIsPaused(false);
        setCurrentInterval(0);
        setTimeLeft(workTime);
      }
    }

    return () => clearInterval(interval as NodeJS.Timeout);
  }, [
    isRunning,
    isPaused,
    timeLeft,
    currentInterval,
    totalIntervals,
    workTime,
    restTime,
  ]);

  const handleStart = () => {
    const audioWork = new Audio("/sounds/work-interval.mp3");

    audioWork.play();
    setIsRunning(true);
    setIsPaused(false);
    setTimeLeft(workTime);
    setCurrentInterval(0);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(workTime);
    setCurrentInterval(0);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ marginBottom: "20px" }}>Tabata Timer</h1>
      {!isRunning ? (
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="totalIntervals"
            style={{ display: "block", marginBottom: "10px" }}
          >
            Total intervals:
          </label>
          <input
            type="number"
            id="totalIntervals"
            value={totalIntervals}
            onChange={(e) => setTotalIntervals(parseInt(e.target.value))}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "25px",
              border: "none",
              boxShadow: "2px 2px 5px #999",
            }}
          />
        </div>
      ) : null}
      {isRunning ? (
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ marginBottom: "10px" }}>
            Interval {currentInterval + 1}
          </h2>
          <p style={{ marginBottom: "10px" }}>{timeLeft} seconds</p>
        </div>
      ) : null}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {!isRunning ? (
          <button
            style={{
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "25px",
              boxShadow: "2px 2px 5px #999",
            }}
            onClick={handleStart}
          >
            Start
          </button>
        ) : null}
        {isRunning && !isPaused ? (
          <button
            style={{
              margin: "0 10px",
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "25px",
              boxShadow: "2px 2px 5px #999",
            }}
            onClick={handlePause}
          >
            Pause
          </button>
        ) : null}
        {isRunning && isPaused ? (
          <button
            style={{
              margin: "0 10px",
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "25px",
              boxShadow: "2px 2px 5px #999",
            }}
            onClick={handleResume}
          >
            Resume
          </button>
        ) : null}
        {isRunning ? (
          <button
            style={{
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "25px",
              boxShadow: "2px 2px 5px #999",
            }}
            onClick={handleStop}
          >
            Stop
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default TabataTimer;
