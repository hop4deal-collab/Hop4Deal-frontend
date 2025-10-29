import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-10 md:p-16"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-purple-700 mb-8">
          About Us
        </h1>

        <section className="space-y-8">
          <p className="text-lg leading-relaxed text-gray-700">
            Welcome to <strong>Hop4Deals</strong> — your go-to destination for discovering
            the latest deals, coupon codes, and saving opportunities online.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">Our Mission</h2>
            <p className="leading-relaxed">
              At <strong>Hop4Deals</strong>, we believe smart shopping shouldn’t cost an
              arm and a leg. Our mission is simple — help you pay less, without
              sacrificing quality. Whether you’re browsing for everyday essentials,
              big-ticket items, or special occasion deals — we’re here to make sure you
              never pay full price.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">What We Do</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                We curate and deliver top-verified coupon codes and promotions from trusted
                retailers, so you don’t have to hunt the web.
              </li>
              <li>
                We organise deals by categories and brands to make it simple to find what
                you’re looking for.
              </li>
              <li>
                We strive to bring you up-to-date offers — new codes, time-limited
                discounts, flash sales — all in one place.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">Why Choose Us</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>User-friendly experience</strong> — Clean design and intuitive
                navigation make finding savings quick and easy.
              </li>
              <li>
                <strong>Verified deals</strong> — We aim to validate codes before
                publishing, reducing expired or invalid offers.
              </li>
              <li>
                <strong>Independent & transparent</strong> — We’re dedicated to saving you
                money, not pushing hidden agendas.
              </li>
              <li>
                <strong>Community-driven</strong> — Share, report, and help refine the list
                of deals — because saving is better together.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Integrity</strong> — We only promote offers that genuinely provide
                value.
              </li>
              <li>
                <strong>Accessibility</strong> — Everyone deserves great deals, no matter
                their budget or experience level.
              </li>
              <li>
                <strong>Timeliness</strong> — We surface the freshest, most relevant
                savings first.
              </li>
              <li>
                <strong>Community</strong> — Collective knowledge makes everyone a smarter
                shopper.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Browse our site by category or retailer to find current deals.</li>
              <li>Click or copy the coupon code / offer link.</li>
              <li>Use the code at checkout (or follow the deal instructions).</li>
              <li>Save money — it’s that simple!</li>
            </ol>
            <p className="mt-3 text-sm text-gray-600 italic">
              💡 Tip: Bookmark <strong>hop4deal.com</strong> or subscribe to our newsletter
              to stay ahead of new deals and flash sales.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">Disclaimer</h2>
            <p className="leading-relaxed">
              While we do our best to verify each offer and keep listings accurate, deals
              can change quickly. We can’t guarantee all codes will work at all times.
              Always check the retailer’s terms and conditions.{" "}
              <strong>Hop4Deals</strong> is not responsible for retailer errors, site
              downtime, or changes in promotion terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-3">Get in Touch</h2>
            <p className="leading-relaxed">
              Have a tip for a hot deal, found a code that doesn’t work, or want to
              collaborate? We’d love to hear from you!  
              Reach out via{" "}
              <a
                href="mailto:admin@hop4deal.com"
                className="text-purple-700 font-semibold underline hover:text-purple-500"
              >
                admin@hop4deal.com
              </a>{" "}
              or connect with us on social media.
            </p>
          </div>

          <p className="text-center text-gray-500 text-sm mt-12">
            Thanks for choosing <strong>Hop4Deals</strong> — here’s to smarter shopping and
            bigger savings! 💰
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default AboutPage;
