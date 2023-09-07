const { useState, useEffect } = React;
import { NoteImg } from '../cmps/NoteImg.jsx';
import { NoteTodos } from '../cmps/NoteTodos.jsx';
import { NoteTxt } from '../cmps/NoteTxt.jsx';
import { noteService } from '../services/note.service.js';

export function NoteDetails({ noteId, onBack, saveNote }) {
  const [note, setNote] = useState(null);

  useEffect(() => {
    noteService.get(noteId).then(setNote);
  }, [noteId]);

  if (!note) return <div>loading...</div>;
  // const onUpdateNote = (updatedNote) => {
  //   // Save the updated note to the database
  //   noteService
  //     .update(updatedNote)
  //     .then((savedNote) => {
  //       // Update the note in the state with the saved version
  //       setNote(savedNote);
  //     })
  // };
  return (
    <section className="modal">
      <DynamicCmp
        type={note.type}
        info={note.info}
        selected={`${note.id}`}
        // onUpdateNote={onUpdateNote}
        saveNote={saveNote}
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
