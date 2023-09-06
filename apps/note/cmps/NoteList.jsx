import { NotePreview } from '../cmps/NotePreview.jsx';

export function NoteList({ notes }) {
  return (
    <ul>
      {notes.map((note) => {
        return (
          <li key={note.id}>
            <NotePreview note={note} />
            <section className="user-tools-btns">
              <button>Delete</button>
            </section>
          </li>
        );
      })}
    </ul>
  );
}
