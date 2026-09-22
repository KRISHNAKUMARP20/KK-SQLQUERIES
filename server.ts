import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialize Gemini API client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.error("Failed to initialize GoogleGenAI:", err);
    }
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "KK SQL Academy" });
});

// AI SQL Tutor Endpoint
app.post("/api/ai-tutor", async (req, res) => {
  try {
    const { prompt, context, query, schema } = req.body;
    const ai = getAIClient();

    if (!ai) {
      // Graceful fallback response when API key is not configured
      return res.json({
        reply: `### KK AI Tutor Analysis\n\n**Query:**\n\`\`\`sql\n${query || prompt || "No query provided"}\n\`\`\`\n\n**Educational Note:**\nSQL execution relies on precise relational semantics. When writing SQL statements, ensure column names exist in the target table, verify data types match in \`WHERE\` predicates, and remember that \`NULL\` comparisons require \`IS NULL\` rather than \`= NULL\`.\n\n*(Tip: To enable live Gemini AI tutoring, configure your GEMINI_API_KEY in the environment settings.)*`
      });
    }

    const systemInstruction = `You are "KK AI SQL Mentor", an expert, warm, and highly pedagogical SQL instructor for KK SQL Academy.
Your goal is to guide learners through SQL concepts, query debugging, query optimization, and relational database design.
Always explain:
1. The logic behind the SQL
2. Potential edge cases (NULLs, duplicates, performance with indexing)
3. Standard ANSI SQL vs dialect variations (MySQL, PostgreSQL, SQLite) where relevant.
Keep explanations structured, clear, and encouraging. Use Markdown formatting.`;

    const promptMessage = `User Question / Task: ${prompt || "Analyze and explain this query"}
Context: ${context || "General SQL Learning"}
Learner SQL Query: ${query || "N/A"}
Current Database Schema / Table Structure: ${schema ? JSON.stringify(schema) : "Default Academy Schemas"}

Provide a helpful, precise explanation with actionable advice.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptMessage,
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    const reply = response.text || "No response generated from AI Tutor.";
    res.json({ reply });
  } catch (error: any) {
    console.error("AI Tutor Error:", error);
    res.status(500).json({
      error: "AI Tutor request failed",
      fallback: "Ensure your query syntax follows SQL standards. Check clause order: SELECT -> FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT."
    });
  }
});

// Start server with Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`KK SQL Academy server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
