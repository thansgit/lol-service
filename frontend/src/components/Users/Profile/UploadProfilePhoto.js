import { useDispatch, useSelector } from "react-redux";
import { UploadIcon } from "@heroicons/react/outline";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { userUploadProfilePhotoAction } from "../../../redux/slices/users/usersSlices";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../../../utils/Footer";
import ErrorDisplay from "../../../utils/ErrorDisplay";
import LoadingButton from "../../../utils/LoadingButton";
import DropZoneComponent from "../../../utils/DropZoneComponent";
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
  const navigate = useNavigate();

  //formik
  const formik = useFormik({
    initialValues: {
      image: "",
    },
    onSubmit: values => {
      dispatch(userUploadProfilePhotoAction(values));
      navigate(-1)
    },
    validationSchema: formSchema,
  });

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
          <p className="text-md font-medium mt-4 text-custom-yellow text-center">Showcase your personality </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-custom-gray-light py-8 px-4 shadow sm:rounded-lg sm:px-10 border-2 border-custom-yellow">
            <form className="space-y-6" onSubmit={formik?.handleSubmit}>
              {/* Display err here */}
              {appErr || serverErr ?
                <ErrorDisplay first={appErr} second={serverErr} /> :
                null}

              <DropZoneComponent setFieldValue={formik?.setFieldValue} />
              {/* Image container here thus Dropzone */}
              {/* <Container className="">
                <Dropzone
                  onBlur={formik.handleBlur("image")}
                  maxFiles={1}
                  maxSize={1}
                  accept="image/jpeg, image/png"
                  onDrop={acceptedFiles => {
                    formik.setFieldValue("image", acceptedFiles[0]);
                  }}
                  >
                  {({ getRootProps, getInputProps, isDragReject }) => (
                    <section>
                      <div
                        {...getRootProps({
                          className: "dropzone",
                          onDrop: event => event.stopPropagation(),
                        })}
                        >
                        <input {...getInputProps()} />
                        <p className="text-black text-lg cursor-pointer hover:text-gray-500">
                          Click here to select image
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Container> */}
              <ErrorDisplay first={formik?.errors?.image} second={appErr} />
              <p className="text-sm text-white">
                PNG, JPG or GIF. Maximum size 1mb. Upload only 1 image
              </p>

              <div>
                {loading ? <LoadingButton /> ?
                appErr : <LoadingButton />

                  : <button
                    type="submit"
                    className="inline-flex justify-center text-white w-full px-4 py-2  shadow-sm text-sm font-medium rounded-md bg-custom-blue hover:bg-indigo-700"
                  >
                    <UploadIcon
                      className="-ml-1 mr-2 h-5"
                      aria-hidden="true"
                    />
                    Upload Photo
                  </button>}
              </div>
            </form>
          </div>
        </div>
      </div >
      <Footer />
    </>
  );
}
