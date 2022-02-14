import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState } from "react";
import axios from "axios";

const modes = [
  "CW",
  "FSQ_2",
  "FSQ_3",
  "FSQ_4_5",
  "FSQ_6",
  "RTTY",
  "WSPR",
  "FT8",
];

export default function ModeSelect() {
  const selectedMode = useStoreState((state) => state.selectedMode);
  const setSelectedMode = useStoreActions((actions) => actions.setSelectedMode);

  const [loading, setLoading] = useState(false);
  const setMessage = useStoreActions((actions) => actions.setMessage);
  const hostNameAndPort = useStoreState((state) => state.hostNameAndPort);
  const handleClick = () => {
    setLoading(true);
    setMessage("");
    axios({
      method: "get",
      url: "ping",
      baseURL: `http://${hostNameAndPort}`,
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setMessage("Successfully set mode to ");
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
        {modes.map((mode) => (
          <button
            onClick={() => setSelectedMode(mode)}
            id={mode}
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
