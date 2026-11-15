import { Action, ActionPanel, Icon, LaunchProps, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { callTool, formatNumber, searchMarket } from "./api";

interface KeywordRow {
  keyword: string;
  searchVolume: number | null;
  cpc: number | null;
  competition: number | null;
  keywordDifficulty: number | null;
  intent: string | null;
}

export default function Command(props: LaunchProps<{ arguments: { keywords: string } }>) {
  const keywords = props.arguments.keywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean)
    .slice(0, 200);
  const { isLoading, data } = usePromise(
    (list: string[]) =>
      callTool<{ keywords: KeywordRow[] }>("get_keyword_search_volume", { keywords: list, ...searchMarket() }),
    [keywords],
    { failureToastOptions: { title: "Keyword lookup failed" } },
  );

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Filter keywords">
      {data?.keywords.map((row) => (
        <List.Item
          key={row.keyword}
          title={row.keyword}
          subtitle={row.intent ?? undefined}
          accessories={[
            { text: `Vol ${formatNumber(row.searchVolume)}`, tooltip: "Average monthly Google searches" },
            { text: `KD ${formatNumber(row.keywordDifficulty)}`, tooltip: "Keyword difficulty, 0 to 100" },
            { text: row.cpc === null ? "CPC –" : `CPC $${row.cpc.toFixed(2)}` },
          ]}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard title="Copy Keyword" content={row.keyword} />
              <Action.CopyToClipboard
                title="Copy Row as CSV"
                content={[row.keyword, row.searchVolume, row.keywordDifficulty, row.cpc, row.intent].join(",")}
              />
              <Action.OpenInBrowser
                title="Search on Google"
                icon={Icon.MagnifyingGlass}
                url={`https://www.google.com/search?q=${encodeURIComponent(row.keyword)}`}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
