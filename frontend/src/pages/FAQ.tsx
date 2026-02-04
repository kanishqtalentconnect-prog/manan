import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "What is a site visit and how can I book one?",
    answer:
      "A site visit allows you to personally inspect the property with our representative. You can book a site visit by clicking on the 'Book Site Visit' button on the property detail page and filling in your details.",
  },
  {
    question: "Is there any charge for booking a site visit?",
    answer:
      "No, booking a site visit is completely free. Our goal is to help you make an informed decision without any obligation.",
  },
  {
    question: "Are the property prices negotiable?",
    answer:
      "Some properties may have room for negotiation depending on the seller. You can raise a price discussion by sending an enquiry for the specific property.",
  },
  {
    question: "What documents should I check before purchasing a property?",
    answer:
      "You should verify ownership documents, RERA approval, land records, approved building plans, and sale agreements. We also recommend consulting a legal expert before finalizing any deal.",
  },
  {
    question: "Do you assist with home loans?",
    answer:
      "Yes, we can connect you with trusted banking partners who assist with home loans at competitive interest rates, subject to eligibility.",
  },
  {
    question: "Are the properties listed RERA approved?",
    answer:
      "We prioritize transparency. Wherever applicable, RERA approval details are clearly mentioned on the property detail page.",
  },
  {
    question: "How do I make an enquiry about a property?",
    answer:
      "You can click on the 'Make an Enquiry' button on the property detail page. Our team will get in touch with you shortly after receiving your request.",
  },
  {
    question: "Can I sell my property through this platform?",
    answer:
      "Currently, we focus on verified listings. If you wish to list your property, please contact our support team for further assistance.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, []);
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-in fade-in duration-700">
      <div className="relative max-w-7xl mx-auto p-6">
        <div className="absolute top-0 right-0  gap-2">
          {/* BACK */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
              bg-white border border-gray-200 text-sm font-semibold 
              text-gray-700 hover:bg-gray-50 hover:shadow transition"
          >
            ← Back
          </button>
        </div>
      </div>
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to the most common questions about properties, site visits,
          pricing, and the buying process.
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left 
                  bg-white hover:bg-gray-50 transition"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <span
                  className={`text-2xl font-light text-gray-500 transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-gray-600 text-base leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support CTA */}
      <div className="mt-16 text-center border-t border-gray-100 pt-10">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-6">
          Our team is happy to help you with any queries you may have.
        </p>
        <a href="/#contact"
          className="inline-flex items-center justify-center px-8 py-4 
            rounded-2xl bg-gray-900 text-white font-bold text-lg 
            hover:bg-black transition active:scale-[0.98]"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
