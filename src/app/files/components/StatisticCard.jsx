"use client";

const StatisticCard = ({ title, value }) => {
  return (
    <div className="border rounded-lg p-4 bg-neutral-50 dark:bg-neutral-800">
      <h3 className="text-sm font-medium text-neutral-500 uppercase">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default StatisticCard;
