import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";
import AccountVerificationAlertWarning from "./Alerts/AccountVerificationAlertWarning";
import AccountVerificationAlertSuccess from "./Alerts/AccountVerificationAlertSuccess";

const Navbar = () => {
  //Get user from store
  const state = useSelector(state => state.users);
  const { userAuth, profile } = state;
  const isAdmin = userAuth?.isAdmin;


  return (
    <>
      {isAdmin ? <AdminNavbar isLoggedIn={userAuth} /> :
        userAuth ? <PrivateNavbar isLoggedIn={userAuth} /> :
          <PublicNavbar />}
      {/* Alert */}
      {!profile?.isAccountVerified && <AccountVerificationAlertWarning />}
    </>
  );
};

export default Navbar;
