import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";

export default function Connect() {
  const hostNameAndPort = useStoreState((state) => state.hostNameAndPort);
  const setHostNameAndPort = useStoreActions(
    (actions) => actions.setHostNameAndPort
  );

  const lastPingTime = useStoreState((state) => state.lastPingTime);
  const setLastPingTime = useStoreActions((actions) => actions.setLastPingTime);

  const [loading, setLoading] = useState(false);
  const setMessage = useStoreActions((actions) => actions.setMessage);

  const handleClick = () => {
    setLoading(true);
    setMessage("");
    axios({
      method: "get",
      url: "ping",
      baseURL: `http://${hostNameAndPort}`,
    })
      .then((res) => res.data())
      .then((data) => {
        console.log(data);
        // save to local storage
        setLastPingTime(new Date());
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error occurred while connecting");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div class="max-w-md mx-auto mt-4">
      <p class="mt-1 mb-1 text-sm text-center">
        {lastPingTime.getTime() !== new Date(0).getTime()
          ? `Last ping reply was ${formatDistanceToNow(lastPingTime, {
              addSuffix: true,
            })}`
          : ""}
      </p>

      <div class="form-control">
        <div class="relative">
          <input
            type="text"
            placeholder="Enter host, port e.g 192.168.1.1:2237"
            class="w-full pr-16 input input-sm input-primary input-bordered"
            value={hostNameAndPort}
            onChange={(e) => setHostNameAndPort(e.target.value)}
          ></input>
          <button
            class={`absolute top-0 right-0 rounded-l-none btn btn-sm btn-primary ${
              loading ? "loading" : ""
            }`}
            onClick={handleClick}
          >
            Send Ping
          </button>
        </div>
      </div>
    </div>
  );
}
