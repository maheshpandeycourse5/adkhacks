"use client";

import Header from "./Header";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 container mx-auto py-8 max-w-8xl">
        {children}
      </main>
    </div>
  );
}
