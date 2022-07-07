import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFetchAllProfilesAction } from "../../../redux/slices/users/usersSlices";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";


const UsersList = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userFetchAllProfilesAction())
  }, [dispatch])


  const user = useSelector(state => state.users);
  const { allProfiles, appErr, serverErr, loading } = user;
  console.log(allProfiles);

  return (
    <>
      <section class="py-8 bg-gray-900 min-h-screen">
        {loading ? <h1>Loading...</h1>
          : appErr || serverErr ? <h3>{appErr} - {serverErr}</h3>
            : allProfiles?.length <= 0 ? <h2>No profiles found...</h2>
              : allProfiles?.map(profile => (
                <>
                  <UsersListItem user={profile} />
                </>
              ))}
      </section>
    </>
  );
};

export default UsersList;

//Make action to make call to api to fetch all users