#!/usr/bin/env node
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.version('1.0.0');

// write commands for the operations
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
        
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
});

yargs.command({
    command: 'remove-all',
    describe: 'Remove all the notes',
    handler() {
        notes.removeAllNotes()
    }
});

yargs.command({
    command: 'list-titles',
    describe: 'List all notes\' titles',
    handler() {
        notes.listTitles();
    }
});

yargs.command({
    command: 'list-all',
    describe: 'List all notes',
    handler() {
        notes.listNotes();
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});

yargs.parse();