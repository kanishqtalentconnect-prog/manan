import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="text-gray-500 text-sm">
          Last updated: February 2026
        </p>
      </div>

      {/* CONTENT */}
      <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
        
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Introduction
          </h2>
          <p>
            At <strong>Manan LLP – Mukteshwar Retreats</strong>, we value your
            privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard
            information when you visit our website or interact with our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, phone number,
            email address, and enquiry details when you:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Submit a property enquiry</li>
            <li>Book a site visit</li>
            <li>Contact us through forms or communication channels</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            How We Use Your Information
          </h2>
          <p>
            The information collected is used strictly to:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Respond to your enquiries</li>
            <li>Schedule site visits or property tours</li>
            <li>Provide property-related updates</li>
            <li>Improve our services and user experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Data Protection
          </h2>
          <p>
            We implement appropriate security measures to protect your personal
            data against unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the internet is
            completely secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Sharing of Information
          </h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. Information may be shared only with trusted partners when
            necessary to fulfill your request or comply with legal obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Cookies & Tracking
          </h2>
          <p>
            Our website may use cookies to enhance user experience and analyze
            website traffic. You can choose to disable cookies through your
            browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Your Consent
          </h2>
          <p>
            By using our website, you consent to our Privacy Policy and agree to
            its terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Contact Us
          </h2>
          <p>
            If you have any questions regarding this Privacy Policy or how your
            data is handled, please contact us through the information provided
            on our website.
          </p>
        </section>

      </div>
    </div>
  );
}
