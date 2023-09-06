import { NotePreview } from '../cmps/NotePreview.jsx';

export function NoteList({ notes, onRemoveNote, onSelectNoteId }) {
  return (
    <ul>
      {notes.map((note) => {
        return (
          <li key={note.id} onClick={() => onSelectNoteId(note.id)}>
            <NotePreview note={note} />
            <section className="user-tools-btns">
              <button onClick={() => onRemoveNote(note.id)}>Delete</button>
              {/* <button onClick={() => onSelectBookId(book.id)}>Update</button> */}
            </section>
          </li>
        );
      })}
    </ul>
  );
}
