import { useState } from "react";
import "./App.css";
import { showToast } from "./showToast.ts";
import Toast from "./Toast.tsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Toast Ex</h1>
      <button
        onClick={() => {
          showToast(`This is a toast message! ${count}`, {
            duration: count * 1000,
            background: "#871",
            showProgress: false,
          });
          setCount((prev) => prev + 1);
        }}
      >
        Show Toast
      </button>
      <Toast />
    </div>
  );
}

export default App;
