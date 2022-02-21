import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import TxMessageCW from "./TxMessageCW";

export default function ShowModeOptions() {
  const selectedMode = useStoreState((state) => state.selectedMode);

  return (
    <>
      {selectedMode === "CW" || selectedMode === "PIXIE_CW" ? (
        <TxMessageCW />
      ) : null}
    </>
  );
}
