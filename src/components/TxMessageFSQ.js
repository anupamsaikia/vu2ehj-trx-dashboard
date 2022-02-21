import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import axios from "axios";

export default function TxMessageFSQ() {
  const setMessage = useStoreActions((actions) => actions.setMessage);
  const hostNameAndPort = useStoreState((state) => state.hostNameAndPort);
  const parseAndSetESPData = useStoreActions(
    (actions) => actions.parseAndSetESPData
  );

  const [localMyCallsign, setLocalMyCallsign] = useState("");
  const [localDxCallsign, setLocalDxCallsign] = useState("");
  const [localTxMessage, setLocalTxMessage] = useState("");
  const deviceMyCall = useStoreState((state) => state.deviceMyCall);
  const deviceDxCall = useStoreState((state) => state.deviceDxCall);
  const deviceOpMode = useStoreState((state) => state.deviceOpMode);

  useEffect(() => {
    setLocalMyCallsign(deviceMyCall);
  }, [deviceMyCall]);

  useEffect(() => {
    setLocalDxCallsign(deviceDxCall);
  }, [deviceDxCall]);

  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const handleSendMessageClick = () => {
    if (!deviceOpMode.includes("FSQ")) {
      setMessage("Set the mode to FSQ before sending message");
      return;
    }
    setSendMessageLoading(true);
    setMessage("");
    axios({
      method: "get",
      url: "set",
      baseURL: `http://${hostNameAndPort}`,
      params: {
        key: "myCall",
        value: localMyCallsign,
      },
    })
      .then(() =>
        axios({
          method: "get",
          url: "set",
          baseURL: `http://${hostNameAndPort}`,
          params: {
            key: "dxCall",
            value: localDxCallsign,
          },
        })
      )
      .then(() =>
        axios({
          method: "get",
          url: "set",
          baseURL: `http://${hostNameAndPort}`,
          params: {
            key: "txMsg",
            value: localTxMessage,
          },
        })
      )
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
        setSendMessageLoading(false);
      });
  };

  return (
    <div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">My Callsign</span>
        </label>
        <input
          type="text"
          maxLength={9}
          class="input input-bordered"
          value={localMyCallsign}
          onChange={(e) => setLocalMyCallsign(e.target.value)}
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Dx Callsign</span>
        </label>
        <input
          type="text"
          maxLength={9}
          class="input input-bordered"
          value={localDxCallsign}
          onChange={(e) => setLocalDxCallsign(e.target.value)}
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Tx Message</span>
        </label>
        <input
          type="text"
          maxLength={80}
          class="input input-bordered"
          value={localTxMessage}
          onChange={(e) => setLocalTxMessage(e.target.value)}
        />
      </div>

      <div className="text-center mt-2">
        <button
          class={`btn btn-sm btn-success ${
            sendMessageLoading ? "loading" : ""
          }`}
          onClick={handleSendMessageClick}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
