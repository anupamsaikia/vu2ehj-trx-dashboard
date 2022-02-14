import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import axios from "axios";

export default function Status() {
  const message = useStoreState((state) => state.message);
  const setMessage = useStoreActions((actions) => actions.setMessage);

  return (
    <div className="border border-primary rounded-lg mt-2">
      <p className="text-center text-primary font-mono text-sm font-semibold p-1">
        Device status:{" "}
      </p>
      <div className="text-info p-2 text-xs font-mono grid sm:grid-cols-4 xs:grid-cols-1">
        <p>Mode: CW</p>
        <p>Tx enabled: false</p>
        <p>Freq: 7.074 MHz</p>
        <p>Tx Msg: "CQ VU2EHJ NL66"</p>
      </div>

      <p class="p-2 text-xs font-mono text-info">
        {message ? `Status: ${message}` : "Status : Clear"}
      </p>
    </div>
  );
}
