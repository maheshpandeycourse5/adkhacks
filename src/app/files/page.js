"use client";
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";

// Import Components
import PageHeader from "./components/PageHeader";
import SearchBar from "./components/SearchBar";
import DocumentsTable from "./components/DocumentsTable";
import StatisticsDashboard from "./components/StatisticsDashboard";
import UploadModal from "./components/UploadModal";
import ConflictsModal from "./components/ConflictsModal";

// Import Data
import { documents } from "./components/data";

// Metadata cannot be exported from a client component
// Instead, you can set the page title dynamically with useEffect if needed

export default function FilesPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showConflictsModal, setShowConflictsModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Handle show conflict details
  const handleShowConflicts = (docId) => {
    const document = documents.find((doc) => doc.id === docId);
    if (document) {
      setSelectedDocument(document);
      setShowConflictsModal(true);
    }
  };
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <PageHeader onUploadClick={() => setShowUploadModal(true)} />

        {/* Search Bar */}
        <SearchBar />

        {/* PreMLR Documents Table */}
        <DocumentsTable documents={documents} onShowConflicts={handleShowConflicts} />

        {/* Statistics Dashboard */}
        <StatisticsDashboard documents={documents} />
      </div>

      {/* Modals */}
      <UploadModal open={showUploadModal} onOpenChange={setShowUploadModal} />

      <ConflictsModal
        open={showConflictsModal && selectedDocument}
        onOpenChange={setShowConflictsModal}
        document={selectedDocument}
      />
    </MainLayout>
  );
}
