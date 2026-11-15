# SEO Tools MCP by CrakSEO: installation guide for Cline

Remote MCP servers hosted by CrakSEO. Nothing to build, clone or run locally.

| Server name | URL |
| --- | --- |
| `crakseo-seo` | `https://crakseo.com/mcp/seo` |
| `crakseo-search-console` | `https://crakseo.com/mcp/search-console` |
| `crakseo-url-indexing` (optional) | `https://crakseo.com/mcp/url-indexing` |

Docs: https://docs.crakseo.com/quickstarts/cline

## Steps

1. Ask the user for a CrakSEO API key. If they do not have one, tell them to sign up and create a key at https://crakseo.com/app/api/keys. Do not proceed with a made-up key.
2. Open the Cline MCP settings file (`cline_mcp_settings.json`).
3. Add these entries inside `mcpServers`, replacing `YOUR_CRAKSEO_API_KEY` with the user's key. Keep any existing servers.

   ```json
   {
     "mcpServers": {
       "crakseo-seo": {
         "type": "streamableHttp",
         "url": "https://crakseo.com/mcp/seo",
         "headers": { "Authorization": "Bearer YOUR_CRAKSEO_API_KEY" },
         "disabled": false
       },
       "crakseo-search-console": {
         "type": "streamableHttp",
         "url": "https://crakseo.com/mcp/search-console",
         "headers": { "Authorization": "Bearer YOUR_CRAKSEO_API_KEY" },
         "disabled": false
       },
       "crakseo-url-indexing": {
         "type": "streamableHttp",
         "url": "https://crakseo.com/mcp/url-indexing",
         "headers": { "Authorization": "Bearer YOUR_CRAKSEO_API_KEY" },
         "disabled": false
       }
     }
   }
   ```

   Omit `crakseo-url-indexing` if the user only needs research or Search Console tools.

4. Save the file and wait for Cline to reload the servers.
5. Verify the SEO data connection with a free call: `get_api_credit_balance` with `{}`.
6. Verify Search Console with `list_search_console_properties` with `{}`.

## Rules after installation

- Check `get_api_credit_balance` and `dataCallsEnabled` before paid SEO data calls. Get user approval before spending credits.
- Search Console and Bing tools are free (upstream quotas apply). Ask before `submit_sitemap` or paid force indexing.
- Never promise rankings, indexing or pricing that the tools did not return.