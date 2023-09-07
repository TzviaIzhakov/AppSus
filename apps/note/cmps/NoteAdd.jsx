const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;
import { noteService } from '../services/note.service.js';
export function NoteAdd({ saveNote }) {
  const [typeInput, setTypeInput] = useState('text');
  const [currComp, setCurrCopm] = useState('txt');
  const [noteToEdit, setNoteToEdit] = useState(
    noteService.getEmptyNote(currComp)
  );

  useEffect(() => {
    setNoteToEdit(noteService.getEmptyNote(currComp));
    console.log(currComp);
  }, [currComp]);

  function handleChange(ev) {
    let { target } = ev;
    let field = target.name;
    let value = target.value;

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || '';
        break;

      case 'checkbox':
        value = target.checked;
        break;

      case 'file':
        const selectedFile = ev.target.files[0];
        if (selectedFile) {
          const reader = new FileReader();
          reader.onload = function (event) {
            console.log('pp');
            setNoteToEdit((prevNoteToEdit) => ({
              ...prevNoteToEdit,
              info: {
                ...prevNoteToEdit.info,
                url: event.target.result,
              },
            }));
          };
          reader.readAsDataURL(selectedFile);
        } else {
          value = '';
        }
        break;
      default:
        break;
    }

    const info = {
      ...noteToEdit.info,
      [field]: value,
    };

    console.log(info, 'info');
    console.log('some');
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
    <form onSubmit={onSaveNote} className="user-text-area">
      <section className="input-wrapper">
        <input
          className="input-user"
          type={`${typeInput}`}
          onChange={handleChange}
          name={`${currComp}`}
          accept="image/*"
          placeholder="Take a note..."
        />

        <div className="btns-user-wrapper">
          <button onClick={(ev) => onSetInputType('file', ev)} name="url">
            <img src="assets/icons-notes/image-outline.svg" alt="" name="url" />
          </button>
          <button onClick={(ev) => onSetInputType('text', ev)} name="todos">
            <img src="assets/icons-notes/checkbox.svg" alt="" name="todos" />
          </button>
          <button onClick={(ev) => onSetInputType('text', ev)} name="txt">
            <img src="assets/icons-notes/text.svg" alt="" name="txt" />
          </button>
        </div>
      </section>
      <button className="btn-submit">Add</button>
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
