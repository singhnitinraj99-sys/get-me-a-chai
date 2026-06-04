"use client"
import React, { useState, useRef, useEffect } from 'react'
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowdropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="bg-gray-900 text-white flex flex-row justify-between px-6 items-center h-16 shadow-lg border-b border-gray-800">

      {/* Logo */}
      <Link href="/">
        <div className="font-bold text-xl tracking-tight flex items-center gap-2">
          <span className="text-purple-400">☕</span>
          <span>GetMeAChai!</span>
        </div>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-3">

        {session && (
          <div className="relative" ref={dropdownRef}>

            {/* Avatar + Email button */}
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors px-3 py-2 rounded-full border border-gray-700"
              type="button"
            >
              <img
                src={session.user.image || "/man.jpg"}
                alt="avatar"
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-200 max-w-[140px] truncate hidden sm:block">
                {session.user.email}
              </span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showdropdown ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            {showdropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">

                {/* User info header — username in bold */}
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm text-white truncate">
                    <span className="font-bold">@{session.user.username || session.user.email}</span>
                  </p>
                </div>

                {/* Menu items */}
                <ul className="py-1">
                  <li>
                    <Link
                      href="/dashboard"
                      onClick={() => setShowdropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      <span>🏠</span> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${session.user.username}`}
                      onClick={() => setShowdropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      <span>👤</span> Your Page
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/earnings"
                      onClick={() => setShowdropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      <span>💰</span> Earnings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/creators"
                      onClick={() => setShowdropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      <span>🌟</span> Creators
                    </Link>
                  </li>
                  <li className="border-t border-gray-700 mt-1">
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                    >
                      <span>🚪</span> Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {!session && (
          <div className="flex items-center gap-2">
            <Link href="/creators">
              <button
                type="button"
                className="text-gray-300 bg-transparent border border-gray-600 rounded-full font-medium text-sm px-4 py-2 hover:bg-gray-800 transition-colors"
              >
                Browse Creators
              </button>
            </Link>
            <Link href="/login">
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 border border-transparent rounded-full font-medium text-sm px-5 py-2 hover:opacity-90 transition-opacity"
              >
                Login
              </button>
            </Link>
          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar