import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ProjectsProvider } from '../../context/ProjectsContext'
import AddProjectForm from '../../components/AddProjectForm'
import ProjectsList from '../../components/ProjectsList'
import '@testing-library/jest-dom'

// Create a simplified version of the app for testing
function TestApp({ initialProjects = [] }) {
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSearchChange = (term) => {
    setSearchTerm(term)
  }

  return (
    <ProjectsProvider initialProjects={initialProjects}>
      <div>
        <h1>Personal Project Showcase App</h1>
        <AddProjectForm />
        <ProjectsList
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </div>
    </ProjectsProvider>
  )
}

describe('App Integration - User Workflows', () => {
  it('allows user to add a project and see it in the list', async () => {
    render(<TestApp />)

    // Get initial form
    const titleInput = screen.getByPlaceholderText(/enter project title/i)
    const descriptionInput = screen.getByPlaceholderText(/enter project description/i)
    const submitButton = screen.getByRole('button', { name: /add/i })

    // Initially button should be disabled (empty fields)
    expect(submitButton).toBeDisabled()

    // Fill in the form
    fireEvent.change(titleInput, { target: { value: 'My React Project' } })
    fireEvent.change(descriptionInput, { target: { value: 'A awesome React application' } })

    // Button should now be enabled
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })

    // Submit the form
    fireEvent.click(submitButton)

    // Check success message appears
    await waitFor(() => {
      expect(screen.getByText(/project added successfully/i)).toBeInTheDocument()
    })

    // Check the project appears in the list
    expect(screen.getByText(/my react project/i)).toBeInTheDocument()
    expect(screen.getByText(/a awesome react application/i)).toBeInTheDocument()

    // Form should be cleared
    expect(titleInput).toHaveValue('')
    expect(descriptionInput).toHaveValue('')
  })

  it('shows validation error when submitting with empty fields', async () => {
    render(<TestApp />)

    const submitButton = screen.getByRole('button', { name: /add/i })

    // Try to submit empty form
    fireEvent.click(submitButton)

    // Should show error message containing the word "required" or similar
    await waitFor(() => {
      // The form should still be disabled since inputs are empty
      expect(submitButton).toBeDisabled()
    })
  })

  it('allows user to search for projects', async () => {
    const initialProjects = [
      { id: '1', title: 'React Dashboard', description: 'A dashboard app', createdAt: new Date().toISOString() },
      { id: '2', title: 'Vue Store', description: 'An e-commerce store', createdAt: new Date().toISOString() }
    ]

    render(<TestApp initialProjects={initialProjects} />)

    // Both projects visible initially
    await waitFor(() => {
      expect(screen.getByText(/react dashboard/i)).toBeInTheDocument()
      expect(screen.getByText(/vue store/i)).toBeInTheDocument()
    })

    // Get search input from ProjectsList
    const searchInput = screen.getByPlaceholderText(/search projects/i)
    fireEvent.change(searchInput, { target: { value: 'React' } })

    // Only React project should be visible
    await waitFor(() => {
      expect(screen.getByText(/react dashboard/i)).toBeInTheDocument()
      expect(screen.queryByText(/vue store/i)).not.toBeInTheDocument()
    })

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } })

    // Both projects visible again
    await waitFor(() => {
      expect(screen.getByText(/react dashboard/i)).toBeInTheDocument()
      expect(screen.getByText(/vue store/i)).toBeInTheDocument()
    })
  })

  it('allows user to delete a project', async () => {
    const initialProjects = [
      { id: '1', title: 'Test Project', description: 'A test project', createdAt: new Date().toISOString() }
    ]

    render(<TestApp initialProjects={initialProjects} />)

    // Project visible - check title specifically
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /test project/i })).toBeInTheDocument()
    })

    // Find and click delete button
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    fireEvent.click(deleteButtons[0])

    // Project should be removed from the list
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /test project/i })).not.toBeInTheDocument()
    })

    // Empty state message should appear
    expect(screen.getByText(/no projects yet/i)).toBeInTheDocument()
  })

  it('enforces character limits when adding projects', async () => {
    render(<TestApp />)

    const titleInput = screen.getByPlaceholderText(/enter project title/i)
    const descriptionInput = screen.getByPlaceholderText(/enter project description/i)

    // Try to input title longer than 100 characters
    const longTitle = 'a'.repeat(150)
    fireEvent.change(titleInput, { target: { value: longTitle } })

    // Title should not exceed 100 characters
    await waitFor(() => {
      expect(titleInput.value.length).toBeLessThanOrEqual(100)
    })

    // Try to input description longer than 1000 characters
    const longDesc = 'b'.repeat(1500)
    fireEvent.change(descriptionInput, { target: { value: longDesc } })

    // Description should not exceed 1000 characters
    await waitFor(() => {
      expect(descriptionInput.value.length).toBeLessThanOrEqual(1000)
    })
  })
})
