import decodeJsonData from "../../middleware/decodeJsonData";
import { Usuarios } from "../../entities/users/Usuarios";
import { AppDataSource } from "../../databaseConfig/db";
import tokenjwt from "../../middleware/tokenjwt";
async function LoginUsuario(data: any) {
    try {    
        data = decodeJsonData(data);
        if(data.error){
            return { status: 404, mensaje: "No se encontraron datos" };
        }else{
        const userRepository = AppDataSource.getRepository(Usuarios);
        const usuario = await userRepository.findOne({
          relations: ["rol", "rol.permisos_por_rol", "rol.permisos_por_rol.permiso"],
          where: { correo: data.correo, contraseña: data.contraseña, activo: true },
        });
        if (!usuario) {
          return { status: 404, mensaje: "No se encontró ningún usuario" };
        } else {
          const usuarioJson = {
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            contraseña: usuario.contraseña,
            rut: usuario.rut,
            activo: usuario.activo,
            rol: usuario.rol.rol,
            permisos: {},
          };
          const idPermisosArray: number[] = [];
  
          usuario.rol.permisos_por_rol.forEach((permisoPorRol) => {
            idPermisosArray.push(permisoPorRol.permiso.id_permiso);
          });
          usuarioJson.permisos = idPermisosArray;
  
          const token = await tokenjwt.createTokenJwt(usuarioJson);
          return { status: 200, respuesta: { usuarioJson, token } };
        }
      }
    
    } catch (error) {
      console.error("Error al buscar usuario", error);
      return { status: 500, mensaje: "Error al buscar usuario" };
    }
  }
  

export default {LoginUsuario}