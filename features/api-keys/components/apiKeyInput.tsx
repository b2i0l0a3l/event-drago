"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clipboard, Check, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ApiKeyInput({ apiKey }: { apiKey: string }) {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast.success("API Key copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-xl">
      <div className="relative flex items-center gap-2">
        <Input
          className="font-mono pr-24 py-5 text-sm md:text-base border-slate-200 focus-visible:ring-blue-500 shadow-sm"
          type={showKey ? "text" : "password"}
          readOnly
          value={apiKey || ""}
        />
        <div className="absolute right-1.5 flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowKey(!showKey)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
            title={showKey ? "Hide API key" : "Show API key"}
          >
            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
            title="Copy API key"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-600 animate-in fade-in zoom-in-75 duration-200" />
            ) : (
              <Clipboard className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Use this key in the <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600">Authorization: Bearer</code> header.
      </p>
    </div>
  );
}