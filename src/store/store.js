import { action, createStore } from "easy-peasy";

export const store = createStore({
  hostnameAndPort: "",
  setHostnameAndPort: action((state, payload) => {
    state.hostnameAndPort = payload;
  }),
});
