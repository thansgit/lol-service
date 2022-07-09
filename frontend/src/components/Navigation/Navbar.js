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
  const { userAuth } = state;
  const isAdmin = userAuth?.isAdmin;

  const verification = useSelector(state => state?.accountVerification);
  const { loading, appErr, serverErr, tokenSent } = verification;


  return (
    <>
      {isAdmin ? <AdminNavbar isLoggedIn={userAuth} /> :
        userAuth ? <PrivateNavbar isLoggedIn={userAuth} /> :
          <PublicNavbar />}
      {/* Alert */}
      {userAuth && !userAuth?.isAccountVerified && <AccountVerificationAlertWarning />}
      {loading && <h2 className="text-center bg-custom-green text-green-800">Loading...</h2>}
      {tokenSent && <AccountVerificationAlertSuccess />}
      {appErr || serverErr ? <h2 className="text-center text-custom-red">{serverErr} {appErr}</h2> : null}
    </>
  );
};

export default Navbar;
