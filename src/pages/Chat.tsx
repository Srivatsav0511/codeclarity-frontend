import { useEffect, useRef, useState } from "react";

type BotMessage = {
  summary?: string;
  breakdown?: string[];
  output?: string;
  suggestions?: string[];
};

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string | BotMessage;
};

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  
  useEffect(() => {
    const saved = localStorage.getItem("codeclarity-chat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  
  useEffect(() => {
    localStorage.setItem("codeclarity-chat", JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom on update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Parse backend explanation (simple regex splitter)
  const parseCodeResponse = (raw: string): BotMessage => {
    const parts = raw.split(/Summary:|Breakdown:|Output:|Suggestions:/i);

    return {
      summary: parts[1]?.trim() || "",
      breakdown:
        parts[2]?.trim()?.split("-")?.filter(Boolean)?.map((x) => x.trim()) || [],
      output: parts[3]?.trim() || "",
      suggestions:
        parts[4]?.trim()?.split("-")?.filter(Boolean)?.map((x) => x.trim()) || [],
    };
  };

  
  const isCodeInput = (text: string): boolean => {
    const codePatterns = ["{", "}", "(", ")", "=", ";", "function", "class", "let", "const", "var", "if", "for", "while"];
    return codePatterns.some((p) => text.includes(p));
  };

  // Send message to backend
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: userText },
    ]);

    setInput("");
    setLoading(true);

    // If not code → Show warning
    if (!isCodeInput(userText)) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 10,
          sender: "bot",
          text: {
            summary: "Only code explanations are supported in this app.",
            breakdown: [],
            output: "",
            suggestions: ["Please enter a valid code snippet."],
          },
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: userText }),
      });

      const data = await res.json();
      const parsed = parseCodeResponse(data.explanation || "");

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 2, sender: "bot", text: parsed },
      ]);
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 3,
          sender: "bot",
          text: { summary: "Server error occurred." },
        },
      ]);
    }

    setLoading(false);
  };

  // Render bot explanation block
  const renderCodeBlock = (msg: BotMessage) => (
    <div className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-5 font-mono text-sm space-y-5">
      
      <div>
        <div className="font-semibold text-blue-400 text-lg mb-1">Summary</div>
        <p>{msg.summary}</p>
      </div>

      {msg.breakdown && msg.breakdown.length > 0 && (
        <div>
          <div className="font-semibold text-blue-400 text-lg mb-1">Breakdown</div>
          <ul className="space-y-1">
            {msg.breakdown.map((b, i) => (
              <li key={i}>• {b}</li>
            ))}
          </ul>
        </div>
      )}

      {msg.output && (
        <div>
          <div className="font-semibold text-blue-400 text-lg mb-1">Output</div>
          <div className="bg-neutral-900 p-3 rounded whitespace-pre-wrap font-mono">
            {msg.output}
          </div>
        </div>
      )}

      {msg.suggestions && msg.suggestions.length > 0 && (
        <div>
          <div className="font-semibold text-blue-400 text-lg mb-1">Suggestions</div>
          <ul className="space-y-1">
            {msg.suggestions.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col font-mono">

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pt-24">
        
        {messages.length === 0 && (
          <p className="text-neutral-500 text-center mt-20 text-sm sticky top-2/4">
            Enter any code snippet and I’ll explain it ✨
          </p>
        )}

        {messages.map((msg) =>
          msg.sender === "user" ? (
            <div
              key={msg.id}
              className="ml-auto max-w-[75%] bg-blue-600 p-3 rounded-lg text-sm whitespace-pre-wrap break-words"
            >
              {msg.text as string}
            </div>
          ) : (
            <div key={msg.id} className="max-w-[85%]">{renderCodeBlock(msg.text as BotMessage)}</div>
          )
        )}

        {loading && <p className="text-neutral-400 text-sm">Processing...</p>}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="w-full px-4 py-4 bg-neutral-900 flex justify-center border-t border-neutral-800 sticky bottom-0">
        <div className="w-full md:w-[70%] bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 flex items-center gap-3">

          <textarea
            value={input}
            placeholder="Paste your code here…"
            className="flex-1 bg-transparent text-white outline-none resize-none h-24 leading-5 whitespace-pre-wrap"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) return;
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="px-6 py-2 bg-neutral-200 text-black rounded-full hover:bg-neutral-300"
          >
            Send
          </button>

        </div>
      </div>
    </div>
  );
}