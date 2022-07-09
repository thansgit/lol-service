import { useDispatch, useSelector } from "react-redux";
import { UploadIcon } from "@heroicons/react/outline";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { userUploadProfilePhotoAction } from "../../../redux/slices/users/usersSlices";
import { Navigate } from "react-router-dom";
import Footer from "../../General/Footer";
//Css for dropzone
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const formSchema = Yup.object({
  image: Yup.string().required("Image is required"),
});

export default function UploadProfilePhoto() {

  const dispatch = useDispatch();


  //formik
  const formik = useFormik({
    initialValues: {
      image: "",
    },
    onSubmit: values => {
      dispatch(userUploadProfilePhotoAction(values));
    },
    validationSchema: formSchema,
  });

  //Store data
  const users = useSelector(state => state.users);
  const { profilePhoto, loading, appErr, serverErr, userAuth } = users;

  if (profilePhoto) return <Navigate to={`/profile/${userAuth?._id}`} />

  return (
    <>
    <div className="min-h-screen bg-custom-gray flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Upload profile photo
        </h2>

      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {/* Display err here */}
            {appErr || serverErr ?
              <h2 className="text center text-custom-red" >{serverErr} - {appErr}</h2> :
              null}
            {/* Image container here thus Dropzone */}
            <Container className="">
              <Dropzone
                onBlur={formik.handleBlur("image")}
                accept="image/jpeg, image/png"
                onDrop={acceptedFiles => {
                  formik.setFieldValue("image", acceptedFiles[0]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="container">
                    <div
                      {...getRootProps({
                        className: "dropzone",
                        onDrop: event => event.stopPropagation(),
                      })}
                    >
                      <input {...getInputProps()} />
                      <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                        Click here to select image
                      </p>
                    </div>
                  </div>
                )}
              </Dropzone>
            </Container>

            <div className="text-custom-red">
              {formik.touched.image && formik.errors.image}
            </div>
            <p className="text-sm text-gray-500">
              PNG, JPG or GIF. Minimum size 400kb. Upload only 1 image
            </p>

            <div>
              {loading ? <button
                disabled
                className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-500"
              >
                <UploadIcon
                  className="-ml-1 mr-2 h-5  text-gray-400"
                  aria-hidden="true"
                />
                <span>Loading...</span>
              </button> : <button
                type="submit"
                className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <UploadIcon
                  className="-ml-1 mr-2 h-5  text-gray-400"
                  aria-hidden="true"
                />
                <span>Upload Photo</span>
              </button>}
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
