import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-10 md:p-16"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-purple-700 mb-8">
          Privacy Policy
        </h1>

        <p className="text-gray-600 text-center mb-10">
          <strong>Effective Date:</strong> October 26, 2025
        </p>

        <p className="text-lg leading-relaxed mb-6">
          At <strong>Hop4Deals</strong>, your privacy is extremely important to us. This
          Privacy Policy explains how we collect, use, and protect your personal
          information when you visit{" "}
          <a
            href="https://hop4deal.com"
            className="text-purple-700 underline font-semibold hover:text-purple-500"
          >
            hop4deal.com
          </a>{" "}
          or use any of our services.
        </p>

        <p className="text-lg leading-relaxed mb-10">
          By using our website, you agree to this Privacy Policy. If you do not agree with
          the terms described below, please do not use our website.
        </p>

        <section className="space-y-8">
          {/* 1. Information We Collect */}
          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">
              1. Information We Collect
            </h2>

            <h3 className="text-lg font-semibold mt-3 mb-1 text-gray-700">
              a. Personal Information
            </h3>
            <p className="text-gray-700">
              When you subscribe to our newsletter, contact us, or create an account (if
              applicable), we may collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Optional account details (such as username or preferences)</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-1 text-gray-700">
              b. Non-Personal Information
            </h3>
            <p className="text-gray-700">
              When you browse our site, we automatically collect certain data such as:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Referring and exit pages</li>
              <li>Date/time of your visit</li>
              <li>Clickstream data</li>
            </ul>
            <p className="mt-2 text-gray-700">
              This helps us understand how visitors use our site and improve the user
              experience.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-1 text-gray-700">
              c. Cookies and Tracking Technologies
            </h3>
            <p className="text-gray-700">
              We use cookies, pixels, and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Save your preferences for future visits</li>
              <li>Track performance and analytics (e.g., Google Analytics)</li>
              <li>
                Display relevant ads through affiliate networks or third-party advertisers
              </li>
            </ul>
            <p className="mt-2 text-gray-700">
              You can disable cookies in your browser settings, but some parts of the site
              may not function properly without them.
            </p>
          </div>

          {/* 2. How We Use Your Information */}
          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide and improve our services</li>
              <li>Personalize your browsing experience</li>
              <li>Communicate with you about updates, deals, or offers (if you opt-in)</li>
              <li>Monitor website performance and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3 text-gray-700">
              We <strong>never sell or rent</strong> your personal information to third
              parties.
            </p>
          </div>

          {/* 3. Affiliate Links and Third-Party Services */}
          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">
              3. Affiliate Links and Third-Party Services
            </h2>
            <p className="text-gray-700">
              <strong>Hop4Deals</strong> partners with affiliate networks and third-party
              retailers. When you click an external link, you may be redirected to another
              website that has its own privacy policy and tracking system.
            </p>
            <p className="text-gray-700 mt-2">
              We encourage you to review the privacy policies of those third-party sites
              before providing any personal information, as we are not responsible for
              their practices.
            </p>
          </div>

          {/* 4. Data Protection and Security */}
          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">
              4. Data Protection and Security
            </h2>
            <p className="text-gray-700">
              We take appropriate measures to protect your data against unauthorized
              access, alteration, or disclosure. However, please note that no method of
              transmission over the Internet is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </div>

          {/* 5. Your Rights */}
          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">5. Your Rights</h2>
            <p className="text-gray-700">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Access and obtain a copy of your personal data</li>
              <li>Request correction or deletion of your data</li>
              <li>Withdraw consent to email marketing</li>
              <li>Request data portability (where applicable)</li>
            </ul>
            <p className="mt-3 text-gray-700">
              To exercise your rights, contact us at{" "}
              <a
                href="mailto:admin@hop4deal.com"
                className="text-purple-700 underline font-semibold hover:text-purple-500"
              >
                admin@hop4deal.com
              </a>
              .
            </p>
          </div>

          {/* 6. Children’s Privacy */}
          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">6. Children’s Privacy</h2>
            <p className="text-gray-700">
              Our website is not intended for children under 13 years of age. We do not
              knowingly collect personal data from children. If we learn that we have
              collected such data, we will promptly delete it.
            </p>
          </div>

          {/* 7. Changes to This Policy */}
          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">
              7. Changes to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. All changes will be
              posted on this page with an updated “Effective Date.” We encourage users to
              review this page periodically to stay informed about how we protect their
              information.
            </p>
          </div>

          {/* 8. Contact Us */}
          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">8. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy or our data practices,
              please contact us at:
            </p>
            <ul className="mt-3 text-gray-700">
              <li>
                📧 Email:{" "}
                <a
                  href="mailto:admin@hop4deal.com"
                  className="text-purple-700 underline font-semibold hover:text-purple-500"
                >
                  admin@hop4deal.com
                </a>
              </li>
              <li>
                🌐 Website:{" "}
                <a
                  href="https://hop4deal.com"
                  className="text-purple-700 underline font-semibold hover:text-purple-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hop4deal.com
                </a>
              </li>
            </ul>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
