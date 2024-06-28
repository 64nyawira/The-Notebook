
import { Component,OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../../note.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {
  title:string="";
  content:string="";
  noteIndex:number | null=null;
  // [x: string]: any;
  // editMode = false;
  // textValue = '';

  constructor(
    private notesService:NoteService,
    private router:Router,
    private route: ActivatedRoute
  ){} 

  ngOnInit():void{
    this.route.queryParams.subscribe(params => {
      if (params['index'] !== undefined) {
        this.noteIndex = +params['index'];
        const note = this.notesService.getNoteByIndex(this.noteIndex);
        this.title = note.title;
        this.content = note.content;
      }
    });
  }

  saveNote(){
    if(this.noteIndex !== null){
      this.notesService.updateNote(this.noteIndex,{ title:this.title,content:this.content});

    }else{
      this.notesService.addNote({
        title:this.title,
        content:this.content
      });
    }
    
    this.router.navigate(['/user']);
  }

}
