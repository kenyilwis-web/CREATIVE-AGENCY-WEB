import React from 'react'
import { renderWithProvider, fireEvent, screen, waitFor } from '../test-utils'
import AddProjectForm from '../../components/AddProjectForm'
import ProjectsList from '../../components/ProjectsList'

describe('AddProjectForm user interactions', () => {
  it('adds a project and it appears in the projects list', async () => {
    renderWithProvider(
      <>
        <AddProjectForm />
        <ProjectsList searchTerm="" onSearchChange={() => {}} />
      </>
    )

    const titleInput = screen.getByPlaceholderText(/enter project title/i)
    const descInput = screen.getByPlaceholderText(/enter project description/i)
    const addButton = screen.getByRole('button', { name: /add/i })

    fireEvent.change(titleInput, { target: { value: 'My Test Project' } })
    fireEvent.change(descInput, { target: { value: 'Project description' } })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText(/my test project/i)).toBeInTheDocument()
      expect(screen.getByText(/project description/i)).toBeInTheDocument()
    })
  })

  it('disables add button when title or description is empty', () => {
    renderWithProvider(<AddProjectForm />)

    const addButton = screen.getByRole('button', { name: /add/i })
    expect(addButton).toBeDisabled()

    const titleInput = screen.getByPlaceholderText(/enter project title/i)
    fireEvent.change(titleInput, { target: { value: 'Test' } })
    expect(addButton).toBeDisabled()
  })

  it('enables add button when both fields have content', () => {
    renderWithProvider(<AddProjectForm />)

    const titleInput = screen.getByPlaceholderText(/enter project title/i)
    const descInput = screen.getByPlaceholderText(/enter project description/i)
    const addButton = screen.getByRole('button', { name: /add/i })

    fireEvent.change(titleInput, { target: { value: 'Test Title' } })
    fireEvent.change(descInput, { target: { value: 'Test Description' } })

    expect(addButton).not.toBeDisabled()
  })

  it('clears form inputs after successful submission', async () => {
    renderWithProvider(<AddProjectForm />)

    const titleInput = screen.getByPlaceholderText(/enter project title/i)
    const descInput = screen.getByPlaceholderText(/enter project description/i)
    const addButton = screen.getByRole('button', { name: /add/i })

    fireEvent.change(titleInput, { target: { value: 'Test Project' } })
    fireEvent.change(descInput, { target: { value: 'Test Description' } })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(titleInput.value).toBe('')
      expect(descInput.value).toBe('')
    })
  })

  it('shows success message after adding a project', async () => {
    renderWithProvider(<AddProjectForm />)

    const titleInput = screen.getByPlaceholderText(/enter project title/i)
    const descInput = screen.getByPlaceholderText(/enter project description/i)
    const addButton = screen.getByRole('button', { name: /add/i })

    fireEvent.change(titleInput, { target: { value: 'Test' } })
    fireEvent.change(descInput, { target: { value: 'Description' } })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText(/project added successfully/i)).toBeInTheDocument()
    })
  })

  it('displays character counts for title and description', () => {
    renderWithProvider(<AddProjectForm />)

    const titleInput = screen.getByPlaceholderText(/enter project title/i)
    const descInput = screen.getByPlaceholderText(/enter project description/i)

    fireEvent.change(titleInput, { target: { value: 'Hello' } })
    fireEvent.change(descInput, { target: { value: 'World Test' } })

    expect(screen.getByText('5/100')).toBeInTheDocument()
    expect(screen.getByText('10/1000')).toBeInTheDocument()
  })

  it('prevents exceeding max title length', () => {
    renderWithProvider(<AddProjectForm />)

    const titleInput = screen.getByPlaceholderText(/enter project title/i)
    const longTitle = 'a'.repeat(150)

    fireEvent.change(titleInput, { target: { value: longTitle } })

    expect(titleInput.value.length).toBeLessThanOrEqual(100)
  })

  it('prevents exceeding max description length', () => {
    renderWithProvider(<AddProjectForm />)

    const descInput = screen.getByPlaceholderText(/enter project description/i)
    const longDesc = 'a'.repeat(1500)

    fireEvent.change(descInput, { target: { value: longDesc } })

    expect(descInput.value.length).toBeLessThanOrEqual(1000)
  })
})
