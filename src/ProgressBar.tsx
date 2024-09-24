import { useEffect, useState } from "react";

const ProgressBar = ({ duration }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const percentage = Math.max(100 - (elapsedTime / duration) * 100, 0);
      setProgress(percentage);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
