import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFetchAllProfilesAction } from "../../../redux/slices/users/usersSlices";
import LoadingComponent from "../../../utils/LoadingComponent";
import Footer from "../../../utils/Footer";
import UsersListItem from "./UsersListItem";
import ErrorDisplay from "../../../utils/ErrorDisplay";

const UsersList = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.users);
  const { allProfiles, appErr, serverErr, loading, blocked, unblocked } = user;


  useEffect(() => {
    dispatch(userFetchAllProfilesAction())
  }, [dispatch, blocked, unblocked])

  return (
    <>
      <section className="py-8 bg-custom-gray min-h-screen">
        {loading ? <LoadingComponent />
          : appErr || serverErr ? <ErrorDisplay first={serverErr} second={appErr} />
            : allProfiles?.length <= 0 ? <ErrorDisplay first="No profiles found..." />
              : allProfiles?.map(profile => (
                <div key={profile._id}>
                  <UsersListItem user={profile} />
                </div>
              ))}
      </section>
      <Footer />
    </>
  );
};

export default UsersList;

//Make action to make call to api to fetch all users