import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import axios from "axios";

export default function Status() {
  const message = useStoreState((state) => state.message);
  const setMessage = useStoreActions((actions) => actions.setMessage);

  return (
    <div>
      <p class="mt-1 text-sm text-info text-center">
        {message ? `Status: ${message}` : "Status : Clear"}
      </p>
    </div>
  );
}
