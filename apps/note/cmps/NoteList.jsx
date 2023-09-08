import { NotePreview } from '../cmps/NotePreview.jsx';
import { NotePallete } from './NotePallete.jsx';

export function NoteList({
  notes,
  onRemoveNote,
  onSelectNoteId,
  updateNoteInList,
}) {
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
                updateNoteInList={updateNoteInList}
              />
            </li>
          </div>
        );
      })}
    </ul>
  );
}
