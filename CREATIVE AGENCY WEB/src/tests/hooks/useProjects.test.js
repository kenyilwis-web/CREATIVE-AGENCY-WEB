import { useProjects } from '../useProjects'
import { renderHook, act } from '@testing-library/react'

describe('useProjects', () => {
  it('should initialize with empty projects', () => {
    const { result } = renderHook(() => useProjects())
    expect(result.current.projects).toEqual([])
  })

  it('should add a project', () => {
    const { result } = renderHook(() => useProjects())
    const newProject = { id: 1, title: 'Test', description: 'Test' }
    
    act(() => {
      result.current.addProject(newProject)
    })

    expect(result.current.projects).toHaveLength(1)
    expect(result.current.projects[0]).toEqual(newProject)
  })

  it('should delete a project', () => {
    const { result } = renderHook(() => useProjects())
    const newProject = { id: 1, title: 'Test', description: 'Test' }
    
    act(() => {
      result.current.addProject(newProject)
    })

    act(() => {
      result.current.deleteProject(1)
    })

    expect(result.current.projects).toHaveLength(0)
  })

  it('should filter projects', () => {
    const { result } = renderHook(() => useProjects())
    
    act(() => {
      result.current.addProject({ id: 1, title: 'React App', description: 'React' })
      result.current.addProject({ id: 2, title: 'Vue App', description: 'Vue' })
    })

    const filtered = result.current.filterProjects('React')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].title).toBe('React App')
  })
})
