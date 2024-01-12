import { Productos } from "../../entities/productos/Productos";
import { AppDataSource } from "../../databaseConfig/db";
import tokenjwt from "../../middleware/tokenjwt";
//Obtiene todos los productos que se encuentran en la base de datos, imagenUrl queda descartado hasta agregar un gestor de blobs 
async function visualizarProductos() {
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
    if(!products){
      return{status:404,products}
    }
    return{status:200,products}
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return {status:500,mensaje: "Error de api"}
  }
}

// muestra un producto que tenga la misma id que se envio
async function productoPorId( id:number){
  try {
    const productoRepo = AppDataSource.getRepository(Productos);
    const product = await productoRepo.findOne({
      select:{
        fecha_creacion:false,
        imagenUrl:false
      },
      where:{productoID : id}},)
    if(!product){

      return {status:404, product}
    }else{
      
      return {status:200, product}
    }
   
  } catch (error) {
    console.error("Error al obtener producto: ", error);
    return {status:500,mensaje: "Error de api"}
  }
}

//Ingresa un producto, si encuentra un producto que tenga muchos campos iguales, agrega un stock al producto existente
async function ingresarProducto( data:any, requiredPermission:any, authorization:any) {
  try {
    const resultado = tokenjwt.verifyToken(authorization);
      if (resultado.error) {
        return {status: 401, mensaje: resultado.error}
      } else {
        if (
          resultado.permisos &&
          resultado.permisos.includes(requiredPermission)
        ) {
          if (data.error) {
            return {status: 404,mensaje: "no se entregaron datos"}
          } else {
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
              return {status: 200,mensaje: "Se agrego un producto al stock"}
            } else {
              const producto = data;
              await AppDataSource.getRepository(Productos).save(producto);
              return {status: 200,mensaje:"se agrego un nuevo producto"}
            }
            
          }
        } else {
         return {status: 401,mensaje: "permisos invalidos"}
        }
      }
 
  } catch (error) {
    console.error("Error al ingresar productos:", error);
    return {status:500,mensaje: "Error de api"}
  }
}

//Borra un producto que sea igual a la id que se envio
async function borrarProducto( id:any,requiredPermission:any, authorization:any) {
  try {
    const resultado = tokenjwt.verifyToken(authorization);
      if (resultado.error) {
        return {status: 401, mensaje: resultado.error}
      } else {
        if (
          resultado.permisos &&
          resultado.permisos.includes(requiredPermission)
        ) {
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
          return {status: 200, mensaje: "Se borro el producto"}
      }
    } else {
      return {status: 404, mensaje: "no se encontro la id"}
    }
  }
}
  } catch (error) {
    console.error("Error al borrar productos:", error);
    return {status:500,mensaje: "Error de api"}

  }
}


//Compara la id del body para actualizar un producto y si no lo encuentra procede a ingresarlo para verificar si existe o revisa con ingresar producto
async function actualizarProducto(data:any ,requiredPermission:any, authorization:any) {
  try {
    const resultado = tokenjwt.verifyToken(authorization);
    if (resultado.error) {
      return {status: 401, mensaje: resultado.error}
    } else {
      if (
        resultado.permisos &&
        resultado.permisos.includes(requiredPermission)
      ) {
    if (data.error) {
      return {status:404, mensaje: "no se encontraron datos" };
      
    } else {
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
          return {status:200,mensaje: "Se actualizo el producto"}
          
      }else{
         return {status:200, mensaje:"El producto no existe por favor ingresalo"}
      }
       
    }
  }
}
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return {status:500,mensaje: "Error de api"}
  }
}
export default {
  visualizarProductos,
  ingresarProducto,
  borrarProducto,
  actualizarProducto,
  productoPorId
};
