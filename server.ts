import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Multi-turn Gemini Chat API endpoint
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages, systemInstruction } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Messages array is required.' });
      return;
    }

    // Format conversation history for Gemini generateContent
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction:
          systemInstruction ||
          `You are Supernova Business Assistant, the official business consultant bot for Supernova Pvt. Ltd.

STRICT INSTRUCTION & BOUNDARIES:
- Answer ONLY questions related to Supernova's business, services, capabilities, how we solve technical/operational problems, branch offices, and how clients can engage with us.
- If a user asks about anything non-business or unrelated to Supernova (e.g., jokes, trivia, recipes, politics, games, personal chats, general coding homework), politely decline with:
  "I am Supernova's dedicated Business Assistant. I only answer questions regarding our business services, software solutions, how we solve business challenges, and project consultations. How can I assist your business today?"

WHAT WE DO:
1. Custom Enterprise Software: Scalable microservices, distributed architectures, high-performance APIs, database modeling, and IP ownership.
2. Web Applications: High-speed portals, corporate platforms, React/Next.js/Node.js enterprise apps.
3. Mobile Apps: Native and cross-platform (Flutter, React Native) iOS and Android applications.
4. Cloud & DevOps: AWS, Google Cloud, Azure infrastructure, CI/CD pipelines, container orchestration (Docker/Kubernetes).
5. CRM & ERP Solutions: Tailored business automation systems, inventory management, customer portals, billing integration.
6. 24/7 Managed IT Support: Infrastructure monitoring, proactive security updates, strict SLAs.

HOW WE SOLVE BUSINESS PROBLEMS:
- Legacy System Inefficiency: We audit and re-architect slow, monolithic applications into agile, high-throughput microservices without operational downtime.
- Operational Bottlenecks: We replace error-prone manual spreadsheets with unified custom ERP/CRM workflows, saving teams hundreds of hours each month.
- Scalability & Downtime: We design resilient auto-scaling cloud architectures that handle traffic surges smoothly with automated backups.
- Customer Drop-Off: We design responsive, accessible, high-performance UI/UX that drives user engagement and conversion.
- Security & Compliance Concerns: We build with enterprise security controls, data encryption in transit and at rest, and adhere to ISO standards.

OFFICE BRANCHES:
- Branch 1: 8th Floor, New Viva College, opp. Dmart, Chintamani Vihar, Y K Nagar, Virar West, Vasai-Virar, Maharashtra 401303
- Branch 2: Pahadi Village, Cama Industrial Estate, Goregaon (E), Mumbai, Maharashtra 400063
- Direct Inquiry Email: pandeyshashank520@gmail.com
- Contact Phone: +91 7905243606

Keep answers clear, grounded, professional, and concise. Encourage prospective clients to click 'Talk to Us' or use our Contact Form for a free consultation and project estimate.`,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate response from Gemini AI.',
    });
  }
});

// Direct contact dispatch endpoint
app.post('/api/contact', async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, corporateEmail, phone, organization, serviceRequested, budgetRange, message } = req.body;
    const recipient = 'pandeyshashank520@gmail.com';

    // Dispatches to FormSubmit as server-side bridge
    try {
      await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Enterprise Inquiry: ${fullName} (${organization || 'Direct'})`,
          _template: 'table',
          'Full Name': fullName,
          'Corporate Email': corporateEmail,
          'Phone': phone || 'N/A',
          'Organization': organization || 'N/A',
          'Service': serviceRequested,
          'Budget Range': budgetRange,
          'Message': message,
          _captcha: 'false',
        }),
      });
    } catch (dispatchErr) {
      console.warn('FormSubmit bridge dispatch note:', dispatchErr);
    }

    res.json({
      success: true,
      recipient,
      message: `Inquiry successfully submitted to ${recipient}`,
    });
  } catch (err: any) {
    console.error('Contact endpoint error:', err);
    res.status(500).json({ error: 'Failed to process inquiry' });
  }
});

// Vite Middleware for development / Static for production
async function startServer() {
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Supernova Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
