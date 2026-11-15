import { Action, ActionPanel, LaunchProps, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { callTool, searchMarket } from "./api";

interface OrganicResult {
  position: number | null;
  title: string | null;
  url: string | null;
  domain: string | null;
  description: string | null;
}

interface SerpResult {
  keyword: string;
  features: string[];
  organic: OrganicResult[];
}

export default function Command(props: LaunchProps<{ arguments: { keyword: string } }>) {
  const keyword = props.arguments.keyword.trim();
  const { isLoading, data } = usePromise(
    (query: string) =>
      callTool<SerpResult>("get_google_serp", { keyword: query, device: "desktop", depth: 10, ...searchMarket() }),
    [keyword],
    { failureToastOptions: { title: "Google results failed" } },
  );

  return (
    <List isLoading={isLoading} isShowingDetail navigationTitle={`Google: ${keyword}`}>
      {data && data.features.length > 0 && (
        <List.Section title="SERP features">
          <List.Item
            title={data.features.join(", ")}
            detail={<List.Item.Detail markdown={data.features.join("\n\n")} />}
          />
        </List.Section>
      )}
      <List.Section title="Organic results">
        {data?.organic.map((result, index) => (
          <List.Item
            key={`${result.url}-${index}`}
            title={`${result.position ?? index + 1}. ${result.title ?? result.url ?? "Untitled"}`}
            subtitle={result.domain ?? undefined}
            detail={
              <List.Item.Detail
                markdown={`### ${result.title ?? ""}\n\n${result.url ?? ""}\n\n${result.description ?? ""}`}
              />
            }
            actions={
              result.url ? (
                <ActionPanel>
                  <Action.OpenInBrowser url={result.url} />
                  <Action.CopyToClipboard title="Copy URL" content={result.url} />
                </ActionPanel>
              ) : undefined
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
