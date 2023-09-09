const { useState, useEffect } = React;
import { NoteImg } from '../cmps/NoteImg.jsx';
import { NoteTodos } from '../cmps/NoteTodos.jsx';
import { NoteTxt } from '../cmps/NoteTxt.jsx';
import { noteService } from '../services/note.service.js';

export function NoteDetails({
  noteId,
  onBack,
  updateNoteInList,
  onRemoveNote,
}) {
  const [note, setNote] = useState(null);
  const [isDelete, setDelete] = useState(false);
  useEffect(() => {
    noteService.get(noteId).then(setNote);
    setDelete(false);
  }, [noteId]);
  function removeNote() {
    onRemoveNote(noteId);
    setTimeout(() => {
      setDelete(true);
    }, 1000);
  }
  if (!note) return <div>loading...</div>;
  return (
    <section>
      {!isDelete && (
        <section className="modal note-preview">
          <DynamicCmp
            type={note.type}
            info={note.info}
            selected={`${note.id}`}
            updateNoteInList={updateNoteInList}
          />

          <section className="user-tools-btns">
            <button onClick={removeNote}>
              <img
                src="assets/icons-notes/trash.svg"
                alt=""
                className="delete-img"
              />
            </button>
          </section>
        </section>
      )}

      {!isDelete && <section className="overlay" onClick={onBack}></section>}
    </section>
  );
}

function DynamicCmp(props) {
  switch (props.type) {
    case 'NoteTxt':
      return <NoteTxt {...props} />;
    case 'NoteImg':
      return <NoteImg {...props} />;
    case 'NoteTodos':
      return <NoteTodos {...props} />;
  }
}
