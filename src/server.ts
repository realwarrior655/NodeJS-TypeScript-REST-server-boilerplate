import express, { type Application } from "express";
import cors from "cors";
import { dbConnection } from "./database/config";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

class Server {
  // 1. Declaración de propiedades con su tipo
  private app: Application;
  private port: string | undefined;
  private apiPaths = {
    users: "/api/users",
    courses: "/api/courses",
    routines: "/api/routines",
    auth: "/api/auth",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    // Métodos iniciales
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    // Aquí conectaremos la DB luego
    dbConnection();
    console.log("Conectando a la Base de Datos...");
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura del body
    this.app.use(express.json());

    // Carpeta pública
    this.app.use(express.static("public"));
  }

  routes() {
    //Ruta de Auth de login
    this.app.use(this.apiPaths.auth, authRoutes);
    // Aquí definiremos las rutas de usuario
    this.app.use(this.apiPaths.users, userRoutes);

    // Ruta de prueba
    this.app.get("/", (req, res) => {
      res.json({ msg: "API Calistenia con TS funcionando" });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}

export default Server;
