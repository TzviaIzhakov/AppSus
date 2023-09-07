export function NoteHeader() {
  return (
    <header className="note-header">
      <div className="logo">
        <img src="assets/icons-notes/logo-keep.png" alt="keep-logo" />
        <span>Keep</span>
      </div>
      <div className="filter">
        {/* <img src="assets/icons-notes/search.svg" alt="search-icon" /> */}
        <input type="text" placeholder="Search" />
      </div>
    </header>
  );
}
