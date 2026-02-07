# State and Props Relationships

## State Management Overview

### Centralized State (App Component)
The App component serves as the state manager for the entire application, implementing the "lifting state up" pattern.

```
App (State Container)
├── projects: State
├── searchTerm: State
└── Handler Functions (Callbacks)
    ├── handleAddProject()
    ├── handleDeleteProject()
    └── handleSearchChange()
```

---

## Detailed Component State & Props

### 1. App Component (Root)

#### Local State
```javascript
const [projects, setProjects] = useState([])
// Type: Array<{id: number, title: string, description: string}>
// Purpose: Stores all projects in the application
// Mutations: 
//   - Add new project: setProjects([...projects, newProject])
//   - Remove project: setProjects(projects.filter(p => p.id !== id))

const [searchTerm, setSearchTerm] = useState('')
// Type: string
// Purpose: Stores the current search query
// Mutations: setSearchTerm(term)
```

#### Props
- **None** (Root component receives no props)

#### Handler Functions
```javascript
handleAddProject(newProject) 
// Input: {id: number, title: string, description: string}
// Action: Adds project to projects state
// Passed to: AddProjectForm.onAddProject

handleDeleteProject(id)
// Input: number (project id)
// Action: Removes project from projects state
// Passed to: ProjectsList.onDeleteProject

handleSearchChange(term)
// Input: string (search query)
// Action: Updates searchTerm state
// Passed to: ProjectsList.onSearchChange
```

#### Render Flow
```jsx
<AddProjectForm onAddProject={handleAddProject} />
<ProjectsList
  projects={projects}
  searchTerm={searchTerm}
  onSearchChange={handleSearchChange}
  onDeleteProject={handleDeleteProject}
/>
```

---

### 2. AddProjectForm Component

#### Local State
```javascript
const [title, setTitle] = useState('')
// Type: string
// Purpose: Stores the project title input value
// Scope: Component-level (form input)

const [description, setDescription] = useState('')
// Type: string
// Purpose: Stores the project description input value
// Scope: Component-level (form input)
```

#### Props
```javascript
Props: {
  onAddProject: function
}

interface Props {
  onAddProject: (project: {
    id: number,
    title: string,
    description: string
  }) => void
}

// Usage: Called when form is submitted
// Source: Passed from App.handleAddProject
```

#### Handler Functions
```javascript
handleAddProject()
// Responsibility: Form submission logic
// Actions:
//   1. Validate: title.trim() && description.trim()
//   2. Create: newProject object with Date.now() as id
//   3. Emit: Call props.onAddProject(newProject)
//   4. Reset: Clear title and description state
```

#### State Flow Diagram
```
AddProjectForm State
├── title (input value)
├── description (input value)
└── Form Submission
    └── onAddProject() callback
        └── App.handleAddProject()
            └── projects state updated
```

---

### 3. ProjectsList Component

#### Local State
- **None** (Stateless component - uses derived state)

#### Props
```javascript
Props: {
  projects: Array<Project>,
  searchTerm: string,
  onSearchChange: function,
  onDeleteProject: function
}

interface Props {
  projects: Array<{
    id: number,
    title: string,
    description: string
  }>,
  searchTerm: string,
  onSearchChange: (term: string) => void,
  onDeleteProject: (id: number) => void
}

// All props come from: App component
```

#### Derived State (Computed)
```javascript
const filteredProjects = projects.filter(project =>
  project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  project.description.toLowerCase().includes(searchTerm.toLowerCase())
)
// Type: Array<Project>
// Purpose: Filters projects based on search term
// Recomputed: Every render (when projects or searchTerm changes)
```

#### Props Usage
```javascript
// Search Input
<input
  value={searchTerm}
  onChange={(e) => onSearchChange(e.target.value)}
/>
// Passes updated search term back to parent

// Project Cards
{filteredProjects.map(project => (
  <ProjectCard
    key={project.id}
    project={project}
    onDelete={onDeleteProject}
  />
))}
// Passes each project and delete callback to child
```

#### State Flow Diagram
```
ProjectsList Props (from App)
├── projects: Array
│   └── Used in: filteredProjects computation
│   └── Passed to: ProjectCard
├── searchTerm: string
│   └── Used in: filteredProjects computation
│   └── Bound to: search input value
├── onSearchChange: function
│   └── Called by: search input onChange
│   └── Emits to: App
└── onDeleteProject: function
    └── Passed to: ProjectCard as prop
```

---

### 4. ProjectCard Component

#### Local State
- **None** (Pure presentational component)

#### Props
```javascript
Props: {
  project: Object,
  onDelete: function
}

interface Props {
  project: {
    id: number,
    title: string,
    description: string
  },
  onDelete: (id: number) => void
}

// All props come from: ProjectsList component
```

#### Props Usage
```javascript
// Display project info
<h3>{project.title}</h3>
<p>{project.description}</p>

// Delete button
<button onClick={() => onDelete(project.id)}>✕</button>
// Calls parent callback with project.id
```

#### State Flow Diagram
```
ProjectCard Props (from ProjectsList)
├── project: Object
│   ├── project.id → Used in: delete button onClick
│   ├── project.title → Displayed in: <h3>
│   └── project.description → Displayed in: <p>
└── onDelete: function
    └── Called by: delete button
        └── Emits to: ProjectsList
            └── ProjectsList.onDeleteProject()
                └── App.handleDeleteProject()
                    └── projects state updated
```

---

