"use client";

import StatisticCard from "./StatisticCard";

const StatisticsDashboard = ({ documents }) => {
  const pendingCount = documents.filter((doc) => doc.status === "Pending").length;
  const conflictsCount = documents.filter((doc) => doc.conflicts > 0).length;

  // Calculate approval rate
  const nonPendingDocs = documents.filter((doc) => doc.status !== "Pending").length;
  const approvedDocs = documents.filter((doc) => doc.status === "Approved").length;
  const approvalRate = nonPendingDocs > 0 ? Math.round((approvedDocs / nonPendingDocs) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatisticCard title="Documents Pending Review" value={pendingCount} />
      <StatisticCard title="Documents with Conflicts" value={conflictsCount} />
      <StatisticCard title="Approval Rate" value={`${approvalRate}%`} />
    </div>
  );
};

export default StatisticsDashboard;
