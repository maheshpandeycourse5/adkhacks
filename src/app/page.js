"use client";
import MainLayout from "@/components/layout/MainLayout";
import { useEffect, useState } from "react";
import {
  fetchDocuments,
  mapApiDocumentsToUiFormat,
} from "./files/components/api";
import { Item } from "@radix-ui/react-dropdown-menu";

export default function DashboardPage() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadDocuments() {
    try {
      setIsLoading(true);
      const apiDocuments = await fetchDocuments();
      if (apiDocuments && apiDocuments.length > 0) {
        const formattedDocs = mapApiDocumentsToUiFormat(apiDocuments);
        setDocuments(formattedDocs);
      } else {
        setDocuments([]);
      }
    } catch (err) {
      console.error("Error loading documents:", err);

      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch documents from API
  useEffect(() => {
    loadDocuments();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8 px-4 md:px-6">
        {/* Document Status Cards Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Document Status Overview
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Approved */}
            <div className="rounded-xl border bg-white dark:bg-gray-800 text-card-foreground shadow-sm hover:shadow-md transition-all duration-200">
              <div className="p-6 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Approved Documents
                  </span>
                  <span className="text-lg bg-green-100 text-green-800 px-2 py-0.5 rounded-md dark:bg-blue-900 dark:text-blue-100">
                    Approved
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                    {
                      documents.filter((doc) => doc.status === "Approved")
                        .length
                    }
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  These document got reviewd and approved by MLR
                </div>
              </div>
            </div>

            {/* Card 2:Rejected*/}
            <div className="rounded-xl border bg-white dark:bg-gray-800 text-card-foreground shadow-sm hover:shadow-md transition-all duration-200">
              <div className="p-6 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Rejected Documents
                  </span>
                  <span className="text-lg bg-red-100 text-red-800 px-2 py-0.5 rounded-md dark:bg-purple-900 dark:text-purple-100">
                    Rejected
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                    {documents.filter((doc) => doc.status === "Reject").length}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  These document got reviewed and rejected by MLR{" "}
                </div>
              </div>
            </div>

            {/* Card 3: Total*/}
            <div className="rounded-xl border bg-white dark:bg-gray-800 text-card-foreground shadow-sm hover:shadow-md transition-all duration-200">
              <div className="p-6 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Total Documents
                  </span>
                  <span className="text-lg bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md dark:bg-amber-900 dark:text-amber-100">
                    Processed
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                    {documents.length}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Total number of documents processed by MLR
                </div>
              </div>
            </div>

            {/* Card 4: Document Status Summary */}
            <div className="rounded-xl border bg-white dark:bg-gray-800 text-card-foreground shadow-sm hover:shadow-md transition-all duration-200">
              <div className="p-6 flex flex-col space-y-3">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Document Status
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                      Approved:{" "}
                      {
                        documents.filter((doc) => doc.status === "Aprroved")
                          .length
                      }
                    </span>
                    <span className="text-xs flex items-center">
                      <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                      Rejected:{" "}
                      {
                        documents.filter((doc) => doc.status === "Reject")
                          .length
                      }
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-l-full"
                    style={{
                      width: `${
                        (documents.filter((doc) => doc.status === "Approved")
                          .length /
                          documents.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {(
                    (documents.filter((doc) => doc.status === "Approved")
                      .length /
                      documents.length) *
                    100
                  ).toFixed(2)}
                  % Approval Rate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section - Documents */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Recent Document Activity
          </h2>
          <div className="rounded-xl border bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                    <th className="py-3 px-4 font-medium text-gray-500">
                      Document Name
                    </th>
                    <th className="py-3 px-4 font-medium text-gray-500">
                      Submission Date
                    </th>
                    <th className="py-3 px-4 font-medium text-gray-500">
                      Status
                    </th>
                    <th className="py-3 px-4 font-medium text-gray-500">
                      Score
                    </th>
                    <th className="py-3 px-4 font-medium text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {documents?.slice(0, 5).map((doc, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">
                        {doc.document_name}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {doc.uploadedDate}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            doc.status === "Approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : doc.status === "Reject"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                              : doc.status === "Under Review"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span
                            className={`font-medium ${
                              doc.score >= 80
                                ? "text-green-600 dark:text-green-400"
                                : doc.score >= 70
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {doc.score}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={doc.fileUrl}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                          download
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* High-Performing Documents Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Top Performing Documents (Score ≥ 80%)
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {documents
              ?.filter((Item) => Item.score >= 80)
              ?.map((doc, index) => (
                <div
                  key={index}
                  className="rounded-xl border bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 py-1 px-2 rounded">
                        {doc.fileType}
                      </span>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 mt-2">
                        {doc.document_name}
                      </h3>
                    </div>
                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-lg font-semibold rounded-full h-10 w-10 flex items-center justify-center">
                      {doc.score}
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Reviewed
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-3">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: `${doc.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
