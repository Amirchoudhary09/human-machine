# 🏥 Human-Machine Insurance Claim Decision System

## 📌 Overview
A Node.js + Express application that processes natural language insurance queries and decides claim approval based on policy clauses.

---

## ✨ Features
- Understands plain English queries.
- Extracts procedure type and policy duration.
- Checks eligibility based on covered procedures & waiting period.
- Returns structured JSON with decision, amount, and justification.
- References exact policy clauses for transparency.

---

## 📂 Project Structure
```
HUMAN_MACHINE/
│── index.js
│── package.json
│── README.md
│
├── data/
│   └── clauses.json
├── test/
│   └── sample-queries.http
└── docs/
    ├── flow-diagram.png        (Flow of decision making)
    └── architecture.png        (System design overview)
```

---

## 🚀 Installation & Run
```bash
npm install
node index.js
```
Server: `http://localhost:3000`

---

## 📡 API Endpoint
**POST** `/api/v1/hackrx/run`  

**Body Example (Approved Case):**
```json
{
  "query": "46-year-old male, knee surgery in Pune, 3-month-old insurance policy"
}
```

**Body Example (Rejected Case):**
```json
{
  "query": "46-year-old male, knee replacement in Delhi, 1-month-old insurance policy"
}
```

---

## 🧪 Testing
Use **Thunder Client** / **Postman**:  
- Method: `POST`  
- URL: `http://localhost:3000/api/v1/hackrx/run`  
- Headers:  
  ```
  Content-Type: application/json
  ```  
- Body:  
```json
{
  "query": "knee replacement, 4 months policy"
}
```

---

## 📊 Flow Diagram (Text Version)
1. **User Query** → e.g. "46-year-old male, knee surgery in Pune, 3-month-old insurance policy"
2. **NLP Parsing & Extraction** → Identify:
   - Procedure: Knee Surgery
   - Duration: 90+ days
3. **Policy Clause Matching** → Search for relevant clauses in `clauses.json`
4. **Decision Logic** →  
   - If procedure covered **AND** duration ≥ 90 days → **Approved**  
   - Else → **Rejected**
5. **Output JSON** → Includes decision, amount, and referenced clauses.

---

## 🏗 Architecture (Text Version)
- **Client**: Thunder Client / Postman sends query
- **Server (Express.js)**: Receives query on `/api/v1/hackrx/run`
- **Query Processor**:
  - Extract procedure & policy duration
  - Check against stored clauses in `data/clauses.json`
- **Decision Engine**:
  - Applies business rules
  - Returns JSON decision with clause references

---

## 👨‍💻 Authors
- Amir Choudhary  
- Razik Ali
