"use client";
import Image from "next/image";
import { getStatusColor } from "./utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Helper component to truncate summary and show full text on hover
const TruncatedSummary = ({ text }) => {
  const maxLength = 40; // Increased maximum characters to display
  const truncated =
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help border-b border-dotted border-neutral-400 hover:border-blue-400 transition-colors duration-200">
            {truncated}
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-md dark:bg-neutral-800 text-sm p-3 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700 animate-in fade-in-50 duration-300"
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Helper component for file preview modal
const FilePreviewModal = ({ isOpen, onClose, fileUrl, fileName, fileType }) => {
  const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileUrl);
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(fileUrl);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-1 sm:p-2">
        <DialogHeader className="p-4">
          <DialogTitle className="text-lg font-semibold">
            {fileName}
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center bg-black/5 dark:bg-white/5 rounded-md overflow-hidden">
          {isImage ? (
            <div className="relative min-h-[300px] md:min-h-[500px] w-full">
              <img
                src={fileUrl}
                alt={fileName}
                className="object-contain w-full h-full"
                style={{ maxHeight: "70vh" }}
              />
            </div>
          ) : isVideo ? (
            <video
              src={fileUrl}
              controls
              className="w-full max-h-[70vh]"
              controlsList="nodownload"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="p-8 text-center">
              <p className="mb-2">Preview not available for this file type.</p>
              <a
                href={"https://" + fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Open file in new tab
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper component to display guidelines list with tooltip for full list
const GuidelinesList = ({ guidelines }) => {
  // Ensure guidelines is an array
  const guidelineArray = Array.isArray(guidelines)
    ? guidelines
    : guidelines
    ? [guidelines]
    : [];

  if (guidelineArray.length === 0)
    return <span className="text-neutral-400">-</span>;

  // Show first item with count if there are multiple
  const displayText =
    guidelineArray.length > 1
      ? `${guidelineArray[0]} +${guidelineArray.length - 1} more`
      : guidelineArray[0];

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help flex items-center space-x-1 group">
            <span className="border-b border-dotted border-neutral-400 group-hover:border-blue-400 transition-colors duration-200">
              {displayText}
            </span>
            {guidelineArray.length > 1 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                {guidelineArray.length}
              </span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          align="start"
          className="max-w-md dark:bg-neutral-800 text-sm p-3 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700 animate-in fade-in-50 duration-300"
        >
          <ul className="list-disc pl-5 space-y-1.5">
            {guidelineArray.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const DocumentRow = ({ doc, onShowConflicts }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate score color and style
  const getScoreStyle = (score) => {
    if (score === "-") return {};

    const scoreNum = parseInt(score);
    let colorClass = "text-red-600";
    let bgClass = "bg-red-100 dark:bg-red-900/30";

    if (scoreNum >= 80) {
      colorClass = "text-green-600 dark:text-green-400";
      bgClass = "bg-green-100 dark:bg-green-900/30";
    } else if (scoreNum >= 70) {
      colorClass = "text-yellow-600 dark:text-yellow-400";
      bgClass = "bg-yellow-100 dark:bg-yellow-900/30";
    }

    return { colorClass, bgClass };
  };

  const hasConflicts = doc.conflicts && doc.conflicts.length > 0;
  const { colorClass, bgClass } = getScoreStyle(doc.score);

  // Get file URL for viewing
  const fileUrl =
    doc.fileType === "website"
      ? doc.fileUrl
      : `http://34.61.235.3/api/v1/file/${doc.fileUrl.split("/").pop()}`;

  // Determine file type for preview handling
  const fileExtension = doc.document_name.split(".").pop().toLowerCase();
  const fileType = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(doc.document_name)
    ? "image"
    : /\.(mp4|webm|ogg|mov)$/i.test(doc.document_name)
    ? "video"
    : "other";

  return (
    <>
      <tr
        className="group transition-colors duration-200 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 border-b border-neutral-200 dark:border-neutral-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div
              className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md ${
                isHovered
                  ? "bg-blue-100 dark:bg-blue-900/40"
                  : "bg-neutral-100 dark:bg-neutral-800"
              } transition-colors duration-200`}
            >
              <Image
                src="/file.svg"
                alt="Document"
                width={24}
                height={24}
                className={`transition-transform ${
                  isHovered ? "scale-110 dark:invert-[0.85]" : "dark:invert"
                }`}
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-200">
                {doc.document_name}
              </div>
              <div className="text-xs text-neutral-500">{doc.fileType}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <div className="flex flex-col">
            <span>{doc.uploadedDate}</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
              doc.status
            )} transition-all duration-200 group-hover:shadow-sm`}
          >
            {doc.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {doc.score !== "-" ? (
            <div
              className={`flex items-center rounded-md px-2.5 py-1 ${bgClass} transition-all duration-200`}
            >
              <span className={`font-medium ${colorClass}`}>{doc.score}</span>
              <span className="text-xs text-neutral-500 ml-1">/100</span>
            </div>
          ) : (
            <span className="text-neutral-400">-</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="inline-flex items-center space-x-1 px-3 py-1.5 text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900/40 dark:hover:bg-blue-800/60 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <span>View</span>
          </button>

          {/* File Preview Modal */}
          <FilePreviewModal
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            fileUrl={fileUrl}
            fileName={doc.document_name}
            fileType={fileType}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <button
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-colors duration-200 
              ${
                hasConflicts
                  ? "text-amber-700 bg-amber-100 hover:bg-amber-200 dark:text-amber-300 dark:bg-amber-900/40 dark:hover:bg-amber-800/60"
                  : "text-green-700 bg-green-100 hover:bg-green-200 dark:text-green-300 dark:bg-green-900/40 dark:hover:bg-green-800/60"
              }`}
            aria-label="View conflicts"
            title="View conflicts with regulations"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              {hasConflicts ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              )}
            </svg>
            <span className="font-medium">
              {hasConflicts ? doc.conflicts.length : "None"}
            </span>
          </button>
        </td>
        <td className="px-6 py-4 max-w-xs text-sm text-neutral-600 dark:text-neutral-300">
          {doc.summary ? (
            <TruncatedSummary text={doc.summary} />
          ) : (
            <span className="text-neutral-400">-</span>
          )}
        </td>
        <td className="px-6 py-4 max-w-xs text-sm">
          <GuidelinesList guidelines={doc.guidelines} />
        </td>
      </tr>

      {/* Modal for viewing conflicts */}
      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        className="relative z-50"
      >
        <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {hasConflicts ? "View Conflicts" : "No Conflicts Detected"}
            </DialogTitle>
          </DialogHeader>

          {hasConflicts ? (
            <div className="mt-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                This document has conflicts with the following regulations:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                {doc.conflicts.map((conflict, index) => (
                  <li key={index} className="text-sm">
                    {conflict}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                There are no conflicts detected for this document.
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal for file preview */}
      <FilePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        fileUrl={fileUrl}
        fileName={doc.document_name}
        fileType={fileType}
      />
    </>
  );
};

export default DocumentRow;
