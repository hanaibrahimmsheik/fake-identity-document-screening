# Artificial Intelligence-Assisted Screening of Fake Identities & Documents

Web-based application for detecting suspicious features, extracting identities data, verifying consistency, and creating an explainable risk assessment powered by artificial intelligence algorithms.

## Problem Statement

Fake and forged identities and documents are hard to detect via manual inspection only. The goal of the project is to create a multi-signal automated screening algorithm.

## Solution

The following is a solution architecture.

Upload Document
↓
OCR & Data Extraction
↓
Document Forensics
↓
Identity Consistency
↓
Trusted Issuer Verification
↓
Risk Scoring
↓
Explainable Screening Result

## Key Features

### 1. AI Document Forensics
Analysis of image characteristics including image dimension, visual quality, blur and so on for identification of suspicious documents.

### 2. OCR & Data Extraction
Using Optical Character Recognition (OCR) technology to extract readable data from uploaded documents.

Prototype tries to identify the following:
- Name
- Date of Birth
- Gender
- Document Number

### 3. Identity Consistency
Check if identity field was detected correctly and warn about insufficient information.

### 4. Trusted Issuer Verification
The solution includes a framework for integration of authorized issuer verification service.

Live document verification requires an appropriate authorized API or verification service.

### 5. AI Risk Scoring
Multiple signals of the screening are aggregated into one score.

Prototype classifies result into one of three categories:
- Low Risk
- Medium Risk
- High Risk

Score is an automated screening result and does not necessarily prove authenticity of a document.

### 6. Explainable Result
The system provides explanation for why a particular risk level was chosen, for example:
- Insufficient identity information
- Unreadable text
- No document number
- Bad image quality
- Information that should be reviewed

### 7. Privacy Protection
Prototype tries to protect personal data to unnecessary extent.

- Uploading documents are not permanently saved in current prototype version.
- Document number is masked in the results.
- Process is done locally in prototype workflow.

## Technology Stack

### Frontend
- React.js
- Vite
- HTML
- CSS
- JavaScript

### Backend
- Python
- FastAPI
- Uvicorn

### AI / Image Processing
- OpenCV
- Tesseract OCR
- Pytesseract
- Pillow
- NumPy

### Future Technologies
- Machine Learning / Deep Learning Models
- PostgreSQL
- Cloud Deployment
- Authoritative Issuers Verification APIs
- Face Matching / Liveness Detection

## Project Structure

```
Fake Identity Screening/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── venv/
│
├── main.py
│
└── README.md
```