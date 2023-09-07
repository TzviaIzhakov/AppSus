const { useState, useEffect } = React;
import { NoteImg } from '../cmps/NoteImg.jsx';
import { NoteTodos } from '../cmps/NoteTodos.jsx';
import { NoteTxt } from '../cmps/NoteTxt.jsx';
import { noteService } from '../services/note.service.js';

export function NoteDetails({ noteId, onBack, updateNoteInList }) {
  const [note, setNote] = useState(null);

  useEffect(() => {
    noteService.get(noteId).then(setNote);
  }, [noteId]);

  if (!note) return <div>loading...</div>;
  return (
    <section className="modal">
      <DynamicCmp
        type={note.type}
        info={note.info}
        selected={`${note.id}`}
        updateNoteInList={updateNoteInList}
      />
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
