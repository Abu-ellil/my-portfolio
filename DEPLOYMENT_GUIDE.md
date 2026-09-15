# Deployment

## GitHub Pages (primary — abuellil.is-a.dev)
1. `npm run build`
2. `git add -f build && git commit -m "deploy"`
3. `git push origin $(git subtree split --prefix build HEAD):gh-pages --force`
4. `CNAME` file (root of gh-pages) must contain `abuellil.is-a.dev`
5. HTTPS enforced via repo Pages settings (already on)

## Vercel (mirror)
- Connected to this repo; every push to master auto-deploys to mahmoud-abuellil.vercel.app
- Build runs `node scripts/vercel-build.js` (heap + OpenSSL legacy fix) per vercel.json
- Install command: `npm install --legacy-peer-deps`

## Domain
- `abuellil.is-a.dev` — free subdomain via is-a.dev (PR #52122 in is-a-dev/register, merged)
- DNS: CNAME abuellil.is-a.dev -> abu-ellil.github.io (managed in the register repo)
- `aboellil.dev` (Hostinger) is EXPIRED/SUSPENDED — do not reference it anywhere
