# Project Brief: AMORA Fashion (Frontend)

## 1. Tech Stack Summary
- **Framework**: React 18+ (Vite)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 with `tailwindcss-animate`
- **Routing**: React Router DOM (v6)
- **State Management**: Zustand
- **Build Tool**: Vite

## 2. Entry Chain
1.  **`index.html`**: The HTML entry point. Loads the root script.
2.  **`src/main.tsx`**: Bootstraps React, wraps the app in `<BrowserRouter>`.
3.  **`src/App.tsx`**: Defines the main application layout and Routes (`/`, `/collection`, etc.).
4.  **`src/pages/*`**: Specific page components loaded by routes.

## 3. Routing & Pages
| Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `src/pages/Home.tsx` | Homepage with hero and featured sections |
| `/collection` | `src/pages/Collection.tsx` | Product listing with filters |
| `*` | - | 404 handling (if applicable) |

## 4. Key Directories
- **Data**: `src/data/products.ts` (Mock product data)
- **State**: `src/store/cart.ts` (Zustand store for Cart functionality)
- **Components**: `src/components/` (Header, Footer, ProductCard, Cart, etc.)
- **Assets**: `src/assets/` (Product images, unused directly in public)

## 5. Styling Approach
- **TailwindCSS**: Used for utility classes. Configured in `tailwind.config.ts`.
- **Global CSS**: `src/index.css` contains Tailwind directives and global variable definitions (CSS variables for colors).
- **Icons**: `lucide-react` used for SVG icons.

## 6. Build & Dev Commands
- **Install**: `npm install`
- **Start Dev Server**: `npm run dev` (Runs on localhost:5173 by default)
- **Build for Production**: `npm run build` (Outputs to `dist/`)
- **Preview Production Build**: `npm run preview`

## 7. Where to Edit What
| Feature | File Location |
| :--- | :--- |
| **Navigation / Header** | `src/components/Header.tsx` |
| **Product Cards** | `src/components/ProductCard.tsx` |
| **Cart Logic / UI** | `src/store/cart.ts`, `src/components/Cart.tsx` |
| **Global Colors** | `src/index.css` (CSS variables), `tailwind.config.ts` |
| **Product Data** | `src/data/products.ts` |
| **Filter Logic** | `src/pages/Collection.tsx`, `src/components/FilterPanel.tsx` |
