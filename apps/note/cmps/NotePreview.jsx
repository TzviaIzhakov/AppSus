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

function NoteTodos({ info }) {
  const { title, todos } = info;
  return (
    <article>
      <h1>{title}</h1>
      <ul>
        {todos.map((todo, idx) => {
          return <li key={idx}>{todo.txt}</li>;
        })}
      </ul>
    </article>
  );
}

function NoteImg({ info }) {
  const { url, title } = info;
  return (
    <article>
      <h1>{title}</h1>
      <img src={`${url}`} alt="img-user" />
    </article>
  );
}

function NoteTxt({ info }) {
  const { txt } = info;
  return (
    <article>
      <p>{txt}</p>
    </article>
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
