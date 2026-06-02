"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateDiscordId } from "../actions/updateDiscordId";

export default function DiscordIdInput({ initialDiscordId }: { initialDiscordId: string }) {
  const [discordId, setDiscordId] = useState(initialDiscordId);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    const result = await updateDiscordId(discordId.trim());
    setIsSaving(false);

    if (result.success) {
      setSaved(true);
      toast.success("Discord ID updated successfully");
      setTimeout(() => setSaved(false), 2000);
    } else {
      toast.error(result.error || "Something went wrong");
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-xl">
      <div className="relative flex items-center gap-2">
        <Input
          className="pr-24 py-5 text-sm md:text-base border-slate-200 focus-visible:ring-blue-500 shadow-sm"
          type="text"
          placeholder="Enter your Discord User ID"
          value={discordId}
          onChange={(e) => setDiscordId(e.target.value)}
          disabled={isSaving}
        />
        <div className="absolute right-1.5 flex items-center">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleSave}
            disabled={isSaving || discordId === initialDiscordId}
            className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-50"
            title="Save changes"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            ) : saved ? (
              <Check className="h-4 w-4 text-emerald-600 animate-in fade-in zoom-in-75 duration-200" />
            ) : (
              <Save className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Find your Discord User ID by enabling developer mode on Discord, right-clicking your profile, and selecting <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600">Copy User ID</code>.
      </p>
    </div>
  );
}
