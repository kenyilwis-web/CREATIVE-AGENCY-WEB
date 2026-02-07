import { useState } from 'react'

function ProjectCard({ project, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      onDelete(project.id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="project-card">
      <button
        className="delete-btn"
        onClick={handleDelete}
        disabled={isDeleting}
        title="Delete project"
        aria-label={`Delete project: ${project.title}`}
      >
        {isDeleting ? '⋯' : '✕'}
      </button>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.createdAt && (
          <time className="project-date">
            Added: {new Date(project.createdAt).toLocaleDateString()}
          </time>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
