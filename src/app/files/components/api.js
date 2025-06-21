// API functions for fetching document data

/**
 * Fetches documents from the API
 * @param {number} skip - Number of items to skip for pagination
 * @param {number} limit - Maximum number of items to return
 * @returns {Promise<Array>} - Promise that resolves to an array of documents
 */
export async function fetchDocuments() {
  try {
    const response = await fetch("http://34.61.235.3/api/v1/analysis", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return []; // Return empty array on error
  }
}

/**
 * Uploads a document to the API
 * @param {FormData} formData - FormData object containing document data and file
 * @returns {Promise<Object>} - Promise that resolves to the uploaded document data
 * @throws {Error} - Throws an error if upload fails
 */
export async function uploadDocument(formData) {
  try {
    const response = await fetch("http://34.61.235.3/api/v1/analyze", {
      method: "POST",
      headers: {
        accept: "application/json",
        // No Content-Type header as FormData sets it automatically with boundary
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.detail || `Upload failed with status: ${response.status}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

/**
 * Maps API document data to the format expected by the DocumentRow component
 * @param {Array} apiDocuments - Documents from the API
 * @returns {Array} - Formatted documents for the UI
 */
export function mapApiDocumentsToUiFormat(apiDocuments) {
  if (!apiDocuments || !Array.isArray(apiDocuments)) {
    return [];
  }

  return apiDocuments.map((doc, index) => {
    // Format the date - assumes the API returns a valid date string
    const uploadDate = doc.created_at ? new Date(doc.created_at) : new Date();
    const formattedUploadDate = uploadDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const approvalDate = doc.approved_at ? new Date(doc.approved_at) : null;
    const formattedApprovalDate = approvalDate
      ? approvalDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "-";

    // Map API document to UI format
    return {
      id: doc.id || index + 1,
      document_name: doc.document_name || doc.title || `Document ${index + 1}`,
      uploadedDate: formattedUploadDate,
      status: doc.status || "Pending",
      score: doc.score ? doc.score.toString() : "-",
      fileType: doc.file_type || "Document",
      downloadLink: doc.download_link || "#",
      approvalDate: formattedApprovalDate,
      conflicts: doc.conflicts || 0,
      suggestions: doc.suggestions || "No suggestions",
      fileUrl: doc.file_url || "#",
      summary: doc.summary || "No summary available",
      guidelines: doc.guidelines || "No guidelines available",
    };
  });
}
