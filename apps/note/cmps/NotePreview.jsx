const { useState, useEffect, useRef } = React;
import { NoteImg } from '../cmps/NoteImg.jsx';
import { NoteTodos } from '../cmps/NoteTodos.jsx';
import { NoteTxt } from '../cmps/NoteTxt.jsx';
import { NotePallete } from './NotePallete.jsx';
import { noteService } from '../services/note.service.js';

export function NotePreview({
  note,
  onRemoveNote,
  onSelectNoteId,
  updateNoteInList,
}) {
  const [isShowPallete, setShowPallete] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(note);
  const [backgroundColor, setBackgroundColor] = useState({
    backgroundColor: '#ffffff',
  });
  const paletteContainerRef = useRef(null);

  const closePalette = () => {
    setShowPallete(false);
  };

  const handleDocumentClick = (event) => {
    if (
      paletteContainerRef.current &&
      !paletteContainerRef.current.contains(event.target)
    ) {
      closePalette();
      console.log(isShowPallete);
    }
  };

  useEffect(() => {
    if (isShowPallete) {
      document.addEventListener('click', handleDocumentClick);
    } else {
      document.removeEventListener('click', handleDocumentClick);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isShowPallete]);

  function onSaveNote() {
    noteService
      .save(noteToEdit)
      .then((savedNote) => {
        updateNoteInList(savedNote);
        console.log(`Note Edited! ${savedNote.id}`);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  }

  function onShowPallate(event) {
    event.stopPropagation();
    setShowPallete(true);
  }

  function onSetBackGroungColor(backGroungColor) {
    const newStyle = {
      backgroundColor: backGroungColor,
    };
    setBackgroundColor(newStyle);
    console.log(backGroungColor);
    setNoteToEdit((prevNoteToEdit) => ({
      ...prevNoteToEdit,
      style: backGroungColor,
    }));
    console.log(noteToEdit);
    onSaveNote();
  }

  return (
    <section className="note-preview">
      <div key={note.id} style={backgroundColor}>
        <DynamicCmp type={note.type} info={note.info} />
        <section className="user-tools-btns">
          <button onClick={() => onRemoveNote(note.id)}>
            <img
              src="assets/icons-notes/trash.svg"
              alt=""
              className="delete-img"
            />
          </button>
          <button onClick={() => onSelectNoteId(note.id)}>
            <img
              src="assets/icons-notes/edit-line.svg"
              alt=""
              className="update-img"
            />
          </button>
          <button onClick={onShowPallate}>
            <img
              src="assets/icons-notes/pallete-2-outline.svg"
              alt=""
              className="palette-img"
            />
          </button>
        </section>
      </div>
      {isShowPallete && (
        <div className="color-palette-container" ref={paletteContainerRef}>
          <NotePallete onSetBackGroungColor={onSetBackGroungColor} />
        </div>
      )}
    </section>
  );
}

function DynamicCmp(props) {
  switch (props.type) {
    case 'NoteTxt':
      return <NoteTxt {...props} />;
    case 'NoteImg':
      return <NoteImg {...props} />;
    case 'NoteTodos':
      return <NoteTodos {...props} />;
  }
}
