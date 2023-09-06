import { NotePreview } from '../cmps/NotePreview.jsx';

export function NoteList({ notes, onRemoveNote }) {
  return (
    <ul>
      {notes.map((note) => {
        return (
          <li key={note.id}>
            <NotePreview note={note} />
            <section className="user-tools-btns">
              <button onClick={() => onRemoveNote(note.id)}>Delete</button>
              <button>Update</button>
            </section>
          </li>
        );
      })}
    </ul>
  );
}
