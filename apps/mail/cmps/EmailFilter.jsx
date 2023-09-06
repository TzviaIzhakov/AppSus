const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function EmailFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break;

      case 'checkbox':
        value = target.checked
        break

      default:
        break;
    }

    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }
  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }
  const { subject, isRead } = filterByToEdit
  return (
    <section className="emails-filter">
      <form onSubmit={onSubmitFilter}>
        <input value={subject} onChange={handleChange} type="text" placeholder="search" id="subject" name="subject" />
        <label htmlFor="isRead"> read only</label>
        <input value={isRead} onChange={handleChange} type="checkbox" id="isRead" name="isRead" />

      </form>
    </section>

  )
}
