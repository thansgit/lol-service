import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { commentCreateAction } from "../../redux/slices/comments/commentSlices";
import ErrorDisplay from "../../utils/ErrorDisplay";
import LoadingButton from "../../utils/LoadingButton";

//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const AddComment = ({ postId }) => {

  const dispatch = useDispatch();
  const comment = useSelector(state => state.comment);
  
  const { loading, appErr, serverErr } = comment;

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: values => {
      const data = {
        postId,
        description: values?.description,
      };
      dispatch(commentCreateAction(data));
    },
    validationSchema: formSchema,
  });
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Errors */}
      {serverErr || appErr ? <ErrorDisplay first={appErr} second={serverErr} /> : null}
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
          className="shadow-sm block w-full p-2 border-1 sm:text-sm rounded-md"
          placeholder="Add New comment"
        />
        {loading ?
          <LoadingButton />
          : <button
            type="submit"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-custom-blue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>}

      </form>
      <ErrorDisplay first={formik.touched.description} second={formik.errors.description} />
    </div>
  );
};

export default AddComment;
