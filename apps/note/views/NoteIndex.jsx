import { noteService } from '../services/note.service.js';
import { NoteList } from '../cmps/NoteList.jsx';
import { NoteDetails } from '../views/NoteDetails.jsx';
import { NoteAdd } from '../cmps/NoteAdd.jsx';
import { NoteHeader } from '../cmps/NoteHeader.jsx';
import { NoteFilter } from '../cmps/NoteFilter.jsx';
// const { Outlet, Link } = ReactRouterDOM;
//   const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());
const { useState, useEffect } = React;

export function NoteIndex() {
  const [notes, setNotes] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter());

  useEffect(() => {
    console.log('mount');
    console.log(filterBy);
    noteService.query(filterBy).then((notes) => {
      console.log(notes);
      setNotes(notes);
    });
  }, [filterBy]);

  function onSetFilterBy(filterBy) {
    console.log(filterBy);
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }

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

  const updateNoteInList = (updatedNote) => {
    noteService.save(updatedNote).then((updatedNote) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
    });
  };

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

  function onSelectNoteId(noteId) {
    setSelectedNoteId(noteId);
  }

  if (!notes) return <div>Loading...</div>;

  return (
    <section className="note-index">
      <NoteHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

      <React.Fragment>
        <NoteAdd saveNote={saveNote}></NoteAdd>
        <NoteList
          notes={notes}
          onRemoveNote={onRemoveNote}
          onSelectNoteId={onSelectNoteId}
          updateNoteInList={updateNoteInList}
        ></NoteList>
      </React.Fragment>
      {selectedNoteId && (
        <NoteDetails
          onBack={() => onSelectNoteId(null)}
          noteId={selectedNoteId}
          // saveNote={saveNote}
          onRemoveNote={onRemoveNote}
          updateNoteInList={updateNoteInList}
        />
      )}
    </section>
  );
}
