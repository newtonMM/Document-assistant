import { useState } from "react";
import StoreProvider from "./lib/store/storeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import MainNavigation from "./navigation/main-navigation";

function App() {
  return (
    <>
      <StoreProvider>
        <ToastContainer />
        <MainNavigation />
      </StoreProvider>
    </>
  );
}

export default App;
