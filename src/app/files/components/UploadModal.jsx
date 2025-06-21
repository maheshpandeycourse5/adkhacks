"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useRef } from "react";
import { uploadDocument } from "./api";

const UploadModal = ({ open, onOpenChange }) => {
  const [fileType, setFileType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    guidelines: "",
    file_url: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Function to handle file type change
  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
    // Clear file or URL depending on selection
    if (e.target.value === "website") {
      setSelectedFile(null);
    } else if (e.target.value === "video" || e.target.value === "instagram") {
      setFormData((prev) => ({ ...prev, file_url: "" }));
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id === "document-name"
        ? "name"
        : id === "url-input"
        ? "file_url"
        : id === "guidelines"
        ? "guidelines"
        : id]: value,
    }));
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Function to handle the file drop area click
  const handleFileAreaClick = () => {
    // If there's already a file selected, reset it when clicking again
    if (selectedFile && fileInputRef.current) {
      // Reset the file input value to allow picking the same file again
      fileInputRef.current.value = "";
    }
    fileInputRef.current?.click();
  };

  // Function to clear selected file
  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Function to validate form before submission
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Document name is required");
      return false;
    }

    if (!fileType) {
      setError("File type selection is required");
      return false;
    }

    if (!formData.guidelines.trim()) {
      setError("Guidelines are required");
      return false;
    }

    if ((fileType === "video" || fileType === "instagram") && !selectedFile) {
      setError(`Please upload a ${fileType} file`);
      return false;
    }

    if (fileType === "website" && !formData.file_url.trim()) {
      setError("Website URL is required");
      return false;
    }

    setError("");
    return true;
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const apiFormData = new FormData();
      apiFormData.append("document_name", formData.name);
      apiFormData.append("document_type", fileType);
      apiFormData.append("guidelines", formData.guidelines);

      // Conditionally add file or URL based on file type
      if ((fileType === "video" || fileType === "instagram") && selectedFile) {
        // Only append file if it's selected
        apiFormData.append("file", selectedFile);

        // Don't include file_url for video/instagram
      } else if (fileType === "website" && formData.file_url) {
        // Only append file_url if it's provided
        apiFormData.append("url", formData.file_url);
      }

      // Make API call using the uploadDocument function from api.js
      const result = await uploadDocument(apiFormData);
      console.log("Upload successful:", result);

      // Reset form
      setFormData({ name: "", guidelines: "", file_url: "" });
      setFileType("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      // Close modal after reset
      onOpenChange(false);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "An error occurred during upload");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to reset form state when modal closes
  const handleOpenChange = (newOpenState) => {
    // If the modal is closing
    if (!newOpenState) {
      // Reset form state
      setFormData({ name: "", guidelines: "", file_url: "" });
      setFileType("");
      setSelectedFile(null);
      setError("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
    // Propagate the change to parent
    onOpenChange(newOpenState);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="min-w-[800px] p-0 gap-0">
        {/* Header - Fixed */}
        <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-white dark:bg-neutral-800 z-10">
          <DialogTitle className="text-xl">
            Upload Document for PreMLR Review
          </DialogTitle>
        </DialogHeader>

        {/* Content - Scrollable */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          {/* Upload Form */}

          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="document-name"
              >
                Document Name <span className="text-red-500">*</span>
              </label>
              <input
                id="document-name"
                type="text"
                className="w-full p-2 border rounded-md bg-transparent"
                placeholder="Enter document name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="file-type"
              >
                File Type <span className="text-red-500">*</span>
              </label>
              <select
                id="file-type"
                className="w-full p-2 border rounded-md bg-transparent"
                value={fileType}
                onChange={handleFileTypeChange}
                required
              >
                <option value="">Select file type</option>
                <option value="instagram">Instagram Post</option>
                <option value="website">Website URL</option>
                <option value="video">Video File</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Method
              </label>
              <div className="grid grid-cols-1 gap-4">
                {/* File upload area - Only shown for video and instagram */}
                {(fileType === "video" || fileType === "instagram") && (
                  <div
                    onClick={handleFileAreaClick}
                    className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-md p-6 text-center cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700"
                  >
                    {!selectedFile ? (
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
                        <span className="text-sm font-medium">
                          Drop file here or click to upload
                        </span>
                        <span className="text-xs text-neutral-500">
                          {fileType === "video"
                            ? "(MP4, MOV, AVI, WebM)"
                            : "(JPEG, PNG, MP4)"}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8 text-green-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <span className="text-sm font-medium text-green-600">
                          File Selected: {selectedFile.name}
                        </span>
                        <div className="flex space-x-2 mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFileAreaClick();
                            }}
                            className="text-xs px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                          >
                            Change
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              clearSelectedFile();
                            }}
                            className="text-xs px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept={
                        fileType === "video" ? "video/*" : "image/*,video/*"
                      }
                    />
                  </div>
                )}

                {/* URL input - Only shown for website type */}
                {(fileType === "website" || fileType === "") && (
                  <div className="border rounded-md p-6">
                    <div className="space-y-4">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="url-input"
                      >
                        Enter Website URL
                      </label>
                      <input
                        id="url-input"
                        type="url"
                        className="w-full p-2 border rounded-md bg-transparent"
                        placeholder="https://"
                        value={formData.file_url}
                        onChange={handleInputChange}
                      />
                      <span className="text-xs text-neutral-500 block">
                        For website pages
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="guidelines"
              >
                Guidelines <span className="text-red-500">*</span>
              </label>
              <textarea
                id="guidelines"
                rows={3}
                className="w-full p-2 border rounded-md bg-transparent"
                placeholder="Add guidelines for this document..."
                value={formData.guidelines}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            {/* Error message display */}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
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
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-700 text-white dark:bg-neutral-100 dark:hover:bg-neutral-300 dark:text-black rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
