#!/usr/bin/env node
const yargs = require('yargs');
const operations = require('./operations.js');

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
        operations.addNote(argv.title, argv.body);
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
        operations.removeNote(argv.title)
    }
});

yargs.command({
    command: 'remove-all',
    describe: 'Remove all the notes',
    handler() {
        operations.removeAllNotes()
    }
});

yargs.command({
    command: 'list-titles',
    describe: 'List all notes\' titles',
    handler() {
        operations.listTitles();
    }
});

yargs.command({
    command: 'list-all',
    describe: 'List all notes',
    handler() {
        operations.listNotes();
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
        operations.readNote(argv.title);
    }
});

yargs.parse();