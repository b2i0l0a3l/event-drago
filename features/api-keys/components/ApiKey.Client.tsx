import PageTitle from "@/components/pageTitle";
import { getApiKey } from "../actions/getApiKey";
import ApiKeyInput from "./apiKeyInput";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Key } from "lucide-react";
import Container from "@/components/layout/container/Container";

export default async function ApiKeyClient() {
  const apiKey = await getApiKey();

  return (
    <div className="flex flex-col w-full">
      <PageTitle title="API Key" />
      <Container className="mt-8">
        <Card className="max-w-2xl border-slate-200 shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Key className="h-5 w-5 text-blue-600" />
              Credentials Management
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Your API key is used to authenticate requests to the DragoEvent events ingestion API. Keep this secret.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ApiKeyInput apiKey={apiKey as string} />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}