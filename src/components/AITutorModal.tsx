import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Terminal, 
  Lightbulb, 
  RotateCcw,
  Loader2
} from 'lucide-react';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: {
    topicTitle?: string;
    query?: string;
    error?: string;
    explainBriefly?: boolean;
    briefSummary?: string;
  };
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  initialContext
}) => {
  const getInitialAssistantMessage = () => {
    if (initialContext?.explainBriefly && initialContext.topicTitle) {
      return `### ⚡ 30-Second Brief Explanation: ${initialContext.topicTitle}\n\n` +
        `**1. Plain English Mental Model:**\n` +
        `${initialContext.briefSummary || "This SQL command lets you manipulate or retrieve relations declaratively without writing procedural loops."}\n\n` +
        `**2. The 3 Core Rules:**\n` +
        `• Always filter with SARGable conditions to utilize B-Tree indexes.\n` +
        `• Keep primary and foreign key references consistent across schemas.\n` +
        `• Be mindful of NULL handling using \`IS NULL\` rather than \`= NULL\`.\n\n` +
        `**3. Quick Code Template:**\n` +
        `\`\`\`sql\n${initialContext.query || "SELECT * FROM table_name;"}\n\`\`\`\n\n` +
        `*Need a specific real-world scenario or simpler analogy? Just ask below!*`;
    }
    if (initialContext?.topicTitle) {
      return `Hello Krishna! I am your KK SQL Academy AI Mentor. We are currently reviewing **"${initialContext.topicTitle}"**. How can I assist you with this concept, its syntax, or writing optimized queries?`;
    }
    return `Hello Krishna! I am your KK SQL Academy AI Mentor. You can ask me anything about SQL fundamentals, writing complex JOINs, CTEs, Window Functions, Query Execution Plans (EXPLAIN), or database indexing!`;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: getInitialAssistantMessage()
    }
  ]);

  // Sync assistant welcome message when context changes
  React.useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          role: 'assistant',
          content: getInitialAssistantMessage()
        }
      ]);
      if (initialContext?.error) {
        setInput(`Can you help me fix this SQL error: "${initialContext.error}" in my query:\n${initialContext.query}`);
      } else {
        setInput('');
      }
    }
  }, [isOpen, initialContext?.topicTitle, initialContext?.explainBriefly]);
  const [input, setInput] = useState(
    initialContext?.error 
      ? `Can you help me fix this SQL error: "${initialContext.error}" in my query:\n${initialContext.query}` 
      : ''
  );
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          context: initialContext
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      // Intelligent fallback answer if backend AI endpoint is unavailable
      let fallback = `Here is the SQL architectural breakdown for your question:\n\n1. **Core Relational Principle**: In relational databases, ensure predicates in WHERE clauses are SARGable (Search Argument Able). Never wrap indexed columns in scalar functions (e.g. avoid \`WHERE YEAR(created_at) = 2026\`, prefer \`WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01'\`).\n2. **Join Strategy**: Ensure foreign key columns have corresponding B-Tree indexes to avoid expensive nested-loop full scans.\n3. **Aggregation**: Always list all non-aggregated SELECT columns in your GROUP BY clause.`;
      
      if (userMsg.toLowerCase().includes('join')) {
        fallback = `**SQL Joins Deep Dive:**\n- **INNER JOIN**: Returns records that have matching values in both tables.\n- **LEFT JOIN**: Returns all records from the left table and matched records from the right table (with NULLs for unmatched rows).\n- **FULL OUTER JOIN**: Returns all records when there is a match in either table.\n- **CROSS JOIN**: Produces a Cartesian product (A × B rows).`;
      } else if (userMsg.toLowerCase().includes('window') || userMsg.toLowerCase().includes('partition')) {
        fallback = `**Window Functions Architecture:**\nWindow functions operate on a set of rows and return a value for each row. Syntax:\n\`<function>() OVER (PARTITION BY <group_col> ORDER BY <sort_col>)\`\n- \`ROW_NUMBER()\`: Strict 1, 2, 3 sequence.\n- \`RANK()\`: 1, 2, 2, 4 (gaps on ties).\n- \`DENSE_RANK()\`: 1, 2, 2, 3 (no gaps on ties).`;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col h-[600px] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">KK AI SQL Mentor</h3>
              <p className="text-xs text-slate-400">Intelligent query diagnosis, syntax explainer, and optimization tutor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 font-sans text-xs scrollbar-thin scrollbar-thumb-slate-800">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              }`}>
                {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div className={`p-4 rounded-2xl max-w-[85%] leading-relaxed ${
                m.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-wrap'
              }`}>
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30">
                <Bot className="h-4 w-4" />
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl rounded-tl-none flex items-center gap-2 text-slate-400 text-xs">
                <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                <span>KK AI is analyzing relational concepts...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-6 py-2 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px] scrollbar-none">
          <span className="text-slate-500 shrink-0 font-medium">Quick ask:</span>
          {[
            'Explain Window Functions vs GROUP BY',
            'How to find 2nd highest salary?',
            'What makes an index sargable?',
            'Difference between 2NF and 3NF?'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => setInput(prompt)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask a question about SQL syntax, joins, transactions, or paste a query to diagnose..."
            rows={2}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="h-11 w-11 flex items-center justify-center rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-all shadow-md shrink-0 cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
