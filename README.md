# Causebit - Code with Cause

A modern, bilingual portfolio website showcasing creative web development projects. Built with Next.js, TypeScript, and global standards in mind.

## Features

- ✨ **Bilingual Support**: English (LTR) and Arabic (RTL)
- 🎨 **Modern Design**: Clean, professional UI with smooth animations
- 📱 **Responsive**: Mobile-first design that works on all devices
- ♿ **Accessible**: WCAG-compliant with proper semantic HTML
- ⚡ **Performance**: Server-side rendering with Next.js App Router
- 🌍 **SEO-Ready**: Structured metadata and proper heading hierarchy

## Project Structure

```
CauseBit/
├── app/
│   └── [locale]/
│       ├── layout.tsx         # Main layout with locale support
│       ├── layout-page.tsx    # Page-level layout (header, footer)
│       └── page.tsx           # Home page
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Navigation header with language switcher
│   │   ├── Header.module.scss # Header styles
│   │   ├── Footer.tsx         # Footer with links and social
│   │   └── Footer.module.scss # Footer styles
│   └── home/
│       ├── Hero.tsx           # Hero section component
│       └── Hero.module.scss   # Hero styles
├── messages/
│   ├── en.json                # English translations
│   └── ar.json                # Arabic translations
├── styles/
│   └── globals.scss           # Global styles
├── lib/                       # Utilities and helpers
├── public/                    # Static assets
├── i18n.ts                    # i18n configuration
├── next.config.js             # Next.js configuration
└── tsconfig.json              # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ (Recommended: 20 LTS)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Navigate to `http://localhost:3000/en` or `http://localhost:3000/ar` in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Key Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **SCSS Modules** - Scoped styling
- **Bootstrap 5** - Responsive grid and utilities
- **next-intl** - Internationalization
- **React 19** - UI library

## Architecture Principles

- **Server Components First**: Minimizes JavaScript shipped to the client
- **Type Safety**: Strict TypeScript throughout
- **RTL/LTR Support**: Native support for both text directions
- **Performance**: Optimized loading, images, and animations
- **Scalability**: Ready for future features (blog, dashboards, etc.)

## Styling & Design System

### Colors

- **Primary**: `#1a3a52` (Dark Blue)
- **Secondary**: `#ff6b35` (Orange)
- **Accent**: `#ffd700` (Gold)
- **Text**: `#333` (Dark)
- **Light Text**: `#666` (Medium)

### Typography

- **Headings**: Bold, high contrast
- **Body**: Clear, readable fonts
- **Interactive Elements**: Proper focus states

## Internationalization

All UI content is centralized in message files (`messages/en.json` and `messages/ar.json`). Add new strings there, then reference them in components using the `useTranslations()` hook.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## SEO

The site includes:
- Proper meta tags
- Semantic HTML
- OpenGraph support (ready to configure)
- Structured content hierarchy

## Future Enhancements

- Case studies section
- Blog/insights
- Client dashboards
- Analytics integration
- Email contact forms

## Development Guidelines

See [copilot-instructions.md](./.github/copilot-instructions.md) for detailed contribution guidelines.

## License

© 2026 Causebit. All rights reserved.

---

**Code with Cause** | Working with you, not just for you | Global Standards. Local Heart.
