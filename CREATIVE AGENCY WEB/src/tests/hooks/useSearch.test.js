import { useSearch } from '../useSearch'
import { renderHook, act } from '@testing-library/react'

describe('useSearch', () => {
  it('should initialize with empty search term', () => {
    const { result } = renderHook(() => useSearch())
    expect(result.current.searchTerm).toBe('')
  })

  it('should update search term', () => {
    const { result } = renderHook(() => useSearch())
    
    act(() => {
      result.current.handleSearchChange('test')
    })

    expect(result.current.searchTerm).toBe('test')
  })

  it('should clear search term', () => {
    const { result } = renderHook(() => useSearch())
    
    act(() => {
      result.current.handleSearchChange('test')
    })

    act(() => {
      result.current.clearSearch()
    })

    expect(result.current.searchTerm).toBe('')
  })
})
