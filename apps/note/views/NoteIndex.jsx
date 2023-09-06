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
  }, []);

  function saveNote(noteToEdit) {
    noteService
      .save(noteToEdit)
      .then((savedNote) => {
        setNotes((prevNotes) => [...prevNotes, savedNote]);
        console.log(`Note Edited! ${savedNote.id}`);
        // showSuccessMsg(`Note Edited! ${savedBook.id}`);
      })
      .catch((err) => {
        console.log('err:', err);
        // showErrorMsg('Problem Editing' + bookToEdit.id);
      });
  }

  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
        showSuccessMsg(`Book Removed! ${noteId}`);
      })
      .catch((err) => {
        console.log('err:', err);
        showErrorMsg('Problem Removing ' + noteId);
      });
  }

  if (!notes) return <div>Loading...</div>;

  return (
    <section className="note-index">
      <React.Fragment>
        <NoteAdd saveNote={saveNote}></NoteAdd>
        <NoteList notes={notes} onRemoveNote={onRemoveNote}></NoteList>
      </React.Fragment>
    </section>
  );
}
