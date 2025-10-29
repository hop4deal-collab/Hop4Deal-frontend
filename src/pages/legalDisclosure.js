import React from "react";
import { motion } from "framer-motion";

const Imprint = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-10 md:p-16"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-purple-700 mb-6">
          Imprint / Legal Disclosure
        </h1>

        <section className="space-y-8 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-purple-600 mb-3">Website Information</h2>
            <div className="leading-relaxed">
              <p><strong>Website Name:</strong> Hop4Deals</p>
              <p>
                <strong>Website URL:</strong>{" "}
                <a
                  href="https://www.hop4deal.com"
                  className="text-purple-700 underline hover:text-purple-500"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.hop4deal.com
                </a>
              </p>
              <p><strong>Operator:</strong> Hop4Deals</p>
              <p><strong>Registered Address:</strong> California, United States</p>
              <p>
                <strong>Contact Email:</strong>{" "}
                <a href="mailto:admin@hop4deal.com" className="text-purple-700 underline">
                  admin@hop4deal.com
                </a>
              </p>
             
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-600 mb-3">Responsible for Content</h2>
            <p className="leading-relaxed">
              <strong>Representative:</strong> Hop4Deals Team<br />
              <strong>Address:</strong> California, United States<br />
              <strong>Email:</strong>{" "}
              <a href="mailto:admin@hop4deal.com" className="text-purple-700 underline">
                admin@hop4deal.com
              </a>
            </p>
          </div>

          

          <div>
            <h2 className="text-2xl font-semibold text-purple-600 mb-3">Disclaimer</h2>

            <h3 className="font-medium mt-3">1. Content Liability</h3>
            <p className="mt-1 leading-relaxed">
              All content on Hop4Deals has been created with care. We cannot guarantee
              completeness, accuracy or timeliness and are not liable for damages arising
              from use of the site.
            </p>

            <h3 className="font-medium mt-4">2. External Links</h3>
            <p className="mt-1 leading-relaxed">
              We link to external third-party sites; we are not responsible for their
              content. If unlawful content is discovered, we will remove links promptly.
            </p>

            <h3 className="font-medium mt-4">3. Affiliate Disclosure</h3>
            <p className="mt-1 leading-relaxed">
              Hop4Deals participates in affiliate programs and may earn a commission for
              purchases made through affiliate links at no extra cost to you. This revenue
              helps keep the service available and free.
            </p>

            <h3 className="font-medium mt-4">4. Copyright Notice</h3>
            <p className="mt-1 leading-relaxed">
              All content and images are protected by copyright. Reproduction or use
              requires prior written consent from Hop4Deals or the respective rights holder.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-600 mb-3">Dispute Resolution</h2>
            <p className="leading-relaxed">
              We are not obligated or willing to participate in dispute resolution before
              a consumer arbitration board.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-600 mb-3">Contact</h2>
            <p className="leading-relaxed">
              For legal inquiries or complaints, contact us at:
            </p>
            <p className="mt-3">
              📧{" "}
              <a href="mailto:admin@hop4deal.com" className="text-purple-700 underline">
                admin@hop4deal.com
              </a>
              <br />
              📍 California, United States<br />
              🌐{" "}
              <a href="https://www.hop4deal.com" className="text-purple-700 underline">
                hop4deal.com
              </a>
            </p>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Imprint;
