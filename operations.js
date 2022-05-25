const fs = require("fs");
const chalk = require("chalk");

// add note
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note)=>note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.green("Note successfully added!"));
  } else {
    console.log(chalk.red("Title has been taken!"));
  }
};

// remove note
const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => {
    return note.title !== title;
  });
  if (filteredNotes.length !== notes.length) {
    saveNotes(filteredNotes);
    console.log(chalk.green("Note removed successfully!"));
  } else {
    console.log(chalk.red("Note not found!"));
  }
};

// remove all notes
const removeAllNotes = () => {
  const notes = [];
  saveNotes(notes);
  console.log(chalk.green("All notes were removed successfully!"))
}

// list notes' titles
const listTitles = () => {
  const notes = loadNotes();
  let counter = 1;
  console.log(chalk.magenta("Your Note Titles..."));
  notes.forEach(note => {
    if(counter%2==0) {
      console.log(chalk.cyan(counter+'.',note.title));
    } else {
      console.log(counter+'.',note.title);
    }
    counter++;
  });
}

// list all notes
const listNotes = () => {
  const notes = loadNotes();
  let counter = 1;
  if(notes.length>0) {
    console.log(chalk.magenta("Here are all of your notes..."));
    notes.forEach(note => {
      if(counter%2==0) {
        console.log(chalk.cyan(counter+'.', note.title, '-', note.body));
      } else {
        console.log(counter+'.', note.title, '-', note.body);
      }
      counter++;
    });
  } else {
    console.log(chalk.red("No note found!"));
  }
}

// read note
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note)=> note.title === title)

  if(note){
      console.log(chalk.magenta('Your requested note...'));
      console.log(chalk.blue(note.body));
    } else {
      console.log(chalk.red('Note not found!'));
    }
}

// save notes to the store JSON file
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("store.json", dataJSON);
};

// load notes from the store JSON file
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("store.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// export functions
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  removeAllNotes: removeAllNotes,
  listTitles: listTitles,
  listNotes: listNotes,
  readNote: readNote
};
