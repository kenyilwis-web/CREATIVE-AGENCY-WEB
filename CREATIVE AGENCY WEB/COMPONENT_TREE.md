# Component Tree Structure

## Application Architecture Overview

```
App
├── AddProjectForm
│   ├── Input (Title)
│   ├── Textarea (Description)
│   └── Button (Add)
└── ProjectsList
    ├── Input (Search)
    └── ProjectCard (Multiple instances)
        ├── Button (Delete)
        └── ProjectContent
            ├── Heading (Title)
            └── Paragraph (Description)
```

## Component Hierarchy

### 1. **App** (Root Component)
   - **Purpose**: Main application component that manages global state
   - **State**: 
     - `projects`: Array of project objects
     - `searchTerm`: Current search query
   - **Props**: None (root component)
   - **Children**: AddProjectForm, ProjectsList
   - **Responsibilities**:
     - Manage projects state
     - Handle adding projects
     - Handle deleting projects
     - Handle search term updates

### 2. **AddProjectForm** (Child of App)
   - **Purpose**: Form component for adding new projects
   - **State**:
     - `title`: Project title input
     - `description`: Project description input
   - **Props**:
     - `onAddProject`: Callback function to add project to parent state
   - **Children**: Input, Textarea, Button
   - **Responsibilities**:
     - Manage form input state
     - Validate inputs before submission
     - Clear form after successful submission
     - Call parent callback on submit

### 3. **ProjectsList** (Child of App)
   - **Purpose**: Container for displaying all projects with search functionality
   - **State**: None (uses parent state)
   - **Props**:
     - `projects`: Array of projects from parent
     - `searchTerm`: Current search term from parent
     - `onSearchChange`: Callback to update search term in parent
     - `onDeleteProject`: Callback to delete project from parent
   - **Children**: ProjectCard (multiple instances)
   - **Responsibilities**:
     - Filter projects based on search term
     - Display search input
     - Render project cards
     - Pass delete callbacks to children

### 4. **ProjectCard** (Child of ProjectsList)
   - **Purpose**: Individual project display card
   - **State**: None (uses parent state)
   - **Props**:
     - `project`: Project object containing id, title, description
     - `onDelete`: Callback function to delete this project
   - **Children**: Button, ProjectContent
   - **Responsibilities**:
     - Display project information
     - Handle delete button click
     - Call parent delete callback

## Data Flow

```
App (State)
  ├─ projects: [{id, title, description}, ...]
  ├─ searchTerm: string
  │
  ├─ onAddProject() ──────────────────→ AddProjectForm
  │                                      └─ onAddProject(newProject)
  │
  ├─ projects + searchTerm ──────────→ ProjectsList
  │                                      ├─ onSearchChange() ──→ Updates searchTerm
  │                                      │
  │                                      ├─ filteredProjects ──→ ProjectCard (multiple)
  │                                      │                        └─ onDelete() ──→ Updates projects
```

## Benefits of This Structure

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: ProjectCard can be reused in different contexts
3. **Maintainability**: Changes to form logic don't affect project display logic
4. **Testability**: Each component can be tested independently
5. **Scalability**: Easy to add new features (e.g., edit functionality)
6. **Props Drilling Management**: Props are passed only when needed

## Future Component Enhancements

```
App
├── Header (NEW)
├── AddProjectForm
├── ProjectsList
│   ├── SearchBar (EXTRACTED)
│   └── ProjectCard
│       ├── ProjectActions (EXTRACTED)
│       └── ProjectInfo (EXTRACTED)
└── Footer (NEW)
```
