
function decodeJsonData(data: any) {
  try {
    //Esta funcion se encarga de decodificar los datos entregados y devolverlos como un json
    if (data) {
      data = Buffer.from(data.data, "base64").toString("utf-8");
      data = JSON.parse(data);
      return data;
    } else {
      return { error: "No se encuentran datos para decodificar" };
    }
  } catch (error) {
    console.error("Error al decodificar JSON:", error);
    return { error: "Error de decodificacion de datos" };
  }
}

export default decodeJsonData;
