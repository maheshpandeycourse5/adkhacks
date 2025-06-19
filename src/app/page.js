import MainLayout from "@/components/layout/MainLayout";

export const metadata = {
  title: "Medical Regulatory Dashboard | ADK Hacks",
  description: "Pre-medical regulatory document dashboard for ADK Hacks"
};

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-8 px-4 md:px-6">
        {/* Document Status Cards Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Document Status Overview</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: New Documents */}
            <div className="rounded-xl border bg-white dark:bg-gray-800 text-card-foreground shadow-sm hover:shadow-md transition-all duration-200">
              <div className="p-6 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Approved Documents</span>
                  <span className="text-lg bg-green-100 text-green-800 px-2 py-0.5 rounded-md dark:bg-blue-900 dark:text-blue-100">
                    Approved
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-50">24</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  These document got reviewd and approved by MLR
                </div>
              </div>
            </div>

            {/* Card 2: Ready for MLR Review */}
            <div className="rounded-xl border bg-white dark:bg-gray-800 text-card-foreground shadow-sm hover:shadow-md transition-all duration-200">
              <div className="p-6 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Rejected Documents</span>
                  <span className="text-lg bg-red-100 text-red-800 px-2 py-0.5 rounded-md dark:bg-purple-900 dark:text-purple-100">
                    Rejected
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-50">7</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  These document got reviewed and rejected by MLR{" "}
                </div>
              </div>
            </div>

            {/* Card 3: Under Review */}
            <div className="rounded-xl border bg-white dark:bg-gray-800 text-card-foreground shadow-sm hover:shadow-md transition-all duration-200">
              <div className="p-6 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Under Review</span>
                  <span className="text-lg bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md dark:bg-amber-900 dark:text-amber-100">
                    In Progress
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-50">5</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Currently being reviewed</div>
              </div>
            </div>

            {/* Card 4: Document Status Summary */}
            <div className="rounded-xl border bg-white dark:bg-gray-800 text-card-foreground shadow-sm hover:shadow-md transition-all duration-200">
              <div className="p-6 flex flex-col space-y-3">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Document Status</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                      Approved: 24
                    </span>
                    <span className="text-xs flex items-center">
                      <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                      Rejected: 7
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-l-full" style={{ width: "77%" }}></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">77% approval rate this month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section - Documents */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recent Document Activity</h2>
          <div className="rounded-xl border bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                    <th className="py-3 px-4 font-medium text-gray-500">Document Name</th>
                    <th className="py-3 px-4 font-medium text-gray-500">Submission Date</th>
                    <th className="py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="py-3 px-4 font-medium text-gray-500">Score</th>
                    <th className="py-3 px-4 font-medium text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    {
                      name: "Clinical Trial Protocol v2.3",
                      date: "June 15, 2025",
                      status: "Approved",
                      score: 92,
                      path: "/files/protocol_v2.3.pdf"
                    },
                    {
                      name: "Patient Information Leaflet",
                      date: "June 12, 2025",
                      status: "Under Review",
                      score: 78,
                      path: "/files/patient_info.pdf"
                    },
                    {
                      name: "Investigator's Brochure",
                      date: "June 10, 2025",
                      status: "Rejected",
                      score: 65,
                      path: "/files/inv_brochure.pdf"
                    },
                    {
                      name: "Statistical Analysis Plan",
                      date: "June 8, 2025",
                      status: "Approved",
                      score: 88,
                      path: "/files/stats_plan.pdf"
                    },
                    {
                      name: "Case Report Form Template",
                      date: "June 5, 2025",
                      status: "Ready for MLR",
                      score: 74,
                      path: "/files/crf_template.pdf"
                    }
                  ].map((doc, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">{doc.name}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{doc.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            doc.status === "Approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : doc.status === "Rejected"
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
                          href={doc.path}
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
            {[
              {
                name: "Clinical Trial Protocol v2.3",
                score: 92,
                category: "Protocol",
                reviewers: 5
              },
              {
                name: "Statistical Analysis Plan",
                score: 88,
                category: "Analysis",
                reviewers: 4
              },
              {
                name: "Informed Consent Form",
                score: 87,
                category: "Ethical",
                reviewers: 6
              },
              {
                name: "Pharmacovigilance Plan",
                score: 85,
                category: "Safety",
                reviewers: 3
              },
              {
                name: "Final Study Report",
                score: 82,
                category: "Reporting",
                reviewers: 7
              }
            ].map((doc, index) => (
              <div
                key={index}
                className="rounded-xl border bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 py-1 px-2 rounded">
                      {doc.category}
                    </span>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mt-2">{doc.name}</h3>
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
                  {doc.reviewers} Reviewers
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-3">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${doc.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
