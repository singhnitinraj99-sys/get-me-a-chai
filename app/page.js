import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex justify-center flex-col items-center gap-6 text-white min-h-[50vh] px-4 text-center">
        <div className="font-bold flex flex-wrap gap-3 text-3xl md:text-5xl justify-center items-center">
          Buy Me a Chai
          <span><img src="/200.webp" width={60} height={60} alt="chai" className="inline" /></span>
        </div>

        <p className="text-gray-400 text-sm md:text-base max-w-xl">
          A crowdfunding platform for creators. Get funded by your fans and followers. Start now!
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/login">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-full font-medium text-sm px-6 py-2.5 hover:opacity-90 transition-opacity">
              Start Now
            </button>
          </Link>
          <Link href="/about">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-full font-medium text-sm px-6 py-2.5 hover:opacity-90 transition-opacity">
              Read More
            </button>
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full max-w-2xl h-px bg-white opacity-10 mt-2"></div>
      </div>

      {/* Section 1 - Your fans can buy you a chai */}
      <div className="text-white container mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Your fans can buy you a chai
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">

          <div className="flex flex-col items-center gap-3">
            <div className="bg-slate-800 rounded-full p-4 w-24 h-24 flex items-center justify-center">
              <img src="/man.jpg" alt="Fund Yourself" className="rounded-full w-full h-full object-cover" />
            </div>
            <p className="font-bold text-lg">Fund Yourself</p>
            <p className="text-gray-400 text-sm">Your fans are available for you to help you</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="bg-slate-800 rounded-full p-4 w-24 h-24 flex items-center justify-center">
              <img src="/coin.webp" alt="Earn Money" className="rounded-full w-full h-full object-cover" />
            </div>
            <p className="font-bold text-lg">Earn Money</p>
            <p className="text-gray-400 text-sm">Turn your passion into a steady income stream</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="bg-slate-800 rounded-full p-4 w-24 h-24 flex items-center justify-center">
              <img src="/group.webp" alt="Fans want to help" className="rounded-full w-full h-full object-cover" />
            </div>
            <p className="font-bold text-lg">Fans want to help</p>
            <p className="text-gray-400 text-sm">Your fans are available for you to help you</p>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-4xl mx-auto h-px bg-white opacity-10"></div>

      {/* Section 2 - Learn more about us (UPDATED WITH UNIQUE CONTENT & BETTER ICONS/FALLBACKS) */}
      <div className="text-white container mx-auto px-4 py-16">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Why over 10,000+ creators choose us
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">

          {/* Feature 1: Seamless Setup */}
          <div className="flex flex-col items-center gap-3 bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
            <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl w-16 h-16 flex items-center justify-center text-2xl shadow-lg">
              ⚡
            </div>
            <p className="font-bold text-xl mt-2">1-Minute Setup</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Claim your unique link, connect your custom Razorpay routing, and go live instantly. No complex configuration required.
            </p>
          </div>

          {/* Feature 2: Low Platform Fees */}
          <div className="flex flex-col items-center gap-3 bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
            <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl w-16 h-16 flex items-center justify-center text-2xl shadow-lg">
              💎
            </div>
            <p className="font-bold text-xl mt-2">Keep 100% Direct</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              We do not take standard revenue percentages out of your creative energy. Donations land directly in your registered dashboard safely.
            </p>
          </div>

          {/* Feature 3: Deep Personalization */}
          <div className="flex flex-col items-center gap-3 bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
            <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl w-16 h-16 flex items-center justify-center text-2xl shadow-lg">
              🎨
            </div>
            <p className="font-bold text-xl mt-2">Fully Personalized</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Upload custom banners, set up rapid quick-pay button thresholds, and display top supporters beautifully.
            </p>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-4xl mx-auto h-px bg-white opacity-10"></div>

      {/* Bottom CTA */}
      <div className="text-white text-center py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-400 text-sm md:text-base mb-6">Join thousands of creators and start receiving support today.</p>
        <Link href="/login">
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-full font-medium text-sm px-8 py-3 hover:opacity-90 transition-opacity">
            Get Started Free
          </button>
        </Link>
      </div>
    </>
  )
}