import React from "react";

const documents = [
  {
    title: "Sale Deed",
    description:
      "The Sale Deed is the most important legal document that proves the transfer of ownership from the seller to the buyer.",
  },
  {
    title: "Title Deed",
    description:
      "This document confirms the legal ownership of the property and ensures that the seller has the right to sell it.",
  },
  {
    title: "Encumbrance Certificate",
    description:
      "An Encumbrance Certificate verifies that the property is free from legal dues, loans, or liabilities.",
  },
  {
    title: "RERA Approval",
    description:
      "RERA registration ensures that the project complies with legal and regulatory requirements set by authorities.",
  },
  {
    title: "Approved Building Plan",
    description:
      "Issued by the local municipal authority, this confirms that the construction follows approved layouts and regulations.",
  },
  {
    title: "Completion / Occupancy Certificate",
    description:
      "This certificate confirms that the building has been constructed according to approved plans and is fit for occupancy.",
  },
  {
    title: "Property Tax Receipts",
    description:
      "These receipts confirm that property taxes have been paid and there are no outstanding dues.",
  },
  {
    title: "Khata / Patta Certificate",
    description:
      "This document is used to record property details in municipal records and is required for utilities and resale.",
  },
];

export default function LegalDocumentation() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 animate-in fade-in duration-700">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Legal Documentation
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Understanding legal documents is essential before buying a property.
          Below is a list of key documents you should always verify to ensure a
          safe and transparent transaction.
        </p>
      </div>

      {/* Documents Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-6 
              hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {doc.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {doc.description}
            </p>
          </div>
        ))}
      </div>

      {/* Important Note */}
      <div className="mt-16 rounded-2xl bg-gray-50 border border-gray-200 p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          Important Note
        </h3>
        <p className="text-gray-700 leading-relaxed">
          While we strive to list verified properties, buyers are strongly advised
          to independently verify all legal documents and consult a qualified
          legal professional before making any financial commitment.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Need help understanding these documents?
        </h3>
        <p className="text-gray-600 mb-6">
          Our team can guide you through the legal verification process.
        </p>
        <button
          className="inline-flex items-center justify-center px-8 py-4 
            rounded-2xl bg-gray-900 text-white font-bold text-lg 
            hover:bg-black transition active:scale-[0.98]"
        >
          Contact Legal Support
        </button>
      </div>
    </div>
  );
}
