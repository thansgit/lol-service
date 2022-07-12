import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from 'react-redux';
import { categoryCreateAction } from "../../redux/slices/category/categorySlice";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Navigate } from "react-router-dom";
import Footer from "../../utils/Footer";
import LoadingButton from "../../utils/LoadingButton";
import ErrorDisplay from "../../utils/ErrorDisplay";

const AddNewCategory = () => {

  const formSchema = Yup.object({
    title: Yup.string().required('Title is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: values => {
      dispatch(categoryCreateAction(values));
    },
    validationSchema: formSchema,
  });

  const dispatch = useDispatch();

  //Get data from store
  const state = useSelector(state => state?.category);
  const { loading, appErr, serverErr, isCreated } = state;

  //Navigate to category list after creating a category.
  if (isCreated) return <Navigate to='/category-list' />

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-custom-gray py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <BookOpenIcon className="mx-auto h-12 w-auto fill-white" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Add New Category
            </h2>
              <p className="mt-2 text-sm text-center font-medium text-custom-green">
                These are the categories user will select when creating a post
              </p>
                {appErr || serverErr ? <ErrorDisplay first={serverErr} second={appErr} /> : null}
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
                  className="appearance-none relative block w-full px-3 py-2 border
                   border-gray-300 placeholder-gray-500 text-black rounded-md text-center focus:z-10 sm:text-sm"
                  placeholder="New Category"
                />
                <ErrorDisplay first={formik.touched.title} second={formik.errors.title} />
              </div>
            </div>

            <div>
              <div>
                {/* Submit */}
                {loading ?
                  <LoadingButton />
                  : <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4
                      text-sm font-medium rounded-md text-white
                      bg-custom-blue hover:bg-indigo-700"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <PlusCircleIcon
                        className="h-5 w-5 text-white hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Add new Category
                  </button>}

              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddNewCategory;
