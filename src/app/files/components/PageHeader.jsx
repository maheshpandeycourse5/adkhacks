"use client";

const PageHeader = ({ onUploadClick }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">PreMLR Documents</h1>
        <p className="text-neutral-600 dark:text-neutral-400">Manage and review your preMLR documents</p>
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-md text-sm font-medium transition-colors">
          Filter
        </button>
        <button
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-700 text-white dark:bg-neutral-100 dark:hover:bg-neutral-300 dark:text-black rounded-md text-sm font-medium transition-colors"
          onClick={onUploadClick}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
