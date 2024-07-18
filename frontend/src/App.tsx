import { useState } from "react";
import StoreProvider from "./lib/store/storeProvider";

import "./App.css";
import MainNavigation from "./navigation/main-navigation";

function App() {
  return (
    <>
      <StoreProvider>
        <MainNavigation />
      </StoreProvider>
    </>
  );
}

export default App;
