import path from "path";
import fs from "fs";
import morgan from "morgan";
const logsFallos = path.join(__dirname, "logsSinAutorizacion");
//obtiene la fecha para generar un archivo de logs del dia que surgieron los errores
const obtenerFechaFormateada = () => {
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const noautorizados = path.join(
  logsFallos,
  `Noautorizado_${obtenerFechaFormateada()}.log`
);

//Esta funcion crea un directorio de logs que se genera solo cuando se lanza un codigo de error
const crearDirectorioYArchivoLogs = () => {
  if (!fs.existsSync(logsFallos)) {
    fs.mkdirSync(logsFallos);
  }
  const logStream = fs.createWriteStream(noautorizados, { flags: "a" });
  logStream.on("error", (err) => {
    console.error("Error al escribir en el archivo de log:", err);
  });

  return logStream;
};
//esta funcion define el mensaje que se genera dentro del archivo .log
export const loggerMiddleware = morgan(
  "common",
  {
    skip: (_req, res) => res.statusCode < 400,
    stream: {
      write: (message: string) => crearDirectorioYArchivoLogs().write(message),
    } as morgan.StreamOptions,
  }
);

export default { loggerMiddleware, crearDirectorioYArchivoLogs };
