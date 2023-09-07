const { useState, useEffect } = React;
import { NoteImg } from '../cmps/NoteImg.jsx';
import { NoteTodos } from '../cmps/NoteTodos.jsx';
import { NoteTxt } from '../cmps/NoteTxt.jsx';
import { NotePallete } from './NotePallete.jsx';

export function NotePreview({ note, onRemoveNote, onSelectNoteId }) {
  const [isShowPallete, setShowPallete] = useState(false);

  function onShowPallate() {
    setShowPallete((prevIsShowPallete) => !prevIsShowPallete);
  }
  return (
    <section className="note-preview">
      <div key={note.id}>
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
          <button onClick={() => onShowPallate()}>
            <img
              src="assets/icons-notes/pallete-2-outline.svg"
              alt=""
              className="palette-img"
            />
          </button>
        </section>
      </div>
      <div className="color-palette-container">
        {isShowPallete && <NotePallete />}
      </div>
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
