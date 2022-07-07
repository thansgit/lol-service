/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function AccountVerificationAlertSuccess() {
  return (
    <div className="rounded-md bg-green-300 p-1">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-800"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">
            Account verification message sent to your email. Verify within <span className="text-rose-600">10</span> minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
