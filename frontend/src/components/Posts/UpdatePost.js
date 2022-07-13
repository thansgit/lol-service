import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { postUpdateAction, postFetchSingleAction, postDeleteAction } from "../../redux/slices/posts/postSlices";
import CategoryDropdown from "../Categories/CategoryDropdown";
import ErrorDisplay from "../../utils/ErrorDisplay";
import LoadingButton from "../../utils/LoadingButton";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
});

export default function UpdatePost() {

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postFetchSingleAction(id));
  }, [dispatch, id]);

  const postData = useSelector(state => state.post);
  const { postDetails, loading, appErr, serverErr, isUpdated, isDeleted } = postData;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: postDetails?.title,
      description: postDetails?.description,
      category: ''
    },
    onSubmit: (values) => {
      const data = {
        title: values?.title,
        description: values?.description,
        category: values?.category?.label,
        id
      };
      dispatch(postUpdateAction(data));
    },
    validationSchema: formSchema,
  });

  console.log(isUpdated)
  if (isUpdated || isDeleted) return <Navigate to='/posts' />
  return (
    <>
      <div className="min-h-screen bg-custom-gray flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Are you sure you want to edit {<br />}
            <span className="text-custom-yellow text-md">{postDetails?.title}</span>
          </h2>
          {appErr || serverErr ? <ErrorDisplay first={appErr} second={serverErr} /> : null}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-custom-gray-light border-custom-yellow border-2 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    onBlur={formik.handleBlur("title")}
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <ErrorDisplay first={formik.touched.title} second={formik.errors.title} />
              </div>

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
                  className="block text-sm font-medium text-white"
                >
                  Description
                </label>
                <textarea
                  rows="5"
                  cols="10"
                  onBlur={formik.handleBlur("description")}
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-black border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                ></textarea>
                <ErrorDisplay first={formik.touched.description} second={formik.errors.description} />
              </div>

              <div>
                {loading ?
                  <LoadingButton /> :
                  <>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-custom-blue hover:bg-indigo-700"
                    >
                      Update category
                    </button>
                    <button
                      onClick={() => dispatch(postDeleteAction(id))}
                      type="submit"
                      className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-custom-red hover:bg-rose-700"
                    >
                      Delete category
                    </button>
                  </>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
