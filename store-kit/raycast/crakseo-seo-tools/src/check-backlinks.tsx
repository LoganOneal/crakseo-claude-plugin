import { Action, ActionPanel, Icon, LaunchProps, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { callTool, formatNumber } from "./api";

interface BacklinkResult {
  target: string;
  summary: {
    rank: number | null;
    backlinks: number | null;
    referringDomains: number | null;
    brokenBacklinks: number | null;
    spamScore: number | null;
  };
  backlinks: {
    from: string | null;
    to: string | null;
    anchor: string | null;
    dofollow: boolean | null;
    domainRank: number | null;
  }[];
}

export default function Command(props: LaunchProps<{ arguments: { target: string } }>) {
  const target = props.arguments.target.trim();
  const { isLoading, data } = usePromise(
    (value: string) => callTool<BacklinkResult>("check_backlinks", { target: value, limit: 25 }),
    [target],
    { failureToastOptions: { title: "Backlink check failed" } },
  );
  const summary = data?.summary;

  return (
    <List isLoading={isLoading} navigationTitle={`Backlinks: ${target}`}>
      {summary && (
        <List.Section title="Summary">
          <List.Item icon={Icon.Link} title="Backlinks" accessories={[{ text: formatNumber(summary.backlinks) }]} />
          <List.Item
            icon={Icon.Globe}
            title="Referring domains"
            accessories={[{ text: formatNumber(summary.referringDomains) }]}
          />
          <List.Item
            icon={Icon.BarChart}
            title="Rank (0 to 1000)"
            accessories={[{ text: formatNumber(summary.rank) }]}
          />
          <List.Item
            icon={Icon.Warning}
            title="Spam score (0 to 100)"
            accessories={[{ text: formatNumber(summary.spamScore) }]}
          />
          <List.Item
            icon={Icon.XMarkCircle}
            title="Broken backlinks"
            accessories={[{ text: formatNumber(summary.brokenBacklinks) }]}
          />
        </List.Section>
      )}
      <List.Section title="Strongest backlinks">
        {data?.backlinks.map((link, index) => (
          <List.Item
            key={`${link.from}-${index}`}
            title={link.from ?? "Unknown page"}
            subtitle={link.anchor ?? undefined}
            accessories={[
              { tag: link.dofollow ? "dofollow" : "nofollow" },
              { text: `Rank ${formatNumber(link.domainRank)}` },
            ]}
            actions={
              link.from ? (
                <ActionPanel>
                  <Action.OpenInBrowser url={link.from} />
                  <Action.CopyToClipboard title="Copy Linking URL" content={link.from} />
                </ActionPanel>
              ) : undefined
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
