const { Link, NavLink } = ReactRouterDOM;
import { NoteFilter } from '../cmps/NoteFilter.jsx';
export function NoteHeader({ filterBy, onSetFilterBy, setShowMainHeader }) {
  return (
    <header className="note-header">
      <div className="logo">
        <img src="assets/icons-notes/logo-keep.png" alt="keep-logo" />
        <span>Keep</span>
      </div>
      <NoteFilter
        filterBy={filterBy}
        onSetFilterBy={onSetFilterBy}
        className="filter"
      />
      <div>
        <NavLink to="/" onClick={() => setShowMainHeader(true)}>
          <img
            src="assets/icons-notes/google-home.jpg"
            alt=""
            className="mail"
          />
        </NavLink>
        <NavLink to="/mail/inbox" onClick={() => setShowMainHeader(false)}>
          <img
            src="assets/icons-notes/gmail.logo.png"
            alt=""
            className="mail"
          />
        </NavLink>
      </div>
    </header>
  );
}
