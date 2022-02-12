import { StoreProvider } from "easy-peasy";
import React from "react";
import Connect from "./components/Connect";
import Navbar from "./components/Navbar";
import { store } from "./store/store";

function App() {
  return (
    <React.Fragment>
      <StoreProvider store={store}>
        <Navbar></Navbar>
        <div class="md:container md:mx-auto px-4">
          <Connect></Connect>

          <div class="divider"></div>

          <div>hdhkj</div>
        </div>
      </StoreProvider>
    </React.Fragment>
  );
}

export default App;
