import { action, createStore } from "easy-peasy";
import { get } from "lodash-es";
import { operatingModes } from "../Data/operatingModes";

export const store = createStore({
  message: "",
  setMessage: action((state, payload) => {
    state.message = payload;
  }),

  hostNameAndPort: "",
  setHostNameAndPort: action((state, payload) => {
    state.hostNameAndPort = payload;
  }),

  lastPingTime: new Date(0),
  setLastPingTime: action((state, payload) => {
    state.lastPingTime = payload;
  }),

  selectedMode: "CW",
  setSelectedMode: action((state, payload) => {
    state.selectedMode = payload;
  }),

  // ESP response data
  deviceFreq: 0,
  deviceOpMode: "",
  deviceTxMsg: "",
  deviceMyCall: "",
  deviceDxCall: "",
  deviceDBM: null,
  deviceTxEn: false,
  deviceMyGrid: "",
  deviceCal: null,
  deviceWPM: null,
  parseAndSetESPData: action((state, payload) => {
    const freq = get(payload, "freq", 702300000);
    const opMode = operatingModes.at(get(payload, "opMode", 0));
    const txMsg = get(payload, "txMsg", "");
    const myCall = get(payload, "myCall", "");
    const dxCall = get(payload, "dxCall", "");
    const dBm = get(payload, "dBm", 27);
    const txEn = get(payload, "txEn", false);
    const myGrid = get(payload, "myGrid", "");
    const cal = get(payload, "cal", 0);
    const wpm = get(payload, "wpm", 15);
    const message = get(payload, "message", "");

    state.deviceFreq = freq;
    state.deviceOpMode = opMode;
    state.deviceTxMsg = txMsg;
    state.deviceMyCall = myCall;
    state.deviceDxCall = dxCall;
    state.deviceDBM = dBm;
    state.deviceTxEn = txEn;
    state.deviceMyGrid = myGrid;
    state.deviceCal = cal;
    state.deviceWPM = wpm;

    state.message = message;
    state.selectedMode = opMode;
  }),
});
