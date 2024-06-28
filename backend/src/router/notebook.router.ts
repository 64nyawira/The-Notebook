import {Router} from 'express'
import { addNote, deleteNote, getAllNotes, getonenote, updateNote } from '../controller/notebook.controller'
import { pathToFileURL } from 'url'

let noteRouter= Router()

noteRouter.post('/create-new',addNote)
noteRouter.get('/all',getAllNotes)
noteRouter.put('/update/:note_id',updateNote)
noteRouter.get('/:note_id',getonenote)
noteRouter.delete('/delete/:note_id',deleteNote)

export default noteRouter