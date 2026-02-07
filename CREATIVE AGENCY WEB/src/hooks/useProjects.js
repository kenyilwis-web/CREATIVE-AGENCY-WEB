import { useState, useCallback } from 'react'

/**
 * Custom hook for managing projects state and operations
 * @returns {Object} Projects state and handler functions
 */
export const useProjects = () => {
  const [projects, setProjects] = useState([])

  const addProject = useCallback((newProject) => {
    setProjects(prevProjects => [...prevProjects, newProject])
  }, [])

  const deleteProject = useCallback((id) => {
    setProjects(prevProjects =>
      prevProjects.filter(project => project.id !== id)
    )
  }, [])

  const updateProject = useCallback((id, updatedData) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === id ? { ...project, ...updatedData } : project
      )
    )
  }, [])

  const getProjectById = useCallback((id) => {
    return projects.find(project => project.id === id)
  }, [projects])

  const filterProjects = useCallback((searchTerm) => {
    return projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [projects])

  return {
    projects,
    addProject,
    deleteProject,
    updateProject,
    getProjectById,
    filterProjects
  }
}

export default useProjects
