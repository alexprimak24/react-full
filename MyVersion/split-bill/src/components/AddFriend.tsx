import React, { useEffect, useState } from "react";
import { friendDetails } from "../constants/friendList";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./ui/Button";

type FormFields = {
  friendsName: string;
  pfpUrl: string;
};

function AddFriend({
  friendList,
  setFriendList,
}: {
  friendList: { [key: string]: friendDetails };
  setFriendList: React.Dispatch<
    React.SetStateAction<{
      [key: string]: friendDetails;
    }>
  >;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>();

  const [addFriendFormActive, setAddFriendFormActive] = useState(false);

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    // Object.keys returns keys of my object
    // Some checks if any of the values in the returned array satisfy some requirement
    const isDuplicate = Object.keys(friendList).some(
      (name) => name === data.friendsName
    );
    console.log(isDuplicate);

    if (isDuplicate) {
      alert("This friend already exist");
      return;
    }

    setFriendList((prevFriendList) => ({
      ...prevFriendList,
      [data.friendsName]: { amount: 0, pfp: data.pfpUrl },
    }));
    // localStorage.setItem = friendList.toString()

    setAddFriendFormActive(false);
    console.log(friendList);
  };

  const LoadWaifu = async (requestUrl: string) => {
    fetch(requestUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Request failed with status code: " + response.status
          );
        }
      })
      .then((data) => {
        // Process the response data as needed
        setValue("pfpUrl", data.images[0].url);
      })
      .catch((error) => {
        console.error("An error occurred:", error.message);
      });
  };
  const handleOpenForm = () => {
    LoadWaifu("https://api.waifu.im/search");
    setAddFriendFormActive(true);
  };

  return (
    <>
      {addFriendFormActive ? (
        <div className=''>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'
          >
            <div className='flex flex-col gap-4'>
              {/* Name Field */}
              <div className='flex flex-col'>
                <label
                  htmlFor='friendsName'
                  className='text-lg font-medium text-gray-700'
                >
                  Enter Name
                </label>
                <input
                  id='friendsName'
                  type='text'
                  defaultValue='John'
                  {...register("friendsName", { required: true })}
                  className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                {errors.friendsName && (
                  <span className='text-red-500 text-sm mt-1'>
                    This field is required
                  </span>
                )}
              </div>

              {/* Pfp Url Field */}
              <div className='flex flex-col'>
                <label
                  htmlFor='pfpUrl'
                  className='text-lg font-medium text-gray-700'
                >
                  Pfp Url
                </label>
                <input
                  id='pfpUrl'
                  type='text'
                  {...register("pfpUrl", { required: true })}
                  disabled
                  className='p-2 border rounded-md bg-gray-100 cursor-not-allowed'
                />
                {errors.pfpUrl && (
                  <span className='text-red-500 text-sm mt-1'>
                    This field is required
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <Button type='submit' className='mt-4'>
                Submit
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button onClick={handleOpenForm}>Add Friend</Button>
      )}
    </>
  );
}

export default AddFriend;
