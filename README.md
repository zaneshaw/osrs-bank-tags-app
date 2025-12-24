# OSRS Bank Tags App

A fast, responsive web app for browsing and importing Old School RuneScape bank tag tabs. It includes validation of imported bank tag strings, a clean two-pane layout (sidebar + content), and a simple flow to create tabs.

## Features

- **Import & Validate:** Paste from clipboard on the Create page and validate with `checkBankTagString` (shows `Valid`, `Name`, `Icon`, `Layout Enabled`). See [src/pages/create/Create.tsx](src/pages/create/Create.tsx).
- **Responsive Layout:** Fixed top nav, footer at bottom, left sidebar, and a scroll-only content area for tags. See [src/App.tsx](src/App.tsx), [src/pages/home/HomePage.tsx](src/pages/home/HomePage.tsx).
- **Routing:** React Router v6 with an `App` layout (`Nav` + `Outlet`) and child routes for Home and Create. See [src/main.tsx](src/main.tsx).
- **UI & Styling:** Chakra UI components, custom fonts, and subtle hover animations. See [src/components/Nav/Nav.tsx](src/components/Nav/Nav.tsx), [src/components/Footer/Footer.tsx](src/components/Footer/Footer.tsx).
- **Data & API (extensible):** Hooks for creating bank tabs using TanStack Query are scaffolded. See [src/hooks/useCreateBankTab.ts](src/hooks/useCreateBankTab.ts) and [src/api/createBankTab.ts](src/api/createBankTab.ts).

## Tech Stack

- **Frontend:** React + TypeScript
- **Build:** Vite
- **Routing:** React Router
- **UI:** Chakra UI
- **Data:** TanStack React Query (for mutations and cache)
- **Backend:** Supabase (prepared; configure when needed)

## Project Structure (high-level)

- Layout: [src/App.tsx](src/App.tsx)
- Routing: [src/main.tsx](src/main.tsx)
- Home: [src/pages/home/HomePage.tsx](src/pages/home/HomePage.tsx)
- Create: [src/pages/create/Create.tsx](src/pages/create/Create.tsx)
- Nav: [src/components/Nav/Nav.tsx](src/components/Nav/Nav.tsx), [src/components/Nav/Nav.css](src/components/Nav/Nav.css)
- Sidebar: [src/components/SideBar/SideBar.tsx](src/components/SideBar/SideBar.tsx), [src/components/SideBar/SideBar.css](src/components/SideBar/SideBar.css)
- Bank Tags: [src/components/BankTagContent/BankTagContent.tsx](src/components/BankTagContent/BankTagContent.tsx), [src/components/BankTagContent/BankTagContent.css](src/components/BankTagContent/BankTagContent.css)
- Validation util: [src/util/checkBankTagString.ts](src/util/checkBankTagString.ts)

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm or yarn

### Install

```bash
npm install
```

### Run (development)

```bash
npm run dev
```

Open the local URL printed by Vite (typically http://localhost:5173).

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Environment (optional Supabase)

If you integrate Supabase, add the following to `.env.local`:

```bash
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Then configure in [src/supabase/index.ts](src/supabase/index.ts) and use in your API functions.

## Design Notes

- The nav is fixed (`position: fixed`) and the `main` element in `App` offsets its height.
- The Home layout uses a grid; the content pane (`BankTagContent`) handles scrolling so the page itself doesn’t scroll.
- Result boxes on the Create page have a subtle hover “pop” and respect reduced motion preferences.

## Roadmap

- Hook up `createBankTab` to a backend (Supabase) and persist tabs.
- Replace test data with user data and add favorites/filters.
- Add authentication and user-specific tabs (optional).

## Contributing

PRs welcome. Please keep changes focused and aligned with the existing style.

## License

No license specified. Add one if you plan to distribute.
