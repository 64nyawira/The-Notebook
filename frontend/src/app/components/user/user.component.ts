import { Component ,OnInit} from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { NotesComponent } from '../notes/notes.component';
import { RouterLink } from '@angular/router';
import { NoteService } from '../../note.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReverseStringPipe } from '../../reverse-string.pipe';


@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    imports: [NotesComponent,RouterLink,FormsModule,CommonModule,ReverseStringPipe]
})
export class UserComponent implements OnInit {
    notes:{title:string,content:string}[]=[];

    constructor(private noteService:NoteService,private router:Router){ }


    ngOnInit(): void {
        this.notes=this.noteService.getNotes();
    }

    editNote(index:number){
        this.router.navigate(['/notes'], { queryParams: { index } });
    }

    deleteNote(index:number){
        this.noteService.deleteNote(index);
        this.notes=this.noteService.getNotes();
    }
}
