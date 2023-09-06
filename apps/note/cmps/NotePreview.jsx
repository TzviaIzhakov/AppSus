import { NoteImg } from '../cmps/NoteImg.jsx';
import { NoteTodos } from '../cmps/NoteTodos.jsx';
import { NoteTxt } from '../cmps/NoteTxt.jsx';

export function NotePreview({ note }) {
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
