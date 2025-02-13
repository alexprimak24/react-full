import React, { useEffect, useState } from "react";
import { friendDetails } from "../constants/friendList";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./ui/Button";

type FormFields = {
  billVal: number;
  yourExpense: number;
  friendExpense: number;
  whoIsPaying: "you" | "friend";
};

function SplitBill({
  selectedFriend,
  setFriendList,
}: {
  selectedFriend: string;
  setFriendList: React.Dispatch<
    React.SetStateAction<{
      [key: string]: friendDetails;
    }>
  >;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormFields>();

  const billVal = watch("billVal");
  const yourExpense = watch("yourExpense");
  const whoIsPaying = watch("whoIsPaying");

  useEffect(() => {
    if (whoIsPaying === "you") {
      setValue("friendExpense", Math.abs(yourExpense - billVal));
    } else {
      setValue("friendExpense", Math.abs(billVal - yourExpense));
    }
  }, [billVal, yourExpense, setValue, whoIsPaying]);

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    if (!selectedFriend) {
      return alert("Please select a friend");
    }
    setFriendList((prevFriendList) => ({
      ...prevFriendList,
      [selectedFriend]: {
        ...prevFriendList[selectedFriend],
        amount:
          whoIsPaying === "you"
            ? prevFriendList[selectedFriend].amount + data.friendExpense
            : prevFriendList[selectedFriend].amount - data.friendExpense,
      },
    }));
    console.log(data);
  };

  // console.dir(watch("billVal")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[420px] mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="flex flex-col gap-4 text-green-600">
        {/* Bill Amount Field */}
        <div className="flex flex-col">
          <label
            htmlFor="billVal"
            className="text-lg font-medium text-gray-700"
          >
            Bill amount
          </label>
          <input
            id="billVal"
            type="number"
            defaultValue={100}
            {...register("billVal", {
              required: true,
              min: 0,
              valueAsNumber: true,
            })}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.billVal && (
            <span className="text-red-500 text-sm mt-1">
              This field is required
            </span>
          )}
        </div>

        {/* Your Expense Field */}
        <div className="flex flex-col">
          <label
            htmlFor="yourExpense"
            className="text-lg font-medium text-gray-700"
          >
            Your expense
          </label>
          <input
            id="yourExpense"
            type="number"
            {...register("yourExpense", {
              required: true,
              min: 0,
              valueAsNumber: true,
            })}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.yourExpense && (
            <span className="text-red-500 text-sm mt-1">
              This field is required
            </span>
          )}
        </div>

        {/* Friend's Expense Field */}
        <div className="flex flex-col">
          <label
            htmlFor="friendExpense"
            className="text-lg font-medium text-gray-700"
          >
            Friend's expense
          </label>
          <input
            id="friendExpense"
            type="number"
            {...register("friendExpense", {
              required: true,
              valueAsNumber: true,
            })}
            disabled
            className="p-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
          {errors.friendExpense && (
            <span className="text-red-500 text-sm mt-1">
              This field is required
            </span>
          )}
        </div>

        {/* Who Is Paying Field */}
        <div className="flex flex-col">
          <label
            htmlFor="whoIsPaying"
            className="text-lg font-medium text-gray-700"
          >
            Who is paying
          </label>
          <select
            id="whoIsPaying"
            {...register("whoIsPaying", { required: true })}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="you">You</option>
            <option value="friend">Friend</option>
          </select>
          {errors.whoIsPaying && (
            <span className="text-red-500 text-sm mt-1">
              This field is required
            </span>
          )}
        </div>

        {/* Submit Button */}
        <Button className="mt-5" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default SplitBill;
