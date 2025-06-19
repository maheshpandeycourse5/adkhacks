"use client";

// Utility function to get status color
export const getStatusColor = (status) => {
  switch (status) {
    case "Approved":
      return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300";
    case "Rejected":
      return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300";
    default:
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300";
  }
};
