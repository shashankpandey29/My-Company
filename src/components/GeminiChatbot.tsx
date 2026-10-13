import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Loader2,
  Bot,
  User,
  RefreshCw,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface GeminiChatbotProps {
  onOpenTalkToUs?: () => void;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const WHATSAPP_NUMBER = '7905243606';
const WHATSAPP_URL = `https://wa.me/917905243606?text=${encodeURIComponent(
  'Hello Supernova, I would like to inquire about your software and IT services.'
)}`;

// Quick suggestions focused strictly on business, services, problem-solving, and WhatsApp
const BUSINESS_QUICK_ACTIONS = [
  {
    label: 'What do you do?',
    prompt: 'What does Supernova Pvt. Ltd. do and what are your core offerings?',
  },
  {
    label: 'How do you solve problems?',
    prompt: 'How can Supernova solve my business and software challenges?',
  },
  {
    label: 'Our Services',
    prompt: 'What specific software development and IT services do you provide?',
  },
  {
    label: 'Branch Locations',
    prompt: 'Where are your branch offices located and how do I contact you?',
  },
  {
    label: '💼 Company LinkedIn',
    prompt: 'Where can I find Supernova on LinkedIn or connect on social media?',
  },
  {
    label: '💬 Chat on WhatsApp',
    isWhatsApp: true,
  },
  {
    label: 'Talk to Us / Form',
    isAction: true,
  },
];

// Local Knowledge Base for instant, robust business answers
function getLocalBusinessAnswer(query: string): string | null {
  const q = query.toLowerCase().trim();

  // Check for non-business / off-topic queries first
  const nonBusinessTriggers = [
    'joke', 'funny', 'weather', 'movie', 'song', 'recipe', 'cook', 'game', 
    'cricket', 'football', 'president', 'prime minister', 'politics', 
    'dating', 'love', 'poem', 'story', 'lyrics', 'homework', 'translate to french'
  ];
  if (nonBusinessTriggers.some((trigger) => q.includes(trigger))) {
    return `I am Supernova's dedicated Business Bot. I am configured to assist strictly with our business solutions, software engineering capabilities, and how we solve technical problems for companies.\n\nCould I help you learn about what we do, our services, or how we can assist with your project?`;
  }

  // WhatsApp query
  if (q.includes('whatsapp') || q.includes('whattaap') || q.includes('whatsaap')) {
    return `**WhatsApp Integration Available:**\n\nYou can chat with our team directly on WhatsApp at **+91 ${WHATSAPP_NUMBER}**.\n\nClick the green WhatsApp button on the left or tap the WhatsApp button above to open a chat immediately!`;
  }

  // LinkedIn / Social Media query
  if (q.includes('linkedin') || q.includes('linkden') || q.includes('social') || q.includes('cpmpany linkden')) {
    return `**Supernova on LinkedIn & Social Media:**\n\n• **Official Company LinkedIn:** [linkedin.com/company/supernova-pvt-ltd](https://www.linkedin.com/company/supernova-pvt-ltd)\n• You can also click the **LinkedIn** button directly in the header navigation, footer, or contact page.\n• **Direct Real-Time Chat:** Connect with us on WhatsApp at **+91 ${WHATSAPP_NUMBER}** or click "Talk to Us".`;
  }

  // What do you do
  if (
    q.includes('what do you do') ||
    q.includes('what does supernova do') ||
    q.includes('about company') ||
    q.includes('who are you') ||
    q.includes('what we do')
  ) {
    return `**What Supernova Pvt. Ltd. Does:**\n\nWe are an enterprise software engineering and intelligent IT services firm. We build custom technology solutions for businesses, including:\n\n• **Custom Enterprise Software:** Robust backend microservices, high-performance APIs, and scalable databases.\n• **Web & Cloud Applications:** Modern, fast React/Node.js web portals, dashboards, and enterprise platforms.\n• **Mobile App Development:** Cross-platform (Flutter) and native iOS/Android apps.\n• **Enterprise CRM & ERP Systems:** Automated workflows, team collaboration tools, and operations software.\n• **Cloud Architecture & DevOps:** Infrastructure setup, Docker/Kubernetes management, and 24/7 monitoring.\n\nWe partner with growing startups and established enterprises to turn business goals into scalable software.`;
  }

  // How can you solve my problem / problems we solve
  if (
    q.includes('solve') ||
    q.includes('problem') ||
    q.includes('challenge') ||
    q.includes('why choose') ||
    q.includes('help my business')
  ) {
    return `**How We Solve Your Business Problems:**\n\n1. **Slow or Outdated Legacy Systems:** We modernize monoliths into fast, clean microservices without business disruption.\n2. **Manual & Inefficient Operations:** We replace tedious spreadsheets with custom CRM/ERP workflow software, reducing errors and saving hundreds of operational hours.\n3. **Downtime & High Traffic Crashes:** We engineer auto-scaling cloud architectures (AWS/GCP/Azure) with 99.9% uptime and automated failovers.\n4. **Poor Conversion & UX:** We build responsive, intuitive web and mobile applications optimized for user engagement.\n5. **Security & Data Risks:** We enforce enterprise security controls, data encryption, and ISO-standard compliant development.\n\nClick **"Talk to us"** to discuss your specific business challenge with our engineering leads!`;
  }

  // Services offered
  if (
    q.includes('service') ||
    q.includes('offer') ||
    q.includes('what services') ||
    q.includes('stack') ||
    q.includes('technology')
  ) {
    return `**Our Core Business Services:**\n\n• **Software Development:** Bespoke applications, API integration, and architectural consulting.\n• **Web Application Engineering:** Full-stack development with React, TypeScript, Next.js, and Node.js.\n• **Managed IT Support & DevOps:** 24/7 SLA-backed system maintenance, cloud migrations, and security patching.\n• **CRM / ERP Platforms:** Tailor-made enterprise software for operations, sales, and analytics.\n\nEvery project includes comprehensive documentation, IP ownership transfer, and dedicated sprint reviews.`;
  }

  // Branch locations / address
  if (
    q.includes('branch') ||
    q.includes('address') ||
    q.includes('location') ||
    q.includes('office') ||
    q.includes('where are you') ||
    q.includes('virar') ||
    q.includes('goregaon') ||
    q.includes('mumbai')
  ) {
    return `**Supernova Pvt. Ltd. Branch Offices:**\n\n📍 **Branch 1 (Virar):**\n8th Floor, New Viva College, opp. Dmart, Chintamani Vihar, Y K Nagar, Virar West, Vasai-Virar, Maharashtra 401303\n\n📍 **Branch 2 (Goregaon):**\nPahadi Village, Cama Industrial Estate, Goregaon (E), Mumbai, Maharashtra 400063\n\n📞 **Phone / WhatsApp:** +91 ${WHATSAPP_NUMBER}\n✉️ **Inquiry Email:** pandeyshashank520@gmail.com`;
  }

  // Contact / Quote / Budget
  if (
    q.includes('contact') ||
    q.includes('quote') ||
    q.includes('budget') ||
    q.includes('price') ||
    q.includes('cost') ||
    q.includes('hire') ||
    q.includes('start project')
  ) {
    return `**How to Inquire or Start a Project:**\n\n• Click the **"Talk to us"** button in the top menu or inside this chat to open our consultation form.\n• You can write your custom budget (e.g. ₹5,00,000, $15,000) and describe your software needs.\n• Direct WhatsApp available at **+91 ${WHATSAPP_NUMBER}**.\n• Your inquiry is immediately dispatched to our team at **pandeyshashank520@gmail.com**.\n• We review technical requirements and respond within 24 business hours.`;
  }

  return null;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  onOpenTalkToUs,
  isOpen: propIsOpen,
  setIsOpen: propSetIsOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;
  const setIsOpen = (val: boolean) => {
    if (propSetIsOpen) {
      propSetIsOpen(val);
    } else {
      setInternalIsOpen(val);
    }
  };
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      role: 'model',
      content:
        'Hello! I am the Supernova Business Bot. I provide answers strictly related to our business: what we do, the services we offer, and how we solve technical problems for organizations.\n\nHow can I help your business today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    // 1. Check quick local knowledge base first for rapid response
    const localAnswer = getLocalBusinessAnswer(text);
    if (localAnswer) {
      setTimeout(() => {
        const modelMessage: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: 'model',
          content: localAnswer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, modelMessage]);
        setLoading(false);
      }, 400);
      return;
    }

    // 2. Call server-side /api/chat endpoint with strict business instruction
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const modelMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'model',
        content:
          data.text ||
          `Thank you for your question. For a detailed business consultation, feel free to use our "Talk to us" form or message us directly on WhatsApp at +91 ${WHATSAPP_NUMBER}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      console.error('Chatbot error:', err);
      // Fallback response strictly focused on business solutions
      const fallbackMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'model',
        content: `Supernova Pvt. Ltd. provides custom enterprise software development, web & cloud platforms, and IT solutions engineered to solve operational and scaling problems.\n\nTo consult directly with our technical team or receive a custom quote, please click "Talk to Us" or reach out on WhatsApp at +91 ${WHATSAPP_NUMBER} / pandeyshashank520@gmail.com.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg_welcome',
        role: 'model',
        content:
          'Conversation reset. I am ready to answer your questions regarding Supernova’s business, software capabilities, or how we solve engineering problems.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Dedicated Cut/Stop bot handler
  const handleCutBot = () => {
    setIsOpen(false);
  };

  return (
    <div className="pointer-events-auto relative font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-13 h-13 sm:w-14 sm:h-14 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-full shadow-xl hover:shadow-2xl hover:shadow-emerald-500/40 flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer relative group border-2 border-slate-900"
          aria-label="Open Supernova Business Bot"
          title="Supernova Business Bot"
        >
          <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-300 rounded-full animate-ping pointer-events-none" />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-200 rounded-full border border-slate-900 pointer-events-none" />
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block whitespace-nowrap bg-slate-900/95 text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-lg pointer-events-none border border-slate-700">
            Business Bot
          </span>
        </button>
      )}

      {/* Expanded Multi-turn Chat Window */}
      {isOpen && (
        <div className="bg-white border border-slate-300 rounded-2xl shadow-2xl w-[92vw] max-w-[420px] h-[600px] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white p-3.5 flex items-center justify-between border-b border-emerald-500/30">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-xs">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5 font-serif text-white">
                  <span>Supernova Business Bot</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded font-sans font-medium">
                    Business Only
                  </span>
                </h3>
                <p className="text-[10.5px] text-slate-300 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Solutions &amp; Services Consultant</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleResetChat}
                title="Reset conversation"
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              {/* Simple symbol for cutting/closing the bot - no text */}
              <button
                onClick={handleCutBot}
                title="Close"
                aria-label="Close"
                className="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-slate-700/60 hover:border-red-500 shadow-2xs"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Quick Notice Banner: WhatsApp & Branches */}
          <div className="bg-slate-900 border-b border-slate-800 px-3 py-1.5 text-[11px] text-slate-300 flex items-center justify-between">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              title="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {onOpenTalkToUs && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenTalkToUs();
                }}
                className="text-[10px] text-slate-200 bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-700 font-semibold cursor-pointer ml-2"
              >
                Talk to Us Form
              </button>
            )}
          </div>

          {/* Message Thread (Scrollable) */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/70 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-6 h-6 rounded-full bg-slate-900 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-emerald-700 text-white rounded-br-none shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <span
                    className={`block text-[9px] mt-1.5 text-right ${
                      msg.role === 'user' ? 'text-emerald-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                    <User className="w-3.5 h-3.5 text-slate-200" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs pl-2 py-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                <span>Checking business solutions...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Business Quick Action Chips (with WhatsApp and Cut Actions) */}
          <div className="px-3 py-2 bg-white border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {BUSINESS_QUICK_ACTIONS.map((item, idx) => (
              <React.Fragment key={idx}>
                {item.isWhatsApp ? (
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10.5px] whitespace-nowrap px-2.5 py-1 rounded-full border border-emerald-600 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <MessageCircle className="w-3 h-3 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      if (item.isAction && onOpenTalkToUs) {
                        setIsOpen(false);
                        onOpenTalkToUs();
                      } else if (item.prompt) {
                        handleSendMessage(item.prompt);
                      }
                    }}
                    className={`text-[10.5px] whitespace-nowrap px-2.5 py-1 rounded-full border transition-all cursor-pointer font-medium ${
                      item.isAction
                        ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 font-semibold shadow-2xs'
                        : 'bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Input Form & Bottom Bar */}
          <div className="bg-slate-100/90 border-t border-slate-200 p-2.5 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask what we do, services, problem solving..."
                disabled={loading}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white transition-colors cursor-pointer disabled:cursor-not-allowed shadow-xs"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Action Footer: WhatsApp & Cut/Close Symbol */}
            <div className="flex items-center justify-between pt-1 text-[11px]">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
                title="WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              {/* Simple cut symbol button - no text */}
              <button
                type="button"
                onClick={handleCutBot}
                className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Close"
                aria-label="Close"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
