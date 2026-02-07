import { saveProjectsToStorage, loadProjectsFromStorage, clearProjectsStorage } from '../storageUtils'

// Mock localStorage
const localStorageMock = (() => {
  let store = {}

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString()
    },
    removeItem: (key) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('storageUtils', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('saveProjectsToStorage', () => {
    it('should save projects to localStorage', () => {
      const projects = [
        { id: 1, title: 'Project 1', description: 'Description 1' }
      ]
      saveProjectsToStorage(projects)
      expect(localStorage.getItem('projects_showcase_app')).toBeTruthy()
    })

    it('should handle save errors gracefully', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation()
      // Simulate save error by making localStorage throw
      localStorage.setItem = jest.fn(() => {
        throw new Error('Storage full')
      })
      saveProjectsToStorage([])
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })
  })

  describe('loadProjectsFromStorage', () => {
    it('should load projects from localStorage', () => {
      const projects = [
        { id: 1, title: 'Project 1', description: 'Description 1' }
      ]
      saveProjectsToStorage(projects)
      const loaded = loadProjectsFromStorage()
      expect(loaded).toEqual(projects)
    })

    it('should return empty array if no projects saved', () => {
      const loaded = loadProjectsFromStorage()
      expect(loaded).toEqual([])
    })
  })

  describe('clearProjectsStorage', () => {
    it('should clear all projects from storage', () => {
      const projects = [
        { id: 1, title: 'Project 1', description: 'Description 1' }
      ]
      saveProjectsToStorage(projects)
      clearProjectsStorage()
      const loaded = loadProjectsFromStorage()
      expect(loaded).toEqual([])
    })
  })
})
