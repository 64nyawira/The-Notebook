import { notebook } from "../interface/notebook.interface";
import {v4} from 'uuid'

let Notebooks:notebook[]=[]

export class notebookService{
    createNote( note:notebook){
        let newNote={
            id:v4(),
            title:note.title,
            content:note.content,
            createdAt:note.createdAt
        }

        if(newNote.title && newNote.content && newNote.createdAt){
            Notebooks.push(newNote);
            return newNote
        }else{
            return "notebook was not created"
        }
         
    }

    updateNote(note_id:string,note:notebook){
        let notebook_index=Notebooks.findIndex(notess=>{
            return notess.id == note_id
        })

        let existing_details= this.fetchOnenote(note_id)

        let notebook={
            id:Notebooks[notebook_index].id,
            title:note.title,
            createdAt:note.createdAt
        }
        if(notebook_index <0){
            return "notebook not found"
        }else{
            Notebooks.splice(notebook_index,1, note)

            return notebook
        }
          
        
    }

    fetchNote(){
        return Notebooks
    }

    
    fetchOnenote(note_id:string){
        let notebook= Notebooks.filter(note => note_id)
        if(notebook.length == 0){
            return "no notebook found"
        }else{
            return notebook
        }
        
    }

    
    deleNote(note_id:string){
        let notebook_index=Notebooks.findIndex(notess=>{
            return notess.id == note_id
        })
        if(notebook_index <0){
            return "notebook not found"
        }else{
            Notebooks.splice(notebook_index,1)
            return "notebook deleted successfully"
        }
       
    }
}
