import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import axios from "axios";

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
      <div className="text-info p-2 text-xs font-mono grid sm:grid-cols-4 xs:grid-cols-1">
        <p>Mode: {deviceOpMode}</p>
        <p>Freq: {`${deviceFreq / 100000000}`} MHz</p>
        <p>Tx enabled: {deviceTxEn ? "true" : "false"}</p>
        <p>WPM: {deviceWPM}</p>
        <p>DBM: {deviceDBM}</p>
        <p>Cal factor: {deviceCal}</p>
        <p>My call: {deviceMyCall}</p>
        <p>My grid: {deviceMyGrid}</p>
        <p>Dx call: {deviceDxCall}</p>
      </div>

      <p class="p-2 text-xs font-mono text-info">Tx Msg: {deviceTxMsg}</p>

      <p class="p-2 text-xs font-mono text-info">
        {message ? `Status: ${message}` : "Status : Clear"}
      </p>
    </div>
  );
}
