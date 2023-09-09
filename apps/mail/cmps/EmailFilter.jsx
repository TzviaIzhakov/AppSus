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
  const { isRead } = filterByToEdit
  return (
    <th className="emails-filter">
      <form onSubmit={onSubmitFilter}>
       
        <label htmlFor="isRead"> read</label>
        <input value={isRead} onChange={handleChange} type="checkbox" id="isRead" name="isRead" />

      </form>
    </th>

  )
}
