"use client";
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';

const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" });
    const [currentUser, setcurrentUser] = useState(null);
    const [payments, setPayments] = useState([]);
    const [overallStats, setOverallStats] = useState({ totalCount: 0, totalAmount: 0 });

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (username) {
            getData();
        }
    }, [username]);

    useEffect(() => {
        if (searchParams?.get("paymentdone") === "true") {
            toast('Thanks for your donation!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
            getData();
            router.replace(`/${username}`);
        }
    }, [searchParams]);

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
    };

    const getData = async () => {
        try {
            let u = await fetchuser(username);
            if (u) {
                setcurrentUser(u);
                let res = await fetchpayments(username);

                if (res && Array.isArray(res.leaderboard)) {
                    setPayments(res.leaderboard);
                } else if (Array.isArray(res)) {
                    setPayments(res);
                } else {
                    setPayments([]);
                }

                setOverallStats({
                    totalCount: res?.totalCount || 0,
                    totalAmount: res?.totalAmount || 0
                });
            } else {
                setcurrentUser({});
                setPayments([]);
                setOverallStats({ totalCount: 0, totalAmount: 0 });
            }
        } catch (error) {
            console.error("Error loading profile data:", error);
            setcurrentUser({});
            setPayments([]);
        }
    };

    const pay = async (amount) => {
        try {
            // Safety check — script may not have loaded yet on slow devices
            if (typeof window === "undefined" || !window.Razorpay) {
                toast.error("Payment system is still loading, please try again in a moment.", {
                    position: "top-right",
                    autoClose: 4000,
                });
                return;
            }

            let a = await initiate(amount, username, paymentform);
            let orderId = a.id;
            var options = {
                "key": currentUser?.razorpayid,
                "amount": amount,
                "currency": "INR",
                "name": "Get Me A Chai",
                "description": "Test Transaction",
                "order_id": orderId,
                "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
                "prefill": {
                    "name": paymentform.name,
                    "email": "",
                    "contact": ""
                },
                "theme": { "color": "#3399cc" }
            };

            // Declared BEFORE options.modal so the closure can safely reference it
            var rzp1 = new window.Razorpay(options);

            rzp1.on("payment.error", function () {
                rzp1 = null;
            });

            rzp1.open();
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
            });
        }
    };

    if (!currentUser) {
        return (
            <div className="flex justify-center items-center min-h-screen text-white">
                <div className="text-center">
                    <div className="text-5xl mb-4">☕</div>
                    <p className="text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />

            {/* Cover */}
            <div className='cover w-full relative'>
                <img
                    className='object-cover w-full h-40 sm:h-64 md:h-80 lg:h-[350px]'
                    src={currentUser?.coverpic || "/banner.gif"}
                    alt="coverpic"
                />
                <div className='absolute -bottom-12 left-1/2 -translate-x-1/2 border-white border-4 overflow-hidden rounded-full w-24 h-24 sm:w-36 sm:h-36'>
                    <img
                        className='rounded-full object-cover w-full h-full'
                        src={currentUser?.profilepic || "/man.jpg"}
                        alt="profilepic"
                    />
                </div>
            </div>

            {/* Info */}
            <div className="info max-w-6xl mx-auto px-4 pt-16 pb-12 flex justify-center items-center flex-col gap-2 text-white">
                <div className='font-bold text-xl sm:text-2xl md:text-3xl'>@{username}</div>
                <div className='text-slate-400 text-xs sm:text-sm md:text-base text-center'>Lets help {username} get a chai!</div>

                <div className='text-slate-400 text-xs sm:text-sm md:text-base font-medium bg-slate-800/40 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-slate-700/50 mt-1'>
                    {overallStats?.totalCount || 0} {(overallStats?.totalCount === 1) ? 'Payment' : 'Payments'} · ₹{(overallStats?.totalAmount || 0).toLocaleString('en-IN')} raised
                </div>

                {/* RESPONSIVE CONTAINER: Stacks vertically on mobile/Moto G35, shifts to parallel columns on tablets (md) and desktops (lg) */}
                <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 items-start">

                    {/* Left Box: Supporters */}
                    <div className="bg-slate-900 rounded-2xl text-white p-4 sm:p-6 md:p-8 border border-slate-800/60 shadow-xl h-full">
                        <h2 className='text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-5 border-b border-slate-800 pb-2'>Top 10 Supporters</h2>
                        <ul className='space-y-2.5 max-h-[420px] overflow-y-auto pr-1'>
                            {(!payments || payments.length === 0) && (
                                <li className='text-slate-400 text-xs sm:text-sm text-center py-4'>No payments yet</li>
                            )}
                            {payments && payments.map((p, i) => (
                                <li key={i} className='flex gap-2.5 items-start bg-slate-800/60 p-3 sm:p-4 rounded-xl text-xs sm:text-sm md:text-base border border-slate-700/30 transition-all hover:bg-slate-800'>
                                    <img width={32} src="avatar.gif" alt="user avatar" className='rounded-full mt-0.5 flex-shrink-0' />
                                    <span className='leading-relaxed'>
                                        <span className='text-purple-400 font-medium'>{p.name}</span> donated <span className='font-bold text-emerald-400'>₹{p.amount}</span> with a message &quot;<span className='text-slate-300 italic'>{p.message}</span>&quot;
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Box: Make Payment */}
                    <div className="bg-slate-900 rounded-2xl text-white p-4 sm:p-6 md:p-8 border border-slate-800/60 shadow-xl h-full">
                        <h2 className='text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-5 border-b border-slate-800 pb-2'>Make a Payment</h2>
                        <div className='flex gap-3 flex-col'>
                            <input
                                onChange={handleChange}
                                value={paymentform.name}
                                name='name'
                                type="text"
                                className='w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-purple-500 outline-none text-white text-xs sm:text-sm md:text-base placeholder-slate-500 transition-colors'
                                placeholder='Enter Name'
                            />
                            <input
                                onChange={handleChange}
                                value={paymentform.message}
                                name='message'
                                type="text"
                                className='w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-purple-500 outline-none text-white text-xs sm:text-sm md:text-base placeholder-slate-500 transition-colors'
                                placeholder='Enter Message'
                            />
                            <input
                                onChange={handleChange}
                                value={paymentform.amount}
                                name="amount"
                                type="text"
                                className='w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-purple-500 outline-none text-white text-xs sm:text-sm md:text-base placeholder-slate-500 transition-colors'
                                placeholder='Enter Amount'
                            />
                            <button
                                onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                                disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}
                                type="button"
                                className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-600 hover:opacity-95 font-semibold rounded-xl text-sm sm:text-base md:text-lg py-3 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.99]"
                            >
                                Pay ₹{paymentform.amount || 0}
                            </button>

                            {/* Quick Pay Buttons */}
                            <div className='grid grid-cols-3 gap-2 mt-1.5'>
                                <button
                                    className='bg-slate-800 p-2.5 rounded-xl disabled:opacity-40 hover:bg-slate-700 text-xs sm:text-sm font-medium border border-slate-700/40 transition-colors active:scale-95'
                                    onClick={() => pay(1000)}
                                    disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4}
                                >₹10</button>
                                <button
                                    className='bg-slate-800 p-2.5 rounded-xl disabled:opacity-40 hover:bg-slate-700 text-xs sm:text-sm font-medium border border-slate-700/40 transition-colors active:scale-95'
                                    onClick={() => pay(2000)}
                                    disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4}
                                >₹20</button>
                                <button
                                    className='bg-slate-800 p-2.5 rounded-xl disabled:opacity-40 hover:bg-slate-700 text-xs sm:text-sm font-medium border border-slate-700/40 transition-colors active:scale-95'
                                    onClick={() => pay(3000)}
                                    disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4}
                                >₹30</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default PaymentPage;