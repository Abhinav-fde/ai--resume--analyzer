"use client";

import { useState } from "react";
import Dashboard from "./Dashboard";
import jsPDF from "jspdf";


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

    summary: string;

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
export default function UploadCard() {
    const [fileName, setFileName] = useState("No file selected");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setSelectedFile(file);
        setFileName(file.name);
        setAnalysis(null);
    };

    const handleAnalyze = async () => {
        if (!selectedFile) {
            alert("Please select a resume first.");
            return;
        }

        setLoading(true);
        setLoadingText("Reading your resume...");

        const formData = new FormData();
        formData.append("resume", selectedFile);
        formData.append("jobDescription", jobDescription);

        try {
            console.log("Step 1: Sending request...");

            const response = await fetch("/api/analyze", {
                method: "POST",
                body: formData,
            });

            console.log("Step 2: Response received");

            setLoadingText("AI is analyzing your resume...");

            const data = await response.json();

            console.log("Step 3: API Response");
            console.log(data);

            if (!data.success) {
                alert(data.error || "Analysis failed.");
                return;
            }

            const cleanJson = data.analysis
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            const parsed: Analysis = JSON.parse(cleanJson);

            console.log("Parsed JSON:");

            console.log(cleanJson);

            setLoadingText(" Calculating ATS Score...");

            setAnalysis(parsed);
        } catch (error) {
            console.error(error);
            alert("Something went wrong while analyzing the resume.");
        } finally {
            setLoading(false);
        }
    };
    const downloadPDF = () => {
        if (!analysis) return;

        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("AI Resume Analysis Report", 20, 20);

        doc.setFontSize(14);
        doc.text(`ATS Score: ${analysis.atsScore}%`, 20, 40);

        let y = 60;

        doc.text("Summary:", 20, y);
        y += 10;

        doc.text(analysis.summary, 20, y, {
            maxWidth: 170,
        });

        y += 25;

        doc.text("Strengths:", 20, y);

        analysis.strengths.forEach((item) => {
            y += 10;
            doc.text("• " + item, 25, y);
        });

        y += 15;

        doc.text("Missing Skills:", 20, y);

        analysis.missingSkills.forEach((item) => {
            y += 10;
            doc.text("• " + item, 25, y);
        });

        y += 15;

        doc.text("Suggestions:", 20, y);

        analysis.suggestions.forEach((item) => {
            y += 10;
            const lines = doc.splitTextToSize(item, 160);
            doc.text(lines, 25, y);
            y += lines.length * 8;
        });

        doc.save("Resume_Analysis_Report.pdf");
    };


    return (
        <section
            id="upload"
            className="min-h-screen py-20 relative overflow-hidden
            bg-gradient-to-br
            from-[#0f172a]
            via-[#1e1b4b]
             to-[#312e81]"

        >
            <div className="absolute inset-0 -z-10">

                <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[140px]" />

                <div className="absolute bottom-10 right-20 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[180px]" />

                <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />

            </div>

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-10">

                    {/* LEFT PANEL */}

                    <div className="backdrop-blur-2xl
bg-white/10
border border-white/20
rounded-3xl
shadow-[0_8px_32px_rgba(0,0,0,0.35)]
p-10
transition-all
duration-300
hover:scale-[1.02]
hover:border-blue-400/40">

                        <h2 className="text-4xl font-bold text-center mb-8">
                            Upload Resume
                        </h2>

                        <label
                            htmlFor="resume"
                            className="border-2 border-dashed border-blue-500 rounded-2xl p-12 flex flex-col items-center cursor-pointer hover:bg-blue-50 transition"
                        >

                            <h3 className="text-2xl font-semibold">
                                Drag & Drop Resume
                            </h3>

                            <p className="text-gray-500 my-5">
                                OR
                            </p>

                            <span className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold">
                                Choose Resume
                            </span>

                        </label>

                        <input
                            id="resume"
                            type="file"
                            accept=".pdf,application/pdf"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        <div className="mt-6 text-center">

                            <p className="font-semibold">
                                Selected File
                            </p>

                            <p className="text-blue-600 mt-2 break-all">
                                {fileName}
                            </p>

                        </div>
                        <div className="mt-8">
                            <label className="block text-left text-lg font-bold mb-3">
                                Job Description
                            </label>

                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the job description here..."
                                rows={8}
                                className="w-full rounded-xl border-2 border-gray-300 p-4 focus:border-blue-500 focus:outline-none resize-none"
                            />
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-4 rounded-xl text-lg font-bold hover:scale-105 transition disabled:opacity-50"
                        >
                            {loading ? "AI Working." : "Analyze Resume"}
                        </button>

                    </div>

                    {/* RIGHT PANEL */}

                    {/* RIGHT PANEL */}

                    <div>

                        {loading ? (

                            <div className="bg-white rounded-3xl shadow-2xl h-full min-h-[520px] flex flex-col justify-center items-center p-10">

                                <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-blue-600"></div>

                                <h2 className="text-3xl font-bold mt-8">
                                    AI Resume Analyzer
                                </h2>

                                <p className="text-xl text-blue-700 mt-6 font-semibold">
                                    {loadingText}
                                </p>

                                <div className="w-full bg-gray-200 rounded-full h-3 mt-10">
                                    <div className="bg-blue-600 h-3 rounded-full animate-pulse w-3/4"></div>
                                </div>

                                <p className="text-gray-500 mt-6">
                                    This usually takes 5–10 seconds...
                                </p>

                            </div>

                        ) : analysis ? (

                            <>

                                <Dashboard analysis={analysis} />

                                <div className="mt-6">
                                    <button
                                        onClick={downloadPDF}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold"
                                    >
                                        📥 Download PDF Report
                                    </button>
                                </div>
                            </>

                        ) : (

                            <div className="bg-white rounded-3xl shadow-2xl h-full min-h-[520px] flex flex-col justify-center items-center p-10">

                                <h2 className="text-4xl font-bold">
                                    AI Resume Analyzer
                                </h2>

                                <p className="mt-6 text-gray-500 text-lg text-center">
                                    Upload your resume and click
                                    <br />
                                    <strong>Analyze Resume</strong>
                                    <br />
                                    to receive your AI ATS report.
                                </p>

                            </div>

                        )}

                    </div>
                </div>

            </div>

        </section >
    );
}