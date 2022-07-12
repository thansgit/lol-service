import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import {
  categoryFetchAction,
  categoryUpdateAction,
  categoryDeleteAction
} from "../../redux/slices/category/categorySlice";
import ErrorDisplay from "../../utils/ErrorDisplay";
import LoadingButton from "../../utils/LoadingButton";



const UpdateCategory = () => {

  //Get id from params
  const { id } = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(categoryFetchAction(id))
  }, [dispatch, id]);

  const formSchema = Yup.object({
    title: Yup.string().required('Title is required'),
  });

  //Get data from store
  const state = useSelector(state => state?.category);
  const { loading, appErr, serverErr, category, isUpdated, isDeleted } = state;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: category?.title,
    },
    onSubmit: values => {
      dispatch(categoryUpdateAction({ title: values.title, id }));
    },
    validationSchema: formSchema,
  });


  //Navigate
  if (isUpdated || isDeleted) return <Navigate to='/category-list' />

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto fill-white" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Update category
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-custom-yellow">
              These are the categories user will select when creating a post
            </p>
            {/* Error message */}
            <div>
              {appErr || serverErr ? <ErrorDisplay serverErr={serverErr} appErr={appErr} /> : null}
            </div>
          </p>
        </div>
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
                value={formik.values.title}
                onChange={formik.handleChange('title')}
                onBlur={formik.handleBlur('title')}
                type="text"
                autoComplete="text"
                className=" relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-custom-gray rounded-md text-center sm:text-sm"
                placeholder="Update category name"
              />
              <ErrorDisplay first={formik.touched.title} second={formik.errors.title} />
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? <LoadingButton />
                :
                <>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-custom-blue hover:bg-indigo-700"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <PlusCircleIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    Update category
                  </button>
                  <button
                    onClick={() => dispatch(categoryDeleteAction(id))}
                    type="submit"
                    className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-custom-red hover:bg-rose-700"
                  >
                    Delete category
                  </button>
                </>
              }

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
