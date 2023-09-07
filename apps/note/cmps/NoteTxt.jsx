const { useState, useEffect } = React;
import { noteService } from '../services/note.service.js';
export function NoteTxt({ info, selected = '', saveNote, onUpdateNote }) {
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
    // const updatedInfo = {
    //   ...noteToEdit.info,
    //   [field]: value,
    // };

    // const updatedNote = {
    //   ...noteToEdit,
    //   info: updatedInfo,
    // };

    // setNoteToEdit(updatedNote);
  }

  function onSaveNote(ev) {
    ev.preventDefault();
    saveNote(noteToEdit);
  }
  // function onSaveNoteChanges(ev) {
  //   ev.preventDefault();
  //   onUpdateNote(noteToEdit); // Save the updated note
  // }

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
