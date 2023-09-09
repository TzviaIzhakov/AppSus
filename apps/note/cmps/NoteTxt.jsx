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

  function getTitle() {
    let title;
    if (noteToEdit && selected) {
      title = noteToEdit.info.title;
    } else {
      title = info.title;
    }
    return title;
  }

  // if (!noteToEdit && selected) {
  //   return <div>Please wait few seconds</div>;
  // }
  return (
    <article>
      {selected ? (
        <form onSubmit={onSaveNote} className="update">
          <h2>Title</h2>
          <input value={getTitle()} onChange={handleChange} name="title" />
          <h1>Note</h1>
          <input value={getTxt()} onChange={handleChange} name="txt" />
          <button className="edit-btn">
            <img
              src="assets/icons-notes/edit-line.svg"
              alt=""
              className="update-img"
            />
          </button>
        </form>
      ) : (
        <div>
          <h1>{getTitle()}</h1>
          <p>{getTxt()}</p>
        </div>
      )}
    </article>
  );
}
