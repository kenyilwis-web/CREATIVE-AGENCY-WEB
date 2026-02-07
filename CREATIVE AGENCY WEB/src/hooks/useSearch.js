import { useState, useCallback } from 'react'

/**
 * Custom hook for managing search functionality
 * @returns {Object} Search state and handler functions
 */
export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
  }, [])

  return {
    searchTerm,
    handleSearchChange,
    clearSearch
  }
}

export default useSearch
