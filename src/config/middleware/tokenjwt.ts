import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret: any = process.env.SECRET;


async function createTokenJwt(datos : any) {
  try {
if(datos){
      const {
        id: sub,
        rol,
        permisos,
        name,
      } = {
        id: datos.id,
        rol: datos.rol,
        permisos: datos.permisos,
        name: datos.nombre,
      };
     const token = jwt.sign(
        {
          sub,
          rol,
          permisos,
          name,
          exp: Date.now() + 60 * 1000,
        },
        secret
      );

      return token;
      }
  } catch (error) {
    console.error(error);
    return { error: "error al crear el token" };
  }
}

function verifyToken(authorization:any) {
  try {

    const token = authorization.split(" ")[1];
    if(authorization){
    const payload = jwt.verify(token, secret);
    if (typeof payload === "object" && payload.exp) {
      if (Date.now() > payload.exp) {
        return { error: "token expirado" };
      } else {
        return payload;
      }
    } else {
      console.error("no se encuentra la expiracion del token");
      return { error: "propiedad expiracion no encontrada" };
    }
  }else{
    return {error: "No autorizado"}
  }
  } catch (error) {
    console.error(error);
    return { error: "error al verificar el token" };
  }
}
//funcion para verificar el token y al mismo tiempo si tiene los permisos requeridos para otorgar ciertos permisos
function checkpermissions(authorization:any, requiredPermission:number){
  const resultado = verifyToken(authorization);
  if(resultado.error){
    return resultado.error;
  }else{
    if(resultado.permisos && resultado.permisos.includes(requiredPermission)){
        return true;
    }else{
      return {mensaje: "No autorizado"};
    }
  }

}
export default { createTokenJwt, verifyToken,checkpermissions };
