import React, { useState } from "react";
import Friend from "./Friend";
import { friendDetails } from "../constants/friendList";

function FriendsList({
  handleSelectFriend,
  selectedFriend,
  friendList,
}: {
  handleSelectFriend: (friendName: string) => void;
  friendList: { [key: string]: friendDetails };
  selectedFriend: string;
}) {
  return (
    <>
      {Object.entries(friendList).map(([name, details]) => (
        <Friend
          key={details.pfp}
          friendName={name}
          friendDetails={details}
          isSelected={selectedFriend === name}
          handleSelectFriend={() => handleSelectFriend(name)}
        />
      ))}
    </>
  );
}

export default FriendsList;
