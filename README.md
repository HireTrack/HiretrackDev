# HireTrack Frontend

React + TypeScript app built with Vite and Radix UI Themes.

## Tech Stack
- React
- TypeScript 5
- Vite 5
- Radix UI Themes (`@radix-ui/themes`)

## Folder Structure
```
Hiretrack/
├─ hiretrack-frontend/
│  ├─ index.html                # Vite entry (loads /src/index.tsx)
│  ├─ package.json              # Scripts and deps
│  ├─ tsconfig.json             # TS config for app
│  ├─ tsconfig.node.json        # TS config for Vite/node files
│  ├─ vite.config.ts            # Vite config
│  ├─ public/
│  │  └─ index.html            # Legacy HTML shell (not used by Vite entry)
│  └─ src/
│     ├─ index.tsx             # Bootstraps Theme + Router + App
│     ├─ App.tsx               # Routes
│     ├─ styles/
│     │  └─ globals.css        # Global styles
│     ├─ pages/
│     │  ├─ auth/
│     │  │  ├─ LoginPage.tsx
│     │  │  └─ RegisterPage.tsx
│     │  ├─ student/           # Dashboard, Drives, Profile
│     │  ├─ admin/             # Dashboard, Manage*, Reports
│     │  └─ NotFound.tsx
│     ├─ api/                  # Placeholder API modules
│     ├─ components/           # Reusable UI components
│     ├─ context/              # React Context providers
│     ├─ hooks/                # Custom hooks
│     ├─ routes/               # Route helpers/guards
│     ├─ services/             # Service layer
│     └─ utils/                # Utilities
└─ script.sh                    # Legacy bootstrap script (unused by Vite)
```

## Getting Started
```bash
cd hiretrack-frontend
npm install
npm run dev
# open http://localhost:5173
```

Build and preview:
```bash
npm run build
npm run preview
```

## How It Works
- `index.html` mounts `#root` and loads `/src/index.tsx`.
- `src/index.tsx` imports Radix styles, wraps the app in `Theme`, and sets up `BrowserRouter`:
  - `appearance`, `radius`, and `accentColor` are configured on `Theme`.
- `App.tsx` defines routes for auth, student, admin, and a 404 page.
- Pages use Radix Themes components (e.g., `Button`, `TextField`).

## Radix UI Usage
- Provider (already configured in `src/index.tsx`):
```tsx
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

<Theme appearance="light" radius="medium" accentColor="indigo">{/* app */}</Theme>
```
- Components example:
```tsx
import { Button, TextField } from '@radix-ui/themes';

<TextField placeholder="Email" />
<Button>Sign in</Button>
```
- Layout ideas:
```tsx
import { Container, Flex, Card, Heading, Text } from '@radix-ui/themes';
```


## Roadmap
- Replace placeholder pages with real flows and state.
- Centralize theme scales/tokens.
- Add auth context and route guards.
- Implement real API modules and error handling.
- Build reusable components in `components/`.
