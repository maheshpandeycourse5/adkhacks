"use client";

import TableHeader from "./TableHeader";
import DocumentRow from "./DocumentRow";

const DocumentsTable = ({ documents, onShowConflicts }) => {
  // Check if documents array exists and has items
  const hasDocuments = Array.isArray(documents) && documents.length > 0;

  return (
    <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
          <TableHeader />
          <tbody>
            {hasDocuments ? (
              documents.map((doc) => (
                <DocumentRow
                  key={doc.id}
                  doc={doc}
                  onShowConflicts={onShowConflicts}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="px-6 py-16 text-center text-neutral-500"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="w-12 h-12 text-neutral-300 dark:text-neutral-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                    <div className="text-lg font-medium">
                      No documents available
                    </div>
                    <p className="text-neutral-400 dark:text-neutral-500">
                      Upload documents to get started
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentsTable;
