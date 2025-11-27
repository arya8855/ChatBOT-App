import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import LoadingSpinner from "./components/Spinner";
import { store } from "./redux/store";
import App from "./App"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
        <Suspense fallback={<LoadingSpinner />}>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            theme="colored"
            draggable
            transition={Slide}
          />
          <App />  
        </Suspense>
    </Provider>
  </StrictMode>
);

