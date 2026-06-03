import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

export default function CodeSnippet({ 
  categoryName, 
  origin 
}: { 
  categoryName: string; 
  origin: string; 
}) {
  const [copied, setCopied] = useState(false);
  
  const code = `await fetch('${origin}/api/v1/events', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <>your Api key</>'
  },
  body: JSON.stringify({
    category: '${categoryName}',
    fields: {
      field1: 'value1', // for example: user id
      field2: 'value2' // for example: user email
    }
  })
})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code snippet copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-[#1e1e2e] dark:bg-[#15151f]">
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#181824] dark:bg-[#0f0f15] border-b border-slate-800/60">
        <div className="flex gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-xs font-mono text-slate-400 select-none">your-first-event.js</span>
        <Button
          onClick={handleCopy}
          size="sm"
          variant="ghost"
          className="h-8 px-3 text-xs text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500 animate-in fade-in zoom-in-75 duration-200" />
              <span className="text-emerald-500 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
      <pre className="p-6 md:p-8 overflow-x-auto text-left text-sm font-mono leading-relaxed text-[#f8f8f2] bg-[#1e1e2e] dark:bg-[#12121a]">
        <code>
          <span className="text-[#ff79c6]">await</span> <span className="text-[#50fa7b]">fetch</span>(<span className="text-[#f1fa8c]">{`'`}</span><span className="text-[#8be9fd]">{origin}</span><span className="text-[#f1fa8c]">{`/api/v1/events'`}</span>, &#123;{"\n"}
          {"  "}method: <span className="text-[#f1fa8c]">'POST'</span>,{"\n"}
          {"  "}headers: &#123;{"\n"}
          {"    "}<span className="text-[#f1fa8c]">'Authorization'</span>: <span className="text-[#f1fa8c]">{`'`}</span><span className="text-[#ffb86c]">Bearer {'< '}your Api key{' >'}</span><span className="text-[#f1fa8c]">{`'`}</span>{"\n"}
          {"  "}&#125;,{"\n"}
          {"  "}body: <span className="text-[#66d9ef]">JSON</span>.<span className="text-[#50fa7b]">stringify</span>(&#123;{"\n"}
          {"    "}category: <span className="text-[#f1fa8c]">{`'`}</span><span className="text-[#50fa7b]">{categoryName}</span><span className="text-[#f1fa8c]">{`'`}</span>,{"\n"}
          {"    "}fields: &#123;{"\n"}
          {"      "}field1: <span className="text-[#f1fa8c]">'value1'</span>, <span className="text-[#6272a4]">// for example: user id</span>{"\n"}
          {"      "}field2: <span className="text-[#f1fa8c]">'value2'</span> <span className="text-[#6272a4]">// for example: user email</span>{"\n"}
          {"    "}&#125;{"\n"}
          {"  "}&#125;){"\n"}
          &#125;)
        </code>
      </pre>
    </div>
  );
}