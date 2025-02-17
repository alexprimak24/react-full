import React, { useState } from "react";
import Friend from "./Friend";
import { friendDetails } from "../constants/friendList";

function FriendsList({
  handleSelectFriend,
  friendList,
}: {
  handleSelectFriend: (friendName: string) => void;
  friendList: { [key: string]: friendDetails };
}) {
  return (
    <>
      {Object.entries(friendList).map(([name, details]) => (
        <Friend
          key={details.pfp}
          friendDetails={details}
          friendName={name}
          handleSelectFriend={handleSelectFriend}
        />
      ))}
    </>
  );
}

export default FriendsList;
