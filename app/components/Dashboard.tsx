"use client";

import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import {
    Award,
    CheckCircle,
    XCircle,
    Lightbulb,
} from "lucide-react";

type Analysis = {
    atsScore: number;
    matchScore: number;

    breakdown: {
        skills: number;
        keywords: number;
        projects: number;
        education: number;
        formatting: number;
    };
    sectionScores: {
        skills: number;
        projects: number;
        experience: number;
        education: number;
        formatting: number;
    };

    sectionFeedback: {
        skills: string;
        projects: string;
        experience: string;
        education: string;
        formatting: string;
    };
    summary?: string;

    strengths: string[];

    matchingSkills: string[];

    missingSkills: string[];

    foundKeywords: string[];

    missingKeywords: string[];

    resumeRewrite: {
        original: string;
        improved: string;
    }[];

    suggestions: string[];
};
type DashboardProps = {
    analysis: Analysis;
};

export default function Dashboard({ analysis }: DashboardProps) {
    return (
        <div className="space-y-8">

            {/* ATS Score */}

            <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 rounded-3xl shadow-2xl p-10 text-white">

                <div className="flex items-center justify-center gap-3 mb-8">
                    <Award size={34} />

                    <h2 className="text-3xl font-bold">
                        ATS Resume Score
                    </h2>
                </div>

                <div className="w-56 h-56 mx-auto">
                    <CircularProgressbar
                        value={analysis.atsScore}
                        text={`${analysis.atsScore}%`}
                        styles={buildStyles({
                            pathColor:
                                analysis.atsScore >= 80
                                    ? "#22c55e"
                                    : analysis.atsScore >= 60
                                        ? "#facc15"
                                        : "#ef4444",

                            trailColor: "#233876",
                            textColor: "#ffffff",
                            textSize: "16px",
                        })}
                    />
                </div>

                <h3 className="text-center mt-8 text-2xl font-bold">
                    {analysis.atsScore >= 80
                        ? "Excellent Resume"
                        : analysis.atsScore >= 60
                            ? "Good Resume"
                            : "Needs Improvement"}
                </h3>

            </div>

            {/* Resume Match Score */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
                    ATS Breakdown
                </h2>
                {[
                    { label: "Skills Match", value: analysis.breakdown.skills },
                    { label: "Keyword Match", value: analysis.breakdown.keywords },
                    { label: "Projects", value: analysis.breakdown.projects },
                    { label: "Education", value: analysis.breakdown.education },
                    { label: "Formatting", value: analysis.breakdown.formatting },
                ].map((item, index) => (

                    <div key={index} className="mb-6">

                        <div className="flex justify-between mb-2">

                            <span className="font-bold text-gray-900">
                                {item.label}
                            </span>

                            <span className="font-bold text-blue-600">
                                {item.value}%
                            </span>

                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3">

                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-700"
                                style={{ width: `${item.value}%` }}
                            />

                        </div>

                    </div>

                ))}

            </div>
            {/* Summary */}

            {analysis.summary && (

                <div className="bg-white rounded-3xl shadow-xl p-8">

                    <h2 className="text-2xl font-black text-black">
                        AI Resume Summary
                    </h2>

                    <p className="text-black text-lg leading-8 font-semibold">
                        {analysis.summary}
                    </p>

                </div>

            )}

            {/* Matching Skills, Strengths & Missing Skills */}

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Matching Skills */}

                <div className="bg-white rounded-3xl shadow-xl p-8 min-h-[420px]">

                    <div className="flex items-center gap-3 mb-6">

                        <CheckCircle
                            className="text-green-600"
                            size={30}
                        />

                        <h2 className="text-2xl font-black text-black">
                            Matching Skills
                        </h2>

                    </div>

                    <div className="flex flex-wrap gap-3">

                        {analysis.matchingSkills.length ? (

                            analysis.matchingSkills.map((skill, index) => (

                                <span
                                    key={index}
                                    className="bg-green-100 text-green-700 border border-green-300 px-4 py-2 rounded-full font-bold"
                                >
                                    ✓ {skill}
                                </span>

                            ))

                        ) : (

                            <p className="text-gray-500">
                                No matching skills found.
                            </p>

                        )}


                    </div>

                </div>

                {/* Strengths */}

                <div className="bg-white rounded-3xl shadow-xl p-8 min-h-[420px]">

                    <div className="flex items-center gap-3 mb-6">

                        <CheckCircle
                            className="text-green-600"
                            size={30}
                        />

                        <h2 className="text-2xl font-black text-black">
                            Strengths
                        </h2>

                    </div>

                    <div className="space-y-4">

                        {analysis.strengths?.map((item, index) => (

                            <div
                                key={index}
                                className="bg-white border-l-4 border-green-500 rounded-xl shadow-md p-4 text-black text-base font-semibold leading-7"
                            >
                                ✅ {item}
                            </div>

                        ))}

                    </div>

                </div>

                {/* Missing Skills */}

                <div className="bg-white rounded-3xl shadow-xl p-8 min-h-[420px]">

                    <div className="flex items-center gap-3 mb-6">

                        <XCircle
                            className="text-red-600"
                            size={30}
                        />

                        <h2 className="text-2xl font-black text-black">
                            Missing Skills
                        </h2>

                    </div>

                    <div className="flex flex-wrap gap-3">

                        {analysis.missingSkills?.map((item, index) => (

                            <span
                                key={index}
                                className="bg-red-100 text-red-800 border border-red-300 px-4 py-2 rounded-full font-bold"
                            >
                                {item}
                            </span>

                        ))}

                    </div>

                </div>

            </div>
            {/* Resume Section Analysis */}

            <div className="bg-white rounded-3xl shadow-xl p-8">

                <h2 className="text-2xl font-black text-black">
                    Resume Section Analysis
                </h2>

                {[
                    {
                        name: "Skills",
                        score: analysis.sectionScores.skills,
                        feedback: analysis.sectionFeedback.skills,
                    },
                    {
                        name: "Projects",
                        score: analysis.sectionScores.projects,
                        feedback: analysis.sectionFeedback.projects,
                    },
                    {
                        name: "Experience",
                        score: analysis.sectionScores.experience,
                        feedback: analysis.sectionFeedback.experience,
                    },
                    {
                        name: "Education",
                        score: analysis.sectionScores.education,
                        feedback: analysis.sectionFeedback.education,
                    },
                    {
                        name: "Formatting",
                        score: analysis.sectionScores.formatting,
                        feedback: analysis.sectionFeedback.formatting,
                    },
                ].map((section, index) => (

                    <div key={index} className="mb-8">

                        <div className="flex justify-between mb-2">

                            <h3 className="font-black text-black">
                                {section.name}
                            </h3>

                            <span className="font-black text-blue-600">
                                {section.score}%
                            </span>

                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">

                            <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
                                style={{ width: `${section.score}%` }}
                            />

                        </div>

                        <p className="text-black">
                            {section.feedback}
                        </p>

                    </div>

                ))}

            </div>
            {/* Keyword Analysis */}

            <div className="bg-white rounded-3xl shadow-xl p-8">

                <h2 className="text-2xl font-black text-black">
                    Keyword Analysis
                </h2>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Found Keywords */}

                    <div>

                        <h3 className="text-xl font-bold text-green-700 mb-4">
                            Keywords Found
                        </h3>

                        <div className="flex flex-wrap gap-3">

                            {analysis.foundKeywords?.length ? (

                                analysis.foundKeywords.map((keyword, index) => (

                                    <span
                                        key={index}
                                        className="bg-green-100 text-green-700 border border-green-300 px-4 py-2 rounded-full font-bold"
                                    >
                                        {keyword}
                                    </span>

                                ))

                            ) : (

                                <p className="text-gray-500">
                                    No keywords found.
                                </p>

                            )}

                        </div>

                    </div>

                    {/* Missing Keywords */}

                    <div>

                        <h3 className="text-xl font-black text-red-700 mb-4">
                            ❌ Missing Keywords
                        </h3>

                        <div className="flex flex-wrap gap-3">

                            {analysis.missingKeywords?.length ? (

                                analysis.missingKeywords.map((keyword, index) => (

                                    <span
                                        key={index}
                                        className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-full font-bold"
                                    >
                                        {keyword}
                                    </span>

                                ))

                            ) : (

                                <p className="text-gray-500">
                                    No missing keywords.
                                </p>

                            )}

                        </div>

                    </div>

                </div>

            </div>

            {/* AI Resume Rewriter */}

            <div className="bg-white rounded-3xl shadow-xl p-8">

                <h2 className="text-2xl font-black text-black">
                    AI Resume Rewriter
                </h2>

                {analysis.resumeRewrite?.length ? (

                    analysis.resumeRewrite.map((item, index) => (

                        <div
                            key={index}
                            className="mb-8 border rounded-2xl p-6 bg-gray-50"
                        >

                            <div className="mb-4">

                                <h3 className="text-red-600 font-bold mb-2">
                                    ❌ Original
                                </h3>

                                <p className="text-gray-700">
                                    {item.original}
                                </p>

                            </div>

                            <div>

                                <h3 className="text-green-600 font-bold mb-2">
                                    ✅ AI Improved
                                </h3>

                                <p className="text-black font-medium">
                                    {item.improved}
                                </p>

                            </div>

                        </div>

                    ))

                ) : (

                    <p className="text-gray-500">
                        No resume rewrite suggestions available.
                    </p>

                )}

            </div>
            {/* Suggestions */}

            <div className="bg-white rounded-3xl shadow-xl p-8">

                <div className="flex items-center gap-3 mb-6">

                    <Lightbulb
                        className="text-yellow-500"
                        size={30}
                    />

                    <h2 className="text-2xl font-black text-black">
                        AI Suggestions
                    </h2>

                </div>

                <div className="space-y-4">

                    {analysis.suggestions?.map((item, index) => (

                        <div
                            key={index}
                            className="border-l-4 border-blue-600 bg-white rounded-xl shadow-md p-5 text-black text-base leading-8 font-medium"
                        >
                            💡 {item}
                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}