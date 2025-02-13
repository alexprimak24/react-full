import React, { useState } from "react";
import "./App.css";
import FriendsList from "./components/FriendsList";
import AddFriend from "./components/AddFriend";
import SplitBill from "./components/SplitBill";
import { friendsList } from "./constants/friendList";
import { useLocalStorage } from "usehooks-ts";

function App() {
  const [friendList, setFriendList] = useLocalStorage(
    "friendList",
    friendsList
  );
  // This state holds the name of the currently selected friend
  const [selectedFriend, setSelectedFriend] = useState<string>();

  // This callback will be passed to each Friend component
  const handleSelectFriend = (friendName: string) => {
    setSelectedFriend(friendName);
    // You can also add any additional logic here that depends on the selected friend
    console.log(`Selected friend: ${friendName}`);
  };

  return (
    <div className="flex gap-20">
      <div className="flex flex-col gap-5">
        <FriendsList
          handleSelectFriend={handleSelectFriend}
          friendList={friendList}
        />
        <AddFriend friendList={friendList} setFriendList={setFriendList} />
      </div>
      <SplitBill
        selectedFriend={selectedFriend!}
        setFriendList={setFriendList}
      />
    </div>
  );
}

export default App;
