import { createElement } from "react";
import { toast } from "react-toastify";
import SUCCESSICON from "../assets/toast_check.svg";
import WARNINGICON from "../assets/toast_warning.svg";
import USER_1 from "../assets/user/usr-1.svg";
import USER_2 from "../assets/user/usr-2.svg";
import USER_3 from "../assets/user/usr-3.svg";
import USER_4 from "../assets/user/usr-4.svg";
import USER_5 from "../assets/user/usr-5.svg";
import USER_6 from "../assets/user/usr-6.svg";

// Function to handle session logout
export function sessionLogout(hasToast = true) {
  localStorage.removeItem("user");
  if (hasToast) showToast("Session Expired! Please log in again.", "warning");
  window.location.href = "/auth/sign-in";
}

// Function to handle Toast Notifications
export const showToast = (message, type) => {
  const icons = {
    success: createElement("img", {
      src: SUCCESSICON,
      alt: "success",
      width: 20,
      height: 20,
    }),
    warning: createElement("img", {
      src: WARNINGICON,
      alt: "warning",
      width: 20,
      height: 20,
    }),
    error: createElement("img", {
      src: WARNINGICON,
      alt: "success",
      width: 20,
      height: 20,
    }),
    info: createElement("img", {
      src: WARNINGICON,
      alt: "warning",
      width: 20,
      height: 20,
    }),
  };

  toast[type](message, {
    icon: icons[type],
    className: "text-white",
  });
};

// Get Random User Image
const USER_IMAGES = [USER_1, USER_2, USER_3, USER_4, USER_5, USER_6];

export function getRandomImage(number = 1) {
  const randomIndex = Math.floor(Math.random() * USER_IMAGES.length);
  return USER_IMAGES[number ?? randomIndex];
}

// Get Time Difference
export const getTimeElapsed = (postedAt) => {
  const then = new Date(postedAt);
  const now = new Date();
  const diffInMs = now.getTime() - then.getTime();

  const totalMinutes = Math.floor(diffInMs / (1000 * 60));
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const minutes = totalMinutes % 60;
  const hours = totalHours % 24;

  if (totalMinutes < 60) {
    return `${totalMinutes} min${totalMinutes !== 1 ? "s" : ""} ago`;
  } else if (totalHours < 24) {
    return `${totalHours} hr${totalHours !== 1 ? "s" : ""} ${minutes} min${
      minutes !== 1 ? "s" : ""
    } ago`;
  } else {
    return `${totalDays} day${totalDays !== 1 ? "s" : ""} ${hours} hr${
      hours !== 1 ? "s" : ""
    } ago`;
  }
};

// Get Posted Date
export const getPostedDate = (postedAt) => {
  return new Date(postedAt).toLocaleString("en-GB", {
    timeStyle: "short",
    dateStyle: "short",
    hour12: true,
  });
};