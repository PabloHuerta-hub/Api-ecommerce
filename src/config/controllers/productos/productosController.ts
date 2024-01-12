import { Response, Request } from "express";
import decodeJsonData from "../../middleware/decodeJsonData";
import productoService from "../../services/productos/productoService";
//Obtiene todos los productos que se encuentran en la base de datos, imagenUrl queda descartado hasta agregar un gestor de blobs 
async function visualizarProductos(_req: Request, res: Response) {
 try {
  const productos = await productoService.visualizarProductos()
  res.status(200).json(productos)
 } catch (error) {
  res.status(500).json("error externo")
 }

}

// muestra un producto que tenga la misma id que se envio
async function productoPorId( req: Request, res:Response){
  try {
    const id: any = req.params.id
    const response = await productoService.productoPorId(id)  
    
    res.status(response?.status ?? 404).json(response?.product ?? response.mensaje ?? {})
  } catch (error) {
    res.status(500).json({ error: "Error al obtener producto" });
    console.error("Error al obtener producto: ", error);
  }
}

//Ingresa un producto, si encuentra un producto que tenga muchos campos iguales, agrega un stock al producto existente
async function ingresarProducto(req:Request, res:Response) {
  try {
    try {
      let data = req.body
      const requiredPermission = 1;
      const authorization = req.headers.authorization;
      data = decodeJsonData(data)
      const response =  await productoService.ingresarProducto(data, requiredPermission,authorization);
      
      res.status(response.status).json(response.mensaje)
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error("Error al ingresar productos:", error);
  }
}

async function borrarProducto( req: Request, res:Response) {
  try {
    const id = req.params.id
    const authorization = req.headers.authorization;
    const requiredPermission = 2;
    const response = await productoService.borrarProducto(id,requiredPermission ,authorization)
    res.status(response?.status ?? 500).json(response?.mensaje ?? "")
  } catch (error) {
    console.error("Error al borrar productos:", error);
    res.status(500).send("problemas de api")
  }
}



async function actualizarProducto(req:Request,res:Response) {
  try {
    let data = req.body;
    const authorization = req.headers.authorization;
    const requiredPermission = 3;
    data = decodeJsonData(data)
    const response = await productoService.actualizarProducto(data,requiredPermission ,authorization)
    res.status(response?.status ?? 500).json(response?.mensaje ?? "")
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).send("problemas de api")
  }
}
export default {
  visualizarProductos,
  ingresarProducto,
  borrarProducto,
  actualizarProducto,
  productoPorId
};
