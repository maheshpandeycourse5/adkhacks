"use client";
import MainLayout from "@/components/layout/MainLayout";
import { useState, useEffect } from "react";

// Import Components
import PageHeader from "./components/PageHeader";
import SearchBar from "./components/SearchBar";
import DocumentsTable from "./components/DocumentsTable";
import StatisticsDashboard from "./components/StatisticsDashboard";
import UploadModal from "./components/UploadModal";
import ConflictsModal from "./components/ConflictsModal";

// Import API functions
import { fetchDocuments, mapApiDocumentsToUiFormat } from "./components/api";

// Import fallback data in case API fails
import { documents as mockDocuments } from "./components/data";

export default function FilesPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showConflictsModal, setShowConflictsModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch documents from API
  useEffect(() => {
    async function loadDocuments() {
      try {
        setIsLoading(true);
        const apiDocuments = await fetchDocuments();
        if (apiDocuments && apiDocuments.length > 0) {
          const formattedDocs = mapApiDocumentsToUiFormat(apiDocuments);
          setDocuments(formattedDocs);
        } else {
          // Fallback to mock data if API returns empty
          setDocuments(mockDocuments);
        }
        setError(null);
      } catch (err) {
        console.error("Error loading documents:", err);
        setError("Failed to load documents. Using mock data instead.");
        setDocuments(mockDocuments);
      } finally {
        setIsLoading(false);
      }
    }

    loadDocuments();
  }, []);

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

        {/* Error Message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* PreMLR Documents Table */}
            <DocumentsTable
              documents={documents}
              onShowConflicts={handleShowConflicts}
            />

            {/* Statistics Dashboard */}
            <StatisticsDashboard documents={documents} />
          </>
        )}
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
