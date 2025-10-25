import React from "react";
import { motion } from "framer-motion";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-10 md:p-16"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-purple-700 mb-6">
          Cookie Policy
        </h1>

        <p className="text-center text-gray-600 mb-8">
          <strong>Effective Date:</strong> October 26, 2025 · <strong>Site:</strong>{" "}
          <a
            href="https://www.hop4deal.com"
            className="text-purple-700 underline hover:text-purple-500"
            target="_blank"
            rel="noreferrer"
          >
            hop4deal.com
          </a>
        </p>

        <section className="space-y-8 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-purple-600 mb-3">1. What Are Cookies?</h2>
            <p className="leading-relaxed">
              Cookies are small text files stored on your device when you visit a website.
              They help improve your browsing experience by remembering preferences,
              session information, and how you interact with our site. Cookies may be
              session-based (deleted when you close your browser) or persistent (remain
              until expiry or deletion).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-600 mb-3">2. How We Use Cookies</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">a. Essential Cookies</h3>
                <p className="mt-1 leading-relaxed">
                  Required for core site functionality — navigation, secure areas and
                  session management. Without these, some features may not work.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">b. Performance & Analytics</h3>
                <p className="mt-1 leading-relaxed">
                  We use anonymous analytics (e.g., Google Analytics) to learn which pages
                  perform best and how users move around the site, so we can improve speed
                  and usability.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">c. Functionality Cookies</h3>
                <p className="mt-1 leading-relaxed">
                  Remember preferences such as language or saved items to personalize your
                  experience.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">d. Advertising & Affiliate Cookies</h3>
                <p className="mt-1 leading-relaxed">
                  Hop4Deals works with affiliate networks and ad partners that may set
                  cookies to track clicks, attribute sales, and show relevant ads.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-600 mb-3">3. Third-Party Cookies</h2>
            <p className="leading-relaxed">
              Some cookies come from third parties (analytics, ad networks, social media).
              These third parties collect information according to their own policies —
              please review them to understand how they use data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-600 mb-3">4. Managing or Disabling Cookies</h2>
            <p className="leading-relaxed">
              You can control cookies via your browser settings. Disabling cookies may
              impact site functionality. You can also opt out of personalized ads via
              services like Google Ads Settings, Your Online Choices, or the Network
              Advertising Initiative.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Safari</li>
              <li>Microsoft Edge</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-600 mb-3">5. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this cookie policy from time to time. Any changes will be
              posted here with an updated effective date — please check periodically.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-600 mb-3">6. Contact</h2>
            <p className="leading-relaxed">
              Questions about cookies or this policy? Email us at{" "}
              <a
                href="mailto:contact@hop4deal.com"
                className="text-purple-700 underline hover:text-purple-500"
              >
                contact@hop4deal.com
              </a>
              .
            </p>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Hop4Deals — helping you save, responsibly.
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default CookiePolicy;
