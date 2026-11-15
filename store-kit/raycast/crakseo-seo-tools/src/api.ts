import { getPreferenceValues, showToast, Toast } from "@raycast/api";

const BASE_URL = "https://crakseo.com/api/v1/seo";

interface Preferences {
  apiKey: string;
  country?: string;
  language?: string;
}

interface Billing {
  chargedUsd: number;
  cacheHit: boolean;
  balanceMicros: number | null;
}

interface ToolResponse<T> {
  result: T;
  billing: Billing;
}

export function searchMarket() {
  const { country, language } = getPreferenceValues<Preferences>();
  return { country: (country || "US").trim().toUpperCase(), language: (language || "en").trim() };
}

export async function callTool<T>(tool: string, args: Record<string, unknown>): Promise<T> {
  const { apiKey } = getPreferenceValues<Preferences>();
  const response = await fetch(`${BASE_URL}/${tool}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey.trim()}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  const body = (await response.json().catch(() => ({}))) as Partial<ToolResponse<T>> & {
    error?: string;
    message?: string;
  };
  if (!response.ok || !body.result) {
    throw new Error(body.message ?? body.error ?? `Request failed with status ${response.status}`);
  }
  if (body.billing) await showBilling(body.billing);
  return body.result;
}

async function showBilling({ chargedUsd, cacheHit, balanceMicros }: Billing) {
  const balance = balanceMicros === null ? "" : `, balance $${(balanceMicros / 1_000_000).toFixed(2)}`;
  await showToast({
    style: Toast.Style.Success,
    title: `Charged $${chargedUsd.toFixed(3)}${cacheHit ? " (cached)" : ""}`,
    message: balance.slice(2),
  });
}

export function formatNumber(value: number | null | undefined) {
  return value === null || value === undefined ? "–" : value.toLocaleString("en-US");
}
