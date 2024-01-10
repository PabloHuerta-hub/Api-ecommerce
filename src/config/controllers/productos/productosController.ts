import { Response, Request } from "express";
import { Productos } from "../../entities/productos/Productos";
import { AppDataSource } from "../../databaseConfig/db";
import decodeJsonData from "../../middleware/decodeJsonData";

//Obtiene todos los productos que se encuentran en la base de datos, imagenUrl queda descartado hasta agregar un gestor de blobs 
async function visualizarProductos(_req: Request, res: Response) {
  try {
    const productRepo = AppDataSource.getRepository(Productos);
    const products = await productRepo.find({
      select: {
        productoID: true,
        nombre: true,
        descripcion: true,
        precio: true,
        stock: true,
        categoria: true,
        marca: true,
        fecha_creacion: false,
        activo: true,
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
}

// muestra un producto que tenga la misma id que se envio
async function productoPorId( req: Request, res:Response){
  try {
    const id: any = req.params.id
    const productoRepo = AppDataSource.getRepository(Productos);
    const product = await productoRepo.findOne({
      select:{
        fecha_creacion:false,
        imagenUrl:false
      },
      where:{productoID : id}},)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener producto" });
    console.error("Error al obtener producto: ", error);
  }
}

//Ingresa un producto, si encuentra un producto que tenga muchos campos iguales, agrega un stock al producto existente
async function ingresarProducto( res:Response,req:Request) {
  try {
    let data = req.body
    if (data) {
      data = decodeJsonData(data)
      const productoExistente = await AppDataSource.getRepository(
        Productos
      ).findOne({
        where: {
          descripcion: data.descripcion,
          nombre: data.nombre,
          categoria: data.categoria,
          marca: data.marca,
        },
      });

      if (productoExistente) {
        productoExistente.stock += 1;
        await AppDataSource.getRepository(Productos).save(productoExistente);
        res.status(200).send("Se agrego stock al producto")
      } else {
        const producto = data;
        await AppDataSource.getRepository(Productos).save(producto);
        res.status(200).send("se agrego exitosamente")
      }
    } else {
      res.status(400).send("no se encontraron datos")
    }
  } catch (error) {
    console.error("Error al ingresar productos:", error);
  }
}

//Borra un producto que sea igual a la id que se envio
async function borrarProducto( req: Request, res:Response) {
  try {
    const id: any= req.params.id
    if (id) {
      const productoExistente = await AppDataSource.getRepository(
        Productos
      ).findOne({
        where: {
          productoID: id,
        },
      });

      if (productoExistente) {
        await AppDataSource.createQueryBuilder()
          .delete()
          .from(Productos)
          .where("productoID = :id", { id: id })
          .execute();
          res.status(200).send("Se borro el producto")
      }
    } else {
      res.status(404).send("No se encontraron la id")
    }
  } catch (error) {
    console.error("Error al borrar productos:", error);
    res.status(500).send("problemas de api")
  }
}


//Compara la id del body para actualizar un producto y si no lo encuentra procede a ingresarlo para verificar si existe o revisa con ingresar producto
async function actualizarProducto(req:Request,res:Response) {
  try {
    let data = req.body;
    data = decodeJsonData(data)
    if (data) {
      const productoExistente = await AppDataSource.getRepository(
        Productos
      ).findOne({
        where: {
          productoID: data.id,
        },
      });
      if (productoExistente) {
        AppDataSource.createQueryBuilder()
          .update(Productos)
          .set({
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            stock: data.stock,
            categoria: data.categoria,
            marca: data.marca,
            fecha_creacion: data.fecha_creacion,
            imagenUrl: data.imagen,
            activo: data.activo,
          })
          .where("productoID=:id", { id: data.id })
          .execute();
          res.status(200).json("Se actualizo el producto")
      }else{
         ingresarProducto(res,req)
      }
    } else {
      res.status(404).json("No se encontraron datos")
    }
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return { mensaje: "problemas de api" };
  }
}
export default {
  visualizarProductos,
  ingresarProducto,
  borrarProducto,
  actualizarProducto,
  productoPorId
};
