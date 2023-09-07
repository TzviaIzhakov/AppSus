const { useState, useEffect } = React;
import { noteService } from '../services/note.service.js';
export function NoteTxt({ info, selected = '' }) {
  const { txt } = info;
  return <article>{selected ? <input value={txt} /> : <p>{txt}</p>}</article>;
}
