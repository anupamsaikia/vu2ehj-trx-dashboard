import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TxMessageCW() {
  const [wpmLoading, setWpmLoading] = useState(false);
  const [sendMsgLoading, setSendMsgLoading] = useState(false);

  const setMessage = useStoreActions((actions) => actions.setMessage);
  const hostNameAndPort = useStoreState((state) => state.hostNameAndPort);
  const deviceWPM = useStoreState((state) => state.deviceWPM);
  const deviceOpMode = useStoreState((state) => state.deviceOpMode);
  const [localWPM, setLocalWPM] = useState("");
  const parseAndSetESPData = useStoreActions(
    (actions) => actions.parseAndSetESPData
  );

  useEffect(() => {
    setLocalWPM(deviceWPM);
  }, [deviceWPM]);

  const handleSetWPMClick = () => {
    setWpmLoading(true);
    setMessage("");
    axios({
      method: "get",
      url: "set",
      baseURL: `http://${hostNameAndPort}`,
      params: {
        key: "wpm",
        value: localWPM,
      },
    })
      .then((res) => res.data)
      .then((data) => {
        parseAndSetESPData(data);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error occurred while setting WPM");
      })
      .finally(() => {
        setWpmLoading(false);
      });
  };

  const [localTxMessage, setLocalTxMessage] = useState("");
  const handleSendMsgClick = () => {
    if (!deviceOpMode.includes("CW")) {
      setMessage("Set the mode to CW before sending message");
      return;
    }
    setSendMsgLoading(true);
    setMessage("");
    axios({
      method: "get",
      url: "set",
      baseURL: `http://${hostNameAndPort}`,
      params: {
        key: "txMsg",
        value: localTxMessage,
      },
    })
      .then(() =>
        axios({
          method: "get",
          url: "set",
          baseURL: `http://${hostNameAndPort}`,
          params: {
            key: "txEn",
            value: "true",
          },
        })
      )
      .then((res) => res.data)
      .then((data) => {
        parseAndSetESPData(data);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error occurred while sending message");
      })
      .finally(() => {
        setSendMsgLoading(false);
      });
  };

  return (
    <div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">WPM</span>
        </label>
        <input
          type="number"
          class="input input-bordered"
          value={localWPM}
          onChange={(e) => setLocalWPM(e.target.value)}
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Tx Message</span>
        </label>
        <input
          type="text"
          class="input input-bordered"
          value={localTxMessage}
          onChange={(e) => setLocalTxMessage(e.target.value)}
        />
      </div>
      <div className="mt-2 mx-auto grid grid-cols-2 gap-1 max-w-md">
        <button
          class={`mt-2 btn btn-sm btn-primary ${wpmLoading ? "loading" : ""}`}
          onClick={handleSetWPMClick}
        >
          Set WPM
        </button>

        <button
          class={`mt-2 btn btn-sm btn-success ${
            sendMsgLoading ? "loading" : ""
          }`}
          onClick={handleSendMsgClick}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
