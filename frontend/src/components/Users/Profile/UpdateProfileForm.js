import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { userFetchProfileAction, userUpdateAction } from "../../../redux/slices/users/usersSlices";
import LoadingButton from "../../../utils/LoadingButton";
import ErrorDisplay from "../../../utils/ErrorDisplay";
import Footer from "../../../utils/Footer";
//Form schema
const formSchema = Yup.object({
  nickName: Yup.string().required("Nickname is required"),
  email: Yup.string().required("Email is required"),
  bio: Yup.string().required("Bio is required"),
});

const UpdateProfileForm = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(userFetchProfileAction(id));
  }
    , [dispatch, id])
  const user = useSelector(state => state.users);
  const { profile, userIsUpdated, loading, appErr, serverErr } = user;
  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nickName: profile?.nickName,
      email: profile?.email,
      bio: profile?.bio,
    },
    onSubmit: values => {
      //dispatch the action
      dispatch(userUpdateAction(values));
    },
    validationSchema: formSchema,
  });

  if (userIsUpdated) return <Navigate to={`/profile/${id}`} />

  return (
    <>
      <div className="min-h-screen bg-custom-gray flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Update your profile, <br />
            <span className="text-custom-yellow text-md">{profile?.nickName}</span>?
          </h3>
          {/* Error */}
          {serverErr || appErr ? <ErrorDisplay first={appErr} second={serverErr} /> : null}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-custom-gray-light py-8 px-4 shadow sm:rounded-lg sm:px-10 border-2 border-custom-yellow">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Nickname
                </label>
                <div className="mt-1">
                  {/* First name */}
                  <input
                    value={formik.values.nickName}
                    onChange={formik.handleChange("nickName")}
                    onBlur={formik.handleBlur("nickName")}
                    id="nickName"
                    name="nickName"
                    type="text"
                    autoComplete="nickName"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <ErrorDisplay first={formik.touched.nickName} second={formik.errors.nickName} />

              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email
                </label>
                <div className="mt-1">
                  {/* Email */}
                  <input
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <ErrorDisplay first={formik.touched.email} second={formik.errors.email} />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-white"
                >
                  Bio
                </label>
                <textarea
                  value={formik.values.bio}
                  onChange={formik.handleChange("bio")}
                  onBlur={formik.handleBlur("bio")}
                  rows="5"
                  cols="10"
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-black "
                  type="text"
                ></textarea>
                {/* Err msg */}
                <ErrorDisplay first={formik.touched.bio} second={formik.errors.bio} />
              </div>
              <div>
                {/* submit btn */}
                {loading ? <LoadingButton /> : <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent
                 rounded-md shadow-sm text-sm font-medium text-white
                bg-custom-blue hover:bg-indigo-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateProfileForm;
