export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between px-10 py-5 shadow-md">
            <h1 className="text-2xl font-bold text-blue-600">
                AI Resume Analyzer
            </h1>

            <div className="flex gap-8">
                <a href="/" className="hover:text-blue-600">
                    Home
                </a>

                <a href="#about" className="hover:text-blue-600">
                    About
                </a>

                <a href="#upload" className="hover:text-blue-600">
                    Upload
                </a>
            </div>
        </nav>
    );
}