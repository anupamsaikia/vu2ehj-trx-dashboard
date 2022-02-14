import { StoreProvider } from "easy-peasy";
import React from "react";
import Connect from "./components/Connect";
import FrequencyInput from "./components/FrequencyInput";
import ModeSelect from "./components/ModeSelect";
import Navbar from "./components/Navbar";
import { store } from "./store/store";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import TxMessage from "./components/TxMessage";
import Status from "./components/Status";

function App() {
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <React.Fragment>
      <StoreProvider store={store}>
        <Navbar></Navbar>
        <div class="md:container md:mx-auto px-4">
          <Connect></Connect>

          <Status></Status>

          <div class="divider"></div>

          <FrequencyInput></FrequencyInput>

          <div class="divider"></div>

          <ModeSelect></ModeSelect>

          <div class="divider"></div>

          <TxMessage></TxMessage>

          <div className="mt-10"></div>
        </div>
      </StoreProvider>
    </React.Fragment>
  );
}

export default App;
