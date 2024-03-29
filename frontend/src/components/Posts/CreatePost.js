import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import * as Yup from 'yup';
import { postCreateAction } from "../../redux/slices/posts/postSlices";
import CategoryDropdown from "../Categories/CategoryDropdown";
import Footer from "../../utils/Footer";
import LoadingButton from "../../utils/LoadingButton";
import ErrorDisplay from "../../utils/ErrorDisplay";
import DropZoneComponent from "../../utils/DropZoneComponent";

const formSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.object().required('Category is required'),
  image: Yup.string().required('Image is required')
});

export default function CreatePost() {
  const dispatch = useDispatch();

  const post = useSelector(state => state.post);
  const { isCreated, loading, appErr, serverErr } = post;

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      image: '',
    },
    onSubmit: values => {
      const data = {
        category: values?.category?.label,
        title: values?.title,
        description: values?.description,
        image: values?.image,
      }
      dispatch(postCreateAction(data));
    },
    validationSchema: formSchema,
  });
  //Dropzone css
  const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: 'red';
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;


  //Navigate
  if (isCreated) return <Navigate to='/posts' />

  return (
    <>
      <div className="min-h-screen bg-custom-gray flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create Post
          </h2>

          <p className="font-medium text-lg text-custom-green text-center mt-2">
            Share your thoughts to the world.
          </p>

          {appErr || serverErr ? <ErrorDisplay first={appErr} second={serverErr} /> : null}

        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-custom-gray-light py-8 px-4 shadow sm:rounded-lg sm:px-10 border-2 border-custom-yellow">
            <form className="space-y-6" onSubmit={formik.handleSubmit} >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Title
                </label>
                <div className="mt-1">
                  {/* Title */}
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    onBlur={formik.handleBlur('title')}
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <ErrorDisplay first={formik?.touched?.title} second={formik?.errors?.title} />
              </div>
              {/* Category select */}
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Select a category
              </label>
              <CategoryDropdown
                value={formik.values.category?.label}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.category}
                touched={formik.touched.category}
              />
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Description
                </label>
                {/* Description */}
                <textarea
                  value={formik.values.description}
                  onChange={formik.handleChange('description')}
                  onBlur={formik.handleBlur('description')}
                  rows="5"
                  cols="10"
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-black  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                />
                <ErrorDisplay first={formik?.touched?.description} second={formik?.errors?.description} />
                {/* Image upload component */}
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white mt-5 mb-2"
                >
                  Select image to upload
                </label>
                {/* <Container >
                  <Dropzone
                    onDrop={(acceptedFiles) => { formik.setFieldValue('image', acceptedFiles[0]) }}
                    accept='image/jpeg, image/png'
                    onBlur={formik.handleBlur('image')}
                  >
                    {({ getRootProps, getInputProps }) => {
                      return (
                        <div className="container">
                          <div {...getRootProps({
                            className: 'dropzone',
                            onDrop: (e) => e.stopPropagation
                          })}>
                            <input {...getInputProps()} />
                            <p className="text-gray-400 text-lg cursor-pointer hover:text-gray-600">
                              Click to select image
                            </p>
                          </div>
                        </div>
                      )
                    }}
                  </Dropzone>
                </Container> */}
                <DropZoneComponent setFieldValue={formik.setFieldValue}/>
              </div>
              <div>
                {/* Submit btn */}
                {loading ?
                  <LoadingButton />
                  :
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md
                     shadow-sm text-sm font-medium text-white bg-custom-blue hover:bg-indigo-700"
                  >
                    Create
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
