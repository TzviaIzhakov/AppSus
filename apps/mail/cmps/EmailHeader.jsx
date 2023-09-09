import { EmailFolderList } from './EmailFolderList.jsx';
const { Link, NavLink } = ReactRouterDOM;
const { useState, useEffect } = React;
export function EmailHeader({
  state,
  setEmails,
  filterBy,
  onSetFilterBy,
  setShowMainHeader,
}) {
  const [dynClass, setDynClass] = useState('icon-text');
  const [isOpen, setIsOpen] = useState(true);
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilterBy(filterByToEdit);
    console.log(filterByToEdit, 'firrr');
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

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }
  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilterBy(filterByToEdit);
  }
  const { subject, isRead } = filterByToEdit;

  function toggleMenu() {
    setIsOpen(!isOpen);
    if (isOpen) setDynClass('icon-text list-clean open');
    else setDynClass('icon-text list-clean');
    console.log(dynClass);
  }

  return (
    <section className="title flex">
      <img
        onClick={toggleMenu}
        className="humburger"
        src="./assets/icons-notes/humburger.svg"
        alt=""
      />
      <img className="logo" src="./assets/icons-notes/gmail.logo.png" alt="" />
      <h2> GMAIL</h2>
      <div className="search-container">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          className="search-bar"
          value={subject}
          onChange={handleChange}
          type="text"
          placeholder="search"
          id="subject"
          name="subject"
        />
      </div>
      <EmailFolderList
        setEmails={setEmails}
        dynClass={dynClass}
        state={state}
      />
      <NavLink to="/" onClick={() => setShowMainHeader(true)}>
        <img src="assets/icons-notes/google-home.jpg" alt="" className="mail" />
      </NavLink>
      <NavLink to="/note" onClick={() => setShowMainHeader(false)}>
        <img
          src="assets/icons-notes/logo-keep.png"
          alt=""
          style={{ width: `3em` }}
        />
      </NavLink>
    </section>
  );
}
