"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";

const UploadModal = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[800px] p-0 gap-0">
        {/* Header - Fixed */}
        <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-white dark:bg-neutral-800 z-10">
          <DialogTitle className="text-xl">Upload Document for PreMLR Review</DialogTitle>
        </DialogHeader>

        {/* Content - Scrollable */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          {/* Upload Form */}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="document-name">
                Document Name
              </label>
              <input
                id="document-name"
                type="text"
                className="w-full p-2 border rounded-md bg-transparent"
                placeholder="Enter document name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="file-type">
                File Type
              </label>
              <select id="file-type" className="w-full p-2 border rounded-md bg-transparent">
                <option value="">Select file type</option>
                <option value="instagram">Instagram URL</option>
                <option value="website">Website URL</option>
                <option value="video">Video File</option>
                <option value="document">Document File</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Upload Method</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-md p-6 text-center cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-neutral-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    <span className="text-sm font-medium">Drop file here or click to upload</span>
                    <span className="text-xs text-neutral-500">(PDF, Word, Excel, PowerPoint, Images)</span>
                  </div>
                  <input type="file" className="hidden" />
                </div>

                <div className="border rounded-md p-6">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="url-input">
                      Or enter URL
                    </label>
                    <input
                      id="url-input"
                      type="url"
                      className="w-full p-2 border rounded-md bg-transparent"
                      placeholder="https://"
                    />
                    <span className="text-xs text-neutral-500 block">
                      For Instagram posts, website pages, or video links
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="document-notes">
                Guidelines
              </label>
              <textarea
                id="document-notes"
                rows={3}
                className="w-full p-2 border rounded-md bg-transparent"
                placeholder="Add any notes about this document..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <DialogFooter className="px-6 py-4 border-t bg-white dark:bg-neutral-800 ">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md mr-2"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-neutral-900 hover:bg-neutral-700 text-white dark:bg-neutral-100 dark:hover:bg-neutral-300 dark:text-black rounded-md">
            Upload
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
