import { useEffect, useState } from "react";
import useDigitInput from "react-digit-input";
import { useStoreActions, useStoreState } from "easy-peasy";
import axios from "axios";

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

// e.g converts "12345678" => 1234567800 or "1 345678" => 1034567800
const convertStringToFrequency = (inputStr = "00000000") => {
  if (inputStr.length !== 8) {
    return 0;
  }

  let freq = 0;
  for (let index = 0; index < 8; index++) {
    if (isNumeric(inputStr[index])) {
      freq += Number(inputStr[index]) * Math.pow(10, 9 - index);
    }
  }
  return freq;
};

function getDigitCount(number) {
  return Math.max(Math.floor(Math.log10(Math.abs(number))), 0) + 1;
}

function getDigit(number, n, fromLeft) {
  const location = fromLeft ? getDigitCount(number) + 1 - n : n;
  return Math.floor((number / Math.pow(10, location - 1)) % 10);
}

// e.g converts 1234567800 => "12345678" or 1234500 => "00012345"
const convertFrequencyToString = (inputFreq = 700000000) => {
  let output = ["0", "0", "0", "0", "0", "0", "0", "0"];
  for (let index = 0; index < 8; index++) {
    let val = getDigit(inputFreq, 3 + index, false);
    output[7 - index] = val.toString();
  }
  return output.join("");
};

export default function FrequencyInput() {
  const deviceFreq = useStoreState((state) => state.deviceFreq);

  const [localFrequency, setLocalFrequency] = useState("");

  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: 8,
    value: localFrequency,
    onChange: setLocalFrequency,
  });

  const parseAndSetESPData = useStoreActions(
    (actions) => actions.parseAndSetESPData
  );

  useEffect(() => {
    setLocalFrequency(convertFrequencyToString(deviceFreq));
  }, [deviceFreq]);

  const [loading, setLoading] = useState(false);
  const setMessage = useStoreActions((actions) => actions.setMessage);
  const hostNameAndPort = useStoreState((state) => state.hostNameAndPort);
  const handleClick = () => {
    setLoading(true);
    setMessage("");
    axios({
      method: "get",
      url: "set",
      baseURL: `http://${hostNameAndPort}`,
      params: {
        key: "freq",
        value: convertStringToFrequency(localFrequency),
      },
    })
      .then((res) => res.data)
      .then((data) => {
        parseAndSetESPData(data);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error occurred while setting frequency");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="grid grid-cols-10 gap-1 border border-primary rounded-xl p-2 items-center">
        <input
          className="input input-bordered input-md text-center p-0 font-semibold text-lg"
          inputMode="decimal"
          {...digits[0]}
        />
        <input
          className="input input-bordered input-md text-center p-0 font-semibold text-lg"
          inputMode="decimal"
          {...digits[1]}
        />
        <span className="text-center ">.</span>
        <input
          className="input input-bordered input-md text-center p-0 font-semibold text-lg"
          inputMode="decimal"
          {...digits[2]}
        />
        <input
          className="input input-bordered input-md text-center p-0 font-semibold text-lg"
          inputMode="decimal"
          {...digits[3]}
        />
        <input
          className="input input-bordered input-md text-center p-0 font-semibold text-lg"
          inputMode="decimal"
          {...digits[4]}
        />
        <input
          className="input input-bordered input-md text-center p-0 font-semibold text-lg"
          inputMode="decimal"
          {...digits[5]}
        />
        <input
          className="input input-bordered input-md text-center p-0 font-semibold text-lg"
          inputMode="decimal"
          {...digits[6]}
        />
        <input
          className="input input-bordered input-md text-center p-0 font-semibold text-lg"
          inputMode="decimal"
          {...digits[7]}
        />

        <span className="text-center ">MHz</span>
      </div>

      <div className="w-full text-center">
        <button
          class={`mt-2 btn btn-sm btn-primary ${loading ? "loading" : ""}`}
          onClick={handleClick}
        >
          Set Frequency
        </button>
      </div>
    </div>
  );
}
