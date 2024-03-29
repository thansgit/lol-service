import React, { useEffect } from "react";
import { CheckIcon } from "@heroicons/react/outline";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { accountVerificationAction } from "../../../redux/slices/accountVerification/accountVerificationSlices";
import { userLogoutAction } from "../../../redux/slices/users/usersSlices";

export default function AccountVerified() {

  const dispatch = useDispatch();
  const { token } = useParams();

  useEffect(() => {
    dispatch(accountVerificationAction(token));
  }, [dispatch, token]);

  //store
  const accountVerification = useSelector(state => state.accountVerification);
  const { verified } = accountVerification;


  return (
    <>
      {verified ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-400">
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckIcon
                  className="h-6 w-6 text-custom-yellow"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <div
                  as="h3"
                  className="text-lg leading-6 font-medium text-custom-gray"
                >
                  Account Verified
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your account is now verified. Logout and login back to see
                    the changes
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                onClick={() => dispatch(userLogoutAction())}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-custom-blue text-base font-medium text-white hover:bg-indigo-700 sm:text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center bg-custom-gray items-center h-screen">
          <Link
            to="/"
            type="button"
            className="inline-flex justify-center  rounded-md border border-transparent shadow-sm px-4 py-2 bg-custom-blue text-base font-medium text-white hover:bg-indigo-700 sm:text-sm"
          >
            Go Home
          </Link>
        </div>
      )}
    </>
  );
}
