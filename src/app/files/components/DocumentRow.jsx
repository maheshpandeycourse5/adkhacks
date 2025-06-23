"use client";
import Image from "next/image";
import { getStatusColor } from "./utils";
import { regenerateContent } from "./api";
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
const FilePreviewModal = ({
  isOpen,
  onClose,
  fileUrl,
  fileName,
  fileType,
  docSummary = "",
  docSuggestions = [],
}) => {
  const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileUrl);
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(fileUrl);
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeView, setActiveView] = useState("image"); // image, original, generated

  const regenerateImageText = async () => {
    try {
      setIsGenerating(true);
      const content = docSummary || `Image content from ${fileName}`;
      const suggestions = Array.isArray(docSuggestions)
        ? docSuggestions
        : typeof docSuggestions === "string"
        ? [docSuggestions]
        : [];

      const result = await regenerateContent(content, suggestions);
      const generatedResult =
        result?.data?.regenerated_content ||
        result.content ||
        JSON.stringify(result);

      setGeneratedText(generatedResult);
      setIsGenerating(false);
      setActiveView("generated");
    } catch (error) {
      console.error("Error generating text from image:", error);
      setGeneratedText("Error generating text. Please try again.");
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-4 pb-2">
          <DialogTitle className="text-lg font-medium flex items-center gap-2">
            <span>{fileName}</span>
            <span className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded-full">
              {fileType}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-0">
          {isImage ? (
            <div className="space-y-4">
              {/* Tabs for navigation */}
              <div className="border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveView("image")}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${
                      activeView === "image"
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
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
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                      Image
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveView("original")}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${
                      activeView === "original"
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
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
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                      Original Content
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveView("generated")}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${
                      activeView === "generated"
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400"
                    } ${!generatedText ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!generatedText}
                  >
                    <span className="flex items-center gap-1.5">
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
                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                      </svg>
                      Generated Text
                    </span>
                  </button>

                  {!generatedText && (
                    <div className="ml-auto">
                      <button
                        onClick={regenerateImageText}
                        disabled={isGenerating}
                        className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isGenerating ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9.75M8.25 21h8.25"
                              />
                            </svg>
                            <span>Generate Text from Image</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Content area */}
              <div className="w-full relative" style={{ height: "60vh" }}>
                {/* Image view */}
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    activeView === "image"
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <div className="relative w-full h-full flex justify-center items-center p-2">
                    <img
                      src={fileUrl}
                      alt={fileName}
                      className="object-contain w-full h-full rounded-md"
                      style={{ maxHeight: "100%" }}
                    />
                  </div>
                </div>

                {/* Original Content view */}
                <div
                  className={`absolute inset-0 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md p-4 overflow-auto transition-all duration-300 ${
                    activeView === "original"
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <div className="h-full overflow-auto">
                    <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700">
                      Original Content
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap">
                      {docSummary ||
                        "No original content available for this document."}
                    </p>
                  </div>
                </div>

                {/* Generated Text view */}
                <div
                  className={`absolute inset-0 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md p-4 overflow-auto transition-all duration-300 ${
                    activeView === "generated"
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  {generatedText ? (
                    <div className="h-full overflow-auto">
                      <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700">
                        Regenerate Content
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap">
                        {generatedText}
                      </p>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 dark:text-neutral-400 space-y-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-10 h-10 opacity-50"
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
                      <p>
                        Click "Generate Text from Image" to analyze this image
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
              strokeWidth="1.5"
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
            docSummary={doc?.content}
            docSuggestions={doc.suggestions}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <button
            onClick={() => onShowConflicts(doc.id)}
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
    </>
  );
};

export default DocumentRow;
