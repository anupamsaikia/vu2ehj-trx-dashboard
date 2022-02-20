import React from "react";
import { useStoreState } from "easy-peasy";

export default function Status() {
  const message = useStoreState((state) => state.message);
  const deviceFreq = useStoreState((state) => state.deviceFreq);
  const deviceOpMode = useStoreState((state) => state.deviceOpMode);
  const deviceTxMsg = useStoreState((state) => state.deviceTxMsg);
  const deviceMyCall = useStoreState((state) => state.deviceMyCall);
  const deviceDxCall = useStoreState((state) => state.deviceDxCall);
  const deviceDBM = useStoreState((state) => state.deviceDBM);
  const deviceTxEn = useStoreState((state) => state.deviceTxEn);
  const deviceMyGrid = useStoreState((state) => state.deviceMyGrid);
  const deviceCal = useStoreState((state) => state.deviceCal);
  const deviceWPM = useStoreState((state) => state.deviceWPM);

  return (
    <div className="border border-primary rounded-lg mt-2">
      <p className="text-center text-primary font-mono text-sm font-semibold p-1">
        Device status:{" "}
      </p>
      <div className="p-2 text-xs font-mono grid sm:grid-cols-4 xs:grid-cols-1">
        <p>
          <span className="text-primary">Mode: </span>
          <span className="">
            {deviceOpMode ? deviceOpMode : "Unavailable"}
          </span>
        </p>
        <p>
          <span className="text-primary">Freq: </span>
          <span className="">
            {deviceFreq ? `${deviceFreq / 100000000} MHz` : "Unavailable"}
          </span>
        </p>
        <p>
          <span className="text-primary">Tx enabled: </span>
          <span className="">{deviceTxEn ? "true" : "false"}</span>
        </p>
        <p>
          <span className="text-primary">WPM: </span>
          <span className="">{deviceWPM ? deviceWPM : "Unavailable"}</span>
        </p>
        <p>
          <span className="text-primary">DBM: </span>
          <span className="">{deviceDBM ? deviceDBM : "Unavailable"}</span>
        </p>
        <p>
          <span className="text-primary">Cal factor: </span>
          <span className="">{deviceCal ? deviceCal : "Unavailable"}</span>
        </p>
        <p>
          <span className="text-primary">My call: </span>
          <span className="">
            {deviceMyCall ? deviceMyCall : "Unavailable"}
          </span>
        </p>{" "}
        <p>
          <span className="text-primary">My grid: </span>
          <span className="">
            {deviceMyGrid ? deviceMyGrid : "Unavailable"}
          </span>
        </p>{" "}
        <p>
          <span className="text-primary">Dx call: </span>
          <span className="">
            {deviceDxCall ? deviceDxCall : "Unavailable"}
          </span>
        </p>
      </div>

      <p class="px-2 py-1 text-xs font-mono">
        <span className="text-primary">Tx Msg: </span>
        <span className="">{deviceTxMsg ? deviceTxMsg : ""}</span>
      </p>
      <p class="px-2 py-1 text-xs font-mono">
        <span className="text-primary">Status: </span>
        <span className="">{message ? `${message}` : "Clear"}</span>
      </p>
    </div>
  );
}
