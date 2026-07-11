import { NextResponse } from "next/server";
import { analyzeResume } from "@/app/lib/gemini";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const file = formData.get("resume") as File;
        const jobDescription =
            (formData.get("jobDescription") as string) || "";

        if (!file) {
            return NextResponse.json(
                {
                    success: false,
                    error: "No resume uploaded.",
                },
                {
                    status: 400,
                }
            );
        }

        console.log("Received File:", file.name);

        // Temporary Resume Text
        // Replace this later with real PDF extraction
        const resumeText = `
Name: ${file.name}

Skills:
Java
Python
React
Next.js
Node.js

Education:
B.Tech Computer Science

Projects:
AI Resume Analyzer

Experience:
Fresher
`;

        const analysis = await analyzeResume(
            resumeText,
            jobDescription
        );

        return NextResponse.json({
            success: true,
            analysis,
        });

    } catch (error) {
        console.error("Analyze Error:", error);

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown Error",
            },
            {
                status: 500,
            }
        );
    }
}