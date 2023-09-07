import { NotePreview } from '../cmps/NotePreview.jsx';
import { NotePallete } from './NotePallete.jsx';

export function NoteList({ notes, onRemoveNote, onSelectNoteId }) {
  return (
    <ul className="notes-list clean-list">
      {notes.map((note) => {
        return (
          <div>
            <li key={note.id}>
              <NotePreview
                note={note}
                onRemoveNote={onRemoveNote}
                onSelectNoteId={onSelectNoteId}
              />
            </li>
          </div>
        );
      })}
    </ul>
  );
}
