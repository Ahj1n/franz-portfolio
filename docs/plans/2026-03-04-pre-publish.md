# Pre-Publish Checklist Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add the five missing pieces needed before publishing the portfolio to franz.dev — OG image, favicon, 404 page, LinkedIn contact link, and `metadataBase`.

**Architecture:** All changes are isolated to `src/app/`. No new dependencies. OG image uses Next.js built-in `ImageResponse` from `next/og`. Favicon is a static SVG in `src/app/`. No client components needed — everything here is server-only.

**Tech Stack:** Next.js 16 App Router, `next/og` (built-in), TypeScript, CSS-in-JS (inline styles matching existing site conventions)

---

### Task 1: Add `metadataBase` and OG image URL to `layout.tsx`

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Update metadata object**

Replace the existing `metadata` export in `src/app/layout.tsx` with:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://franz.dev"),
  title: "Franz | Developer & Artist",
  description:
    "Franz — creative developer, artist, and builder based in Toronto. Computer Programming & Analysis at Seneca Polytechnic.",
  keywords: ["Franz", "portfolio", "developer", "creative", "Toronto", "React", "TypeScript"],
  authors: [{ name: "Franz" }],
  openGraph: {
    title: "Franz | Developer & Artist",
    description: "Creative developer, artist, and builder based in Toronto.",
    url: "https://franz.dev",
    type: "website",
    siteName: "Franz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Franz | Developer & Artist",
    description: "Creative developer, artist, and builder based in Toronto.",
  },
};
```

**Step 2: Build check**

```bash
npm run build
```
Expected: clean build, no errors.

**Step 3: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: no errors.

---

### Task 2: Create the OG image

**Files:**
- Create: `src/app/opengraph-image.tsx`

Next.js automatically uses `src/app/opengraph-image.tsx` as the `/opengraph-image` route and wires it to the `<meta property="og:image">` tag when `metadataBase` is set.

**Step 1: Create `src/app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Franz — Creative Developer & Artist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "#0d0d0d",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Accent rule */}
        <div
          style={{
            width: 48,
            height: 3,
            background: "#00d4ff",
            borderRadius: 2,
            marginBottom: 40,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 112,
            fontWeight: 700,
            color: "#e8e8e8",
            lineHeight: 1,
            letterSpacing: "-2px",
            marginBottom: 32,
          }}
        >
          Franz
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#666",
            letterSpacing: "0px",
          }}
        >
          Creative developer, artist, and builder.
        </div>

        {/* Domain — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 72,
            right: 96,
            fontSize: 22,
            color: "#333",
            letterSpacing: "2px",
            fontFamily: "monospace",
          }}
        >
          franz.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
```

**Step 2: Build check**

```bash
npm run build
```
Expected: clean build. Next.js will show `/opengraph-image` in the route table.

**Step 3: Visual check**

Start the dev server (`npm run dev`) and visit `http://localhost:3000/opengraph-image`.
Expected: A 1200×630 dark card with "Franz" large, cyan rule, tagline, and "franz.dev" in the corner.

---

### Task 3: Create the favicon

**Files:**
- Create: `src/app/icon.svg`

Next.js App Router automatically uses `src/app/icon.svg` as the site favicon. No `<link>` tag needed — it handles it.

**Step 1: Create `src/app/icon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="6" fill="#0d0d0d"/>
  <text
    x="16"
    y="23"
    text-anchor="middle"
    font-family="system-ui, -apple-system, sans-serif"
    font-weight="700"
    font-size="20"
    fill="#00d4ff"
  >F</text>
</svg>
```

**Step 2: Build check**

```bash
npm run build
```
Expected: clean build.

**Step 3: Visual check**

Visit the site in browser. Browser tab should show a small dark square with a cyan "F" instead of the Next.js default favicon.

---

### Task 4: Add LinkedIn to contact links

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Find the `links` array in the `Contact` function (around line 220)**

It currently reads:
```tsx
const links = [
  { label: "Email",     href: "mailto:balitefranz1212@gmail.com",      display: "balitefranz1212@gmail.com" },
  { label: "Phone",     href: "tel:4379886787",                         display: "437 988 6787" },
  { label: "Instagram", href: "https://instagram.com/franz.balite",     display: "@franz.balite" },
  { label: "GitHub",    href: "https://github.com/Ahj1n",               display: "github.com/Ahj1n" },
];
```

**Step 2: Add LinkedIn as the last entry**

```tsx
const links = [
  { label: "Email",     href: "mailto:balitefranz1212@gmail.com",                           display: "balitefranz1212@gmail.com" },
  { label: "Phone",     href: "tel:4379886787",                                              display: "437 988 6787" },
  { label: "Instagram", href: "https://instagram.com/franz.balite",                          display: "@franz.balite" },
  { label: "GitHub",    href: "https://github.com/Ahj1n",                                    display: "github.com/Ahj1n" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/franz-balite-a65199193/",         display: "linkedin.com/in/franz-balite" },
];
```

**Step 3: TypeScript + lint check**

```bash
npx tsc --noEmit && npm run lint
```
Expected: no errors.

---

### Task 5: Create the 404 page

**Files:**
- Create: `src/app/not-found.tsx`

Next.js App Router automatically renders `src/app/not-found.tsx` for any unmatched route.

**Step 1: Create `src/app/not-found.tsx`**

```tsx
import type { CSSProperties } from "react";
import Link from "next/link";

const container: CSSProperties = {
  maxWidth: 680,
  margin: "0 auto",
  padding: "0 1.5rem",
};

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100dvh",
      display: "flex",
      alignItems: "center",
    }}>
      <div style={container}>
        <p style={{
          fontFamily: "var(--font-code)",
          fontSize: "0.7rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#333",
          marginBottom: "2rem",
        }}>
          404
        </p>
        <h1 style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: "clamp(2rem, 6vw, 4rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#e8e8e8",
          marginBottom: "1rem",
        }}>
          Nothing here.
        </h1>
        <p style={{
          fontSize: "1rem",
          color: "#555",
          lineHeight: 1.7,
          marginBottom: "2.5rem",
        }}>
          That page doesn&apos;t exist. Maybe it moved, maybe it never did.
        </p>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "0.78rem",
            letterSpacing: "0.1em",
            color: "var(--accent)",
            textTransform: "uppercase",
            borderBottom: "1px solid var(--accent)",
            paddingBottom: 2,
          }}
        >
          ← Home
        </Link>
      </div>
    </main>
  );
}
```

**Step 2: Build check**

```bash
npm run build
```
Expected: `/not-found` appears in the route table. No errors.

**Step 3: Visual check**

Visit `http://localhost:3000/anything-invalid`. Should render the custom 404 page, not Next.js defaults.

---

### Final: Full verification

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: zero TypeScript errors, zero lint errors, clean build with routes: `/`, `/opengraph-image`, `/_not-found`.
