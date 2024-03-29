import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { commentUpdateAction, commentFetchSingleAction } from "../../redux/slices/comments/commentSlices";
import { useNavigate, useParams } from "react-router-dom";
import ErrorDisplay from "../../utils/ErrorDisplay";
//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const UpdateComment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commentFetchSingleAction(id));
  }, [dispatch, id])

  const comment = useSelector(state => state?.comment);
  const { commentFetched } = comment;


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: commentFetched?.description,
    },
    onSubmit: values => {
      const data = {
        id,
        description: values?.description,
      };
      dispatch(commentUpdateAction(data));
    },
    validationSchema: formSchema,
  });


  return (
    <>
      <div className="h-screen bg-custom-gray flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <form
            onSubmit={formik.handleSubmit}
            className="mt-1 flex max-w-sm m-auto"
          >
            <textarea
              onBlur={formik.handleBlur("description")}
              value={formik.values.description}
              onChange={formik.handleChange("description")}
              type="text"
              name="text"
              id="text"
              className="shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 rounded-md"
              placeholder="Add New comment"
            />

            <button
              onClick={() => navigate(-1)}
              type="submit"
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-custom-blue hover:bg-indigo-700"
            >
              Submit
            </button>
          </form>
          <ErrorDisplay first={formik.touched.description} second={formik.errors.description} />
        </div>
      </div>
    </>
  );
};

export default UpdateComment;
