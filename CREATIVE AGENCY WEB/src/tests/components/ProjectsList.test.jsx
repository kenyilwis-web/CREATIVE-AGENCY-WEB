import React from 'react'
import { renderWithProvider, screen, fireEvent, waitFor } from '../test-utils'
import ProjectsList from '../../components/ProjectsList'
import '@testing-library/jest-dom'

describe('ProjectsList search interactions', () => {
  const initialProjects = [
    { id: '1', title: 'React App', description: 'A React project', createdAt: new Date().toISOString() },
    { id: '2', title: 'Vue App', description: 'A Vue project', createdAt: new Date().toISOString() },
    { id: '3', title: 'Angular App', description: 'An Angular project', createdAt: new Date().toISOString() }
  ]

  it('displays all projects initially', () => {
    renderWithProvider(<ProjectsList searchTerm="" onSearchChange={() => {}} />, { initialProjects })

    expect(screen.getByText(/react app/i)).toBeInTheDocument()
    expect(screen.getByText(/vue app/i)).toBeInTheDocument()
    expect(screen.getByText(/angular app/i)).toBeInTheDocument()
  })

  it('filters projects by title when searching', async () => {
    const handleSearch = jest.fn()

    renderWithProvider(
      <ProjectsList searchTerm="" onSearchChange={handleSearch} />,
      { initialProjects }
    )

    const searchInput = screen.getByPlaceholderText(/search projects/i)
    fireEvent.change(searchInput, { target: { value: 'React' } })

    // Should call the onSearchChange callback
    expect(handleSearch).toHaveBeenCalledWith('React')
  })

  it('filters projects by description content', () => {
    renderWithProvider(
      <ProjectsList searchTerm="Vue" onSearchChange={() => {}} />,
      { initialProjects }
    )

    // Only Vue app matches
    expect(screen.getByText(/vue app/i)).toBeInTheDocument()
  })

  it('shows no projects when search has no matches', () => {
    renderWithProvider(
      <ProjectsList searchTerm="Nonexistent" onSearchChange={() => {}} />,
      { initialProjects }
    )

    expect(screen.getByText(/no projects found/i)).toBeInTheDocument()
    expect(screen.queryByText(/react app/i)).not.toBeInTheDocument()
  })

  it('shows empty state message when no projects exist', () => {
    renderWithProvider(<ProjectsList searchTerm="" onSearchChange={() => {}} />, { initialProjects: [] })

    expect(screen.getByText(/no projects yet/i)).toBeInTheDocument()
    expect(screen.getByText(/add your first project/i)).toBeInTheDocument()
  })

  it('displays project count footer', () => {
    renderWithProvider(<ProjectsList searchTerm="" onSearchChange={() => {}} />, { initialProjects })

    expect(screen.getByText(/3 projects/i)).toBeInTheDocument()
  })

  it('displays singular project count when only one project', () => {
    renderWithProvider(
      <ProjectsList searchTerm="" onSearchChange={() => {}} />,
      { initialProjects: [initialProjects[0]] }
    )

    expect(screen.getByText(/1 project/i)).toBeInTheDocument()
  })

  it('updates project count after filtering', () => {
    renderWithProvider(
      <ProjectsList searchTerm="React" onSearchChange={() => {}} />,
      { initialProjects }
    )

    expect(screen.getByText(/1 project/i)).toBeInTheDocument()
  })

  it('displays project dates in created format', () => {
    const testDate = new Date('2026-01-15')
    const projectWithDate = [
      { id: '1', title: 'Test', description: 'Test', createdAt: testDate.toISOString() }
    ]

    renderWithProvider(
      <ProjectsList searchTerm="" onSearchChange={() => {}} />,
      { initialProjects: projectWithDate }
    )

    expect(screen.getByText(/added/i)).toBeInTheDocument()
  })
})
