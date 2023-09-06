import { noteService } from '../services/note.service.js';
import { NoteList } from '../cmps/NoteList.jsx';
import { NoteAdd } from '../cmps/NoteAdd.jsx';

// const { Outlet, Link } = ReactRouterDOM;
//   const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());
const { useState, useEffect } = React;

export function NoteIndex() {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    console.log('mount');
    noteService.query().then((notes) => {
      console.log(notes);
      setNotes(notes);
    });
  }, [notes]);

  function saveNote(noteToEdit) {
    noteService
      .save(noteToEdit)
      .then((savedNote) => {
        setNotes(notes);
        console.log(`Note Edited! ${savedNote.id}`);
        // showSuccessMsg(`Note Edited! ${savedBook.id}`);
      })
      .catch((err) => {
        console.log('err:', err);
        // showErrorMsg('Problem Editing' + bookToEdit.id);
      });
  }

  if (!notes) return <div>Loading...</div>;

  return (
    <section className="note-index">
      <React.Fragment>
        <NoteAdd saveNote={saveNote}></NoteAdd>
        <NoteList notes={notes}></NoteList>
      </React.Fragment>
    </section>
  );
}
