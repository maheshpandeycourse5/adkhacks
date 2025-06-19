"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { getStatusColor } from "./utils";

const ConflictsModal = ({ open, onOpenChange, document }) => {
  if (!document) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[800px] p-0 gap-0">
        {/* Header - Fixed */}
        <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-white dark:bg-neutral-800 z-10">
          <DialogTitle className="text-xl">Document Conflicts & Suggestions</DialogTitle>
          <div className="mt-2 mb-2">
            <h3 className="font-medium text-lg">{document.name}</h3>
            <div className="mt-2 flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">Status:</span>
                <span
                  className={`px-2 py-0.5 inline-flex text-xs leading-4 font-semibold rounded-full ${getStatusColor(
                    document.status
                  )}`}
                >
                  {document.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">Score:</span>
                {document.score !== "-" ? (
                  <div className="flex items-center">
                    <span
                      className={`font-medium ${
                        parseInt(document.score) >= 80
                          ? "text-green-600"
                          : parseInt(document.score) >= 70
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {document.score}
                    </span>
                    <span className="text-xs text-neutral-500 ml-1">/100</span>
                  </div>
                ) : (
                  "-"
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">File Type:</span>
                <span>{document.fileType}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">Review Date:</span>
                <span>{document.approvalDate}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Content - Scrollable */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          {/* Conflicts Section */}
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
                <span>Conflicts ({document.conflicts})</span>
              </div>
            </h3>

            {document.conflicts > 0 ? (
              <div className="space-y-3">
                {/* Mock conflicts - in a real app, these would come from the backend */}
                {[...Array(document.conflicts)].map((_, index) => (
                  <div
                    key={`conflict-${index}`}
                    className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800"
                  >
                    <h4 className="font-medium text-red-800 dark:text-red-300">Regulation Conflict #{index + 1}</h4>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      {document.status === "Rejected"
                        ? "This document contains claims that require substantiation as per regulatory guidelines."
                        : "Add required disclosures for side effects as mandated by regulation R21."}
                    </p>
                    <div className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
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
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <span>Found in section {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 italic">No conflicts detected</p>
            )}
          </div>

          {/* Suggestions Section */}
          <div>
            <h3 className="font-medium text-lg mb-3">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
                <span>Improvement Suggestions</span>
              </div>
            </h3>

            {document.suggestions &&
            document.suggestions !== "No issues found" &&
            document.suggestions !== "Awaiting review" ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-300">Recommendation</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">{document.suggestions}</p>
                {document.status === "Rejected" && (
                  <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
                    <h4 className="font-medium text-blue-800 dark:text-blue-300">Steps to resolve</h4>
                    <ol className="list-decimal list-inside text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                      <li>Review the specific claims highlighted in the conflicts section</li>
                      <li>Add supporting scientific evidence or data for each claim</li>
                      <li>Include appropriate disclaimers as required by regulations</li>
                      <li>Resubmit the document for review</li>
                    </ol>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-neutral-500 italic">
                {document.suggestions === "No issues found"
                  ? "No improvement suggestions - document meets all requirements"
                  : "Document is awaiting review"}
              </p>
            )}
          </div>
        </div>

        {/* Footer - Fixed */}
        <DialogFooter className="px-6 py-4 border-t bg-white dark:bg-neutral-800 ">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-700 text-white dark:bg-neutral-100 dark:hover:bg-neutral-300 dark:text-black rounded-md"
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConflictsModal;
