import { NoteFilter } from '../cmps/NoteFilter.jsx';
export function NoteHeader({ filterBy, onSetFilterBy }) {
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
      {/* <hr /> */}
    </header>
  );
}
