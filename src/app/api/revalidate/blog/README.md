# Revalidate Blog Cache

Use this after blog content changes.

Route: `POST /api/revalidate/blog`

## What to do

1. Set `BLOG_REVALIDATE_SECRET` in the environment.
2. After your DB write succeeds, call the endpoint with header `x-revalidate-secret`.
3. Choose one mode:
   - Send `slug` to refresh one article page plus related blog caches.
   - Omit `slug` to refresh all blog pages/caches.

## Call examples

Revalidate one article + related caches:

```bash
curl -X POST "https://invstore.fr/api/revalidate/blog" \
  -H "Content-Type: application/json" \
  -H "x-revalidate-secret: $BLOG_REVALIDATE_SECRET" \
  -d '{"slug":"my-article-slug"}'
```

Expected response (single):

```json
{ "revalidated": true, "scope": "single", "slug": "my-article-slug" }
```

Revalidate all blog pages/caches:

```bash
curl -X POST "https://invstore.fr/api/revalidate/blog" \
  -H "x-revalidate-secret: $BLOG_REVALIDATE_SECRET"
```

Expected response (all):

```json
{ "revalidated": true, "scope": "all" }
```
