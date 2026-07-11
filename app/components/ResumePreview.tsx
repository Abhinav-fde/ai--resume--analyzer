"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc =
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type Props = {
    file: File | null;
};

export default function ResumePreview({ file }: Props) {
    const [numPages, setNumPages] = useState(0);

    if (!file) return null;

    return (
        <div className="bg-white rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-6">
                📄 Resume Preview
            </h2>

            <Document
                file={file}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
                <Page
                    pageNumber={1}
                    width={500}
                />
            </Document>

            <p className="mt-4 text-gray-500">
                Pages: {numPages}
            </p>

        </div>
    );
}