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

    {/* Back Button */}
    <div className="flex justify-end mb-10">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
          bg-[#f5f2ea] border border-[#ece6dd] text-sm font-medium 
          text-[#3a3a3a] hover:bg-[#ece6dd] transition"
      >
        ← Back
      </button>
    </div>

    {/* Header */}
    <div className="mb-16 text-center">
      <h1 className="text-4xl md:text-5xl font-serif text-[#1e1e1e] mb-6">
        Frequently Asked{" "}
        <span className="text-[#c4a47c] italic">Questions</span>
      </h1>

      <p className="text-base md:text-lg text-[#6f6f6f] max-w-2xl mx-auto leading-relaxed">
        Find answers to the most common questions about properties, site visits,
        pricing, and the buying process.
      </p>
    </div>

    {/* FAQ List */}
    <div className="space-y-5">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;

        return (
          <div
            key={index}
            className="border border-[#ece6dd] rounded-2xl overflow-hidden 
                       bg-white shadow-sm transition-all"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between 
                px-6 py-6 text-left transition"
            >
              <span className="text-lg font-semibold text-[#1e1e1e]">
                {faq.question}
              </span>

              <span
                className={`text-3xl font-normal text-[#c4a47c] transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>

            {isOpen && (
              <div className="px-6 pt-6 pb-6 text-[#6f6f6f] text-base leading-relaxed border-t border-[#f1ece4]">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>

    {/* Support CTA */}
    <div className="mt-20 text-center border-t border-[#ece6dd] pt-12">
      <h3 className="text-2xl font-serif text-[#1e1e1e] mb-4">
        Still have{" "}
        <span className="text-[#c4a47c] italic">questions?</span>
      </h3>

      <p className="text-[#6f6f6f] mb-8">
        Our team is happy to help you with any queries you may have.
      </p>

      <a
        href="/#contact"
        className="inline-flex items-center justify-center px-10 py-4 
          rounded-2xl bg-[#c4a47c] text-white font-semibold text-lg 
          hover:bg-[#b8935f] transition shadow-md active:scale-[0.98]"
      >
        Contact Support
      </a>
    </div>

  </div>
);
}
