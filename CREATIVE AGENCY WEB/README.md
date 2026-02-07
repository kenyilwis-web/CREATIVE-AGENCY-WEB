# Personal Project Showcase App

A modern React application for managing and showcasing your portfolio projects. Built with React 18, Vite, Context API, and comprehensive testing.

## 🌟 Features

### Core Functionality
- **Add Projects**: Submit projects with title (max 100 chars) and description (max 1000 chars)
- **Search & Filter**: Real-time search across project titles and descriptions
- **Delete Projects**: Remove projects from your showcase
- **Project Management**: View all projects with creation dates and metadata
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Experience
- ✅ Real-time character count display for form fields
- ✅ Form validation with helpful error messages
- ✅ Button state management (enabled/disabled based on form state)
- ✅ Success/error notifications with auto-dismiss
- ✅ Empty state guidance for new users
- ✅ Project count footer with singular/plural grammar

### Technical Highlights
- 🏗️ **State Management**: Global state via Context API + useReducer
- 🎨 **Styling**: CSS Modules for scoped, maintainable styles
- ⚡ **Performance**: Memoized filtering with `useMemo`
- ✅ **Testing**: Comprehensive test suite with 23 passing tests
- ♿ **Accessibility**: ARIA labels and semantic HTML

---

## 📋 Requirements

- **Node.js**: v16 or higher
- **npm**: v7 or higher

---

## 🚀 Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/creative-agency-web.git
cd creative-agency-web
cd "CREATIVE AGENCY WEB"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### 4. Production Build
```bash
npm run build
```

### 5. Run Tests
```bash
npm test
```

For watch mode:
```bash
npm test -- --watch
```

For coverage report:
```bash
npm test -- --coverage
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── AddProjectForm.jsx       # Form for creating new projects
│   ├── ProjectsList.jsx         # List with search filtering
│   └── ProjectCard.jsx          # Individual project display
├── context/
│   └── ProjectsContext.jsx      # Global state management
├── hooks/
│   └── useProjects.js           # Hook to access context (if extended)
├── utils/
│   ├── projectUtils.js          # Project creation, validation, filtering
│   ├── storageUtils.js          # localStorage persistence utilities
│   └── index.js                 # Utility exports
├── styles/
│   ├── App.module.css           # Component scoped styles
│   └── global.css               # Global resets and variables
├── tests/
│   ├── components/              # Component tests
│   ├── integration/             # End-to-end workflow tests
│   ├── test-utils.jsx           # Testing utilities
│   └── setupTests.js            # Jest configuration
├── App.jsx                      # Root component
├── main.jsx                     # Entry point
└── index.css                    # Root styles
```

---

## 🧪 Testing

### Test Coverage (23 tests passing)

**AddProjectForm Tests (9 tests)**
- Form submission and validation
- Button enable/disable states
- Character limit enforcement
- Success message display
- Form reset after submission

**ProjectsList Tests (10 tests)**
- Real-time search filtering
- Empty state handling
- Project count display
- Project rendering

**ProjectCard Tests (2 tests)**
- Project information display
- Delete functionality

**Integration Tests (5 tests)**
- Complete user workflows
- Form to list interactions
- Search and delete workflows

### Running Specific Tests
```bash
# Run component tests only
npm test -- --testPathPattern="components"

# Run integration tests
npm test -- --testPathPattern="integration"

# Run specific test file
npm test AddProjectForm.test.jsx
```

---

## 📱 Responsive Breakpoints

- **Desktop** (1024px+): Full layout with comfortable spacing
- **Tablet** (768px - 1023px): Adjusted padding and font sizes
- **Mobile** (320px - 767px): Optimized single-column layout

---

## 🎯 Component Architecture

### AddProjectForm
Handles project creation with built-in validation and UX feedback.

**Key Props**: None (uses global context)

**State Management**:
- `title`: Current title input
- `description`: Current description input
- `errors`: Field validation errors
- `isSubmitting`: Prevents double-submit
- `success`: Shows success message

**Features**:
- Character limit enforcement at input level
- Real-time validation feedback
- Auto-dismiss success message (3s)
- Form reset after submission

### ProjectsList
Displays and filters projects with smart empty states.

