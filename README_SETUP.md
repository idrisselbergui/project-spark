# CodeLearn - Interactive Learning Platform

A modern, interactive coding education platform built with React, TypeScript, and Tailwind CSS.

## Features

- **Interactive Lessons**: Learn programming with hands-on coding challenges
- **Progressive Hints**: 3-level hint system to help when you're stuck
- **Progress Tracking**: Track XP, completed lessons, and skill progress
- **Responsive Design**: Works beautifully on desktop and mobile
- **Local Storage**: All progress persists locally (no backend required)

## Project Structure

```
web/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── LessonCard.tsx # Lesson card component
│   │   ├── HintsPanel.tsx # Hints system
│   │   ├── CodeBlock.tsx  # Code display with copy
│   │   ├── ProgressBar.tsx
│   │   └── Navigation.tsx
│   ├── pages/             # Route pages
│   │   ├── Dashboard.tsx  # Main lessons grid
│   │   ├── LessonPage.tsx # Lesson player
│   │   ├── Profile.tsx    # User profile & stats
│   │   └── Onboarding.tsx # Welcome flow
│   ├── store/             # State management
│   │   └── store.ts       # Context + hooks
│   ├── data/
│   │   └── mockLessons.ts # Sample lesson data
│   └── __tests__/         # Test files
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project
cd <project-name>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests

### Adding New Lessons

Edit `src/data/mockLessons.ts` and add new lesson objects following the `Lesson` interface:

```typescript
{
  id: 'unique-id',
  title: 'Lesson Title',
  description: 'Short description',
  skill: 'JavaScript', // or React, CSS, etc.
  difficulty: 'beginner', // or intermediate, advanced
  estimatedTime: 20, // minutes
  xp: 150,
  content: `# Markdown content here`,
  codeExample: `// Code example`,
  challenge: {
    description: 'Task description',
    starterCode: `// Starter code`,
    tests: [...]
  },
  hints: [
    { level: 1, text: 'First hint' },
    { level: 2, text: 'Second hint' },
    { level: 3, text: 'Solution hint' }
  ]
}
```

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **State**: React Context + hooks
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library

## State Management

The app uses React Context for global state management:

- **useAuth()**: Current user, session, logout
- **useLesson()**: Current lesson, progress, completion tracking
- **useAppStore()**: Full app state access

All state persists to `localStorage` automatically.

## Accessibility

- Semantic HTML throughout
- ARIA attributes on interactive elements
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

## Performance

- Lazy loading with React.lazy/Suspense
- Local caching with localStorage
- Optimized re-renders with useMemo/useCallback
- Mobile-first responsive design

## Testing

Example test file included at `src/components/__tests__/Button.test.tsx`

Run tests:
```bash
npm test
```

## Deployment

This project is ready for deployment to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Build command: `npm run build`  
Output directory: `dist`

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.
