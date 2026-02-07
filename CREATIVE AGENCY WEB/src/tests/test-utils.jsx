import React from 'react'
import { render } from '@testing-library/react'
import { ProjectsProvider } from '../context/ProjectsContext'

export function renderWithProvider(ui, { initialProjects = [] } = {}) {
  return render(
    <ProjectsProvider initialProjects={initialProjects}>
      {ui}
    </ProjectsProvider>
  )
}

export * from '@testing-library/react'
