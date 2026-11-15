# CrakSEO SEO Tools

Look up SEO data from Raycast with [CrakSEO](https://crakseo.com):

- **Keyword Search Volume:** monthly Google searches, CPC, keyword difficulty and intent for up to 200 comma-separated keywords.
- **Google SERP:** the live top 10 Google results for a keyword, with SERP features.
- **Check Backlinks:** backlinks, referring domains, rank and spam score for a domain or URL, plus the 25 strongest backlinks.

## Setup

1. Sign up at [crakseo.com](https://crakseo.com) and add API credits (packs start at $5).
2. Create an API key at [crakseo.com/app/api/keys](https://crakseo.com/app/api/keys). Keys start with `bidx_key_`.
3. Paste the key into the extension's **API Key** preference. Optionally set the **Country** (default `US`) and **Language** (default `en`) of the search market.

Each lookup debits prepaid credits. After every call the extension shows what was charged and your remaining balance. Repeating the same lookup within 24 hours returns a cached result. Prices for each tool are listed in the [API docs](https://docs.crakseo.com).

The same data is available to AI assistants through CrakSEO's hosted MCP servers, for example `https://crakseo.com/mcp/seo`.

## Development

```bash
npm install
npm run dev
```

`npm run build` type-checks and bundles the extension; `npm run lint` runs the Raycast ESLint config.

Licensed under MIT.