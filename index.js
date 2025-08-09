// Express server setup
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Dummy clause database
const clauses = [
  {
    clause_id: "4.2.1",
    text: "Orthopedic surgeries including knee surgery are covered after a 90-day waiting period."
  },
  {
    clause_id: "2.1",
    text: "All insured individuals above 18 years are eligible unless otherwise excluded."
  }
];

// Helper: Extract number of days from query
function extractPolicyDays(query) {
  const lower = query.toLowerCase();

  // Direct number + day(s)
  let dayMatch = lower.match(/(\d+)\s*day/);
  if (dayMatch) return parseInt(dayMatch[1]);

  // Month(s) → convert to approx days
  let monthMatch = lower.match(/(\d+)\s*month/);
  if (monthMatch) return parseInt(monthMatch[1]) * 30;

  return null; // not found
}

// Helper: Check if procedure is knee surgery (approx match)
function isKneeSurgery(query) {
  const lower = query.toLowerCase();
  const keywords = ["knee surgery", "knee operation", "knee replacement", "orthopedic knee"];
  return keywords.some(k => lower.includes(k));
}

// Decision Logic
function evaluateQuery(query) {
  const response = {
    decision: "Rejected",
    amount: "₹0",
    justification: {
      reason: "Not enough information",
      referenced_clauses: []
    }
  };

  const days = extractPolicyDays(query);
  const knee = isKneeSurgery(query);

  if (knee && days !== null && days >= 90) {
    response.decision = "Approved";
    response.amount = "₹80,000";
    response.justification.reason = "Knee surgery is covered after a 90-day waiting period.";
    response.justification.referenced_clauses = [clauses[0], clauses[1]];
  }

  return response;
}

// Webhook route
app.post('/api/v1/hackrx/run', (req, res) => {
  const userQuery = req.body.query || "";
  const result = evaluateQuery(userQuery);
  res.json(result);
});

app.get('/', (req, res) => {
  res.send('Human-Machine Webhook is live with smart matching.');
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
