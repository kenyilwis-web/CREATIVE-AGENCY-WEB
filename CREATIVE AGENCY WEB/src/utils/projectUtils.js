/**
 * Utility functions for project operations
 */

/**
 * Creates a new project object
 * @param {string} title - Project title
 * @param {string} description - Project description
 * @returns {Object} New project object
 */
export const createProject = (title, description) => {
  if (!title || !description) {
    throw new Error('Title and description are required')
  }

  return {
    id: Date.now(),
    title: title.trim(),
    description: description.trim(),
    createdAt: new Date().toISOString()
  }
}

/**
 * Validates project data
 * @param {Object} project - Project object to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateProject = (project) => {
  const errors = {}

  if (!project.title || project.title.trim().length === 0) {
    errors.title = 'Title is required'
  }

  if (project.title && project.title.length > 100) {
    errors.title = 'Title must be less than 100 characters'
  }

  if (!project.description || project.description.trim().length === 0) {
    errors.description = 'Description is required'
  }

  if (project.description && project.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Filters projects by search term
 * @param {Array} projects - Array of projects
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered projects
 */
export const searchProjects = (projects, searchTerm) => {
  if (!searchTerm.trim()) {
    return projects
  }

  const lowercaseTerm = searchTerm.toLowerCase()
  return projects.filter(project =>
    project.title.toLowerCase().includes(lowercaseTerm) ||
    project.description.toLowerCase().includes(lowercaseTerm)
  )
}

/**
 * Sorts projects by date
 * @param {Array} projects - Array of projects
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted projects
 */
export const sortProjectsByDate = (projects, order = 'desc') => {
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return order === 'asc' ? dateA - dateB : dateB - dateA
  })
}

/**
 * Exports projects as JSON
 * @param {Array} projects - Array of projects to export
 * @returns {string} JSON string
 */
export const exportProjectsAsJSON = (projects) => {
  return JSON.stringify(projects, null, 2)
}

/**
 * Imports projects from JSON
 * @param {string} jsonString - JSON string to import
 * @returns {Array} Imported projects
 */
export const importProjectsFromJSON = (jsonString) => {
  try {
    const projects = JSON.parse(jsonString)
    if (!Array.isArray(projects)) {
      throw new Error('Invalid format: expected an array')
    }
    return projects
  } catch (error) {
    throw new Error(`Import failed: ${error.message}`)
  }
}
