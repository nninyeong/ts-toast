import EventBus from "./EventBus.ts";

export const showToast = (message:string, options = {}) => {
  EventBus.publish("SHOW_TOAST", { message, ...options });
};
