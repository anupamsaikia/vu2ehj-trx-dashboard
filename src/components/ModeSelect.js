import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState } from "react";
import axios from "axios";
import { operatingModes } from "../Data/operatingModes";

export default function ModeSelect() {
  const selectedMode = useStoreState((state) => state.selectedMode);
  const setSelectedMode = useStoreActions((actions) => actions.setSelectedMode);

  const [loading, setLoading] = useState(false);
  const setMessage = useStoreActions((actions) => actions.setMessage);
  const parseAndSetESPData = useStoreActions(
    (actions) => actions.parseAndSetESPData
  );

  const hostNameAndPort = useStoreState((state) => state.hostNameAndPort);
  const handleClick = () => {
    setLoading(true);
    setMessage("");
    axios({
      method: "get",
      url: "set",
      baseURL: `http://${hostNameAndPort}`,
      params: {
        key: "opMode",
        value: operatingModes.indexOf(selectedMode),
      },
    })
      .then((res) => res.data)
      .then((data) => {
        parseAndSetESPData(data);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error occurred while setting mode");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="">
      <div class="grid grid-cols-4 xl:grid-cols-8 gap-1">
        {operatingModes.map((mode) => (
          <button
            onClick={() => setSelectedMode(mode)}
            key={mode}
            class={`btn btn-sm ${selectedMode === mode ? "btn-accent" : ""}`}
          >
            {mode}
          </button>
        ))}
      </div>

      <div className="w-full text-center">
        <button
          class={`mt-2 btn btn-sm btn-primary ${loading ? "loading" : ""}`}
          onClick={handleClick}
        >
          Set Mode
        </button>
      </div>
    </div>
  );
}
