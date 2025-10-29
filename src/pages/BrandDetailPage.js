// src/pages/BrandDetailsPage.js
import React, { Component } from "react";
import { brandsAPI, dealsAPI } from "../services/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import  GrabCodeButton  from './GrabButton';

/*
  BrandDetailsPage (Side-by-side layout)
  - Left column: Active Deals (type === 'deal' OR type is undefined/null)
  - Right column: Offers (type === 'offer')
  - Below: Expired Deals (all types)
  - Lazy-loads more cards as user scrolls using IntersectionObserver (no extra packages)
  - Themed with same purple gradient / glassy cards as Home/Deals
*/

export default class BrandDetailsPage extends Component {
  state = {
    brand: null,
    allDeals: [],
    loading: true,
    error: null,
    // paging (lazy load)
    activeLimit: 6,
    offersLimit: 6,
    loadingMore: false,
  };

  componentDidMount() {
    const brandId =
      (this.props.match && this.props.match.params && this.props.match.params.id) ||
      (this.props.params && this.props.params.id) ||
      window.location.pathname.split("/").filter(Boolean).pop();

    this.brandId = brandId;
    this.loadData(brandId);

    // setup intersection observer for lazy load
    this.observer = new IntersectionObserver(this.handleIntersect, {
      root: null,
      rootMargin: "300px",
      threshold: 0,
    });
  }

  componentWillUnmount() {
    if (this.observer) this.observer.disconnect();
  }

  loadData = async (brandId) => {
    try {
      this.setState({ loading: true, error: null });
      const [brandRes, dealsRes] = await Promise.all([brandsAPI.getById(brandId), dealsAPI.getAll()]);
      const brand = brandRes.data;
      // filter deals belonging to this brand only
      const allDeals = (dealsRes.data || []).filter((d) => d.brand?._id === brandId);
      this.setState({ brand, allDeals, loading: false }, () => {
        // observe the sentinel after initial render
        const sentinel = document.getElementById("brand-details-sentinel");
        if (sentinel && this.observer) this.observer.observe(sentinel);
      });
    } catch (err) {
      console.error("Brand details load error", err);
      this.setState({ error: "Failed to load brand details", loading: false });
    }
  };

