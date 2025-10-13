import React from "react";

export default function AccountDeletion() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-6">
          Agrieldo Account and Data Deletion
        </h1>

        <p className="text-gray-700 mb-6">
          If you would like to delete your Agrieldo account and associated data,
          please follow the steps below.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#333333] mb-3">
            How to Request Deletion
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Log in to the Agrieldo app or website.</li>
            <li>
              Go to <strong>Settings &gt; Account &gt; Delete Account</strong>.
            </li>
            <li>
              Alternatively, you can send a deletion request to{" "}
              <a
                href="mailto:support@agrieldo.com"
                className="text-[#ffa500] font-medium underline"
              >
                support@agrieldo.com
              </a>{" "}
              from the email associated with your account.
            </li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#333333] mb-3">
            What Data Will Be Deleted
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Your account details (name, email, phone number).</li>
            <li>
              Farm records associated with your account (animals, production,
              inventory, etc.).
            </li>
            <li>Any other personal data stored in your profile.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#333333] mb-3">
            What Data May Be Retained
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Financial transactions (invoices, receipts, quotations) may be
              retained for <strong>X months/years</strong> to comply with legal
              and tax requirements.
            </li>
            <li>
              Aggregated, anonymized data (which cannot identify you) may be
              kept for analytics and system improvements.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#333333] mb-3">
            Confirmation
          </h2>
          <p className="text-gray-700">
            Once your account is deleted, you will receive an email
            confirmation.
          </p>
        </section>

        <div className="mt-8 p-4 bg-[#ffa500]/10 border border-[#ffa500] rounded-lg">
          <p className="text-gray-800">
            For further assistance, contact us at{" "}
            <a
              href="mailto:support@agrieldo.com"
              className="text-[#ffa500] font-medium underline"
            >
              support@agrieldo.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
