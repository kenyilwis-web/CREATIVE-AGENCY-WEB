import { createContext, useContext, useReducer } from 'react'

/**
 * Global context for managing projects state
 * Uses Context API + useReducer pattern for centralized state management
 */
const ProjectsContext = createContext()

/**
 * Reducer function to handle project state mutations
 * Supports three actions: ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT
 * 
 * @param {Array} state - Current array of projects
 * @param {Object} action - Action object with type and payload
 * @returns {Array} Updated projects array
 */
const projectsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      // Spread operator creates new array to maintain immutability
      return [...state, action.payload]
    case 'DELETE_PROJECT':
      // Filter removes project by id
      return state.filter(project => project.id !== action.payload)
    case 'UPDATE_PROJECT':
      // Map finds and replaces matching project by id
      return state.map(project =>
        project.id === action.payload.id ? action.payload : project
      )
    default:
      return state
  }
}

/**
 * Provider component that wraps the app with projects context
 * Initializes projects from optional initialProjects prop (useful for testing)
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @param {Array} props.initialProjects - Optional initial projects array for testing/hydration
 */
export function ProjectsProvider({ children, initialProjects = [] }) {
  // useReducer handles state updates with pure functions
  // useReducer handles state updates with pure functions
  const [projects, dispatch] = useReducer(projectsReducer, initialProjects)

  // Dispatch actions to add, delete, or update projects
  // These functions are the public API for state mutations
  const addProject = (project) => {
    dispatch({ type: 'ADD_PROJECT', payload: project })
  }

  const deleteProject = (id) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id })
  }

  const updateProject = (project) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: project })
  }

  // Context value object provides projects array and action methods
  const value = {
    projects,
    addProject,
    deleteProject,
    updateProject,
  }

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  )
}

/**
 * Hook to access projects context
 * Must be used within a ProjectsProvider
 * Throws error if used outside of provider scope
 * 
 * @returns {Object} Context value containing projects array and action methods
 * @throws {Error} If called outside ProjectsProvider
 */
export function useProjects() {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider')
  }
  return context
}
