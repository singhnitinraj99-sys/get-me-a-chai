import { fetchAllCreators } from "@/actions/useractions";
import Link from "next/link";

export const metadata = {
  title: "Creators - Get Me A Chai",
  description: "Discover creators and support your favourites with a chai.",
};

export default async function CreatorsPage() {
  const creators = await fetchAllCreators();

  return (
    <div className="text-white min-h-screen px-4 py-12 max-w-6xl mx-auto">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
          Discover Creators
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
          Support your favourite creators with a chai. Every cup counts.
        </p>
        <div className="w-full max-w-xs mx-auto h-px bg-white opacity-10 mt-6"></div>
      </div>

      {/* Stats bar */}
      <div className="flex justify-center gap-8 mb-10 text-center">
        <div>
          <p className="text-2xl font-bold text-purple-400">{creators.length}</p>
          <p className="text-slate-400 text-xs mt-1">Creators</p>
        </div>
        <div className="w-px bg-slate-700"></div>
        <div>
          <p className="text-2xl font-bold text-emerald-400">
            ₹{creators.reduce((s, c) => s + c.totalAmount, 0).toLocaleString("en-IN")}
          </p>
          <p className="text-slate-400 text-xs mt-1">Total raised</p>
        </div>
        <div className="w-px bg-slate-700"></div>
        <div>
          <p className="text-2xl font-bold text-blue-400">
            {creators.reduce((s, c) => s + c.totalCount, 0)}
          </p>
          <p className="text-slate-400 text-xs mt-1">Chais given</p>
        </div>
      </div>

      {/* Creators grid */}
      {creators.length === 0 ? (
        <div className="text-center py-24 text-slate-500">
          <div className="text-5xl mb-4">☕</div>
          <p>No creators yet. Be the first to sign up!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {creators.map((creator, index) => (
            <Link key={creator.username} href={`/${creator.username}`}>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-600 hover:bg-slate-800/60 transition-all duration-200 cursor-pointer group">

                <div className="flex items-center gap-4">
                  {/* Rank badge */}
                  <div className={`
                    flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                    ${index === 0 ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : ""}
                    ${index === 1 ? "bg-slate-400/20 text-slate-300 border border-slate-400/30" : ""}
                    ${index === 2 ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : ""}
                    ${index > 2 ? "bg-slate-800 text-slate-500 border border-slate-700" : ""}
                  `}>
                    {index + 1}
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-slate-700 border-2 border-slate-700 group-hover:border-purple-500/50 transition-colors">
                    <img
                      src={creator.profilepic || "/man.jpg"}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                      {creator.name}
                    </p>
                    <p className="text-slate-500 text-xs truncate">@{creator.username}</p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 text-xs">☕</span>
                    <span className="text-slate-400 text-xs">{creator.totalCount} chais</span>
                  </div>
                  <div>
                    {creator.totalAmount > 0 ? (
                      <span className="text-emerald-400 font-semibold text-sm">
                        ₹{creator.totalAmount.toLocaleString("en-IN")}
                      </span>
                    ) : (
                      <span className="text-slate-600 text-xs">No payments yet</span>
                    )}
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}