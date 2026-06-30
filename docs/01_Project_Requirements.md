# Enterprise Email Classification & NLP-Powered Ticket Routing System

## 1. Project Overview

The Enterprise Email Classification & NLP-Powered Ticket Routing System is an AI-powered enterprise application that automatically analyzes support requests submitted by customers or employees.

The system uses Natural Language Processing (NLP) and Machine Learning to classify incoming emails, predict their priority, generate AI summaries, and automatically create support tickets.

Version 1 of the project supports:

- Email-based support requests
- Image attachments (Screenshots, receipts, error images)

Future versions will support:

- PDF documents
- DOCX files
- Voice support
- Chatbot integration
- RAG Knowledge Base

---

## 2. Problem Statement

Large organizations receive thousands of support requests every day.

Manually reading every email, identifying the issue, assigning the correct department, and prioritizing requests is time-consuming and error-prone.

This project automates the complete ticket creation process using Artificial Intelligence.

---

## 3. Objectives

- Automate email classification
- Predict issue priority
- Generate AI summaries
- Create support tickets automatically
- Maintain ticket history
- Improve support response time

---

## 4. Target Users

### Customers

Customers can submit:

- Support requests
- Billing issues
- Technical issues
- General queries

### Employees

Employees can submit:

- HR requests
- Payroll issues
- IT support requests
- Security issues

---

## 5. Version 1 Features

### User Features

- Submit email
- Upload image
- View generated ticket

### AI Features

- NLP Classification
- Priority Prediction
- AI Summary
- Confidence Score

### Ticket Features

- Automatic Ticket ID
- Ticket Status
- Ticket History

---

## 6. Technologies

Frontend
- HTML
- CSS
- JavaScript

Backend
- Python
- Flask

AI
- BERT
- Hugging Face Transformers
- Gemini API

Database
- MySQL

Deployment
- Render

Version Control
- Git
- GitHub
## use case diagram
           Customer
               │
               ▼
        Submit Request

               │
               ▼

        AI Processing

               │
               ▼

      Generate Ticket

               │
               ▼

      Support Team


## er diagram
Users
   │
   ▼
Tickets
   │
   ├────────────┐
   ▼            ▼
AI Predictions  Attachments
   │
   ▼
Ticket History




## System Architecture V1                




                           USER
                 (Customer / Employee)
                           │
                           ▼
                 ┌─────────────────────┐
                 │      Frontend       │
                 │ HTML • CSS • JS     │
                 └─────────────────────┘
                           │
                     HTTP POST/GET
                           │
                           ▼
                 ┌─────────────────────┐
                 │      Flask API      │
                 │  Backend (Python)   │
                 └─────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
 ┌─────────────┐    ┌──────────────┐   ┌────────────────┐
 │ BERT Model  │    │ Gemini API   │   │ Business Logic │
 │Category     │    │AI Summary    │   │Routing Rules   │
 │Priority     │    │              │   │Validation      │
 └─────────────┘    └──────────────┘   └────────────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
                 ┌─────────────────────┐
                 │    MySQL Database   │
                 │ Users               │
                 │ Tickets             │
                 │ Attachments         │
                 │ AI Predictions      │
                 │ Ticket History      │
                 └─────────────────────┘
                           │
                           ▼
                 ┌─────────────────────┐
                 │  Support Dashboard  │
                 │ View / Update       │
                 │ Resolve Tickets     │
                 └─────────────────────┘


## database schema

1️⃣ users

Stores both customers and employees.

Column	Type
id	INT
name	VARCHAR(100)
email	VARCHAR(150)
role	ENUM(Customer, Employee, SupportAgent)
department	VARCHAR(100)
created_at	TIMESTAMP
2️⃣ tickets ⭐

This is the main table.

Column	Type
id	INT
ticket_id	VARCHAR(20)
user_id	INT
subject	VARCHAR(255)
description	TEXT
category	VARCHAR(100)
priority	VARCHAR(50)
confidence_score	DECIMAL(5,2)
ai_summary	TEXT
assigned_team	VARCHAR(100)
status	VARCHAR(50)
source	VARCHAR(50)
created_at	TIMESTAMP
updated_at	TIMESTAMP
3️⃣ attachments
Column	Type
id	INT
ticket_id	INT
file_name	VARCHAR(255)
file_type	VARCHAR(50)
file_path	VARCHAR(500)
uploaded_at	TIMESTAMP
4️⃣ ai_predictions
Column	Type
id	INT
ticket_id	INT
category	VARCHAR(100)
category_confidence	DECIMAL(5,2)
priority	VARCHAR(50)
priority_confidence	DECIMAL(5,2)
model_version	VARCHAR(50)
created_at	TIMESTAMP
5️⃣ ticket_history
Column	Type
id	INT
ticket_id	INT
actor_id	INT
action	VARCHAR(100)
old_value	TEXT
new_value	TEXT
created_at	TIMESTAMP


departments Table

Instead of storing:

Finance
IT
HR

inside every ticket,

we create:

departments
id	department_name	email
1	IT Support	it@company.com
2	Finance	finance@company.com
3	HR	hr@company.com
4	Security	security@company.com