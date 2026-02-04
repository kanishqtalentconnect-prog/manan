import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function TermsAndConditions() {
  const navigate = useNavigate();
  useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      }, []);

  return (
    <div className="relative max-w-5xl mx-auto px-6 py-16 animate-in fade-in duration-700">
      
      {/* BACK BUTTON */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg 
            bg-white border border-gray-200 text-sm font-semibold 
            text-gray-700 hover:bg-gray-50 hover:shadow transition"
        >
          ← Back
        </button>
      </div>

      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Terms & Conditions
        </h1>
        <p className="text-gray-500 text-sm">
          Last updated: February 2026
        </p>
      </div>

      {/* CONTENT */}
      <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
        
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Acceptance of Terms
          </h2>
          <p>
            By accessing or using the website and services provided by
            <strong> Manan LLP – Mukteshwar Retreats</strong>, you agree to be
            bound by these Terms and Conditions. If you do not agree with any
            part of these terms, you must not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Nature of Services
          </h2>
          <p>
            Manan LLP provides information related to property listings, site
            visits, and real estate consultation. We act as facilitators and do
            not guarantee the availability, pricing, or suitability of any
            listed property.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            User Responsibilities
          </h2>
          <p>
            Users agree to provide accurate and complete information when
            submitting enquiries or booking site visits. Any misuse of the
            website, including unauthorized access or false representation, is
            strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Pricing & Property Information
          </h2>
          <p>
            All property prices, descriptions, and availability are subject to
            change without prior notice. Manan LLP is not responsible for any
            discrepancies or errors in listings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Limitation of Liability
          </h2>
          <p>
            Manan LLP shall not be held liable for any direct, indirect,
            incidental, or consequential damages arising from the use of this
            website or reliance on the information provided herein.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Intellectual Property
          </h2>
          <p>
            All content on this website, including text, images, logos, and
            design elements, are the intellectual property of Manan LLP and may
            not be copied, reproduced, or distributed without prior written
            consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Third-Party Links
          </h2>
          <p>
            This website may contain links to third-party websites. Manan LLP is
            not responsible for the content, privacy policies, or practices of
            any external sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Termination of Access
          </h2>
          <p>
            We reserve the right to suspend or terminate access to our services
            without notice if these terms are violated.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Changes to Terms
          </h2>
          <p>
            Manan LLP may update these Terms & Conditions at any time. Continued
            use of the website after changes implies acceptance of the updated
            terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Governing Law
          </h2>
          <p>
            These Terms & Conditions shall be governed by and interpreted in
            accordance with the laws of India. Any disputes shall be subject to
            the jurisdiction of the appropriate courts.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Contact Information
          </h2>
          <p>
            For any questions regarding these Terms & Conditions, please contact
            us through the details provided on our website.
          </p>
        </section>

      </div>
    </div>
  );
}
