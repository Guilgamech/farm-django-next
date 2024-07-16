"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export const PdfViewer = ({ url }:{url:string}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="w-full min-h-[300px] lg:min-h-[340px] max-h-[340px] overflow-y-auto custom-scrolls border border-gray-500 shadow">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={url}  plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
};