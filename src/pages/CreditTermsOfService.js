import React, { useRef } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Agrieldo Credit Terms of Service Page
 * - Brand colors: #ffa500 (orange), #333333 (dark grey)
 * - Sections requested by user
 * - CTA + Footer
 * - PDF Download using html2canvas + jsPDF
 */

export default function CreditTermsPage() {
  const contentRef = useRef();

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    // Clone the content to avoid capturing buttons
    const clone = contentRef.current.cloneNode(true);

    // Remove all elements with class 'no-print'
    clone.querySelectorAll(".no-print").forEach((el) => el.remove());

    // Temporarily attach to DOM to render properly
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Agrieldo-Credit-Terms.pdf");

    // Remove clone from DOM
    document.body.removeChild(clone);
  };

  const Section = ({ id, title, children }) => (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-md p-6 md:p-8"
      style={{ scrollMarginTop: "6rem" }}
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-[#333333] mb-4 flex items-center gap-3 relative">
        <span
          className="inline-block w-2 h-6 rounded-full"
          style={{ backgroundColor: "#ffa500", zIndex: 0 }}
        />
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed text-base md:text-lg">
        {children}
      </div>
    </motion.section>
  );

  return (
    <div ref={contentRef} className="min-h-screen bg-gray-50">
      {/* Print styles */}
      <style>
        {`
          @media print {
            .no-print { display: none !important; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .print-container { box-shadow: none !important; }
          }
        `}
      </style>

      {/* Hero / Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10" aria-hidden>
          <div
            className="absolute -top-16 -right-16 w-96 h-96 rounded-full -z-20"
            style={{
              background:
                "radial-gradient(circle, #ffa500 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-[28rem] h-[28rem] rounded-full -z-20"
            style={{
              background:
                "radial-gradient(circle, #333333 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 pt-10 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="print-container bg-white/80 backdrop-blur rounded-2xl shadow-md p-6 md:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#333333]">
                  Credit Terms of Service
                </h1>
                <p className="mt-2 text-gray-700 md:text-lg">
                  Understand the terms and conditions for accessing and using
                  Agrieldo Credit Services.
                </p>
              </div>
              <button
                onClick={handleDownloadPDF}
                className="no-print inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow-sm border border-gray-200 hover:shadow transition"
                style={{ backgroundColor: "#ffa500", color: "white" }}
                aria-label="Download PDF"
                title="Download a PDF copy"
              >
                {/* Download icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 3a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L11 12.586V4a1 1 0 011-1z" />
                  <path d="M5 20a2 2 0 01-2-2v-3a1 1 0 112 0v3h14v-3a1 1 0 112 0v3a2 2 0 01-2 2H5z" />
                </svg>
                Download PDF
              </button>
            </div>

            {/* Quick nav (anchors) */}
            <nav className="no-print mt-4 md:mt-6 text-sm md:text-base">
              <ul className="flex flex-wrap gap-3 md:gap-4 list-none">
                {[
                  ["eligibility", "Eligibility"],
                  ["interest-fees", "Interest & Fees"],
                  ["default-penalties", "Default & Penalties"],
                  ["termination", "Termination"],
                  ["dispute-resolution", "Dispute Resolution"],
                  ["changes", "Changes to Terms"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="inline-block rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition"
                      style={{ color: "#333333" }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12 grid gap-6 md:gap-8">
        <Section
          id="eligibility"
          title="Eligibility – Who Qualifies for Credit"
        >
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Applicants must be registered farmers or agribusinesses operating
              within supported regions.
            </li>
            <li>
              Valid identification and contact details are required (e.g.,
              national ID, phone number, farm address).
            </li>
            <li>Must maintain an active Agrieldo account in good standing.</li>
            <li>
              Subject to a basic credit assessment, including farm production
              history and transaction behavior on Agrieldo.
            </li>
            <li>
              Eligibility criteria may vary by product, location, or regulatory
              requirements.
            </li>
          </ul>
        </Section>

        <Section id="interest-fees" title="Interest & Fees">
          <p className="mb-4">
            Credit may attract interest and/or service fees based on the credit
            product, tenor, and risk profile. All applicable charges will be
            disclosed before you accept the offer.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Interest:</span> Calculated on
              outstanding balances for the agreed term.
            </li>
            <li>
              <span className="font-medium">Service/Processing Fee:</span> May
              apply at disbursement or on each service order.
            </li>
            <li>
              <span className="font-medium">Late Payment Fee:</span> Applied to
              overdue amounts beyond the due date.
            </li>
            <li>
              <span className="font-medium">Taxes:</span> Government
              taxes/levies (if any) are borne by the borrower.
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            Note: Specific rates and fee amounts will be displayed during
            checkout or in your credit offer summary.
          </p>
        </Section>

        <Section id="default-penalties" title="Default & Penalties">
          <p className="mb-4">
            If repayment is not made by the due date, the following may apply:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Accrual of late payment fees and/or additional interest on overdue
              amounts.
            </li>
            <li>
              Temporary suspension of credit access or service bookings until
              arrears are cleared.
            </li>
            <li>
              Collection actions, which may include reminders, follow-up calls,
              or engagement of licensed collection partners.
            </li>
            <li>
              Reporting of delinquency to relevant credit information
              authorities as allowed by law.
            </li>
            <li>
              Legal remedies to recover outstanding balances where necessary.
            </li>
          </ul>
        </Section>

        <Section id="termination" title="Termination">
          <p className="mb-4">
            Agrieldo may suspend or cancel credit access at any time, including
            (but not limited to) when:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              There is a breach of these Terms or any agreement related to the
              credit facility.
            </li>
            <li>Fraudulent, misleading, or unlawful activity is suspected.</li>
            <li>
              There is prolonged inactivity, significant risk changes, or
              failure to meet eligibility criteria.
            </li>
            <li>Required information is withheld or cannot be verified.</li>
            <li>
              Regulatory, risk, or operational considerations require suspension
              or closure.
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            Where possible, we will provide notice of termination or suspension
            and any steps to reinstate access.
          </p>
        </Section>

        <Section id="dispute-resolution" title="Dispute Resolution">
          <p className="mb-4">
            We aim to resolve disputes fairly and promptly.
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <span className="font-medium">Contact Support:</span> Start by
              contacting Agrieldo Support with details of the issue and any
              supporting evidence.
            </li>
            <li>
              <span className="font-medium">Internal Review:</span> We will
              review and respond within a reasonable timeframe, proposing a
              resolution where applicable.
            </li>
            <li>
              <span className="font-medium">Escalation:</span> If unresolved,
              you may escalate in writing. We may refer the matter to
              independent mediation or a competent authority in your
              jurisdiction, where required.
            </li>
          </ol>
          <p className="mt-4 text-sm text-gray-600">
            This process does not limit your statutory rights or access to
            regulatory complaint channels.
          </p>
        </Section>

        <Section id="changes" title="Changes to Terms">
          <p>
            Agrieldo may update these Terms from time to time to reflect
            regulatory changes, product updates, or risk considerations. We will
            notify you of material changes through in-app notices, email, or our
            website. Continued use of credit services after notice constitutes
            acceptance of the updated Terms.
          </p>
        </Section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-[#333333]">
              Need more details? Contact our support team.
            </h3>
            <p className="text-gray-600 mt-1">
              We’re here to help with eligibility, rates, and repayments.
            </p>
          </div>
          <a
            href="/contact"
            className="no-print inline-flex items-center justify-center px-5 py-3 rounded-2xl font-medium shadow-sm hover:shadow transition"
            style={{ backgroundColor: "#ffa500", color: "white" }}
          >
            Contact Us
          </a>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-8 md:mt-12 border-t">
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 text-sm text-gray-600">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-2xl">
              Disclaimer: This page provides general terms for Agrieldo credit
              services and does not constitute financial advice. Specific offers
              may include additional terms.
            </p>
            <nav className="flex items-center gap-4">
              <a
                href="/privacy"
                className="hover:underline"
                style={{ color: "#333333" }}
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:underline"
                style={{ color: "#333333" }}
              >
                General Terms of Service
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
