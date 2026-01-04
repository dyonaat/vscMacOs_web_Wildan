import { WindowControls } from "#components/index.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { Download } from "lucide-react";
import { Document, Page, pdfjs} from 'react-pdf';
import React from 'react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


const Resume = ({ setWindowSize }) => {
    const [numPages, setNumPages] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    // Set a portrait-oriented window size for better PDF viewing without scroll
    React.useEffect(() => {
        if (setWindowSize && numPages) {
            // Calculate height based on number of pages (assuming ~800px per page + margins)
            const pageHeight = 800; // Approximate height per page
            const headerHeight = 60; // Window header height
            const padding = 32; // Container padding
            const totalHeight = (numPages * pageHeight) + headerHeight + padding;
            setWindowSize(600, Math.min(totalHeight, window.innerHeight * 0.9));
        } else if (setWindowSize && !numPages) {
            // Initial size before PDF loads
            setWindowSize(600, 700);
        }
    }, [setWindowSize, numPages]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setLoading(false);
    };

    const onDocumentLoadError = (error) => {
        console.error('Error loading PDF:', error);
        setLoading(false);
    };

    return (
    <>
    <div id="window-header">
        <WindowControls target ="resume"/>
        <h1>Resume.pdf</h1>

        <a href="files/resume.pdf"
        download
        className="cursor-pointer"
        title="Download resume">
            <Download className="icon"/>
        </a>
    </div>
    <div className="flex-1 bg-gray-100 flex justify-center items-start">
        <div className="pdf-container w-full h-auto p-4">
            {loading && (
                <div className="flex justify-center items-center h-full">
                    <div className="text-gray-600">Loading PDF...</div>
                </div>
            )}
            <div className="flex flex-col items-center space-y-4">
                <Document 
                    file="files/resume.pdf" 
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    className="shadow-lg"
                >
                    {numPages && Array.from(new Array(numPages), (el, index) => (
                        <Page 
                            key={`page_${index + 1}`}
                            pageNumber={index + 1} 
                            renderTextLayer
                            renderAnnotationLayer
                            width={480}
                            className="bg-white mb-4 shadow-md"
                        />
                    ))}
                </Document>
            </div>
        </div>
    </div>
    </>
    );
};

const ResumeWindow= WindowWrapper(Resume, "resume");
export default ResumeWindow;