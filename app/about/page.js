import React from 'react';

export const metadata = {
    title: "About - Get Me A Chai",
    description: "Learn more about Get Me A Chai - A crowdfunding platform built exclusively for creators.",
};

const About = () => {
    return (
        <div className="bg-slate-950 text-white min-h-screen">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center flex flex-col items-center gap-4">
                <div className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-4 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                    Our Mission
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                    About Get Me a Chai
                </h1>
                <p className="text-slate-400 text-sm md:text-base md:leading-relaxed max-w-2xl mt-2">
                    Get Me a Chai is a fast, seamless crowdfunding platform built exclusively for modern creators to monetize their projects with the direct support of their audience. It's a space where your community can explicitly contribute to your creative journey—one cup of chai at a time.
                </p>
                <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mt-6"></div>
            </div>

            {/* How It Works Section */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-8 tracking-tight">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card 1 */}
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex gap-4 items-start shadow-xl">
                        <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl w-12 h-12 flex items-center justify-center text-xl shadow-md flex-shrink-0">
                            🤝
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-100 mb-1">Fans Want to Collaborate</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Your audience values what you create. They are enthusiastic about actively backing your vision, contributing to project milestones, and keeping your creative independent space alive.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex gap-4 items-start shadow-xl">
                        <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl w-12 h-12 flex items-center justify-center text-xl shadow-md flex-shrink-0">
                            ☕
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-100 mb-1">Support Through Chai</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Receive micro-donations dynamically styled as buying a simple hot cup of chai. Micro-funding breaks down psychological walls, resulting in much higher overall conversion rates.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Benefits Bento Grid */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-8 tracking-tight">The Ecosystem</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Block 1: For Creators */}
                    <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl md:col-span-1 shadow-lg flex flex-col justify-between">
                        <div>
                            <div className="text-xl mb-3">🎨</div>
                            <h3 className="text-lg font-bold mb-2 text-purple-400">Benefits for Creators</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                Secure direct revenue paths, communicate updates cleanly with core fans, and keep full operational control over your platform setup.
                            </p>
                        </div>
                        <div className="text-xs text-slate-500 font-mono tracking-wider uppercase border-t border-slate-800/60 pt-3">
                            Direct Funding
                        </div>
                    </div>

                    {/* Block 2: For Fans */}
                    <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl md:col-span-1 shadow-lg flex flex-col justify-between">
                        <div>
                            <div className="text-xl mb-3">⭐</div>
                            <h3 className="text-lg font-bold mb-2 text-blue-400">Benefits for Fans</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                Directly fuel the growth of the media assets you love. Unlock unique dashboard message visibility adjustments and custom badges.
                            </p>
                        </div>
                        <div className="text-xs text-slate-500 font-mono tracking-wider uppercase border-t border-slate-800/60 pt-3">
                            Closer Connection
                        </div>
                    </div>

                    {/* Block 3: Collaboration */}
                    <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl md:col-span-1 shadow-lg flex flex-col justify-between">
                        <div>
                            <div className="text-xl mb-3">🚀</div>
                            <h3 className="text-lg font-bold mb-2 text-emerald-400">Collaboration Potential</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                Find like-minded developers, designers, or writers within a centralized, premium community node to form production partnerships.
                            </p>
                        </div>
                        <div className="text-xs text-slate-500 font-mono tracking-wider uppercase border-t border-slate-800/60 pt-3">
                            Network Growth
                        </div>
                    </div>

                    {/* Block 4: Community Engagement (Wide Card) */}
                    <div className="bg-slate-900/30 border border-slate-800/60 p-6 rounded-2xl md:col-span-2 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="max-w-md">
                            <h3 className="text-base font-bold mb-1 text-slate-200">Community Engagement</h3>
                            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                                Join active discussions and construct meaningful creator connections with absolute focus. Receive constructive peers' guidance inside a supportive network space.
                            </p>
                        </div>
                        <div className="bg-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 border border-slate-700/50 self-start md:self-auto flex-shrink-0">
                            10,000+ Strong
                        </div>
                    </div>

                    {/* Block 5: Recognition & Resources */}
                    <div className="bg-slate-900/30 border border-slate-800/60 p-6 rounded-2xl md:col-span-1 shadow-lg flex flex-col justify-between">
                        <div>
                            <h3 className="text-base font-bold mb-1 text-slate-200">Global Exposure</h3>
                            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-3">
                                Gain immense credibility, scale a clean public developer portfolio, and show off transaction history metrics seamlessly.
                            </p>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono uppercase tracking-widest">
                            Global Reach
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Global CTA */}
            <div className="max-w-4xl mx-auto text-center py-16 px-6">
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
                    {/* Background Ambient Glow decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>

                    <h2 className="text-xl md:text-3xl font-extrabold text-white mb-2">
                        Ready to Build Your Fan Economy?
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto mb-6">
                        Stop dealing with high platform deductions and complicated payout delays. Get started free in less than a minute.
                    </p>
                    <a href="/login" className="inline-block bg-gradient-to-br from-purple-600 to-blue-500 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full hover:opacity-95 shadow-lg active:scale-[0.99] transition-all">
                        Launch Your Page Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;