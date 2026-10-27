# CrakSEO for Claude

This companion plugin provides a workflow skill and three remote MCP connections for SEO research, connected-site reporting and URL submission. It uses CrakSEO's existing services; it does not run a local SEO server or require a browser extension.

**Pre-release:** this is a reviewable plugin source bundle, not evidence of directory approval or production readiness. All ten products and this plugin must pass the common release gate before any submission. The public source repository is https://github.com/LoganOneal/crakseo-claude-plugin; it contains only this static MIT-licensed plugin, not the private CrakSEO application.

## What is included

- **CrakSEO SEO Data:** the umbrella toolkit for keyword research, search results, backlinks, live rankings, page audits, local search and AI search visibility.
- **CrakSEO URL Indexing:** owned-site IndexNow/Bing submissions, sitemap resubmission, index checks and owner-approved managed submission.
- **CrakSEO Search Console:** Google Search Console and Bing Webmaster Tools for properties you connect.
- **SEO workflow skill:** chooses the relevant steps, checks prerequisites and spending approval, and reports data with appropriate caveats.

The root `.mcp.json` uses the same URLs as the corresponding connector submissions so the directory can pair them. It is generated from the CrakSEO catalog; it contains no credentials.

The bundle includes the square 512px CrakSEO listing icon. The live privacy policy is linked in the Privacy and support section below.

## Setup

1. Sign in to a CrakSEO account at https://crakseo.com.
2. Install the published plugin when its directory listing is available. For source testing, clone the public repository, validate it with `claude plugin validate --strict <plugin-folder>` and load it using Claude Code's `--plugin-dir <plugin-folder>` option. A source release is not a Claude directory listing.
3. In Claude chat or Cowork, open the plugin's **Connectors** tab and add/connect the required connectors. An organization owner may need to add them first. In Claude Code, open `/mcp` and authenticate each required connection.
4. Sign in through CrakSEO OAuth, check the displayed return host and scopes, and approve only the access you need. A self-reported client name is not a verification badge.
5. For your own search performance or URL writes, connect Google/Bing with access to an owned property. CrakSEO OAuth alone does not connect a property.
6. Start with a free call: `get_api_credit_balance`, `get_indexing_account`, or `list_search_console_properties`, depending on the connector.

Connection instructions: https://docs.crakseo.com/seo-mcp/connect

## Examples

- "Check my API credit balance and whether data calls are enabled. Do not make a paid call."
- "After I approve the API-credit budget, compare search volume and difficulty for these keywords in the US."
- "List my connected properties and summarize the top queries by clicks for the property I choose over the last 28 days."
- "Inspect the owned page URL I provide. Do not submit it or pay for indexing."
- "Quote managed submission for my owned test page and show me the price and dashboard confirmation link. Do not submit before I approve there."

## Focused connector alternatives

The plugin loads the umbrella toolkit instead of seven overlapping data servers. If you only need one research task, install its focused connector instead of the umbrella. Do not enable both for duplicate calls; they share a wallet and tool implementations.

| Product | Endpoint |
| --- | --- |
| SEO Data | https://crakseo.com/mcp/seo |
| Google SERP API | https://crakseo.com/mcp/serp-api |
| Keyword Research | https://crakseo.com/mcp/keyword-research |
| Backlink Checker | https://crakseo.com/mcp/backlinks |
| Rank Tracker | https://crakseo.com/mcp/rank-tracker |
| SEO Site Audit | https://crakseo.com/mcp/site-audit |
| Local SEO | https://crakseo.com/mcp/local-seo |
| AI Search Visibility | https://crakseo.com/mcp/ai-visibility |
| URL Indexing | https://crakseo.com/mcp/url-indexing |
| Search Console | https://crakseo.com/mcp/search-console |

Custom connections do not require a directory listing. This endpoint table is not a claim that Anthropic has approved any product.

## Pricing and permissions

Search Console/Bing tools and the documented free indexing/status tools are free, subject to upstream quotas. Research data calls debit prepaid API credits; check the current pricing and get user approval before spending. Credit balance checks are free. Managed Google submission uses separate URL credits in the same account and requires an exact quote and the account owner's dashboard approval. The plugin never buys credits or approves its own spending.

See https://docs.crakseo.com/pricing/api-credits for current prices and availability. A disabled tool is not enabled by purchasing credits. Search data is an estimate or point-in-time snapshot; rank checks are not scheduled monitoring. Submission does not guarantee indexing or rankings, and CrakSEO does not use the Google Indexing API for ordinary pages.

## Privacy and support

The plugin itself contains static instructions and connector declarations, with no scripts, hooks or separate telemetry. When you use a connector, the relevant tool arguments are sent to CrakSEO and the upstream service necessary for the request. Google/Bing property access requires your authorization. Refer to the live privacy policy for collection, processors, storage, retention and deletion rather than assuming calls leave no records.

- Privacy: https://crakseo.com/privacy
- Terms: https://crakseo.com/terms
- Documentation: https://docs.crakseo.com
- Support and security reports: support@crakseo.com

Never paste API keys, OAuth tokens, reviewer credentials or private property data into the plugin repository.

## Troubleshooting

| Result | Action |
| --- | --- |
| 401 or revoked connection | Reauthenticate in the connector's OAuth flow. |
| Missing tools | Verify the product URL, reload the client and inspect tool permissions. |
| not_connected | Follow the returned Google/Bing connection link and use an account with property access. |
| insufficient_scope | Reconnect with the specific required scope. |
| disabled | Stop; buying credits does not enable the tool family. |
| insufficient_credits or wallet_frozen | Stop and review account/pricing or contact support; do not loop or purchase automatically. |
| needs_confirmation | Send the owner to the returned dashboard link; retry only after approval with the saved quote and idempotency key. |
| supplier_unknown | Report uncertainty; do not blindly retry a paid submission. |

## License

The plugin source is provided under the MIT license in [LICENSE](./LICENSE). This does not license access to paid APIs, supplier datasets or the CrakSEO service.
