import { config, fields, collection } from "@keystatic/core";

/**
 * Keystatic CMS — content lives in this repo (content/posts, content/projects)
 * and is edited through the admin UI at /keystatic.
 *
 * Storage:
 *  • Local (default) — edits write files here; commit + push to publish.
 *  • GitHub — set NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG (+ the GitHub App) and
 *    the live /keystatic commits straight to GitHub → Vercel auto-deploys.
 */
export default config({
  // Git-based: edit at /keystatic locally, then commit + push → Vercel
  // auto-deploys. (To edit on the LIVE site instead, switch to
  // `{ kind: "github", repo: "Tusharkaushik1106/portfolioo" }` and set the
  // KEYSTATIC_GITHUB_* env vars — the build needs those present for github mode.)
  storage: { kind: "local" },

  ui: {
    brand: { name: "Tushar's Studio" },
  },

  collections: {
    posts: collection({
      label: "Blog posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "publishedDate"],
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        publishedDate: fields.date({
          label: "Published date",
          defaultValue: { kind: "today" },
        }),
        tag: fields.text({
          label: "Tag",
          description: "Short label, e.g. RAG · Dev tools · AI",
        }),
        summary: fields.text({
          label: "Summary",
          multiline: true,
          description: "One or two lines shown on the blog list.",
        }),
        draft: fields.checkbox({
          label: "Draft",
          description: "Hidden from the live site while checked.",
          defaultValue: false,
        }),
        coverImage: fields.image({
          label: "Cover image",
          directory: "public/blog-images",
          publicPath: "/blog-images/",
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/blog-images",
            publicPath: "/blog-images/",
          },
        }),
      },
    }),

    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      columns: ["title", "tag"],
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        tag: fields.text({
          label: "Tag / subtitle",
          description: "e.g. Dev tool · RAG · Web + VS Code",
        }),
        url: fields.url({
          label: "Live URL",
          description: "Where the card links to.",
        }),
        banner: fields.image({
          label: "Banner image",
          directory: "public/banner",
          publicPath: "/banner/",
        }),
        order: fields.integer({
          label: "Order",
          description: "Lower shows first.",
          defaultValue: 0,
        }),
        featured: fields.checkbox({
          label: "Show on home page",
          defaultValue: true,
        }),
      },
    }),
  },
});
