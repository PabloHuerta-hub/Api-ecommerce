import { DataSource } from "typeorm";

import dotenv from "dotenv";
dotenv.config();
import { Usuarios } from "../entities/users/Usuarios";
import { Productos } from "../entities/productos/Productos";
import { Rol } from "../entities/roles/Rol";
import { Direccion } from "../entities/direccion/Direccion";
import { Region } from "../entities/direccion/Region";
export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.HOST,
  port: 1433,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: false,// Muestra la query que se ejecuta hacia la base de datos
  entities: [Usuarios, Productos,Rol, Direccion,Region],
  subscribers: [],
  migrations: [],
  options: {
    encrypt: false,
  },
});