  // IntersectionObserver callback — load more items when sentinel appears
  handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      this.loadMoreIfNeeded();
    });
  };

  loadMoreIfNeeded = () => {
    const { activeLimit, offersLimit, allDeals, loadingMore } = this.state;
    if (loadingMore) return;

    const active = this.getActiveDeals(allDeals);
    const offers = this.getOffers(allDeals);

    const canLoadActive = active.length > activeLimit;
    const canLoadOffers = offers.length > offersLimit;

    if (!canLoadActive && !canLoadOffers) return;

    this.setState({ loadingMore: true }, () => {
      setTimeout(() => {
        this.setState((prev) => ({
          activeLimit: canLoadActive ? prev.activeLimit + 6 : prev.activeLimit,
          offersLimit: canLoadOffers ? prev.offersLimit + 6 : prev.offersLimit,
          loadingMore: false,
        }));
      }, 600);
    });
  };

  // helpers to split deals
  getActiveDeals = (deals = this.state.allDeals) => {
    const now = new Date();
    return deals.filter((d) => {
      // deals have endDate; treat as active when endDate > now AND type != 'offer'
      const isOffer = d.type === "offer";
      const hasEnd = d.endDate;
      const notExpired = hasEnd ? new Date(d.endDate) > now : true; // offers may not have endDate; but we won't include offers here
      return !isOffer && hasEnd && notExpired;
    });
  };

  getOffers = (deals = this.state.allDeals) => {
    // offers don't have endDate typically; also accept explicit type === 'offer'
    return deals.filter((d) => d.type === "offer");
  };

  getExpiredDeals = (deals = this.state.allDeals) => {
    const now = new Date();
    return deals.filter((d) => {
      if (!d.endDate) return false; // offers don't count as expired here
      return new Date(d.endDate) <= now;
    });
  };

  render() {
    const { brand, loading, error, activeLimit, offersLimit, loadingMore, allDeals } = this.state;

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-purple-700">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-24 h-24 border-4 border-white/30 rounded-full animate-ping"></div>
            <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      );
    }

    if (error || !brand) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Oops</h2>
            <p className="text-gray-600">{error || "Brand not found."}</p>
            <Link to="/brands" className="inline-block mt-4 text-primary-600 hover:underline">
              Back to brands
            </Link>
          </div>
        </div>
      );
    }

    // compute sections
    const activeDeals = this.getActiveDeals().slice(0, activeLimit);
    const offers = this.getOffers().slice(0, offersLimit);
    const expired = this.getExpiredDeals();

    // layout: left column active, right column offers (responsive)
    return (
      <div className="min-h-screen bg-gray-50">
        {/* HERO */}
        <div className="relative bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {/* subtle SVG wave overlay — replace with your asset if available */}
            <svg viewBox="0 0 1200 200" className="w-full h-full">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#5B21B6" />
                </linearGradient>
              </defs>
              <path d="M0,120 C300,200 900,40 1200,120 L1200,0 L0,0 Z" fill="url(#g)" opacity="0.06"></path>
            </svg>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
            {/* logo */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden">
                {brand.logo ? (
                  <img 
                  src={brand.logo ? (brand.logo?.startsWith('/upload') ? `${process.env.REACT_APP_API_URL.slice(0, -4)}${brand.logo}` : null) : null}
                   alt={brand.name} className="w-24 h-24 object-contain" />
                ) : (
                  <span className="text-3xl font-bold text-primary-700">{brand.name.charAt(0)}</span>
                )}
              </div>
            </div>

            {/* title + tagline */}
            <div className="flex-1">
              <motion.h1 initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl font-extrabold">
                {brand.name}
              </motion.h1>
              <p className="mt-2 text-lg text-white/90">{brand.tagline}</p>

              <div className="mt-4 flex items-center gap-3">
                {brand.website && (
                  <a href={brand.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-primary-700 font-semibold shadow hover:scale-105 transition">
                    Visit Website
                  </a>
                )}
                <Link to={`/deals?brand=${brand._id}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition">
                  View all brand deals
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN: two column area */}
        <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column (active deals) — spans 2/3 on large */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-primary-700">Active Deals</h2>
                  <div className="text-sm text-gray-500">{this.getActiveDeals().length} active</div>
                </div>

                {activeDeals.length === 0 ? (
                  <div className="py-10 text-center text-gray-600">No active deals right now.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeDeals.map((d, i) => (
                      <motion.article key={d._id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-lg hover:border-primary-400 transition cursor-pointer" >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="inline-block px-3 py-1 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-primary-400 to-primary-600">
                              {d.percentOff}% OFF
                            </div>
                            <h3 className="mt-3 font-semibold text-primary-800">{d.title || d.brand?.name}</h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-3">{d.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-400">Ends</div>
                            <div className="font-mono font-bold text-sm text-primary-700">{d.endDate ? new Date(d.endDate).toLocaleDateString() : "—"}</div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-primary-50 to-purple-50 p-3 rounded-lg text-center">
                          <GrabCodeButton code={d.code} link={d.link} type={d.type} />
                        </div>

                       
                      </motion.article>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right column (offers) */}
            <aside className="space-y-6">
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-primary-700">Special Offers</h3>
                  <div className="text-sm text-gray-500">{this.getOffers().length} offers</div>
                </div>

                {offers.length === 0 ? (
                  <div className="py-6 text-center text-gray-600">No special offers right now.</div>
                ) : (
                  <div className="space-y-4">
                    {offers.map((o, i) => (
                      <motion.div key={o._id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-lg p-3 shadow-sm border hover:shadow-lg hover:border-primary-400 transition">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="inline-block px-2 py-1 rounded-full text-white text-xs font-semibold bg-gradient-to-r from-purple-500 to-indigo-500">OFFER</div>
                            <h4 className="mt-2 font-semibold text-primary-800">{o.title || "Special Offer"}</h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{o.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-400">Type</div>
                            <div className="font-medium text-sm text-primary-700">Offer</div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="text-xs text-gray-500">No expiry</div>
                          <button onClick={() => window.open(o.link, "_blank")} className="px-3 py-2 rounded bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold">View Offer</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Small brand info card */}
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/10">
                <h4 className="text-sm font-semibold text-primary-700 mb-2">About</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{brand.description ? brand.description.slice(0, 220) + (brand.description.length > 220 ? "…" : "") : "No description provided."}</p>
                {brand.website && (
                  <a href={brand.website} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-primary-700 hover:underline text-sm">Visit website →</a>
                )}
              </div>
            </aside>
          </div>

          {/* EXPIRED DEALS */}
          <div className="mt-8">
            <div className="bg-white/60 backdrop-blur rounded-xl p-6 shadow-inner border border-white/10">
              <h3 className="text-lg font-semibold mb-4">Expired Deals</h3>
              {expired.length === 0 ? (
                <p className="text-gray-600">No expired deals for this brand.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {expired.map((e, i) => (
                    <motion.div key={e._id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="bg-gray-100 p-4 rounded-lg border border-gray-200 opacity-80">
                      <div className="flex items-center justify-between mb-2">
                        <div className="inline-block px-2 py-1 rounded text-xs bg-gray-400 text-white font-semibold">EXPIRED</div>
                        <div className="text-xs text-gray-500">{new Date(e.endDate).toLocaleDateString()}</div>
                      </div>
                      <h4 className="font-semibold text-gray-700">{e.title || "Past Deal"}</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-3">{e.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* sentinel for lazy loading */}
          <div id="brand-details-sentinel" className="h-6"></div>

          {/* loader for loading more */}
          {loadingMore && (
            <div className="flex justify-center py-6">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
