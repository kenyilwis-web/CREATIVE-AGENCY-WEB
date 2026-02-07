import { useState } from 'react'
import { createProject, validateProject } from '../utils'

function AddProjectForm({ onAddProject }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const MAX_TITLE_LENGTH = 100
  const MAX_DESCRIPTION_LENGTH = 1000

  const handleTitleChange = (e) => {
    const value = e.target.value
    if (value.length <= MAX_TITLE_LENGTH) {
      setTitle(value)
      if (errors.title) {
        setErrors(prev => ({ ...prev, title: '' }))
      }
    }
  }

  const handleDescriptionChange = (e) => {
    const value = e.target.value
    if (value.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(value)
      if (errors.description) {
        setErrors(prev => ({ ...prev, description: '' }))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setIsSubmitting(true)

    try {
      // Validate input
      const validation = validateProject({ title, description })
      if (!validation.isValid) {
        setErrors(validation.errors)
        setIsSubmitting(false)
        return
      }

      // Create and add project
      const newProject = createProject(title, description)
      onAddProject(newProject)

      // Reset form and show success
      setTitle('')
      setDescription('')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      setErrors({ general: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="add-project-section">
      <h2>Add Project</h2>

      {success && (
        <div className="success-message">
          ✓ Project added successfully!
        </div>
      )}

      {errors.general && (
        <div className="error-message">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">
            Title
            <span className="char-count">
              {title.length}/{MAX_TITLE_LENGTH}
            </span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter project title"
            disabled={isSubmitting}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <span id="title-error" className="error-text">
              {errors.title}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Description
            <span className="char-count">
              {description.length}/{MAX_DESCRIPTION_LENGTH}
            </span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter project description"
            disabled={isSubmitting}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          {errors.description && (
            <span id="description-error" className="error-text">
              {errors.description}
            </span>
          )}
        </div>

        <button 
          className="add-btn" 
          type="submit"
          disabled={isSubmitting || !title.trim() || !description.trim()}
        >
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  )
}

export default AddProjectForm
