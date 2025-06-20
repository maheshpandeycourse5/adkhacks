"use client";

import TableHeader from "./TableHeader";
import DocumentRow from "./DocumentRow";

const DocumentsTable = ({ documents, onShowConflicts }) => {
  // Check if documents array exists and has items
  const hasDocuments = Array.isArray(documents) && documents.length > 0;

  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
        <TableHeader />
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
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
                className="px-6 py-10 text-center text-neutral-500"
              >
                No documents available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsTable;
