import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '@fortawesome/fontawesome-free/css/all.min.css'
import { dealsAPI, brandsAPI, blogsAPI, categoriesAPI } from '../services/api';

// NOTE: This component assumes TailwindCSS is configured and Framer Motion is installed.
// It also injects a small set of scoped styles (keyframes) for animated gradients & blobs.

export default function Home() {
  const [hotDeals, setHotDeals] = useState([]);
  const [trendingBrands, setTrendingBrands] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryBrands, setCategoryBrands] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData() {
    try {
      const [dealsRes, brandsRes, blogsRes, catsRes] = await Promise.all([
        dealsAPI.getAll(),
        brandsAPI.getAll(),
        blogsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);

      const deals = dealsRes.data || [];
      const brands = brandsRes.data || [];
      const blogs = blogsRes.data || [];
      const cats = catsRes.data || [];

      // group brands by category
      const grouped = {};
      cats.forEach((c) => (grouped[c._id] = brands.filter((b) => b.category?._id === c._id)));

      setHotDeals(deals);
      setTrendingBrands(brands.slice(0, 8));
      setFeaturedBlogs(blogs);
      setCategories(cats);
      setCategoryBrands(grouped);
      setLoading(false);
    } catch (err) {
      console.error('Home load error', err);
      setError('Failed to load content');
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <motion.div
          className="w-20 h-20 rounded-full border-8 border-dashed border-purple-400/40"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-700">Oops</h2>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  // small helper card animation used for lists
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12 } }),
    hover: { scale: 1.03, boxShadow: '0 10px 30px rgba(99,102,241,0.12)' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 overflow-x-hidden">
      {/* scoped styles for gradient animation & blobs */}
      <style>{`
        @keyframes gradientShift { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
        .animate-gradient { background-size: 200% 200%; animation: gradientShift 8s ease infinite; }
        @keyframes floaty { 0% { transform: translateY(0px) } 50% { transform: translateY(-12px) } 100% { transform: translateY(0px) } }
        .floaty { animation: floaty 6s ease-in-out infinite; }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* decorative blobs (SVG) */}
        <svg className="absolute -left-24 -top-24 w-96 h-96 opacity-30 floaty" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(300,300)">
            <path d="M120,-160C165,-136,214,-92,230,-35C246,22,229,94,187,142C146,190,80,214,10,214C-60,214,-120,190,-170,146C-220,102,-260,38,-254,-24C-249,-86,-198,-136,-140,-160C-82,-184,-41,-182,2,-184C45,-187,90,-184,120,-160Z" fill="url(#g1)" />
            <defs>
              <linearGradient id="g1" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#5B21B6" />
              </linearGradient>
            </defs>
          </g>
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-600"
              >
                Find the best <span className="whitespace-nowrap">deals</span> — faster.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="mt-6 text-lg text-gray-700 max-w-xl"
              >
                Hop4Deals curates top discounts, promo codes and limited-time offers from trusted brands. Stay ahead — save more.
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-2xl"
                  href="#hot-deals"
                >
                  Explore deals
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-1"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </motion.a>

                <Link to="/deals" className="text-sm text-purple-700 font-medium hover:underline">Browse all deals</Link>
              </div>

              {/* Search / Quick filter */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-8"
              >
                <div className="flex gap-2 max-w-md bg-white rounded-full p-1 shadow-md items-center">
                  <input
                    className="flex-1 px-4 py-3 rounded-full outline-none bg-transparent text-gray-700"
                    placeholder="Search brands, categories, codes..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        window.location.href = `/search?q=${encodeURIComponent(e.target.value.trim())}`;
                      }
                    }}
                  />
                  <button className="px-4 py-2 rounded-full bg-purple-600 text-white font-semibold">Search</button>
                </div>

                {/* small feature badges */}
                <div className="mt-4 flex gap-3 items-center flex-wrap text-sm text-gray-600">
                  <div className="inline-flex items-center gap-2 bg-white/60 px-3 py-2 rounded-full shadow-sm">Fast updates</div>
                  <div className="inline-flex items-center gap-2 bg-white/60 px-3 py-2 rounded-full shadow-sm">Verified brands</div>
                  <div className="inline-flex items-center gap-2 bg-white/60 px-3 py-2 rounded-full shadow-sm">Exclusive codes</div>
                </div>
              </motion.div>
            </div>

            {/* hero right: animated carousel of 3 highlight deal cards */}
            <div className="hidden lg:block">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="grid grid-cols-1 gap-6"
                >
                  {hotDeals.slice(0, 3).map((d, i) => (
                    <motion.div
                      key={d._id || i}
                      whileHover={{ translateY: -8 }}
                      className="bg-white/90 rounded-3xl p-6 shadow-2xl border border-white/30 backdrop-blur"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          {d.type !== 'offer' && <div className="text-xs inline-block font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white">{d.percentOff}% OFF</div>}
                          <h3 className="mt-3 text-lg font-bold text-purple-800">{d.brand?.name || 'Top Brand'}</h3>
                          {d.type == 'offer' && <div className="text-xs inline-block font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white">OFFER</div>}
                          <p className="text-sm text-gray-600 mt-2">{d.description?.slice(0, 90) || 'Exclusive offer'}</p>
                        </div>
                        {d.type !== 'offer' && <div className="text-right">
                          <div className="text-xs text-gray-400">Ends</div>
                          <div className="font-mono font-bold text-sm text-purple-700">{d.endDate ? new Date(d.endDate).toLocaleDateString() : '—'}</div>
                        </div>}
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <button onClick={() => window.open(d.link, '_blank')} className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold">{d.type !== 'offer' ? 'Grab code' : 'Get Offer'}</button>
                        {d.type !== 'offer' && <div className="text-sm text-gray-500">Code: <span className="font-mono text-purple-700">{d.code || '—'}</span></div>}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* small floating accent */}
                <div className="absolute -right-12 top-8 w-40 h-40 opacity-30">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <defs>
                      <linearGradient id="g2" x1="0" x2="1"><stop offset="0" stopColor="#A78BFA"/><stop offset="1" stopColor="#7C3AED"/></linearGradient>
                    </defs>
                    <path fill="url(#g2)" d="M43.4,-66.6C57.3,-56.1,69,-45.3,74.6,-31.9C80.2,-18.5,79.7,-2.5,72.3,12.6C64.9,27.7,50.6,41.8,34.6,50.5C18.6,59.2,0.9,62.6,-15.9,63.3C-32.7,64,-49.4,62,-59.9,51.3C-70.4,40.7,-74.7,21.4,-72.6,4C-70.4,-13.4,-61.9,-26.8,-51,-38.5C-40.2,-50.3,-28,-60.3,-13.3,-69.4C1.3,-78.5,16.5,-86.9,32.3,-85.3C48.1,-83.7,64.5,-72.2,43.4,-66.6Z" transform="translate(100 100)"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* a soft animated gradient bar */}
          <div className="mt-10 rounded-xl overflow-hidden p-1 animate-gradient" style={{ background: 'linear-gradient(90deg,#7C3AED,#8B5CF6,#6366F1)' }}>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">🔥</div>
                  <div>
                    <div className="text-sm text-gray-500">Limited time</div>
                    <div className="font-semibold text-purple-800">Flash drops updated hourly</div>
                  </div>
                </div>
                <Link to="/deals" className="text-sm font-medium text-purple-700 hover:underline">See latest flash drops →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-purple-800">Browse by Category</h2>
            <p className="text-gray-600">Top brands organized for quick discovery</p>
          </div>
          <Link to="/categories" className="text-purple-700 font-medium">View all</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat._id || idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover="hover"
              className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-44 h-44 opacity-10">
                {/* subtle decorative circle */}
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="100" cy="100" r="80" fill="#7C3AED" />
                </svg>
              </div>

              <h3 className="text-lg font-semibold text-purple-800">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{cat.description?.slice(0, 120)}</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {(categoryBrands[cat._id] || []).slice(0, 4).map((b) => (
                  <Link key={b._id} to={`/deals?brand=${b._id}`} className="flex items-center gap-3 bg-purple-50/60 p-2 rounded-lg hover:bg-purple-50 transition">
                    {b.logo ? (
                      <img 
                      src={b.logo ? (b.logo?.startsWith('/upload') ? `${process.env.REACT_APP_API_URL.slice(0, -4)}${b.logo}` : null) : null}
                      alt={b.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">{b.name?.charAt(0)}</div>
                    )}
                    <div className="text-sm">
                      <div className="font-medium text-purple-800">{b.name}</div>
                      <div className="text-xs text-gray-500">{Math.floor(Math.random()*5)+1} deals</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-4 text-right">
                <Link to={`/categories/${cat._id}`} className="text-sm text-purple-700 font-medium">See all →</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending brands (horizontal marquee) */}
      <section className="py-8 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-purple-800">Trending Brands</h3>
            <Link to="/brands" className="text-purple-700 font-medium">All brands</Link>
          </div>

          <div className="overflow-hidden">
            <div className="flex gap-6 animate-[marquee_18s_linear_infinite] whitespace-nowrap">
              {trendingBrands.concat(trendingBrands).map((b, i) => (
                <Link key={`${b._id}-${i}`} to={`/deals?brand=${b._id}`} className="inline-flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 mr-4 min-w-[160px]">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
                    {b.logo ? <img
                     src={b.logo ? (b.logo?.startsWith('/upload') ? `${process.env.REACT_APP_API_URL.slice(0, -4)}${b.logo}` : null) : null}
                      alt={b.name} className="w-full h-full object-cover" /> : b.name?.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-purple-800">{b.name}</div>
                    <div className="text-xs text-gray-500">{b.tagline || ''}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* marquee keyframes */}
          <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}} .animate-\[marquee_18s_linear_infinite\]{animation:marquee 18s linear infinite;}`}</style>
        </div>
      </section>

      {/* Featured blogs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-purple-800">Featured articles</h3>
          <Link to="/blogs" className="text-purple-700 font-medium">Read all</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBlogs.slice(0,3).map((b, i) => (
            <motion.article key={b._id || i} whileHover={{ y: -6 }} className="bg-white rounded-2xl shadow-md overflow-hidden">
              {b.image ? <img src={b.image} alt={b.headline} className="w-full h-44 object-cover" /> : <div className="h-44 bg-purple-50 flex items-center justify-center">No image</div>}
              <div className="p-4">
                <h4 className="font-semibold text-purple-800">{b.headline}</h4>
                <p className="text-sm text-gray-600 mt-2">{b.description?.slice(0, 110)}</p>
                <div className="mt-4 text-sm text-gray-400">{new Date(b.createdAt).toLocaleDateString()}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-gradient-to-r from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold text-purple-800">What people love</h3>
          <p className="text-gray-600 mt-2">Real users, real savings</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{name:'Ayesha', text:'Saved 40% on a laptop — the code worked instantly.'},{name:'Omar', text:'Fast site, legit brands.'},{name:'Zara', text:'Great curated deals. Highly recommend.'}].map((r,i)=>(
              <motion.div key={i} whileHover={{ scale: 1.03 }} className="bg-white p-6 rounded-2xl shadow-md">
                <p className="text-gray-700 italic">"{r.text}"</p>
                <div className="mt-4 font-semibold text-purple-800">— {r.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 text-white mt-12 relative overflow-hidden">
  {/* subtle glow background */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-1/3 w-64 h-64 bg-purple-400 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500 rounded-full blur-3xl" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* Brand + description */}
      <div>
        <div className="text-2xl font-extrabold tracking-tight">Hop4Deals</div>
        <p className="text-sm text-purple-200 mt-3 max-w-sm leading-relaxed">
          Discover verified discounts, exclusive brand coupons, and flash deals — all curated daily so you can save more, faster.
        </p>
      </div>

      {/* Quick links */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-purple-100">Quick Links</h4>
        <ul className="space-y-2 text-sm text-purple-200">
          <li><Link to="/about" className="hover:text-white hover:translate-x-1 inline-block transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-white hover:translate-x-1 inline-block transition">Contact</Link></li>
          <li><Link to="/privacy-policy" className="hover:text-white hover:translate-x-1 inline-block transition">Privacy Policy</Link></li>
          <li><Link to="/cookie-policy" className="hover:text-white hover:translate-x-1 inline-block transition">Cookie Policy</Link></li>
          <li><Link to="/imprint" className="hover:text-white hover:translate-x-1 inline-block transition">Imprint</Link></li>
          <li><Link to="/feedback" className="hover:text-white hover:translate-x-1 inline-block transition">Feedback</Link></li>
        </ul>
      </div>

      {/* Social media */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-purple-100">Connect with Us</h4>
        <div className="flex items-center gap-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/yourNumberHere"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition flex items-center justify-center"
          >
            <i className="fab fa-whatsapp text-2xl text-green-400 drop-shadow"></i>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/yourPageHere"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition flex items-center justify-center"
          >
            <i className="fab fa-facebook-f text-2xl text-blue-400 drop-shadow"></i>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/yourProfileHere"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition flex items-center justify-center"
          >
            <i className="fab fa-instagram text-2xl text-pink-400 drop-shadow"></i>
          </a>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="mt-10 border-t border-purple-700/50"></div>

    {/* Bottom row */}
    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-purple-300">
      <p>© {new Date().getFullYear()} <span className="font-semibold text-purple-100">Hop4Deals</span>. All rights reserved.</p>
      
    </div>
  </div>
</footer>

    </div>
  );
}
