import React, { useEffect, useState } from "react";
import { seasonsAPI } from "../services/api";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
const SeasonsPage = () => {
  const [seasons, setSeasons] = useState([]);
  const [activeTab, setActiveTab] = useState("current");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const res = await seasonsAPI.getAll();
        setSeasons(res.data);
      } catch (err) {
        console.error("Error fetching seasons:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSeasons();
  }, []);

  const currentSeasons = seasons.filter((s) => s.isActive);
  const upcomingSeasons = seasons.filter((s) => !s.isActive);

  const displayedSeasons =
    activeTab === "current" ? currentSeasons : upcomingSeasons;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}

        <div className="relative bg-gradient-to-r from-primary-500 to-purple-600 text-white py-20 overflow-hidden" style={{height:270}}>
         
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-extrabold mb-4"
            >
              Seasonal Events 💫
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-lg opacity-90 max-w-2xl mx-auto"
            >
            Stay ahead with Hop4Deal’s curated seasons — uncover special shopping
          events, festive promotions, and limited-time offers happening right
          now or coming soon.
            </motion.p>
          </div>
        </div>
      {/* <section className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">Seasonal Events</h1>
        <p className="mt-3 text-purple-100 text-lg max-w-3xl mx-auto">
          Stay ahead with Hop4Deal’s curated seasons — uncover special shopping
          events, festive promotions, and limited-time offers happening right
          now or coming soon.
        </p>
      </section> */}

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT SIDE — Sidebar Tabs */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Browse Seasons
            </h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setActiveTab("current")}
                className={`text-left px-4 py-2 rounded-xl transition font-medium ${
                  activeTab === "current"
                    ? "bg-purple-600 text-white shadow"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                Current Seasons
              </button>
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`text-left px-4 py-2 rounded-xl transition font-medium ${
                  activeTab === "upcoming"
                    ? "bg-purple-600 text-white shadow"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                Upcoming Seasons
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-sm text-gray-600">
            <h3 className="font-semibold text-gray-800 mb-2">Quick Tips</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Check “Upcoming” to plan your next big buy.</li>
              <li>Deals change frequently — visit often!</li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE — Text + Cards */}
        <div className="md:col-span-2 space-y-8">
          {/* Section Intro */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {activeTab === "current"
                ? "🔥 Currently Active Seasons"
                : "⏳ Upcoming Events"}
            </h2>
            <p className="text-gray-600 max-w-2xl">
              {activeTab === "current"
                ? "Explore the live promotions and ongoing festival deals happening across top brands. Grab exclusive savings while they last!"
                : "Get ready for upcoming seasonal drops and future brand promotions. Mark your calendar so you don’t miss out when the event goes live!"}
            </p>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="text-gray-500">Loading seasons...</div>
          ) : displayedSeasons.length === 0 ? (
            <div className="text-gray-500 italic py-10">
              No {activeTab} events available right now.
            </div>
          ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {displayedSeasons.map((season) => (
    <Link
      key={season._id}
      to={`/deals?season=${season._id}`}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden group block"
    >
      {season.logo ? (
        <img
          src={season.logo}
          alt={season.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
        />
      ) : (
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
          No Banner
        </div>
      )}
      <div className="p-5 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition">
          {season.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {season.description || "No description available."}
        </p>
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
            season.isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {season.isActive ? "Active Now" : "Coming Soon"}
        </span>
      </div>
    </Link>
  ))}
</div>

          )}
        </div>
      </div>
    </div>
  );
};

export default SeasonsPage;
