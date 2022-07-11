import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { emailSendAction } from "../../../redux/slices/email/emailSlices";
import Footer from "../../General/Footer";
import ErrorDisplay from "../../../utils/ErrorDisplay";
import LoadingButton from "../../../utils/LoadingButton";
//Form schema
const formSchema = Yup.object({
  toEmail: Yup.string().required("Recipent Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});
const SendEmail = () => {
  //dispath
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //formik
  const formik = useFormik({
    initialValues: {
      toEmail: id,
      subject: "",
      message: "",
    },
    onSubmit: values => {
      //dispatch the action
      dispatch(emailSendAction(values));
    },
    validationSchema: formSchema,
  });

  const email = useSelector(state => state?.email);
  const { isEmailSent, loading, appErr, serverErr } = email;

  //Navigate to last visited route
  if (isEmailSent) return navigate(-1);

  return (
    <>
      <div className="min-h-screen bg-custom-gray flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Send message
          </h2>

          <p className="mt-2 text-center text-lg text-custom-red">
            {serverErr || appErr ? <ErrorDisplay first={appErr} second={serverErr} /> : null}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-custom-gray-light border-2 border-custom-yellow py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Recipient Email
                </label>
                {/* Email message */}
                <div className="mt-1">
                  <input
                    value={formik.values.toEmail}
                    onChange={formik.handleChange("toEmail")}
                    onBlur={formik.handleBlur("toEmail")}
                    disabled
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="appearance-none block w-full px-3 py-2 border bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder-white focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <ErrorDisplay first={formik.touched.toEmail} second={formik.errors.toEmail} />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Subject
                </label>
                <div className="mt-1">
                  {/* Subject */}
                  <input
                    value={formik.values.subject}
                    onChange={formik.handleChange("subject")}
                    onBlur={formik.handleBlur("subject")}
                    id="subject"
                    name="subject"
                    type="text"
                    autoComplete="subject"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <ErrorDisplay first={formik.touched.subject} second={formik.errors.subject} />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Message
                </label>
                {/* email message */}
                <textarea
                  value={formik.values.message}
                  onChange={formik.handleChange("message")}
                  onBlur={formik.handleBlur("message")}
                  rows="5"
                  cols="10"
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-black bg-white  border border-gray-200 "
                  type="text"
                ></textarea>
                <ErrorDisplay first={formik.touched.message} second={formik.errors.message} />
              </div>
              {/* Submit btn */}
              <div>
                {loading ?
                  <LoadingButton />
                  :
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent
                     rounded-md shadow-sm text-sm font-medium text-white bg-custom-blue hover:bg-indigo-700"
                  >
                    Send email
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

export default SendEmail;
