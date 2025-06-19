"use client";
import Image from "next/image";
import { getStatusColor } from "./utils";

const DocumentRow = ({ doc, onShowConflicts }) => {
  return (
    <tr key={doc.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
            <Image src="/file.svg" alt="Document" width={20} height={20} className="dark:invert" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium">{doc.name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{doc.uploadedDate}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(doc.status)}`}>
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
            <span className="text-xs text-neutral-500 ml-1">/100</span>
          </div>
        ) : (
          "-"
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{doc.fileType}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{doc.approvalDate}</td>
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
          onClick={() => onShowConflicts(doc.id)}
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <span>{doc.conflicts > 0 ? doc.conflicts : "None"}</span>
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
        <div className="flex space-x-2">
          <button className="hover:text-neutral-900 dark:hover:text-neutral-100" aria-label="Download">
            Download
          </button>
          <button className="hover:text-neutral-900 dark:hover:text-neutral-100" aria-label="Share">
            Share
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DocumentRow;
