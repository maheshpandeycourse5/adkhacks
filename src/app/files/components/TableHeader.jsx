"use client";

const TableHeader = () => {
  return (
    <thead className="bg-blue-50 dark:bg-blue-950/40">
      <tr>
        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider"
        >
          Document Name
        </th>
        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider"
        >
          Upload Date
        </th>
        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider"
        >
          Status
        </th>
        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider"
        >
          Score
        </th>
        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider"
        >
          File Link
        </th>

        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider"
        >
          Conflicts/Suggestions
        </th>
        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider"
        >
          Summary
        </th>
        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider"
        >
          Guidelines
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
