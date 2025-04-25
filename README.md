# 📈 Feecard Automation Project

🌐 **Live App:** [https://main.d2ozxefkssnzox.amplifyapp.com/](https://main.d2ozxefkssnzox.amplifyapp.com/)

This project automates a manual process I encountered at work — the periodic release of **loan interest rate tables**, known internally as “feecards”. These feecards define applicable rates based on **loan term** and **credit category (score band)**, and are critical inputs to loan pricing logic.

The goal is to replace ad hoc updates with a **robust, automated, version-controlled** system using serverless tools and a lightweight UI.

---

## 🚀 Project Overview

A fully serverless pipeline that:

- ✅ Accepts `.csv` feecard uploads via HTTP
- ✅ Converts the CSV to structured JSON
- ✅ Stores versioned feecards in Amazon S3
- ✅ Maintains `index.json` to track the latest version
- ✅ Provides a React-based UI to upload and view feecards
- ✅ Secures API calls with environment-injected API Key (soft auth)

---

## 🛠️ Tech Stack

| Component        | Role                                                   |
|------------------|--------------------------------------------------------|
| **AWS Lambda**    | Parses CSV → JSON and uploads to S3                   |
| **API Gateway**   | Serves Lambda endpoint, handles CORS and soft auth    |
| **Amazon S3**     | Stores feecard versions and the active index file     |
| **React + Vite**  | Frontend UI for uploading and reviewing feecards      |
| **Amplify Hosting** | Deploys and hosts the frontend app                  |
| **GitHub Actions**| CI/CD for Lambda + React deployments                  |

---

## 🔐 Security

- API secured using `x-api-key` header
- API Key is injected into the frontend via Amplify environment variables
- Lambda blocks all requests without the correct API key
- CORS restricts access to known frontend origin only

---

## 📂 Folder Structure

```bash
.
├── amplify.yml              # Amplify build config
├── feecard-ui/              # Frontend source (React)
│   ├── src/
│   └── dist/
├── lambda/                  # AWS Lambda source code
│   └── parseCsv.py
└── README.md
