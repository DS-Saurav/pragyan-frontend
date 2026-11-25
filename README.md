# Pragyan Paathshala Frontend

A responsive, content-rich school website for **Pragyan Paathshala**, a school in Latikoili, Birendranagar-9, Surkhet, Nepal.

This frontend presents the school's mission, academics, student activities, facilities, staff, admissions, updates, and contact information through a modern Angular single-page application.

## Features

- Child-friendly, responsive school website
- Lazy-loaded pages for faster navigation
- School information and navigation managed from a central content service
- Dedicated sections for academics, activities, facilities, staff, and admissions
- News, event, and notice directories with detail pages
- Admission inquiry form and school contact information
- Reusable layout and UI components
- Lucide icons and Tailwind CSS styling
- 404 page for unknown routes

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | Angular 22 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4, custom CSS |
| UI | Spartan UI primitives, Angular CDK, Lucide Angular |
| Routing | Angular Router with standalone components |
| State and content | Angular signals, RxJS |
| Testing | Angular unit test builder with Vitest |
| Package manager | npm |

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About the school |
| `/academics` | Academic levels and programs |
| `/activities` | Student activities and student life |
| `/facilities` | School facilities |
| `/gallery` | Photo gallery |
| `/news` | School news |
| `/news/:slug` | News detail |
| `/events` | Upcoming events |
| `/events/:slug` | Event detail |
| `/notices` | Notice board |
| `/notices/:slug` | Notice detail |
| `/admissions` | Admission information and inquiry form |
| `/staff` | Teachers and staff |
| `/contact` | Contact and location |
| `*` | 404 not found page |

## Getting Started

### Prerequisites

- Node.js
- npm
- Angular CLI 22 or a compatible global `ng` command

Using the npm scripts is recommended because they do not require a global Angular CLI installation.

### Installation

```bash
npm install
```

### Start the development server

```bash
npm start
```

Open `http://localhost:4200/`. The application reloads automatically when source files change.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Angular development server |
| `npm run build` | Create a production build |
| `npm run watch` | Build continuously in development mode |
| `npm test` | Run unit tests |
| `npm run ng -- <command>` | Run an Angular CLI command |

For example, to generate a new component:

```bash
npm run ng -- generate component component-name
```

## Building

Create an optimized production build:

```bash
npm run build
```

The generated output is written to `dist/pragyan-frontend/browser/`.

## Testing

Run the unit test suite with:

```bash
npm test
```

The test configuration uses Angular's unit test builder and Vitest.

## Project Structure

```text
src/
  app/
    core/
      models/       # Shared application and content interfaces
      services/     # School content and shared data services
    features/       # Route-level pages and feature components
    layout/         # Main school page layout
    shared/
      components/   # Reusable school website components
      ui/           # Reusable UI primitives
  assets/
    images/         # School and website images
  public/           # Public favicon and browser assets
  index.html
  main.ts
  styles.css
```

## Managing School Content

Most website content is centralized in:

```text
src/app/core/services/school-content.service.ts
```

This service contains the school profile, navigation, academic levels, facilities, activities, gallery photos, update sections, and sample news, event, and notice entries.

When updating route-level copy or layouts, edit the corresponding component under:

```text
src/app/features/
```

Static images used by the site are stored in `src/assets/images/`.

## Deployment

Build the project before deploying:

```bash
npm run build
```

Deploy the contents of `dist/pragyan-frontend/browser/` to a static web host.

If the host does not support Angular SPA routing automatically, configure a fallback rule that rewrites non-static routes to `index.html`.

## Contributing

1. Create a branch for your change.
2. Keep components focused and reusable.
3. Preserve the existing Angular standalone component structure.
4. Run `npm test` and `npm run build` before opening a pull request.
