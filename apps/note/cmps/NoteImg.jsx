export function NoteImg({ info, selected = '' }) {
  const { url, title } = info;
  return (
    <article>
      {selected ? <input value={title} /> : <h1>{title}</h1>}
      <img src={`${url}`} alt="img-user" className="user-img" />
    </article>
  );
}
