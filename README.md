

# Basic-Product-Api

Este proyecto presenta una API básica desarrollada en Node.js y utiliza TypeORM, ideal para su implementación en proyectos pequeños o con fines prácticos. La autenticación se realiza mediante tokens JWT, y se recomienda que los datos se cifren en base64 antes de ser enviados.

# Características Principales
- Desarrollado en Node.js
- Utiliza TypeORM para la gestión de la base de datos
- Autenticación mediante tokens JWT
- Recomendación de cifrado en base64 para los datos antes de enviarlos
- La base de datos que se utiliza es Microsoft SQL Server

# Instrucciones de uso
1. clonar el repositorio:  `git clone https://github.com/PabloHuerta-hub/Api-ecommerce.git`
1. Instalar dependencias:  `npm install`
1. Crear archivo .env 
1. Ejecutar:  `npm run dev` para desarrollo y  `npm start` para correr la build

# Archivo .env
Los datos que debe contener este archivo son
- SECRET 
- PUERTO 
- HOST
- PASSWORD
- USER
- DATABASE 
Se recomienda escribir las variables de .env igual que como estan escritas acá para evitar problemas

# Contribución
Cualquier tipo de consejo o cambio que se deba agregar a la api será bien recibido para poder mejorar el codigo ya hecho ya que el proyecto se encuentra en desarrollo para mejorar mis habilidades en Node.js

# Endpoints 
## Endpoints publicos
-`/login` esta ruta se encarga de recibir datos de usuario y devolver un token para tener acceso a las rutas privadas, tambien devuelve los datos del usuario para guardarlos en el frontend, se adjunta un ejemplo
![image](https://github.com/PabloHuerta-hub/Api-ecommerce/assets/80712261/cab6d74b-f1fc-4dc0-a426-6f4b6941b01c)

-`/productos` esta ruta devuelve un json con todos los productos que hay en la base de datos

-`/producto/:id` esta ruta devuelve el producto que calce con la id entregada
## Endpoints privados(necesitan un token jwt y permisos especificos)
- `/ingresar_producto` esta ruta permite ingresar productos a la base de datos y si el producto ya existe sumara un 1 al stock del producto
- `/borrar_producto/:id` esta ruta permite borrar el producto que calce con la id entregada
- `/actualizar_producto` esta ruta actualiza el producto que calce con la id entregada en el body y si no existe procedera a usar la funcion de ingresar_producto

## Como enviar los datos 
- Como se dijo antes se usa base64 para encriptar los datos, esto es igual para todas las rutas, en caso de las rutas CRUD de productos que soliciten los datos desde el body (ingresar y actualizar) se ingresaran de la siguiente manera
![image](https://github.com/PabloHuerta-hub/Api-ecommerce/assets/80712261/20c4e5c8-91ab-42dc-8b29-8bee9c47acc5)

Y el json antes de ser encriptado es algo tal que asi:
`{
"id": "5000",
"nombre": "Prueba ",
"descripcion":"testeo",
"precio": 1000,
"stock": 9,
"categoria": "Electrónica",
"marca": "samsung",
"activo": 0
}`
- Para las otras rutas como login los datos deben ser ingresados de la misma manera 
![image](https://github.com/PabloHuerta-hub/Api-ecommerce/assets/80712261/0b004d71-cc92-4d47-aad0-0e9fdd82e84b)

y el json debe verse de la siguiente manera:
`
{
"contraseña": "test" ,
"correo":"test@test.com"
}
`
- El caso es contrario para las rutas que utilizan id ya que estas solo necesitaran la id del producto al que desean llegar

