import { useMemo } from 'react'
import ProjectCard from './ProjectCard'
import { searchProjects } from '../utils'

function ProjectsList({ projects, searchTerm, onSearchChange, onDeleteProject }) {
  const filteredProjects = useMemo(
    () => searchProjects(projects, searchTerm),
    [projects, searchTerm]
  )

  const hasProjects = filteredProjects.length > 0
  const hasSearchResults = searchTerm.length > 0

  return (
    <div className="projects-section">
      <input
        type="text"
        className="search-input"
        placeholder="Search Projects"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search projects by title or description"
      />

      <div className="projects-list">
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={onDeleteProject}
          />
        ))}
      </div>

      {!hasProjects && (
        <div className="empty-state">
          {hasSearchResults ? (
            <>
              <p className="empty-icon">🔍</p>
              <p className="empty-title">No projects found</p>
              <p className="empty-description">
                Try adjusting your search terms
              </p>
            </>
          ) : (
            <>
              <p className="empty-icon">📁</p>
              <p className="empty-title">No projects yet</p>
              <p className="empty-description">
                Add your first project to get started
              </p>
            </>
          )}
        </div>
      )}

      {hasProjects && (
        <div className="projects-footer">
          <p className="project-count">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>
      )}
    </div>
  )
}

export default ProjectsList
