import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Getor de opiniones",
            version: "1.0.0",
            description: "API para un sistema de gestión opiniones",
            contact:{
                name: "Urias Rivas",
                email: "durias-2020292@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/coperex/v1"
            }
        ]
    },
    apis:[
        "./src/auth/aut.routes.js",
        "./src/usuario/usuario.routes.js",
        "./src/compañia/compañia.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}