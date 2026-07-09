"use client";

import { useState } from "react";

export default function UploadCard() {
    const [fileName, setFileName] = useState("No file selected");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setFileName(file.name);
        setSelectedFile(file);

    };
    const handleAnalyze = async () => {
        if (!selectedFile) {
            alert("Please select a resume first.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", selectedFile);

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            console.log("Response from API:", data);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <section
            id="upload"
            className="flex justify-center items-center py-20 bg-gray-100"
        >
            <div className="bg-white rounded-2xl shadow-lg p-10 w-[600px] text-center">

                <h2 className="text-3xl font-bold mb-6">
                    Upload Your Resume
                </h2>

                <label className="border-2 border-dashed border-blue-500 rounded-xl p-10 block cursor-pointer hover:bg-blue-50 transition">

                    <p className="text-lg font-medium">
                        Drag & Drop Resume Here
                    </p>

                    <p className="my-4 text-gray-500">
                        OR
                    </p>

                    <span className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                        Choose Resume
                    </span>

                    <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>

                <p className="mt-6 font-medium">
                    Selected File:
                </p>

                <p className="text-blue-600">
                    {fileName}
                </p>

                <button
                    onClick={handleAnalyze}
                    className="mt-8 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
                >
                    Analyze Resume
                </button>

            </div>
        </section>
    );
}