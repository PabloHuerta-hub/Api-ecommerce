import decodeJsonData from "../../middleware/decodeJsonData";
import { Usuarios } from "../../entities/users/Usuarios";
import { Response, Request } from "express";
import { AppDataSource } from "../../databaseConfig/db";
import tokenjwt from "../../middleware/tokenjwt";
async function LoginUsuario(req: Request, res: Response) {
    try {
    let data = req.body

    if(data){
        data = decodeJsonData(data)
        const userRepository = AppDataSource.getRepository(Usuarios);
        const usuario = await userRepository.findOne({
            where:{correo: data.correo, contraseña: data.contraseña, activo: true}
        });
        if(!usuario){
            res.status(401).json({message: "usuario no encontrado"})
            return undefined
        }else{
            const token =await tokenjwt.createTokenJwt(usuario)
            res.status(200).json({usuario,token})
        }

    }else{
        res.status(404).send("No se encontraron datos")
        return undefined
    }
    
    } catch (error) {
      console.error("Error al buscar usuario", error);
      res.status(500).send("Error al buscar usuario")
      return undefined
    }
  }

export default {LoginUsuario}