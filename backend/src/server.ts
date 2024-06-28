import { json } from 'body-parser'
import express, { NextFunction, Request, Response } from 'express'
import notrRouter from './router/notebook.router'

let app = express()

app.use(json())
app.use('/notes',notrRouter)
app.use((err:Error,req:Request,res:Response, next:NextFunction)=>{
    res.json({
        message:err.message
    })
})
let PORT= 5203

app.listen(5203,()=>{
    console.log('server is running');
    
})