import React, { useEffect, useState } from "react";
import Loader from "./components/utils/Loader";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function Apppka() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [amount, setAmount] = useState(1);
  const [currency1, setCurrency1] = useState("EUR");
  const [currency2, setCurrency2] = useState("USD");

  const [rate, setRate] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    // In the console if we log result we will see 2 responses, this is due to strict mode, to be double check, but this is only in development, in prod, everything is normal
    async function fetchRate() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currency1}&to=${currency2}`,
          //so we use it as every time we type another req is being created + old ones also being processed
          //with it with a new keystroke we abore other ongoing requests that we done and the last one only becomes main
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        const rate = String(data.rates[currency2]);
        console.log(rate);
        setRate(rate);

        if (data.Response === "False") throw new Error("Movie not found");
      } catch (err) {
        if (typeof err === "string") {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (currency1 !== currency2) return setRate(String(amount));
    //so on every key press actually we are entering useEffect so that we are calling Close movie to close it
    fetchRate();

    //on every new keystroke our contorller will abort existing fetch req
    return function () {
      controller.abort();
    };
  }, [amount, currency1, currency2]);

  console.log(rate);
  return (
    <div>
      <input
        required
        type='number'
        value={amount}
        disabled={isLoading}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        disabled={isLoading}
        onChange={(e) => setCurrency1(e.target.value)}
      >
        <option value='EUR'>EUR</option>
        <option value='USD'>USD</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select
        disabled={isLoading}
        onChange={(e) => setCurrency2(e.target.value)}
      >
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      {!error && isLoading && <Loader />}
      {!error && !isLoading && (
        <p>
          {rate} {currency2}
        </p>
      )}
    </div>
  );
}
