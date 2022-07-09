
import { useDispatch } from 'react-redux'
import { ExclamationIcon } from "@heroicons/react/solid";
import { accountVerificationSendTokenAction } from "../../../redux/slices/accountVerification/accountVerificationSlices";

export default function AccountVerificationAlertWarning() {
  const dispatch = useDispatch();

  return (
    <div className="bg-custom-red border-l-4 border-yellow-400 p-1">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="h-5 w-5 text-yellow-500"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-200">
            Your account is not verified.{" "}
            <button
              onClick={() => dispatch(accountVerificationSendTokenAction())}
              className="font-medium underline text-green-200 hover:text-yellow-600">
              Click to verify
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
