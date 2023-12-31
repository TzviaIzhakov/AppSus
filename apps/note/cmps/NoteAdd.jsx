const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;
import { noteService } from '../services/note.service.js';
export function NoteAdd({ saveNote }) {
  const [typeInput, setTypeInput] = useState('text');
  const [currComp, setCurrCopm] = useState('txt');
  const [noteToEdit, setNoteToEdit] = useState(
    noteService.getEmptyNote(currComp)
  );
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setNoteToEdit(noteService.getEmptyNote(currComp));
    console.log(currComp);
  }, [currComp]);

  function handleChange(ev) {
    let { target } = ev;
    let field = target.name;
    console.log(field);
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
      // break;
      default:
        break;
    }
    let info;
    if (field === 'todos') {
      info = {
        ...noteToEdit.info,
        [field]: value.split(','),
      };
    } else {
      console.log('inserted');
      info = {
        ...noteToEdit.info,
        [field]: value,
      };
    }

    console.log(info, 'info');
    setNoteToEdit((prevNoteToEdit) => ({
      ...prevNoteToEdit,
      info,
    }));
    console.log(noteToEdit);
  }

  function onSaveNote(ev) {
    ev.preventDefault();
    // if(typeInput==='todos') {
    //   setNoteToEdit(prevNoteToEdit=>)
    // }
    ev.target.reset();
    console.log(noteToEdit);
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
        <table>
          <tbody>
            <tr
              className="tr-input"
              onClick={() => {
                setIsExpanded(true);
              }}
            >
              <input
                className="input-user"
                type={`${typeInput}`}
                onChange={handleChange}
                name={`${currComp}`}
                accept="image/*"
                placeholder="Take a note..."
              />
              <div className="btns-user-wrapper">
                <button
                  onClick={(ev) => onSetInputType('file', ev)}
                  name="url"
                  title="pic"
                >
                  <img
                    src="assets/icons-notes/image-outline.svg"
                    alt=""
                    name="url"
                  />
                </button>
                {/* <button
                  onClick={(ev) => onSetInputType('text', ev)}
                  name="todos"
                >
                  <img
                    src="assets/icons-notes/checkbox.svg"
                    alt=""
                    name="todos"
                  />
                </button> */}
                <button
                  onClick={(ev) => onSetInputType('text', ev)}
                  name="txt"
                  title="text"
                >
                  <img src="assets/icons-notes/text.svg" alt="" name="txt" />
                </button>
                <button type="submit" className="btn-submit" title="add">
                  <img src="assets/icons-notes/add.svg" alt="" />
                </button>
              </div>
            </tr>
            <tr hidden={!isExpanded}>
              <input
                className="input-user"
                type="text"
                onChange={handleChange}
                name="title"
                placeholder="Title"
              />
            </tr>
          </tbody>
        </table>
      </section>
    </form>
  );
}
