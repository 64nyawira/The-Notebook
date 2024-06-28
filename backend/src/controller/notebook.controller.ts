import { Request, Response } from "express-serve-static-core";
import { notebookService } from "../service/notebook.service";
import { error } from "console";


let noteService= new notebookService()

let addNote =async(req:Request,res:Response)=>{
    try {
        let { title,content,createdAt}=req.body

        let response= noteService.createNote(req.body)

        if(typeof(response)== "string"){
            return res.json({error:response}) 
        }else{
            return res.json({notebook:response})
        }
        
    } catch (error) {
        return res.json ({
            error:error
        })
        
    }

}
let getAllNotes = (req:Request,res:Response)=>{
    try {
        let notebooks = noteService.fetchNote()
        return res.status(201).json({
            notebooks
        })
        
    } catch (error) {
        return res.json({
            error:error
        })
    }
   
}

export function getonenote(req:Request,res:Response){
    try {
        let note_id= req.params.note_id

        let response= noteService.fetchOnenote(note_id)

        if (typeof response== "string"){
            return res.status(4040).json({error:response})
        }else{
            return res.status(201).json({notebook:response})
        }

    } catch (error) {
        return res.json({
            error:error
    })
    }
}

export function deleteNote(req:Request,res:Response){
    try {
        let note_id=req.params.note_id;

        let response = noteService.deleNote(note_id)
        return res.json({response})
    } catch (error) {
        return res.json({
            error:error
    })
    }
}

export function updateNote(req:Request,res:Response){
    try {
        let note_id=req.params.note_id;

        let {title,content,createdAt}= req.body
        let notebook={
            id:note_id,
            title,
            content,createdAt
        }

        let response = noteService.updateNote(note_id,notebook)

        if(typeof response =="string"){
            return res.json(response)
        }else{
            return res.json({message:"updated successfully"})
        }
    } catch (error) {
        return res.json({
            error:error
    })
    }
}

export{
    addNote,
    getAllNotes
}