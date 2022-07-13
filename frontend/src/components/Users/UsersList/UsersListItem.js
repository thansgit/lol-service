import React from "react";
import { Link } from "react-router-dom";
import { MailIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { userBlockAction, userUnblockAction } from "../../../redux/slices/users/usersSlices";


const UsersListItem = user => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="p-8 mb-4 bg-custom-gray-light shadow rounded">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0">
            <img
              className="w-10 h-10 mr-4 object-cover rounded-full"
              src={user?.user?.profilePhoto}
              alt="profile "
            />
            <div>
              <p className="text-sm font-medium text-custom-yellow">{user?.user?.nickName}</p>
              <p className="text-xs text-white">{user?.user?.email}</p>
            </div>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="py-1 px-2 text-xs text-white font-bold text-center bg-custom-yellow rounded-full">
              {user?.user?.accountType}
            </p>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="text-sm font-medium text-white">
              <span className="text-base mr-2  text-bold text-custom-yellow">
                {user.user?.followers?.length}
              </span>
              Followers
            </p>
          </div>
          <div className="w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0">
            <p className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-xs">
              <span className="text-base mr-2 text-bold text-white">
                {user.user?.posts?.length} Posts
              </span>
            </p>
            <Link
              to={`/profile/${user?.user?._id}`}
              className=" text-white inline-block py-1 px-2 text-center align-center mr-2 mb-1 lg:mb-0 text-xs border-2 border-custom-yellow rounded hover:bg-yellow-700"
            >
              Profile
            </Link>

            {user?.user?.isBlocked ? (
              <button
                onClick={() => dispatch(userUnblockAction(user?.user?._id))}
                className="inline-block py-1 px-2 text-center bg-gray-500 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border-2 border-custom-yellow rounded"
              >
                Unblock
              </button>
            ) : (
              <button
                onClick={() => dispatch(userBlockAction(user?.user?._id))}
                className="inline-block py-1 px-2 text-center bg-custom-red text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border-2 border-custom-yellow rounded"
              >
                Block
              </button>
            )}

            <Link
              to={`/send-email/${user?.user?.email}`}
              className="inline-flex  justify-center bg-custom-blue px-2   border-2 border-custom-yellow shadow-sm text-sm font-medium rounded-md text-white  hover:bg-blue-600"
            >
              <MailIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                aria-hidden="true"
              />
              <span className="text-base mr-2  text-bold text-white">
                Message
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersListItem;
