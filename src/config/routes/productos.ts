import express from "express";
import productosController from "../controllers/productos/productosController";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();
import tokenjwt from "../middleware/tokenjwt";
router.get("/productos", productosController.visualizarProductos);

router.get("/producto/:id", async(req,res)=>{
  productosController.productoPorId(req,res)
})

router.post("/ingresar_producto", async (req, res) => {
  try {
    const requiredPermission = 1;
    const authorization = req.headers.authorization;
    const resultado = tokenjwt.verifyToken(authorization);
    if (resultado.error) {
      res.status(401).send(resultado.error);
    } else {
      if (
        resultado.permisos &&
        resultado.permisos.includes(requiredPermission)
      ) {
         await productosController.ingresarProducto(res, req);
        
      } else {
        res.status(401).send("permisos no validos");
      }
    }
  } catch (error) {
    console.error(error);
  }
});

router.delete("/borrar_producto/:id", async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    const requiredPermission = 2;
    const resultado = tokenjwt.verifyToken(authorization);
    if (resultado.error) {
      res.status(401).send(resultado.error);
    } else {
      if (
        resultado.permisos &&
        resultado.permisos.includes(requiredPermission)
      ) {
          productosController.borrarProducto(req, res);
      } else {
        res.status(401).send("permisos no validos");
      }
    }
  } catch (error) {
    console.error(error);
  }
});

router.put("/actualizar_producto", async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    const requiredPermission = 3;
    const resultado = tokenjwt.checkpermissions(authorization, requiredPermission);
    if(resultado){
      await productosController.actualizarProducto(req,res);
      
    }else{
     
    }
    
  } catch (error) {
    console.error(error);
  }
});

export default router;
