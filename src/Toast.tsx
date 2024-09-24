import { useEffect, useState } from "react";
import EventBus from "./EventBus.ts";
import { createPortal } from "react-dom";
import "./toast.css";
import ProgressBar from "./ProgressBar.tsx";

type Toast = {
  message: string;
  duration?: number;
  background?: string;
  showProgress?: boolean;
}

const Toast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    // 'SHOW_TOAST' 이벤트가 발생할 때마다 handleToastEvent 호출, 매개변수로 등록된 새로운 toast 내용을 받을 수 있음
    const handleToastEvent = (toast:Toast) => {
      const id = Date.now();
      const duration = toast.duration ?? 1500;
      setToasts((prevToasts) => [...prevToasts, { id: id, ...toast }]);

      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1));
      }, duration);
    };

    const unsubscribe = EventBus.subscribe("SHOW_TOAST", handleToastEvent);

    return () => {
      unsubscribe();
    };
  }, []);

  return createPortal(
    <div className="toast-container">
      {toasts.map((toast, index) => {
        return (
          <div
            key={index}
            className="toast"
            style={{
              background: `${toast.background}`,
            }}
          >
            {toast.message}
            {toast.showProgress ? (
              <ProgressBar duration={toast.duration} />
            ) : null}
          </div>
        );
      })}
    </div>,
    document.getElementById("toast-container")!,
  );
};

export default Toast;
