const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;
import { noteService } from '../services/note.service.js';
export function NoteAdd({ saveNote }) {
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote());
  const [typeInput, setTypeInput] = useState('text');

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

    setNoteToEdit((prevNoteToEdit) => ({
      ...prevNoteToEdit,
      info,
    }));
  }

  function onSaveNote(ev) {
    ev.preventDefault();
    saveNote(noteToEdit);
  }

  function onSetInputType(typeInput) {
    setTypeInput(typeInput);
  }

  return (
    <form onSubmit={onSaveNote}>
      <label htmlFor="Add Note Please" id="txt"></label>
      <section>
        <input type={`${typeInput}`} onChange={handleChange} name="txt" />
        <button onClick={() => onSetInputType('file')}>Image</button>
        <button onClick={() => onSetInputType('text')}>To Do</button>
        <button onClick={() => onSetInputType('text')}>Text</button>
      </section>
      <button>Add</button>
    </form>
  );
}

// if (field === 'amount') {
//   const listPrice = {
//     ...bookToEdit.listPrice,
//     [field]: value,
//   };
//   setBookToEdit((prevBookToEdit) => ({ ...prevBookToEdit, listPrice }));
// } else {
