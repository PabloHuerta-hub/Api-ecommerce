import dotenv from "dotenv";
import "reflect-metadata";
dotenv.config();
const puerto = process.env.PUERTO;
import app from "./config/middleware/middleware";
import { AppDataSource } from "./config/databaseConfig/db";
import productos from "./config/routes/productos";
import usuario from "./config/routes/usuario"
async function main() {
  try {
    await AppDataSource.initialize();
    app.use("/login/", usuario)
    app.use("/tienda/", productos);
   
    app.listen(puerto, () => {
      console.log(`Servidor iniciado`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
