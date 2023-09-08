// note service
import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';
const NOTE_KEY = 'notesDB';

_createNotes();

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getNextNoteId,
  update,
  getDefaultFilter,
  // getFilterBy,
  // getDefaultFilter,
  // setFilterBy,
};

function query(filterBy) {
  console.log(filterBy);
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i');
      let notesCopy = notes.slice();
      notes = notes.filter((note) => regex.test(note.info.txt));
      if (notes.length === 0) {
        console.log('pp');
        const regex = new RegExp(filterBy.txt, 'i');
        notes = notesCopy.filter((note) => regex.test(note.info.title));
      }
    }
    console.log(notes, 'notes');
    return notes;
  });
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId).then((note) => {
    note = _setNextPrevCarId(note);
    return note;
  });
}

function _setNextPrevCarId(note) {
  return storageService.query(NOTE_KEY).then((notes) => {
    const noteIdx = notes.findIndex((currNote) => currNote.id === note.id);
    const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0];
    const prevNote = notes[noteIdx - 1]
      ? notes[noteIdx - 1]
      : notes[notes.length - 1];
    note.nextNoteId = nextNote.id;
    note.prevNoteId = prevNote.id;
    return note;
  });
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId);
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note);
  } else {
    return storageService.post(NOTE_KEY, note);
  }
}

function update(note) {
  return storageService.put(NOTE_KEY, note);
}

function getEmptyNote(currCopm) {
  //right now it giving me the defualt note as type: txt
  console.log(currCopm);
  if (currCopm === 'txt') {
    return {
      id: '',
      createdAt: 0,
      type: 'NoteTxt',
      isPinned: false,
      style: {
        backgroundColor: '#ffffff',
      },
      info: {
        txt: '',
      },
    };
  } else if (currCopm === 'url') {
    return {
      id: '',
      createdAt: 0,
      type: 'NoteImg',
      isPinned: false,
      style: {
        backgroundColor: '#ffffff',
      },
      info: {
        url: '',
        title: '',
      },
    };
  } else if (currCopm === 'todos') {
    return {
      id: '',
      createdAt: 0,
      type: 'NoteTodos',
      isPinned: false,
      style: {
        backgroundColor: '#ffffff',
      },
      info: {
        title: '',
        todos: [],
      },
    };
  }
}

function getNextNoteId(noteId) {
  return storageService.query(NOTE_KEY).then((notes) => {
    var idx = notes.findIndex((note) => note.id === noteId);
    if (idx === notes.length - 1) idx = -1;
    return notes[idx + 1].id;
  });
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY);
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
          backgroundColor: '#00d',
        },
        info: {
          txt: 'Fullstack Me Baby!',
        },
      },
      {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
          url: 'https://media.istockphoto.com/id/1283852667/photo/touch-of-fresh-moss-in-the-forest.jpg?s=1024x1024&w=is&k=20&c=WLVkjVoG8r68qfe2OOBqrbNqTXzjnWH9g2mrtF4-V08=',
          title: 'Bobi and Me',
        },
        style: {
          backgroundColor: '#00d',
        },
      },
      {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
          title: 'Get my stuff together',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
    ];
  }
  utilService.saveToStorage(NOTE_KEY, notes);
  return notes;
}

function _createNote() {}

function getFilterBy() {
  return { ...gFilterBy };
}

function setFilterBy(filterBy = {}) {
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt;
  // if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed;
  return gFilterBy;
}

function getDefaultFilter() {
  return { txt: '', title: '' };
}
