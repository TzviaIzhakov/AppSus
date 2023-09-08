const { useState, useEffect } = React;

export function NoteFilter({ onSetFilterBy, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilterBy(filterByToEdit);
    console.log(filterBy);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || '';
        break;

      case 'checkbox':
        value = target.checked;
        break;

      default:
        break;
    }

    setFilterByToEdit((prevFilter) => ({
      ...prevFilter,
      [field]: value,
      title: value,
    }));
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    console.log('pp');
    onSetFilterBy(filterByToEdit);
  }

  const { txt } = filterByToEdit;

  return (
    <form onSubmit={onSubmitFilter} className="filter">
      <div className="search-icon-container">
        <img src="assets/icons-notes/search.svg" alt="search-icon" />
      </div>
      <input
        type="text"
        placeholder="Search"
        value={txt}
        name="txt"
        onChange={handleChange}
      />
      <button>submit</button>
      {/*  */}
    </form>
  );
}
