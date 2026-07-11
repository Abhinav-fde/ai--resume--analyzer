"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    AI Resume Analyzer
                </h1>

                <div className="flex items-center gap-10">

                    <Link
                        href="/"
                        className="text-white hover:text-cyan-400 transition font-medium"
                    >
                        Home
                    </Link>

                    <Link
                        href="#upload"
                        className="text-white hover:text-cyan-400 transition font-medium"
                    >
                        Upload
                    </Link>

                </div>

            </div>
        </nav>
    );
}