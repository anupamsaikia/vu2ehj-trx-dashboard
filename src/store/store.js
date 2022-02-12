import { action, createStore } from "easy-peasy";

export const store = createStore({
  hostnameAndPort: "",
  setHostnameAndPort: action((state, payload) => {
    state.hostnameAndPort = payload;
  }),

  lastPingTime: new Date(0),
  setLastPingTime: action((state, payload) => {
    state.lastPingTime = payload;
  }),
});