**Props**:
- `searchTerm`: Current search string
- `onSearchChange`: Callback when search input changes

**State Management**: Uses global context for projects array

**Optimizations**:
- `useMemo` for filtering to avoid unnecessary recalculations
- Conditional rendering for different empty states

### ProjectCard
Displays individual project with metadata and delete action.

**Props**:
- `project`: Project object to display
- `onDelete`: Callback function for delete action

**Features**:
- Project thumbnail placeholder
- Creation date display
- Delete button with loading state

---

## 🔧 Configuration Files

### `vite.config.js`
Vite build configuration with React plugin and hot module replacement

### `babel.config.cjs`
Babel presets for JSX and modern JavaScript transpilation

### `jest.config.cjs`
Jest testing configuration with jsdom environment, CSS modules mocking, and babel-jest

### `package.json`
Project metadata, dependencies, and scripts

**Key Dependencies**:
- `react@18.2.0`: UI library
- `vite`: Build tool
- `@testing-library/react`: Component testing
- `jest`: Test runner

---

## 🎨 Styling Approach

### CSS Modules
All component styles use CSS Modules for local scoping:
```jsx
import styles from '../styles/App.module.css'

// Usage: className={styles['class-name']}
```

### Global CSS
Base resets and theme variables in `src/styles/global.css`

### Responsive Design
Media queries handle different screen sizes without class conflicts

---

## 🚫 Known Limitations

1. **No Backend/Database**: 
   - Projects are stored in client-side state only
   - Data is lost on page refresh
   - Consider adding localStorage persistence for future versions

2. **No Authentication**:
   - No user accounts or login system
   - Anyone can access and modify projects

3. **Limited Project Metadata**:
   - Only stores title, description, and creation date
   - No tags, categories, or images (easily extensible)

4. **Single-Page Application**:
   - No routing (React Router not implemented)
   - All features on one page

5. **Character Limits**:
   - Title: 100 characters
   - Description: 1000 characters
   - Could be made configurable

6. **Search**:
   - Simple substring matching (case-insensitive)
   - No advanced filters or sorting

7. **Test Environment**:
   - React 18.x has deprecation warnings with testing-library v13
   - Doesn't affect test execution, just console warnings

---

## 🔄 State Management

### Context API + useReducer Pattern
Global projects state managed through `ProjectsContext`:

```javascript
// Actions
dispatch({ type: 'ADD_PROJECT', payload: project })
dispatch({ type: 'DELETE_PROJECT', payload: projectId })
dispatch({ type: 'UPDATE_PROJECT', payload: updatedProject })
```

### Benefits
- Centralized state management
- Predictable state mutations via reducer
- No prop drilling
- Easy to test and debug

---

## 🎓 Learning Resources

This project demonstrates:
- **React Hooks**: useState, useContext, useReducer, useMemo
- **Context API**: Creating and consuming context
- **Component Composition**: Breaking UI into reusable components
- **CSS Modules**: Local style scoping
- **Testing Library**: Component and integration testing
- **Form Validation**: Client-side validation patterns
- **Responsive Design**: Mobile-first approach

---

## 🚀 Future Enhancements

- [ ] Add localStorage persistence
- [ ] Implement project categories/tags
- [ ] Add image upload for project thumbnails
- [ ] Sorting options (by date, alphabetically)
- [ ] Edit existing projects
- [ ] Drag-and-drop reordering
- [ ] Export projects to JSON
- [ ] Dark mode toggle
- [ ] Project filtering by category
- [ ] Advanced search with filters

---

## 🐛 Troubleshooting

### Tests Failing
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm test
```

### Port Already in Use
```bash
# Vite uses port 5173 by default, specify custom port:
npm run dev -- --port 3000
```

### Module Not Found Errors
```bash
# Ensure all imports use correct relative paths
# File structure: src/components/, src/utils/, src/context/
```

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👤 Author

Created as a demonstration of modern React development practices.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss proposed changes.

---

## 📞 Support

For questions or issues, please open a GitHub issue or contact the maintainer.

---

**Last Updated**: February 2026  
**React Version**: 18.2.0  
**Vite Version**: 7.2.4  
**Test Suite**: 23 tests passing ✅
