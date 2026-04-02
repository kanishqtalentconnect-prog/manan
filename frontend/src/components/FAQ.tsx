import { useState } from "react";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "What is a site visit and how can I book one?",
    answer:
      "A site visit allows you to personally inspect the property with our representative. You can book a site visit by clicking on the 'Book Site Visit' button on the property detail page and filling in your details.",
  },
  {
    question: "Can non-residents buy land in Nata Dol?",
    answer:
      "Yes, but only for residential purposes. That's why we only have ready-to-build residential plots listed on our platform. We do not list agricultural or commercial land to ensure compliance with local regulations.",
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
      "You should verify ownership documents, land records, approved building plans, and sale agreements. We also recommend consulting a legal expert before finalizing any deal.",
  },
  {
    question: "Do you assist with home loans?",
    answer:
      "Yes, we can connect you with trusted banking partners who assist with home loans at competitive interest rates, subject to eligibility.",
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
  // const navigate = useNavigate();
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, []);
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
  <section className="relative bg-white py-24 overflow-hidden">
    {/* Header */}
    <div className="mb-20 text-center">
      <h2 className="text-4xl md:text-6xl font-serif text-[#0f3b2e] mb-6">
        Frequently Asked{" "}
        <span className="text-[#c5a46d] italic">Questions</span>
      </h2>

      <p className="max-w-xl mx-auto text-sm md:text-base text-[#6b6b6b] leading-relaxed">
        Find answers to the most common questions about properties, site visits,
        pricing, and the buying process.
      </p>
    </div>

    {/* FAQ List */}
    <div className="space-y-5 max-w-4xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;

        return (
          <div
            key={index}
            className={`relative rounded-2xl transition-all duration-300
              ${
                isOpen
                  ? "bg-[#ffffff] border border-[#c5a46d] shadow-lg"
                  : "bg-[#fafafa] border border-[#eee7dc] hover:shadow-md"
              }`}
          >
            {/* GOLD LEFT ACCENT */}
            <div
              className={`absolute left-2 top-3 bottom-3 w-[4px] rounded-full transition-all duration-300 ${
                isOpen ? "bg-[#c5a46d]" : "bg-transparent"
              }`}
            />

            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between px-8 py-6 text-left"
            >
              <span className="text-lg md:text-xl font-serif text-[#1f1f1f] hover:text-[#0f3b2e] transition">
                {faq.question}
              </span>

              <span
                className={`text-3xl transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 text-[#c5a46d]"
                    : "text-[#9a8f7a]"
                }`}
              >
                +
              </span>
            </button>

            {/* Answer */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-8 pb-8 pt-4 text-[#555] text-base leading-relaxed border-t border-[#f3efe8]">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Support CTA */}
    <div className="mt-28 text-center">
      <div className="w-24 h-[1px] bg-[#c5a46d] mx-auto mb-8"></div>

      <h3 className="text-2xl md:text-3xl font-serif text-[#0f3b2e] mb-4">
        Still have{" "}
        <span className="italic text-[#c5a46d]">questions?</span>
      </h3>

      <p className="text-[#666] mb-0">
        Our team is happy to guide you through every step of your property journey.
      </p>
    </div>
  </section>
);
}
