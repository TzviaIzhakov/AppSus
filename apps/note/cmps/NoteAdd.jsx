const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;
import { noteService } from '../services/note.service.js';
export function NoteAdd({ saveNote }) {
  const [typeInput, setTypeInput] = useState('text');
  const [currComp, setCurrCopm] = useState('NoteTxt');
  const [noteToEdit, setNoteToEdit] = useState(
    noteService.getEmptyNote(currComp)
  );
  {
    /* <img class="gkA7Yd-HiaYvf HiaYvf-Vj7tjb" loading="lazy" tabindex="0" alt src=""></img> */
  }

  useEffect(() => {
    setNoteToEdit(noteService.getEmptyNote(currComp));
    console.log(currComp);
  }, [currComp]);

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
  }

  function onSaveNote(ev) {
    ev.preventDefault();
    saveNote(noteToEdit);
  }

  function onSetInputType(typeInput, ev) {
    ev.preventDefault();
    setTypeInput(typeInput);
    setCurrCopm(ev.target.name);
    console.log(currComp);
  }

  return (
    <form onSubmit={onSaveNote}>
      <label htmlFor="Add Note Please" id="txt"></label>
      <section>
        //txt,url,todos
        <input
          type={`${typeInput}`}
          onChange={handleChange}
          name={`${currComp}`}
        />
        <button onClick={(ev) => onSetInputType('file', ev)} name="url">
          Image
        </button>
        <button onClick={(ev) => onSetInputType('text', ev)} name="todos">
          To Do
        </button>
        <button onClick={(ev) => onSetInputType('text', ev)} name="txt">
          Text
        </button>
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
