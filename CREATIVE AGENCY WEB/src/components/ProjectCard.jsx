import { useState } from 'react'
import styles from '../styles/App.module.css'

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
    <div className={styles['project-card']}>
      <div className={styles['thumbnail']} aria-hidden>
        ✕
      </div>

      <div className={styles['project-content']}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.createdAt && (
          <time className={styles['project-date']}>
            Added: {new Date(project.createdAt).toLocaleDateString()}
          </time>
        )}
      </div>

      <button
        className={styles['delete-btn']}
        onClick={handleDelete}
        disabled={isDeleting}
        title="Delete project"
        aria-label={`Delete project: ${project.title}`}
      >
        {isDeleting ? '⋯' : '✕'}
      </button>
    </div>
  )
}

export default ProjectCard
