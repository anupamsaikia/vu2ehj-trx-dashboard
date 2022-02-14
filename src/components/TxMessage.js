import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useState } from "react";
import axios from "axios";

export default function TxMessage() {
  const selectedMode = useStoreState((state) => state.selectedMode);

  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const [setTxMessageLoading, setSetTxMessageLoading] = useState(false);
  const [enableTxLoading, setEnableTxLoading] = useState(false);
  const [disableTxLoading, setDisableTxLoading] = useState(false);

  const setMessage = useStoreActions((actions) => actions.setMessage);
  const hostNameAndPort = useStoreState((state) => state.hostNameAndPort);
  const handleClick = () => {
    setMessage("");
    axios({
      method: "get",
      url: "ping",
      baseURL: `http://${hostNameAndPort}`,
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setMessage("Successfull");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error occurred");
      })
      .finally(() => {});
  };

  return (
    <div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Tx Message</span>
        </label>
        <input type="text" class="input input-bordered" />
      </div>

      {["WSPR", "FT8"].includes(selectedMode) && (
        <div className="mx-auto grid grid-cols-3 gap-1 max-w-md">
          <button
            class={`mt-2 btn btn-sm btn-primary ${
              setTxMessageLoading ? "loading" : ""
            }`}
            onClick={handleClick}
          >
            Set Tx Msg
          </button>

          <button
            class={`mt-2 btn btn-sm btn-success ${
              enableTxLoading ? "loading" : ""
            }`}
            onClick={handleClick}
          >
            Enable Tx
          </button>

          <button
            class={`mt-2 btn btn-sm btn-error ${
              disableTxLoading ? "loading" : ""
            }`}
            onClick={handleClick}
          >
            Disable Tx
          </button>
        </div>
      )}

      {["CW", "FSQ_2", "FSQ_3", "FSQ_4_5", "FSQ_6", "RTTY"].includes(
        selectedMode
      ) && (
        <div className="w-full text-center">
          <button
            class={`mt-2 btn btn-sm btn-primary ${
              sendMessageLoading ? "loading" : ""
            }`}
            onClick={handleClick}
          >
            Send Message
          </button>
        </div>
      )}
    </div>
  );
}
