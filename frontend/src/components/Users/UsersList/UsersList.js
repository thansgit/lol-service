import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFetchAllProfilesAction } from "../../../redux/slices/users/usersSlices";
import LoadingComponent from "../../../utils/LoadingComponent";
import Footer from "../../General/Footer";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";

const UsersList = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.users);
  const { allProfiles, appErr, serverErr, loading, blocked, unblocked } = user;


  useEffect(() => {
    dispatch(userFetchAllProfilesAction())
  }, [dispatch, blocked, unblocked])


  console.log(allProfiles);

  return (
    <>
      <section class="py-8 bg-gray-900 min-h-screen">
        {loading ? <LoadingComponent />
          : appErr || serverErr ? <h3 className="text-rose-600 text-center text-lg">{appErr} - {serverErr}</h3>
            : allProfiles?.length <= 0 ? <h2>No profiles found...</h2>
              : allProfiles?.map(profile => (
                <>
                  <UsersListItem user={profile} />
                </>
              ))}
      </section>
      <Footer />
    </>
  );
};

export default UsersList;

//Make action to make call to api to fetch all users