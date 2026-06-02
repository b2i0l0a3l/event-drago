import PageTitle from "@/components/pageTitle";
import { getDiscordId } from "../actions/getDiscordId";
import DiscordIdInput from "./discordIdInput";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import Container from "@/components/layout/container/Container";

export default async function AccountSettingsClient() {
  const discordId = await getDiscordId();

  return (
    <div className="flex flex-col w-full">
      <PageTitle title="Account Settings" />
      <Container className="mt-8">
        <Card className="max-w-2xl border-slate-200 shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Settings className="h-5 w-5 text-blue-600" />
              Discord Integration
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Configure your Discord User ID to receive real-time notifications for incoming events directly in your DMs.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <DiscordIdInput initialDiscordId={(discordId as string) || ""} />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
