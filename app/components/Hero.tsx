export default function Hero() {
    return (
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-blue-50 to-white">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
                AI Resume Analyzer
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-gray-600">
                Upload your resume, compare it with any job description, and get
                AI-powered insights to improve your chances of getting hired.
            </p>

            <button className="mt-8 rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition">
                Analyze Resume
            </button>
        </section>
    );
}