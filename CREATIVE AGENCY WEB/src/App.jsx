import { useState } from 'react'
import { AddProjectForm } from './components'
import { ProjectsList } from './components'
import './styles/App.css'

function App() {
  const [projects, setProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject])
  }

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  const handleSearchChange = (term) => {
    setSearchTerm(term)
  }

  return (
    <div className="app-container">
      <h1>Personal Project Showcase App</h1>

      <AddProjectForm onAddProject={handleAddProject} />

      <ProjectsList
        projects={projects}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onDeleteProject={handleDeleteProject}
      />
    </div>
  )
}

export default App
