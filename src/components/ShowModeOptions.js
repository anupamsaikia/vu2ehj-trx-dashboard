import React from "react";
import { useStoreState } from "easy-peasy";
import TxMessageCW from "./TxMessageCW";
import TxMessageFSQ from "./TxMessageFSQ";

export default function ShowModeOptions() {
  const selectedMode = useStoreState((state) => state.selectedMode);

  return (
    <>
      {selectedMode === "CW" || selectedMode === "PIXIE_CW" ? (
        <TxMessageCW />
      ) : null}

      {selectedMode === "FSQ_2" ||
      selectedMode === "FSQ_3" ||
      selectedMode === "FSQ_4_5" ||
      selectedMode === "FSQ_6" ? (
        <TxMessageFSQ />
      ) : null}
    </>
  );
}
