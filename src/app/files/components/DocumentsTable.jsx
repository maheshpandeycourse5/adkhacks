"use client";

import TableHeader from "./TableHeader";
import DocumentRow from "./DocumentRow";

const DocumentsTable = ({ documents, onShowConflicts }) => {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
        <TableHeader />
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {documents.map((doc) => (
            <DocumentRow key={doc.id} doc={doc} onShowConflicts={onShowConflicts} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsTable;
