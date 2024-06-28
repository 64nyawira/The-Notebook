import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private noteskey='notes';

  constructor(){
    const savedNotes=localStorage.getItem(this.noteskey)
    if(savedNotes){
      this.notes =JSON.parse(savedNotes)
    }
  }

  private notes:{title:string,content:string}[]=[]

  addNote(note:{title:string,content:string}){
    this.notes.push(note)
    this.saveNotes();
  }

  getNotes(){
    return this.notes;
  }

  getNoteByIndex(index: number) {
    return this.notes[index];
  }

  updateNote(index:number, note:{title:string,content:string}){
    this.notes[index]=note;
    this.saveNotes();
  }

  deleteNote(index:number){
    this.notes.splice(index,1);
    this.saveNotes();
  }

  private saveNotes (){
    localStorage.setItem(this.noteskey,JSON.stringify(this.notes));
  }
  
}
