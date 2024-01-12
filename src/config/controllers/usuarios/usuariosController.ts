import { Response,Request } from "express";
import usuarioService from "../../services/usuarios/usuarioService";


async function LoginUsuarioHandler(req: Request, res: Response) {
    try {
      let data = req.body;
      const response = await usuarioService.LoginUsuario(data);
      res.status(response?.status ?? 404).json(response?.mensaje ?? response?.respuesta);
    } catch (error) {
      console.error("Error en el manejador LoginUsuarioHandler", error);
      res.status(500).json("Error externo");
    }
  }
export default {LoginUsuarioHandler}