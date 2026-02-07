import React from 'react'
import { renderWithProvider, screen, fireEvent } from '../test-utils'
import ProjectsList from '../../components/ProjectsList'

describe('ProjectCard delete', () => {
  it('deletes a project when delete button is clicked', () => {
    const initial = [
      { id: '1', title: 'To Delete', description: 'Will be removed' }
    ]

    renderWithProvider(<ProjectsList searchTerm="" onSearchChange={() => {}} />, { initialProjects: initial })

    expect(screen.getByText(/to delete/i)).toBeInTheDocument()

    const deleteBtn = screen.getByRole('button', { name: /delete project: to delete/i })
    fireEvent.click(deleteBtn)

    expect(screen.queryByText(/to delete/i)).not.toBeInTheDocument()
  })
})
