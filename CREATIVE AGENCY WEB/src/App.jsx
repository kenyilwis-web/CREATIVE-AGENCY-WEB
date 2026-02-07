import { useState } from 'react'
import { ProjectsProvider } from './context/ProjectsContext'
import { AddProjectForm } from './components'
import { ProjectsList } from './components'
import './styles/global.css'
import styles from './styles/App.module.css'

/**
 * App Component - Root application component
 * 
 * Responsibilities:
 * 1. Wraps entire app with ProjectsProvider for global state
 * 2. Manages search term state (kept local since it's only for display filtering)
 * 3. Coordinates between AddProjectForm and ProjectsList
 * 4. Applies main application layout and styling
 */
function App() {
  // Local state for search term - passed to ProjectsList for filtering
  // Kept separate from global state since it's UI-specific, not persistent data
  const [searchTerm, setSearchTerm] = useState('')

  /**
   * Handle search term changes from ProjectsList input
   * @param {string} term - New search term
   */
  const handleSearchChange = (term) => {
    setSearchTerm(term)
  }

  return (
    // ProjectsProvider wraps all components that need access to projects state
    <ProjectsProvider>
      <div className={styles['app-container']}>
        <h1>Personal Project Showcase App</h1>

        {/* Form component for adding new projects */}
        <AddProjectForm />

        {/* List component showing filtered projects */}
        <ProjectsList
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
    </div>
    </ProjectsProvider>
  )
}

export default App
