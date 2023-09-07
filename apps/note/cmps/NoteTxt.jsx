const { useState, useEffect } = React;
import { noteService } from '../services/note.service.js';
export function NoteTxt({ info, selected = '', updateNoteInList }) {
  const [noteToEdit, setNoteToEdit] = useState(null);

  useEffect(() => {
    if (selected) loadNote();
  }, [selected]);

  function loadNote() {
    noteService
      .get(selected)
      .then(setNoteToEdit)
      .catch((err) => console.log('err:', err));
  }

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || '';
        break;

      case 'checkbox':
        value = target.checked;
        break;

      default:
        break;
    }
    const info = {
      ...noteToEdit.info,
      [field]: value,
    };

    console.log(info, 'info');
    setNoteToEdit((prevNoteToEdit) => ({
      ...prevNoteToEdit,
      info,
    }));
    console.log(noteToEdit);
  }

  function onSaveNote(ev) {
    ev.preventDefault();
    noteService
      .save(noteToEdit)
      .then((savedNote) => {
        // navigate('/book');
        updateNoteInList(savedNote);
        console.log(`Note Edited! ${savedNote.id}`);
        // showSuccessMsg(`Book Edited! ${savedBook.id}`);
      })
      .catch((err) => {
        console.log('err:', err);
        // showErrorMsg('Problem Editing' + bookToEdit.id);
      });
  }

  function getTxt() {
    let txt;
    if (noteToEdit && selected) {
      txt = noteToEdit.info.txt;
    } else {
      txt = info.txt;
    }
    return txt;
  }

  if (!noteToEdit && selected) {
    return <div>loading...</div>;
  }
  return (
    <article>
      {selected ? (
        <form onSubmit={onSaveNote}>
          <input value={getTxt()} onChange={handleChange} name="txt" />
          <button>Update Changes</button>
        </form>
      ) : (
        <p>{getTxt()}</p>
      )}
    </article>
  );
}
