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
 productosController.ingresarProducto(req,res)
});

router.delete("/borrar_producto/:id", async (req, res) => {
  productosController.borrarProducto(req,res)
});

router.put("/actualizar_producto", async (req, res) => {

    productosController.actualizarProducto(req,res);
      
});

export default router;
