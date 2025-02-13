import React, { useState } from "react";
import { friendDetails } from "../constants/friendList";
import Button from "./ui/Button";

enum BtnText {
  Close = "close",
  Select = "select",
}

function Friend({
  friendDetails,
  friendName,
  handleSelectFriend,
}: {
  friendDetails: friendDetails;
  friendName: string;
  handleSelectFriend: (friendName: string) => void;
}) {
  const [btnText, setBtnText] = useState<BtnText>(BtnText.Select);

  const SelectFriend = () => {
    setBtnText((prevText) =>
      prevText === BtnText.Select ? BtnText.Close : BtnText.Select
    );
    handleSelectFriend(friendName);
  };

  return (
    <div className="flex items-center gap-6 p-4 bg-white rounded-lg shadow-lg transition-transform hover:scale-105">
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        <img
          src={friendDetails.pfp}
          alt="Profile of Friend"
          className="rounded-full w-24 h-24 border-4 border-indigo-500"
        />
      </div>

      {/* Friend Details */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-gray-800">{friendName}</h2>
        <p
          className={`text-lg ${
            friendDetails.amount < 0
              ? "text-red-500"
              : friendDetails.amount > 0
              ? "text-green-600"
              : "text-gray-600"
          }`}
        >
          {friendDetails.amount < 0
            ? `You owe ${friendName} $${Math.abs(friendDetails.amount)}`
            : friendDetails.amount > 0
            ? `${friendName} owes you $${friendDetails.amount}`
            : `You and ${friendName} are even`}
        </p>
      </div>

      {/* Action Button */}
      <div className="ml-auto">
        <Button
          onClick={SelectFriend}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition-colors"
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
}

export default Friend;
