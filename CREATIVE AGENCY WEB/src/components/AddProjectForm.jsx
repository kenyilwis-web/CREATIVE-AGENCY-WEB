import { useState } from 'react'
import { createProject, validateProject } from '../utils'
import styles from '../styles/App.module.css'
import '../styles/global.css'
import { useProjects } from '../context/ProjectsContext'

/**
 * AddProjectForm Component
 * 
 * Handles project creation with form validation, character limits, and user feedback
 * Features:
 * - Real-time character count display for title (max 100) and description (max 1000)
 * - Input validation before submission
 * - Success/error messaging with auto-dismiss
 * - Button state management (disabled when fields empty)
 * - Form reset after successful submission
 */
function AddProjectForm() {
  // Get addProject action from global context
  const { addProject } = useProjects()

  // Form state management
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({}) // Object to store field-level errors
  const [isSubmitting, setIsSubmitting] = useState(false) // Prevent double-submit
  const [success, setSuccess] = useState(false) // Show success message

  const MAX_TITLE_LENGTH = 100
  const MAX_DESCRIPTION_LENGTH = 1000

  /**
   * Handle title input change with character limit enforcement
   * Prevents input exceeding MAX_TITLE_LENGTH
   * Clears title error when user starts typing again
   */
  const handleTitleChange = (e) => {
    const value = e.target.value
    // Character limit check prevents invalid state
    if (value.length <= MAX_TITLE_LENGTH) {
      setTitle(value)
      // Clear error when user corrects the field
      if (errors.title) {
        setErrors(prev => ({ ...prev, title: '' }))
      }
    }
  }

  /**
   * Handle description input change with character limit enforcement
   * Prevents input exceeding MAX_DESCRIPTION_LENGTH
   * Clears description error when user starts typing again
   */
  const handleDescriptionChange = (e) => {
    const value = e.target.value
    // Character limit check prevents invalid state
    if (value.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(value)
      // Clear error when user corrects the field
      if (errors.description) {
        setErrors(prev => ({ ...prev, description: '' }))
      }
    }
  }

  /**
   * Handle form submission with validation and state update
   * Flow: validate → create project → add to context → reset form → show feedback
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({}) // Clear previous errors
    setIsSubmitting(true)

    try {
      // Validate input using utility function
      const validation = validateProject({ title, description })
      if (!validation.isValid) {
        setErrors(validation.errors)
        setIsSubmitting(false)
        return
      }

      // Create project object with metadata (id, timestamp)
      const newProject = createProject(title, description)
      // Add to global state via context
      addProject(newProject)

      // Reset form after successful submission
      setTitle('')
      setDescription('')
      // Show success message, auto-dismiss after 3 seconds
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      // Catch any unexpected errors
      setErrors({ general: error.message })
    } finally {
      // Always reset submitting state
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles['add-project-section']}>
      <h2>Add Project</h2>

      {success && (
        <div className={styles['success-message']}>
          ✓ Project added successfully!
        </div>
      )}

      {errors.general && (
        <div className={styles['error-message']}>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
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
            <span id="title-error" className={styles['error-text']}>
              {errors.title}
            </span>
          )}
        </div>

        <div className={styles['form-group']}>
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
            <span id="description-error" className={styles['error-text']}>
              {errors.description}
            </span>
          )}
        </div>

        <button 
          className={styles['add-btn']} 
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
