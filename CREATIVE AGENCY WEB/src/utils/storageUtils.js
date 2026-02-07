/**
 * Local storage utilities for persisting projects
 */

const STORAGE_KEY = 'projects_showcase_app'

/**
 * Saves projects to local storage
 * @param {Array} projects - Projects to save
 */
export const saveProjectsToStorage = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch (error) {
    console.error('Failed to save projects to storage:', error)
  }
}

/**
 * Loads projects from local storage
 * @returns {Array} Saved projects or empty array
 */
export const loadProjectsFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Failed to load projects from storage:', error)
    return []
  }
}

/**
 * Clears all projects from local storage
 */
export const clearProjectsStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear projects storage:', error)
  }
}

/**
 * Gets storage usage info
 * @returns {Object} Storage info
 */
export const getStorageInfo = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const sizeInBytes = saved ? new Blob([saved]).size : 0
    const sizeInKB = (sizeInBytes / 1024).toFixed(2)

    return {
      sizeInBytes,
      sizeInKB,
      itemCount: saved ? JSON.parse(saved).length : 0
    }
  } catch (error) {
    console.error('Failed to get storage info:', error)
    return { sizeInBytes: 0, sizeInKB: 0, itemCount: 0 }
  }
}
