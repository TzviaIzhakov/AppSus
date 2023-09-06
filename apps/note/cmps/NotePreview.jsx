import { NoteImg } from '../cmps/NoteImg.jsx';
import { NoteTodos } from '../cmps/NoteTodos.jsx';
import { NoteTxt } from '../cmps/NoteTxt.jsx';

export function NotePreview({ note, onRemoveNote, onSelectNoteId }) {
  return (
    <section className="note-preview">
      <div key={note.id}>
        <DynamicCmp
          type={note.type}
          info={note.info}
          // val={answersMap[cmp.id] || ''}
          // onChangeVal={(val) => {
          //   onChangeVal(cmp.id, val);
          // }}
        />
        <section className="user-tools-btns hidden">
          <button onClick={() => onRemoveNote(note.id)}>
            <img
              src="assets/icons-notes/delete.svg"
              alt=""
              className="delete-img"
            />
          </button>
          <button onClick={() => onSelectNoteId(note.id)}>
            <img
              src="assets/icons-notes/edit.svg"
              alt=""
              className="update-img"
            />
          </button>
        </section>
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
