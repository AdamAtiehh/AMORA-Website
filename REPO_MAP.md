# Repository Map

.
├── public/                 # Static assets (favicons, placeholders)
├── src/
│   ├── assets/             # Images/media imported by code
│   ├── components/         # Reusable React components (Header, ProductCard, etc.)
│   ├── data/               # Static data files (products.ts)
│   ├── lib/                # Utilities (class names helper, etc.)
│   ├── pages/              # Page components (Home, Collection, etc.)
│   ├── store/              # State management (Zustand cart store)
│   ├── types/              # TypeScript definitions
│   ├── App.tsx             # Main App layout & Routing
│   ├── main.tsx            # Entry point (ReactDOM render)
│   └── index.css           # Global Tailwind config & styles
├── index.html              # HTML Entry Point
├── package.json            # Project dependencies & scripts
├── package-lock.json       # Lockfile (npm)
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
