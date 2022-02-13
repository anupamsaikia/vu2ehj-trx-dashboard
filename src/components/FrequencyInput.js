import { useState } from "react";
import useDigitInput from "react-digit-input";
import { useStoreActions, useStoreState } from "easy-peasy";

export default function FrequencyInput() {
  const frequency = useStoreState((state) => state.frequency);
  const setFrequency = useStoreActions((actions) => actions.setFrequency);

  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: 6,
    value: frequency,
    onChange: setFrequency,
  });
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="grid grid-cols-8 gap-1 border border-primary rounded-xl p-2 items-center">
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
