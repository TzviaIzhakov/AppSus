import { NotePreview } from '../cmps/NotePreview.jsx';

export function NoteList({ notes, onRemoveNote, onSelectNoteId }) {
  return (
    <ul className="notes-list clean-list">
      {notes.map((note) => {
        return (
          <li key={note.id}>
            <NotePreview
              note={note}
              onRemoveNote={onRemoveNote}
              onSelectNoteId={onSelectNoteId}
            />
          </li>
        );
      })}
    </ul>
  );
}
