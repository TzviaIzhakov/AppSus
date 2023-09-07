const { useState, useEffect } = React;
import { noteService } from '../services/note.service.js';
export function NoteImg({ info, selected = '', updateNoteInList }) {
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
  function handleChange(ev) {
    let { target } = ev;
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

  function getTitle() {
    let title;
    if (noteToEdit && selected) {
      title = noteToEdit.info.title;
    } else {
      title = info.title;
    }
    return title;
  }

  function getUrl() {
    let url;
    if (noteToEdit && selected) {
      url = noteToEdit.info.url;
    } else {
      url = info.url;
    }
    return url;
  }

  if (!noteToEdit && selected) {
    return <div>loading...</div>;
  }
  // const { url, title } = info;

  return (
    <article>
      {selected ? (
        <form onSubmit={onSaveNote}>
          <input value={getTitle()} onChange={handleChange} name="title" />
          <img src={`${getUrl()}`} alt="img-user" className="user-img" />
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            name="url"
          />
          <button>Update Changes</button>
        </form>
      ) : (
        <div>
          <h1>{getTitle()}</h1>
          <img src={`${getUrl()}`} alt="img-user" className="user-img" />
        </div>
      )}
    </article>
  );
}
