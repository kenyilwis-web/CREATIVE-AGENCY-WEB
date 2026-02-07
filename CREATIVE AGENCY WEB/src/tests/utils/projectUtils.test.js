import { createProject, validateProject, searchProjects } from '../projectUtils'

describe('projectUtils', () => {
  describe('createProject', () => {
    it('should create a project with valid data', () => {
      const project = createProject('My Project', 'A great project')
      expect(project).toHaveProperty('id')
      expect(project.title).toBe('My Project')
      expect(project.description).toBe('A great project')
      expect(project).toHaveProperty('createdAt')
    })

    it('should throw error with empty title', () => {
      expect(() => createProject('', 'Description')).toThrow()
    })

    it('should throw error with empty description', () => {
      expect(() => createProject('Title', '')).toThrow()
    })

    it('should trim whitespace', () => {
      const project = createProject('  Title  ', '  Description  ')
      expect(project.title).toBe('Title')
      expect(project.description).toBe('Description')
    })
  })

  describe('validateProject', () => {
    it('should validate a correct project', () => {
      const result = validateProject({
        title: 'Valid Title',
        description: 'Valid Description'
      })
      expect(result.isValid).toBe(true)
      expect(Object.keys(result.errors)).toHaveLength(0)
    })

    it('should return error for missing title', () => {
      const result = validateProject({
        title: '',
        description: 'Valid Description'
      })
      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveProperty('title')
    })

    it('should return error for title exceeding max length', () => {
      const result = validateProject({
        title: 'a'.repeat(101),
        description: 'Valid Description'
      })
      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveProperty('title')
    })
  })

  describe('searchProjects', () => {
    const mockProjects = [
      { id: 1, title: 'React App', description: 'A React application' },
      { id: 2, title: 'Vue App', description: 'A Vue application' }
    ]

    it('should return all projects with empty search term', () => {
      const result = searchProjects(mockProjects, '')
      expect(result).toHaveLength(2)
    })

    it('should filter by title', () => {
      const result = searchProjects(mockProjects, 'React')
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('React App')
    })

    it('should filter by description', () => {
      const result = searchProjects(mockProjects, 'Vue')
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Vue App')
    })

    it('should be case insensitive', () => {
      const result = searchProjects(mockProjects, 'react')
      expect(result).toHaveLength(1)
    })
  })
})
