import express from "express";
import usuariosController from "../controllers/usuarios/usuariosController";
const router = express.Router();

//solo una funcion de prueba para visualizar los usuarios y sus relaciones como un json
router.get("/",async(req,res)=>{
    usuariosController.LoginUsuario(req,res)
} 
)


export default router;