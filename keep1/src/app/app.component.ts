import { Component, OnInit } from '@angular/core';

import { Note } from './note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  errMessage: string;
  note: Note = new Note();
  noteList: Array<Note>;

  constructor(private notesService: NotesService) {
    
  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(response => {
      if(response) {
        this.noteList = response;
        console.log("Notes List ", this.noteList);
      } else {
        this.errMessage = "We are unable to retreive notes list.";
      }
    }, error => {
      this.errMessage = "We are unable to retreive notes list.";
    });
  }

  addNote() {
    console.log("Note ", this.note);
    this.notesService.addNote(this.note).subscribe(response => {
      if(response) {
        this.noteList.push(this.note);
        this.note = new Note();
        console.log("Notes List ", this.noteList);
      } else {
        this.errMessage = "We are unable to add the selected note.";
      }
    });
  }
}
