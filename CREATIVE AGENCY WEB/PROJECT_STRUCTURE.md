# Project Structure

This document outlines the complete directory structure and organization of the Personal Project Showcase App.

## Directory Tree

```
src/
├── components/              # React components
│   ├── AddProjectForm.jsx
│   ├── ProjectsList.jsx
│   ├── ProjectCard.jsx
│   └── index.js
├── hooks/                   # Custom React hooks
│   ├── useProjects.js       # Projects state management
│   ├── useSearch.js         # Search functionality
│   └── index.js
├── utils/                   # Utility functions
│   ├── projectUtils.js      # Project operations (create, validate, search, sort)
│   ├── storageUtils.js      # Local storage persistence
│   └── index.js
├── styles/                  # CSS stylesheets
│   ├── App.css              # Main app styles
│   ├── global.css           # Global styles and CSS variables
│   └── index.css            # Legacy styles (deprecated)
├── tests/                   # Test files
│   ├── components/          # Component tests
│   ├── hooks/               # Hook tests
│   │   ├── useProjects.test.js
│   │   └── useSearch.test.js
│   └── utils/               # Utility function tests
│       ├── projectUtils.test.js
│       └── storageUtils.test.js
├── assets/                  # Static assets (images, icons, etc.)
├── App.jsx                  # Root component
├── main.jsx                 # Application entry point
└── index.css                # Deprecated (use styles/ folder)

public/                       # Static public files
├── index.html

package.json
vite.config.js
README.md
```

## Folder Descriptions

### `/src/components`
**Purpose**: React components that compose the UI

**Files**:
- `AddProjectForm.jsx` - Form component for adding new projects
- `ProjectsList.jsx` - Container component for project display and search
- `ProjectCard.jsx` - Individual project card component
- `index.js` - Barrel export for clean imports

**Usage**:
```javascript
import { AddProjectForm, ProjectsList } from './components'
```

### `/src/hooks`
**Purpose**: Custom React hooks for state management and logic

**Files**:
- `useProjects.js` - Manages project state (add, delete, update, filter)
- `useSearch.js` - Manages search input state
- `index.js` - Barrel export

**Features**:
- Uses `useCallback` for optimized callback functions
- Includes helper methods for common operations
- Easily testable and reusable

**Usage**:
```javascript
import { useProjects, useSearch } from './hooks'
```

### `/src/utils`
**Purpose**: Reusable utility functions (no side effects)

**Files**:
- `projectUtils.js` - Project operations:
  - `createProject()` - Create new project object
  - `validateProject()` - Validate project data
  - `searchProjects()` - Filter projects by search term
  - `sortProjectsByDate()` - Sort projects chronologically
  - `exportProjectsAsJSON()` - Export projects as JSON
  - `importProjectsFromJSON()` - Import projects from JSON

- `storageUtils.js` - Local storage operations:
  - `saveProjectsToStorage()` - Persist projects
  - `loadProjectsFromStorage()` - Retrieve projects
  - `clearProjectsStorage()` - Clear all projects
  - `getStorageInfo()` - Get storage statistics

**Usage**:
```javascript
import { createProject, validateProject } from './utils'
```

### `/src/styles`
**Purpose**: Centralized CSS files

**Files**:
- `App.css` - Main application styles (components, responsive design)
- `global.css` - Global styles, CSS variables, and theme configuration
- `index.css` - Legacy (for migration purposes)

**CSS Variables** (in global.css):
- Colors: `--primary-color`, `--secondary-color`, `--danger-color`, etc.
- Spacing: `--spacing-xs` through `--spacing-2xl`
- Transitions: `--transition-fast`, `--transition-normal`, `--transition-slow`
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`

### `/src/tests`
**Purpose**: Unit and integration tests

**Structure**:
```
tests/
├── components/    # Component tests (future)
├── hooks/         # Hook tests
├── utils/         # Utility function tests
```

**Test Framework**: Jest + React Testing Library

**Running Tests**:
```bash
npm test
npm test -- --coverage
```

## Data Flow Architecture

```
App (State Management)
├── useProjects() → Manage projects array
├── useSearch() → Manage search term
│
├── AddProjectForm
│   ├── Local state: title, description
│   ├── Calls: onAddProject callback
│   └── Uses: createProject() utility
│
└── ProjectsList
    ├── Props: projects, searchTerm
    ├── Uses: searchProjects() utility
    ├── Renders: ProjectCard (multiple)
    └── Callbacks: onSearchChange, onDeleteProject
```

## Import/Export Conventions

### Barrel Exports
Use index.js files for cleaner imports:

```javascript
// Instead of:
import { useProjects } from './hooks/useProjects'
import { useSearch } from './hooks/useSearch'

// Use:
import { useProjects, useSearch } from './hooks'
```

### Component Imports
```javascript
// From components
import { AddProjectForm, ProjectsList, ProjectCard } from './components'

// From utilities
import { createProject, validateProject } from './utils'
import { saveProjectsToStorage } from './utils'

// From hooks
import { useProjects, useSearch } from './hooks'
```

## Styling Strategy

### Global Configuration
- CSS variables defined in `global.css`
- Consistent color palette and spacing
- Responsive breakpoints (768px, 480px)

### Component Styles
- Main styles in `App.css`
- BEM-like naming convention (e.g., `.project-card`, `.project-card:hover`)
- Modular and maintainable

### Responsive Design
```css
/* Desktop: max-width 1280px */
/* Tablet: max-width 768px */
/* Mobile: max-width 480px */
```

## Development Workflow

### Adding a New Feature

1. **Create Component** (if needed)
   ```bash
   src/components/NewComponent.jsx
   ```

2. **Create Hook** (if managing state)
   ```bash
   src/hooks/useNewFeature.js
   ```

3. **Add Utilities** (if needed)
   ```bash
   src/utils/newFeatureUtils.js
   ```

4. **Add Tests**
   ```bash
   src/tests/[components|hooks|utils]/NewFeature.test.js
   ```

5. **Update Imports**
   - Update barrel exports in `index.js` files
   - Import in relevant files

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- projectUtils.test.js
```

## Best Practices

1. **Keep Components Pure** - No side effects in component body
2. **Use Custom Hooks** - Extract state logic into reusable hooks
3. **Use Utility Functions** - Keep components focused on rendering
4. **Import from Barrel Files** - Cleaner and easier to refactor
5. **CSS Variables** - Use CSS variables for theming
6. **Write Tests** - Test utilities and hooks thoroughly
7. **Documentation** - Document complex logic and APIs

## Future Enhancements

### Potential Additions
```
src/
├── context/           # React Context for global state
├── constants/         # App constants and config
├── types/             # TypeScript type definitions
├── api/               # API client functions
├── middleware/        # Custom middleware
└── services/          # Business logic services
```

### Migration to TypeScript
All `.js` files can be converted to `.ts`/`.tsx` with type definitions from the `src/types/` folder.

## Performance Optimization

- **Lazy Loading** - Implement React.lazy() for code splitting
- **Memoization** - Use React.memo() for pure components
- **useCallback** - Optimize callback functions (already implemented)
- **CSS-in-JS** - Consider styled-components if needed
- **Bundle Analysis** - Use Vite's built-in analyzer

## Troubleshooting

### Common Issues

1. **Import errors** - Check barrel exports in `index.js` files
2. **Style not applied** - Verify CSS class names match
3. **State not updating** - Check that state updates are immutable
4. **Test failures** - Ensure mocks are properly set up

See [README.md](../README.md) for more information.
