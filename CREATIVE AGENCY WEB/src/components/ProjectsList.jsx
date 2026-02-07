import { useMemo } from 'react'
import ProjectCard from './ProjectCard'
import { searchProjects } from '../utils'
import { useProjects } from '../context/ProjectsContext'
import styles from '../styles/App.module.css'

/**
 * ProjectsList Component
 * 
 * Displays projects with real-time search filtering
 * Features:
 * - Real-time search input filtering by title and description
 * - Dynamic empty state messages (no projects vs no search results)
 * - Project count display with singular/plural handling
 * - Optimized filtering with useMemo to avoid unnecessary recalculations
 */
function ProjectsList({ searchTerm, onSearchChange }) {
  // Get projects and deleteProject action from global context
  const { projects, deleteProject } = useProjects()

  /**
   * Memoized filtering prevents unnecessary recalculations
   * Only recomputes when projects array or searchTerm changes
   * Improves performance for large project lists
   */
  const filteredProjects = useMemo(
    () => searchProjects(projects, searchTerm),
    [projects, searchTerm]
  )

  // Determine which empty state to show
  const hasProjects = filteredProjects.length > 0
  const hasSearchResults = searchTerm.length > 0

  return (
    <div className={styles['projects-section']}>
      {/* Search input with debounced callback */}
      <input
        type="text"
        className={styles['search-input']}
        placeholder="Search Projects"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search projects by title or description"
      />

      <div className={styles['projects-list']}>
        {/* Map filtered projects to cards - key ensures React identity */}
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={deleteProject}
          />
        ))}
      </div>

      {/* Conditional rendering for different empty states */}
      {!hasProjects && (
        <div className={styles['empty-state']}>
          {hasSearchResults ? (
            // User searched but found nothing
            <>
              <p className={styles['empty-icon']}>🔍</p>
              <p className={styles['empty-title']}>No projects found</p>
              <p className={styles['empty-description']}>
                Try adjusting your search terms
              </p>
            </>
          ) : (
            // No projects exist at all
            <>
              <p className={styles['empty-icon']}>📁</p>
              <p className={styles['empty-title']}>No projects yet</p>
              <p className={styles['empty-description']}>
                Add your first project to get started
              </p>
            </>
          )}
        </div>
      )}

      {hasProjects && (
        <div className={styles['projects-footer']}>
          <p className={styles['project-count']}>
            {/* Dynamic count with proper singular/plural grammar */}
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>
      )}
    </div>
  )
}

export default ProjectsList

