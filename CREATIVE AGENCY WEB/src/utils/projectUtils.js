/**
 * Project Utilities
 * 
 * Provides functions for project creation, validation, and filtering
 * Maintains business logic separate from React components
 */

/**
 * Creates a new project object with unique ID and timestamp
 * 
 * @param {string} title - Project title (required, max 100 chars)
 * @param {string} description - Project description (required, max 1000 chars)
 * @returns {Object} New project object with id, title, description, createdAt
 * @throws {Error} If title or description is missing
 * 
 * @example
 * const project = createProject('My App', 'A React application');
 * // Returns: { id: 1707..., title: 'My App', description: 'A React application', createdAt: '2026-02-08T...' }
 */
export const createProject = (title, description) => {
  if (!title || !description) {
    throw new Error('Title and description are required')
  }

  return {
    id: Date.now(), // Use timestamp as unique ID (adequate for client-side)
    title: title.trim(), // Remove whitespace
    description: description.trim(),
    createdAt: new Date().toISOString() // ISO format for consistent date handling
  }
}

/**
 * Validates project data against business rules
 * 
 * Rules:
 * - Title: required, max 100 characters
 * - Description: required, max 1000 characters
 * 
 * @param {Object} project - Project object to validate
 * @param {string} project.title - Project title
 * @param {string} project.description - Project description
 * @returns {Object} Validation result
 * @returns {boolean} result.isValid - Whether project is valid
 * @returns {Object} result.errors - Field-level errors (empty if valid)
 * 
 * @example
 * const result = validateProject({ title: 'App', description: 'desc' });
 * // Returns: { isValid: true, errors: {} }
 */
export const validateProject = (project) => {
  const errors = {}

  // Title validation
  if (!project.title || project.title.trim().length === 0) {
    errors.title = 'Title is required'
  }

  if (project.title && project.title.length > 100) {
    errors.title = 'Title must be less than 100 characters'
  }

  // Description validation
  if (!project.description || project.description.trim().length === 0) {
    errors.description = 'Description is required'
  }

  if (project.description && project.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0, // No errors = valid
    errors
  }
}

/**
 * Filters projects by search term (case-insensitive)
 * Searches in both title and description fields
 * 
 * @param {Array} projects - Array of project objects
 * @param {string} searchTerm - Search term (case-insensitive)
 * @returns {Array} Filtered array of matching projects
 * 
 * @example
 * const results = searchProjects(projects, 'React');
 * // Returns projects with 'React' in title or description
 */
export const searchProjects = (projects, searchTerm) => {
  // Empty search returns all projects
  if (!searchTerm.trim()) {
    return projects
  }

  // Case-insensitive search in both fields
  const lowercaseTerm = searchTerm.toLowerCase()
  return projects.filter(project =>
    project.title.toLowerCase().includes(lowercaseTerm) ||
    project.description.toLowerCase().includes(lowercaseTerm)
  )
}

/**
 * Sorts projects by creation date
 * 
 * @param {Array} projects - Array of project objects
 * @param {string} order - Sort order: 'asc' (oldest first) or 'desc' (newest first)
 * @returns {Array} Sorted copy of projects array
 * 
 * @example
 * const sorted = sortProjectsByDate(projects, 'desc'); // Newest first
 */
export const sortProjectsByDate = (projects, order = 'desc') => {
  // Create copy to avoid mutating original array
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
