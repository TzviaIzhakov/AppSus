export function NoteTodos({ info, selected }) {
  const { title, todos } = info;
  return (
    <article>
      {selected ? <input value={title} /> : <h1>{title}</h1>}
      <ul>
        {todos.map((todo, idx) => {
          return selected ? (
            <input value={todo.txt} />
          ) : (
            <li key={idx}>{todo.txt}</li>
          );
        })}
      </ul>
    </article>
  );
}
