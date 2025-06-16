"use client";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

// Metadata cannot be exported from a client component
// Instead, you can set the page title dynamically with useEffect if needed

export default function FilesPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showConflictsModal, setShowConflictsModal] = useState(false);
  const [activeTab, setActiveTab] = useState("upload"); // "upload" or "existing"
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Mock data for preMLR documents
  const documents = [
    {
      id: 1,
      name: "Summer Campaign - Instagram Post",
      uploadedDate: "June 15, 2025",
      status: "Approved",
      score: "92",
      fileType: "Instagram URL",
      downloadLink: "#",
      approvalDate: "June 16, 2025",
      conflicts: 2,
      suggestions: "Add additional disclaimers",
      fileUrl: "https://instagram.com/p/example123",
    },
    {
      id: 2,
      name: "New Product Launch Video",
      uploadedDate: "June 14, 2025",
      status: "Rejected",
      score: "65",
      fileType: "Video",
      downloadLink: "#",
      approvalDate: "June 15, 2025",
      conflicts: 5,
      suggestions: "Claims need substantiation",
      fileUrl: "/videos/product-launch.mp4",
    },
    {
      id: 3,
      name: "Health Benefits Webpage",
      uploadedDate: "June 13, 2025",
      status: "Pending",
      score: "-",
      fileType: "Website",
      downloadLink: "#",
      approvalDate: "-",
      conflicts: 0,
      suggestions: "Awaiting review",
      fileUrl: "https://example.com/health-benefits",
    },
    {
      id: 4,
      name: "Patient Testimonial",
      uploadedDate: "June 12, 2025",
      status: "Approved",
      score: "88",
      fileType: "Video",
      downloadLink: "#",
      approvalDate: "June 14, 2025",
      conflicts: 1,
      suggestions: "Add privacy disclaimers",
      fileUrl: "/videos/testimonial.mp4",
    },
    {
      id: 5,
      name: "Product Comparison Chart",
      uploadedDate: "June 10, 2025",
      status: "Approved",
      score: "95",
      fileType: "Website",
      downloadLink: "#",
      approvalDate: "June 11, 2025",
      conflicts: 0,
      suggestions: "No issues found",
      fileUrl: "https://example.com/comparison",
    },
    {
      id: 6,
      name: "Clinical Trial Results",
      uploadedDate: "June 8, 2025",
      status: "Rejected",
      score: "45",
      fileType: "Instagram URL",
      downloadLink: "#",
      approvalDate: "June 9, 2025",
      conflicts: 8,
      suggestions: "Multiple claim violations",
      fileUrl: "https://instagram.com/p/example456",
    },
  ];

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300";
      case "Rejected":
        return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300";
      default:
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

  // Handle show conflict details
  const handleShowConflicts = (docId) => {
    const document = documents.find((doc) => doc.id === docId);
    if (document) {
      setSelectedDocument(document);
      setShowConflictsModal(true);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              PreMLR Documents
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Manage and review your preMLR documents
            </p>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-md text-sm font-medium transition-colors">
              Filter
            </button>
            <button
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-700 text-white dark:bg-neutral-100 dark:hover:bg-neutral-300 dark:text-black rounded-md text-sm font-medium transition-colors"
              onClick={() => setShowUploadModal(true)}
            >
              Upload
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-neutral-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-3 pl-10 text-sm border rounded-lg bg-transparent"
            placeholder="Search documents..."
          />
        </div>

        {/* PreMLR Documents Table */}
        <div className="border rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
            <thead className="bg-neutral-50 dark:bg-neutral-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Document Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Upload Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Score
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  File Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Review Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  File Link
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Conflicts
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                        <Image
                          src="/file.svg"
                          alt="Document"
                          width={20}
                          height={20}
                          className="dark:invert"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{doc.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {doc.uploadedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        doc.status
                      )}`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {doc.score !== "-" ? (
                      <div className="flex items-center">
                        <span
                          className={`font-medium ${
                            parseInt(doc.score) >= 80
                              ? "text-green-600"
                              : parseInt(doc.score) >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {doc.score}
                        </span>
                        <span className="text-xs text-neutral-500 ml-1">
                          /100
                        </span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {doc.fileType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {doc.approvalDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleShowConflicts(doc.id)}
                      className="flex items-center space-x-1 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                      aria-label="View conflicts"
                      title="View conflicts with regulations"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
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
                      <span>{doc.conflicts > 0 ? doc.conflicts : "None"}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    <div className="flex space-x-2">
                      <button
                        className="hover:text-neutral-900 dark:hover:text-neutral-100"
                        aria-label="Download"
                      >
                        Download
                      </button>
                      <button
                        className="hover:text-neutral-900 dark:hover:text-neutral-100"
                        aria-label="Share"
                      >
                        Share
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border rounded-lg p-4 bg-neutral-50 dark:bg-neutral-800">
            <h3 className="text-sm font-medium text-neutral-500 uppercase">
              Documents Pending Review
            </h3>
            <p className="text-2xl font-bold mt-1">
              {documents.filter((doc) => doc.status === "Pending").length}
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-neutral-50 dark:bg-neutral-800">
            <h3 className="text-sm font-medium text-neutral-500 uppercase">
              Documents with Conflicts
            </h3>
            <p className="text-2xl font-bold mt-1">
              {documents.filter((doc) => doc.conflicts > 0).length}
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-neutral-50 dark:bg-neutral-800">
            <h3 className="text-sm font-medium text-neutral-500 uppercase">
              Approval Rate
            </h3>
            <p className="text-2xl font-bold mt-1">
              {Math.round(
                (documents.filter((doc) => doc.status === "Approved").length /
                  documents.filter((doc) => doc.status !== "Pending").length) *
                  100
              )}
              %
            </p>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="min-w-[800px] p-0 gap-0">
          {/* Header - Fixed */}
          <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-white dark:bg-neutral-800 z-10">
            <DialogTitle className="text-xl">
              Upload Document for PreMLR Review
            </DialogTitle>

            {/* Tabs */}
            <div className="flex mt-4">
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "upload"
                    ? "border-b-2 border-neutral-900 dark:border-neutral-100"
                    : "text-neutral-500"
                }`}
                onClick={() => setActiveTab("upload")}
              >
                Upload New File
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "existing"
                    ? "border-b-2 border-neutral-900 dark:border-neutral-100"
                    : "text-neutral-500"
                }`}
                onClick={() => setActiveTab("existing")}
              >
                Select from Existing
              </button>
            </div>
          </DialogHeader>

          {/* Content - Scrollable */}
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            {/* Upload Form */}
            {activeTab === "upload" && (
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="document-name"
                  >
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
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="file-type"
                  >
                    File Type
                  </label>
                  <select
                    id="file-type"
                    className="w-full p-2 border rounded-md bg-transparent"
                  >
                    <option value="">Select file type</option>
                    <option value="instagram">Instagram URL</option>
                    <option value="website">Website URL</option>
                    <option value="video">Video File</option>
                    <option value="document">Document File</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Upload Method
                  </label>
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
                        <span className="text-sm font-medium">
                          Drop file here or click to upload
                        </span>
                        <span className="text-xs text-neutral-500">
                          (PDF, Word, Excel, PowerPoint, Images)
                        </span>
                      </div>
                      <input type="file" className="hidden" />
                    </div>

                    <div className="border rounded-md p-6">
                      <div className="space-y-4">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="url-input"
                        >
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
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="document-notes"
                  >
                    Additional Notes
                  </label>
                  <textarea
                    id="document-notes"
                    rows={3}
                    className="w-full p-2 border rounded-md bg-transparent"
                    placeholder="Add any notes about this document..."
                  ></textarea>
                </div>
              </div>
            )}

            {/* Existing Files */}
            {activeTab === "existing" && (
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                    <thead className="bg-neutral-50 dark:bg-neutral-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                          Select
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                      {/* Map through existing files that haven't been submitted for review */}
                      {[
                        {
                          id: 101,
                          name: "Campaign Draft.docx",
                          type: "Document",
                          date: "June 16, 2025",
                        },
                        {
                          id: 102,
                          name: "New Product Demo.mp4",
                          type: "Video",
                          date: "June 14, 2025",
                        },
                        {
                          id: 103,
                          name: "Website Redesign.png",
                          type: "Image",
                          date: "June 13, 2025",
                        },
                      ].map((file) => (
                        <tr
                          key={file.id}
                          className="hover:bg-neutral-50 dark:hover:bg-neutral-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="radio"
                              name="selectedFile"
                              value={file.id}
                              className="h-4 w-4 text-neutral-900 focus:ring-neutral-500 border-neutral-300"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium">
                              {file.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm">{file.type}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {file.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="existing-notes"
                  >
                    Additional Notes
                  </label>
                  <textarea
                    id="existing-notes"
                    rows={3}
                    className="w-full p-2 border rounded-md bg-transparent"
                    placeholder="Add any notes about this document..."
                  ></textarea>
                </div>
              </div>
            )}
          </div>

          {/* Footer - Fixed */}
          <DialogFooter className="px-6 py-4 border-t bg-white dark:bg-neutral-800 ">
            <button
              onClick={() => setShowUploadModal(false)}
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md mr-2"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-neutral-900 hover:bg-neutral-700 text-white dark:bg-neutral-100 dark:hover:bg-neutral-300 dark:text-black rounded-md">
              {activeTab === "upload"
                ? "Submit for Review"
                : "Submit Selected for Review"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Conflicts Modal */}
      <Dialog
        open={showConflictsModal && selectedDocument}
        onOpenChange={setShowConflictsModal}
      >
        {selectedDocument && (
          <DialogContent className="min-w-[800px] p-0 gap-0">
            {/* Header - Fixed */}
            <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-white dark:bg-neutral-800 z-10">
              <DialogTitle className="text-xl">
                Document Conflicts & Suggestions
              </DialogTitle>
              <div className="mt-2 mb-2">
                <h3 className="font-medium text-lg">{selectedDocument.name}</h3>
                <div className="mt-2 flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500">Status:</span>
                    <span
                      className={`px-2 py-0.5 inline-flex text-xs leading-4 font-semibold rounded-full ${getStatusColor(
                        selectedDocument.status
                      )}`}
                    >
                      {selectedDocument.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500">Score:</span>
                    {selectedDocument.score !== "-" ? (
                      <div className="flex items-center">
                        <span
                          className={`font-medium ${
                            parseInt(selectedDocument.score) >= 80
                              ? "text-green-600"
                              : parseInt(selectedDocument.score) >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {selectedDocument.score}
                        </span>
                        <span className="text-xs text-neutral-500 ml-1">
                          /100
                        </span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500">File Type:</span>
                    <span>{selectedDocument.fileType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500">Review Date:</span>
                    <span>{selectedDocument.approvalDate}</span>
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
                    <span>Conflicts ({selectedDocument.conflicts})</span>
                  </div>
                </h3>

                {selectedDocument.conflicts > 0 ? (
                  <div className="space-y-3">
                    {/* Mock conflicts - in a real app, these would come from the backend */}
                    {[...Array(selectedDocument.conflicts)].map((_, index) => (
                      <div
                        key={`conflict-${index}`}
                        className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800"
                      >
                        <h4 className="font-medium text-red-800 dark:text-red-300">
                          Regulation Conflict #{index + 1}
                        </h4>
                        <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                          {selectedDocument.status === "Rejected"
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
                  <p className="text-neutral-500 italic">
                    No conflicts detected
                  </p>
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

                {selectedDocument.suggestions &&
                selectedDocument.suggestions !== "No issues found" &&
                selectedDocument.suggestions !== "Awaiting review" ? (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-200 dark:border-blue-800">
                    <h4 className="font-medium text-blue-800 dark:text-blue-300">
                      Recommendation
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      {selectedDocument.suggestions}
                    </p>
                    {selectedDocument.status === "Rejected" && (
                      <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
                        <h4 className="font-medium text-blue-800 dark:text-blue-300">
                          Steps to resolve
                        </h4>
                        <ol className="list-decimal list-inside text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                          <li>
                            Review the specific claims highlighted in the
                            conflicts section
                          </li>
                          <li>
                            Add supporting scientific evidence or data for each
                            claim
                          </li>
                          <li>
                            Include appropriate disclaimers as required by
                            regulations
                          </li>
                          <li>Resubmit the document for review</li>
                        </ol>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-neutral-500 italic">
                    {selectedDocument.suggestions === "No issues found"
                      ? "No improvement suggestions - document meets all requirements"
                      : "Document is awaiting review"}
                  </p>
                )}
              </div>
            </div>

            {/* Footer - Fixed */}
            <DialogFooter className="px-6 py-4 border-t bg-white dark:bg-neutral-800 ">
              <button
                onClick={() => setShowConflictsModal(false)}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-700 text-white dark:bg-neutral-100 dark:hover:bg-neutral-300 dark:text-black rounded-md"
              >
                Close
              </button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </MainLayout>
  );
}
