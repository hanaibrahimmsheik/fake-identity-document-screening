import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setResult(null);
    setUploadMessage("Analyzing document...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Server error");
      }

      if (!data.success) {
        setUploadMessage("Analysis failed.");
        setResult(data);
        return;
      }

      setUploadMessage(
        "Document analyzed successfully."
      );

      setResult(data);

    } catch (error) {

      setUploadMessage(
        "Could not connect to the screening server."
      );

      setResult({
        error: error.message,
      });
    }
  };

  return (
    <div>

      {/* HEADER */}

      <header>

        <h1>
          AI-Based Fake Identity & Document Screening
        </h1>

        <p>
          Secure, intelligent and explainable document verification
        </p>

      </header>


      <main>

        {/* UPLOAD */}

        <section className="hero">

          <h2>
            Verify an Identity Document
          </h2>

          <p>
            Upload a document to screen it for suspicious
            alterations, inconsistencies and verification risks.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          {file && (
            <p>
              Selected document:{" "}
              <strong>{file.name}</strong>
            </p>
          )}

          {uploadMessage && (
            <p>
              <strong>{uploadMessage}</strong>
            </p>
          )}

        </section>


        {/* RESULTS */}

        {result && result.risk_score !== undefined && (

          <section className="result-box">

            <h2>
              🔎 Screening Result
            </h2>


            {/* RISK */}

            <div className="risk-summary">

              <div>
                <strong>Risk Score</strong>
                <span>
                  {result.risk_score}/100
                </span>
              </div>

              <div>
                <strong>Risk Level</strong>
                <span>
                  {result.risk_level}
                </span>
              </div>

            </div>


            <p className="explanation">
              {result.explanation}
            </p>


            {/* IDENTITY */}

            <h3>
              👤 Identity Data Extraction
            </h3>

            <div className="data-grid">

              <div>
                <strong>Name</strong>
                <p>
                  {result.identity_details.name}
                </p>
              </div>

              <div>
                <strong>Date of Birth</strong>
                <p>
                  {result.identity_details.date_of_birth}
                </p>
              </div>

              <div>
                <strong>Gender</strong>
                <p>
                  {result.identity_details.gender}
                </p>
              </div>

              <div>
                <strong>Document Number</strong>
                <p>
                  {result.masked_document_number}
                </p>
              </div>

            </div>


            {/* FORENSICS */}

            <h3>
              🔬 Document Forensics
            </h3>

            <div className="data-grid">

              <div>
                <strong>Image Width</strong>
                <p>
                  {result.forensic_analysis.width}px
                </p>
              </div>

              <div>
                <strong>Image Height</strong>
                <p>
                  {result.forensic_analysis.height}px
                </p>
              </div>

              <div>
                <strong>Blur Score</strong>
                <p>
                  {result.forensic_analysis.blur_score}
                </p>
              </div>

              <div>
                <strong>Image Quality</strong>
                <p>
                  {result.forensic_analysis.image_quality}
                </p>
              </div>

            </div>


            {/* CONSISTENCY */}

            <h3>
              🔄 Identity Consistency Check
            </h3>

            <div className="status-card">

              <strong>
                {result.identity_consistency.status}
              </strong>

              <p>
                {result.identity_consistency.message}
              </p>

            </div>


            {/* TRUSTED VERIFICATION */}

            <h3>
              🛡️ Trusted Issuer Verification
            </h3>

            <div className="status-card">

              <strong>
                {result.trusted_verification.status}
              </strong>

              <p>
                {result.trusted_verification.message}
              </p>

            </div>


            {/* RISK INDICATORS */}

            <h3>
              ⚠️ Risk Indicators
            </h3>

            {result.risk_reasons.length === 0 ? (

              <p>
                No risk indicators detected.
              </p>

            ) : (

              <ul>

                {result.risk_reasons.map(
                  (reason, index) => (

                    <li key={index}>
                      {reason}
                    </li>

                  )
                )}

              </ul>

            )}


            {/* OCR */}

            <h3>
              📝 Extracted OCR Text
            </h3>

            <pre>
              {result.extracted_text ||
                "No text detected."}
            </pre>


            {/* PRIVACY */}

            <h3>
              🔐 Privacy Protection
            </h3>

            <div className="privacy-box">

              <p>
                <strong>
                  Document Storage:
                </strong>{" "}
                {result.privacy.document_storage}
              </p>

              <p>
                <strong>
                  Document Number:
                </strong>{" "}
                {result.privacy.document_number}
              </p>

              <p>
                <strong>
                  Processing:
                </strong>{" "}
                {result.privacy.processing}
              </p>

            </div>

          </section>

        )}


        {/* ERROR */}

        {result && result.error && (

          <div className="result-box">

            <strong>
              Error:
            </strong>{" "}
            {result.error}

          </div>

        )}


        {/* FEATURES */}

        <section className="features">

          <h2>
            Screening Features
          </h2>

          <div className="feature-grid">

            <div className="feature-card">
              <h3>
                🔬 AI Document Forensics
              </h3>
              <p>
                Analyzes document image quality and
                suspicious visual characteristics.
              </p>
            </div>


            <div className="feature-card">
              <h3>
                📝 OCR & Data Extraction
              </h3>
              <p>
                Extracts identity information from
                uploaded documents.
              </p>
            </div>


            <div className="feature-card">
              <h3>
                🔄 Identity Consistency
              </h3>
              <p>
                Checks whether required identity
                information is available and consistent.
              </p>
            </div>


            <div className="feature-card">
              <h3>
                🛡️ Trusted Verification
              </h3>
              <p>
                Supports integration with authorized
                issuer verification services.
              </p>
            </div>


            <div className="feature-card">
              <h3>
                📊 AI Risk Scoring
              </h3>
              <p>
                Combines multiple screening signals
                into an explainable risk assessment.
              </p>
            </div>


            <div className="feature-card">
              <h3>
                🔐 Privacy Preserving
              </h3>
              <p>
                Masks sensitive information and
                minimizes unnecessary document exposure.
              </p>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;