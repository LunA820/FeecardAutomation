# 📈 Feecard Automation Project

This project is inspired by a manual process I encountered at work.  
In a real-world lending application, we periodically update **loan interest rates** based on **loan term** and **credit category (credit score)**. These updates are published as “feecards” — structured data that the loan system reads from.

The goal of this project is to **automate** that feecard release process using serverless technologies.

---

## 🚀 Project Overview

A fully serverless microservice that:

- Accepts a `.csv` upload via HTTP
- Converts the data into structured JSON
- Stores the feecard in Amazon S3 with versioning support
- Maintains an `index.json` to track the latest feecard
- Provides a UI to upload and view feecards

---

## 🛠️ Tech Stack

| Component       | Description                                           |
|----------------|-------------------------------------------------------|
| **AWS Lambda**  | Parses CSV input and generates feecard JSON          |
| **API Gateway** | Exposes HTTP endpoint for CSV uploads                |
| **S3**          | Stores generated feecards and index metadata         |
| **React**       | UI to upload `.csv` files and view the latest feecard |
| **GitHub Actions** | CI/CD pipeline for automated deployment          |

---