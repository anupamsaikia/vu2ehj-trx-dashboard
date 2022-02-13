import { action, createStore } from "easy-peasy";

export const store = createStore({
  hostNameAndPort: "",
  setHostNameAndPort: action((state, payload) => {
    state.hostNameAndPort = payload;
  }),

  lastPingTime: new Date(0),
  setLastPingTime: action((state, payload) => {
    state.lastPingTime = payload;
  }),
});