## Complete State & Props Flow Chain

### Adding a Project
```
1. User types in AddProjectForm
   ├── title state updates
   └── description state updates

2. User clicks "Add" button
   ├── handleAddProject() validates input
   ├── Creates newProject object
   └── Calls onAddProject(newProject)

3. Callback reaches App component
   ├── App.handleAddProject(newProject)
   └── setProjects([...projects, newProject])

4. App re-renders with updated projects
   ├── ProjectsList receives new projects prop
   ├── filteredProjects recomputed
   └── New ProjectCard rendered
```

### Searching Projects
```
1. User types in ProjectsList search input
   ├── Input onChange fires
   └── Calls onSearchChange(e.target.value)

2. Callback reaches App component
   ├── App.handleSearchChange(term)
   └── setSearchTerm(term)

3. App re-renders with updated searchTerm
   ├── ProjectsList receives new searchTerm prop
   ├── filteredProjects recomputed with new term
   └── Filtered ProjectCards rendered
```

### Deleting a Project
```
1. User clicks delete button in ProjectCard
   ├── Button onClick fires
   └── Calls onDelete(project.id)

2. Callback reaches ProjectsList
   ├── ProjectsList.onDeleteProject(id)
   └── Callback continues to App

3. App receives delete request
   ├── App.handleDeleteProject(id)
   └── setProjects(projects.filter(p => p.id !== id))

4. App re-renders with filtered projects
   ├── ProjectsList receives updated projects prop
   ├── filteredProjects recomputed
   └── Deleted ProjectCard no longer rendered
```

---

## Props Drilling Analysis

### Current Props Depth
```
App (Level 0 - State)
├── AddProjectForm (Level 1) - Receives 1 callback
│   └── Form inputs (Level 2) - Standard HTML elements
│
└── ProjectsList (Level 1) - Receives 4 props
    └── ProjectCard (Level 2) - Receives 2 props
        └── HTML elements (Level 3) - Standard elements
```

### Props Drilling Map
```
App State → Props passed to Level 1
├── handleAddProject → AddProjectForm.onAddProject
├── projects → ProjectsList.projects
├── searchTerm → ProjectsList.searchTerm
├── handleSearchChange → ProjectsList.onSearchChange
└── handleDeleteProject → ProjectsList.onDeleteProject

ProjectsList Level 1 → Props passed to Level 2 (ProjectCard)
├── projects (destructured) → ProjectCard.project
└── onDeleteProject → ProjectCard.onDelete
```

### Props Drilling Optimization Potential
- **Current**: Acceptable (only 2 levels deep)
- **Future**: Could implement Context API if adding:
  - Global settings
  - User preferences
  - Theme management
  - Complex nested structures

---

## State Mutations Summary

### Who can modify what?

| State | Owner | Modifier | Method |
|-------|-------|----------|--------|
| `projects` | App | App | setProjects() |
| `searchTerm` | App | App | setSearchTerm() |
| `title` | AddProjectForm | AddProjectForm | setTitle() |
| `description` | AddProjectForm | AddProjectForm | setDescription() |

### State Immutability Patterns Used

```javascript
// Adding project (immutable)
setProjects([...projects, newProject])
// Creates new array, doesn't mutate original

// Removing project (immutable)
setProjects(projects.filter(project => project.id !== id))
// Creates new filtered array, doesn't mutate original

// String updates (immutable by default)
setTitle(e.target.value)
setSearchTerm(term)
// Strings are immutable in JavaScript
```

---

## Component Communication Pattern

### Pattern: "Lifting State Up"
All shared state is managed in the App component (parent) and passed down to children as props.

```
Direction: Parent → Child = Props (Data down)
Direction: Child → Parent = Callbacks (Events up)

App (Parent)
├── Props down ──→ AddProjectForm
│                  └── Callback up ──→ onAddProject()
│
└── Props down ──→ ProjectsList
                   ├── Props down ──→ ProjectCard
                   │                  └── Callback up ──→ onDelete()
                   └── Callback up ──→ onSearchChange()
```

### Benefits of This Pattern
1. **Single Source of Truth**: Projects and searchTerm only exist in App
2. **Predictable Data Flow**: Data flows in one direction
3. **Easy Debugging**: Changes tracked in one place
4. **Component Isolation**: Children don't need to know about siblings
5. **Testability**: Can test components with mock props

---

## Future State Management Considerations

### Current Solution (Hooks + Props)
- ✅ Simple for medium-sized apps
- ✅ No external dependencies
- ✅ Easy to understand

### If App Grows, Consider:
```
Future Enhancement: Context API
└── For deeply nested props or global state
    ├── ProjectContext
    ├── SearchContext
    └── Avoid props drilling

Future Enhancement: State Management Library
└── For very complex apps
    ├── Redux
    ├── Zustand
    ├── Jotai
    └── Centralized store
```

---

## Type Safety (TypeScript-ready)

### Suggested Type Definitions
```typescript
// Project type
type Project = {
  id: number;
  title: string;
  description: string;
};

// App state type
type AppState = {
  projects: Project[];
  searchTerm: string;
};

// AddProjectForm props type
type AddProjectFormProps = {
  onAddProject: (project: Project) => void;
};

// ProjectsList props type
type ProjectsListProps = {
  projects: Project[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onDeleteProject: (id: number) => void;
};

// ProjectCard props type
type ProjectCardProps = {
  project: Project;
  onDelete: (id: number) => void;
};
```
