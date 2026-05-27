import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchAllEarningsByEmail } from "@/actions/useractions";
import Link from "next/link";

export const metadata = {
    title: "Earnings Dashboard - Get Me A Chai",
    description: "Track your creators funding payouts, transaction analytics, and all supporter milestones.",
};

export default async function EarningsPage() {
    // 1. Fetch user session on the server side securely
    const session = await getServerSession(authOptions);

    // If not logged in, redirect or prompt to login
    if (!session || !session.user || !session.user.email) {
        return (
            <div className="bg-slate-950 min-h-[80vh] text-white flex items-center justify-center p-6">
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-sm text-center shadow-2xl flex flex-col items-center">
                    <div className="text-4xl mb-3">🔒</div>
                    <h2 className="text-xl font-bold mb-2">Access Denied</h2>
                    <p className="text-slate-400 text-sm mb-6">You must sign into your account to check financial performance dashboard insights.</p>
                    <Link href="/login" className="bg-gradient-to-br from-purple-600 to-blue-500 px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-95 transition-opacity w-full">
                        Sign In Now
                    </Link>
                </div>
            </div>
        );
    }

    // 2. Fetch financial variables using the user's secure immutable email
    const { payments, totalAmount, totalCount } = await fetchAllEarningsByEmail(session.user.email);

    return (
        <div className="bg-slate-950 text-white min-h-screen pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12">
                
                {/* Profile Heading summary */}
                <div className="mb-8 border-b border-slate-800/60 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">Earnings Dashboard</h1>
                        <p className="text-slate-400 text-xs sm:text-sm mt-1">
                            Real-time income telemetry logged securely for <span className="text-purple-400 font-medium">{session.user.email}</span>
                        </p>
                    </div>
                    <Link href={`/${session.user.username}`} className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-medium hover:bg-slate-800 transition-colors self-start md:self-auto">
                        View Public Page ↗
                    </Link>
                </div>

                {/* Grid Layout Row: High Performance Metric Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    
                    {/* Block 1: Gross Generated Revenue */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
                        <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-12 h-12 rounded-xl flex items-center justify-center text-xl">
                            ₹
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-mono tracking-wider uppercase">Total Raised</p>
                            <p className="text-2xl font-bold text-slate-100">₹{totalAmount.toLocaleString('en-IN')}</p>
                        </div>
                    </div>

                    {/* Block 2: Complete Transaction volume counts */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
                        <div className="bg-purple-500/10 text-purple-400 border border-purple-500/20 w-12 h-12 rounded-xl flex items-center justify-center text-xl">
                            ☕
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-mono tracking-wider uppercase">Chais Received</p>
                            <p className="text-2xl font-bold text-slate-100">{totalCount}</p>
                        </div>
                    </div>

                    {/* Block 3: Dynamic Average Support Multipliers */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
                        <div className="bg-blue-500/10 text-blue-400 border border-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center text-xl">
                            📈
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-mono tracking-wider uppercase">Average Ticket</p>
                            <p className="text-2xl font-bold text-slate-100">
                                ₹{totalCount > 0 ? Math.round(totalAmount / totalCount).toLocaleString('en-IN') : 0}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Detailed Receipts Record System */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
                        <h2 className="text-base sm:text-lg font-bold">Transaction Ledger History</h2>
                        <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md border border-slate-700/50">
                            Success status records
                        </span>
                    </div>

                    {/* Table element optimizes rendering for clean grids */}
                    <div className="overflow-x-auto w-full">
                        {payments.length === 0 ? (
                            <div className="text-center py-16 text-slate-500 flex flex-col items-center gap-2">
                                <span className="text-4xl">🍃</span>
                                <p className="text-sm">No transaction entries found matching your profile credentials yet.</p>
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse text-xs sm:text-sm">
                                <thead>
                                    <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider bg-slate-950/20">
                                        <th className="p-4 font-semibold">Supporter</th>
                                        <th className="p-4 font-semibold">Message</th>
                                        <th className="p-4 font-semibold">Date &amp; Time</th>
                                        <th className="p-4 font-semibold text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {payments.map((p) => {
                                        // Format the dynamic MongoDB timestamp to clean localized Indian string
                                        const paymentDate = p.createdAt 
                                            ? new Date(p.createdAt).toLocaleString('en-IN', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                              })
                                            : "N/A";

                                        return (
                                            <tr key={p._id} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="p-4 font-medium text-slate-200 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs">
                                                            👤
                                                        </div>
                                                        {p.name}
                                                    </div>
                                                </td>
                                                <td className="p-4 text-slate-400 min-w-[200px] max-w-xs md:max-w-md truncate">
                                                    {p.message || <span className="text-slate-600 italic">No message attached</span>}
                                                </td>
                                                {/* REPLACED COLUMN: Renders clean human readable date/time telemetry */}
                                                <td className="p-4 font-medium text-slate-400 whitespace-nowrap text-xs">
                                                    {paymentDate}
                                                </td>
                                                <td className="p-4 text-right font-bold text-emerald-400 whitespace-nowrap">
                                                    +₹{p.amount.toLocaleString('en-IN')}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}