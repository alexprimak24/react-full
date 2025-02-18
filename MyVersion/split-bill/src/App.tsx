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
  const [selectedFriend, setSelectedFriend] = useState<string>();

  const handleSelectFriend = (friendName: string) => {
    setSelectedFriend(friendName);
  };

  return (
    <div className='flex gap-20'>
      <div className='flex flex-col gap-5'>
        <FriendsList
          handleSelectFriend={handleSelectFriend}
          friendList={friendList}
          selectedFriend={selectedFriend!}
        />
        <AddFriend friendList={friendList} setFriendList={setFriendList} />
      </div>
      <SplitBill
        key={selectedFriend}
        selectedFriend={selectedFriend!}
        setFriendList={setFriendList}
      />
    </div>
  );
}

export default App;
