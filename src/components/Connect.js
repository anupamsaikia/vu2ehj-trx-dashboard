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
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClick = () => {
    setLoading(true);
    setErrorMessage(null);
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
        setErrorMessage("Error occurred while connecting");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div class="max-w-md mx-auto">
      <div class="form-control">
        <div class="relative">
          <input
            type="text"
            placeholder="Enter host and port e.g 192.168.1.1:2237"
            class="w-full pr-16 input input-sm input-primary input-bordered"
            value={hostNameAndPort}
            onChange={(e) => setHostNameAndPort(e.target.value)}
          ></input>
          <button
            class="absolute top-0 right-0 rounded-l-none btn btn-sm btn-primary"
            onClick={handleClick}
          >
            {loading && (
              <svg
                class="animate-spin ml-1 mr-3 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}

            {loading ? "Loading" : "Send Ping"}
          </button>
        </div>
      </div>

      <p class="mt-2 text-sm text-center">
        {errorMessage !== null
          ? `${errorMessage}`
          : lastPingTime.getTime() !== new Date(0).getTime()
          ? `Last ping reply was ${formatDistanceToNow(lastPingTime, {
              addSuffix: true,
            })}`
          : ""}
      </p>
    </div>
  );
}
