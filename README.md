# 🚀 Calistenia API - REST API Boilerplate

API REST profesional con Node.js, TypeScript, Express y MongoDB. Arquitectura MVC escalable con autenticación JWT y control de acceso por roles.

---

## 📋 Tabla de Contenidos

1. [Quick Start](#quick-start)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Flujo MVC](#flujo-mvc)
4. [Agregar Nueva Entidad](#agregar-nueva-entidad)
5. [Endpoints](#endpoints)
6. [Variables de Entorno](#variables-de-entorno)
7. [Stack Tecnológico](#stack-tecnológico)

---

## ⚡ Quick Start

### Requisitos Mínimos

- Node.js v16+
- MongoDB (local o Atlas)

### Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo .env en la raíz
PORT=8000
MONGODB_CNN=mongodb://localhost:27017/calistenia-db
SECRET_KEY_JWT=tu_clave_secreta_muy_segura
NODE_ENV=development

# 3. Ejecutar en desarrollo
npm run dev
```

**Resultado esperado:**

```
Conectando a la Base de Datos...
Base de datos online
🚀 Servidor corriendo en puerto 8000
```

---

## 📁 Estructura del Proyecto

```
src/
├── index.ts                              # Punto de entrada
├── server.ts                             # Configuración Express y rutas
├── interfaces/                           # Tipos TypeScript
│   ├── Create_IUsers.ts
│   └── Create_ICourses.ts
├── models/                               # Esquemas Mongoose
│   ├── user.model.ts
│   └── course.model.ts
├── controllers/                          # Lógica de negocio
│   ├── auth.controller.ts
│   ├── user.controller.ts
│   └── course.controller.ts
├── routes/                               # Definición de endpoints
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   └── course.routes.ts
├── middlewares/                          # Funciones intermedias
│   ├── validar-jwt.ts                    # Valida tokens JWT
│   ├── validar-admin.ts                  # Verifica rol ADMIN
│   └── validar-campos.ts                 # Valida datos con express-validator
├── helpers/
│   └── create_JWT.ts                     # Genera tokens JWT
└── database/
    └── config.ts                         # Conexión a MongoDB
```

---

## 🏗️ Flujo MVC

Toda solicitud HTTP sigue este flujo:

```
Cliente
  ↓
ROUTES (Express router)
  ├─ Valida parámetros de entrada
  ├─ Aplica middlewares (JWT, roles, campos)
  └─ Llama al controlador
  ↓
MIDDLEWARE (funciones intermedias)
  ├─ validar-jwt: Autentica si el token es válido
  ├─ validar-admin: Verifica si el usuario tiene rol ADMIN
  └─ validar-campos: Valida datos de entrada
  ↓
CONTROLLER (lógica de negocio)
  ├─ Procesa datos
  ├─ Interactúa con modelos
  └─ Retorna respuesta
  ↓
MODEL (Mongoose)
  ├─ Esquema de datos
  ├─ Validaciones de BD
  └─ Operaciones CRUD
  ↓
Respuesta JSON
```

### Ejemplo Real: Crear un Usuario

```
POST /api/users
Body: { "name": "Juan", "email": "juan@mail.com", "password": "123456", "rol": "USER_ROLE" }

1. routes/user.routes.ts
   - Valida: nombre no vacío
   - Valida: email válido
   - Valida: password >= 6 caracteres
   - Ejecuta: validarCampos (middleware)

2. controllers/user.controller.ts → postUser()
   - Encripta contraseña con bcryptjs
   - Crea documento de usuario
   - Guarda en BD

3. Response 201 Created
   { "msg": "Usuario creado correctamente", "user": {...} }
```

---

## ✅ Agregar Nueva Entidad

Para agregar una nueva entidad (ej: `Routines`), sigue estos 5 pasos:

### 1️⃣ Crear Interfaz

**Archivo:** `src/interfaces/Create_IRoutines.ts`

```typescript
export interface Create_Routine {
  title: string;
  description: string;
  duration: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  status: boolean;
}
```

### 2️⃣ Crear Modelo

**Archivo:** `src/models/routine.model.ts`

```typescript
import { Schema, model } from "mongoose";
import { Create_Routine } from "../interfaces/Create_IRoutines";

const RoutineSchema = new Schema<Create_Routine>({
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  duration: {
    type: Number,
    required: [true, "La duración es obligatoria"],
  },
  difficulty: {
    type: String,
    enum: ["EASY", "MEDIUM", "HARD"],
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

RoutineSchema.methods.toJSON = function () {
  const { __v, _id, ...routine } = this.toObject();
  routine.id = _id;
  return routine;
};

const RoutineModel = model<Create_Routine>("Routine", RoutineSchema);
export default RoutineModel;
```

### 3️⃣ Crear Controlador

**Archivo:** `src/controllers/routine.controller.ts`

```typescript
import { Request, Response } from "express";
import RoutineModel from "../models/routine.model";

export const getRoutines = async (req: Request, res: Response) => {
  try {
    const routines = await RoutineModel.find();
    res.json({ routines });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener rutinas" });
  }
};

export const postRoutine = async (req: Request, res: Response) => {
  try {
    const { title, description, duration, difficulty } = req.body;
    const routine = new RoutineModel({
      title,
      description,
      duration,
      difficulty,
    });
    await routine.save();
    res.status(201).json({ msg: "Rutina creada", routine });
  } catch (error) {
    res.status(400).json({ error: "Error al crear rutina" });
  }
};

export const putRoutine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const routine = await RoutineModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ msg: "Rutina actualizada", routine });
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar" });
  }
};

export const delRoutine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await RoutineModel.findByIdAndDelete(id);
    res.json({ msg: "Rutina eliminada" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar" });
  }
};
```

### 4️⃣ Crear Rutas

**Archivo:** `src/routes/routine.routes.ts`

```typescript
import { Router } from "express";
import { check } from "express-validator";
import {
  getRoutines,
  postRoutine,
  putRoutine,
  delRoutine,
} from "../controllers/routine.controller";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";
import { validarAdmin } from "../middlewares/validar-admin";

const router = Router();

// Cualquiera puede ver
router.get("/", getRoutines);

// Solo admins pueden crear, actualizar, eliminar
router.post(
  "/",
  validarJWT,
  validarAdmin,
  [check("title", "Título obligatorio").not().isEmpty()],
  validarCampos,
  postRoutine,
);

router.put("/:id", validarJWT, validarAdmin, putRoutine);
router.delete("/:id", validarJWT, validarAdmin, delRoutine);

export default router;
```

### 5️⃣ Registrar en Server

**Archivo:** `src/server.ts`

```typescript
import routineRoutes from "./routes/routine.routes";

class Server {
  private apiPaths = {
    users: "/api/users",
    courses: "/api/courses",
    routines: "/api/routines", // ← Agregar aquí
    auth: "/api/auth",
  };

  routes() {
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.users, userRoutes);
    this.app.use(this.apiPaths.courses, courseRoutes);
    this.app.use(this.apiPaths.routines, routineRoutes); // ← Agregar aquí
  }
}
```

**¡Listo!** Toda la entidad está funcionando.

---

## 📡 Endpoints Disponibles

### Autenticación

| Método | Endpoint          | Descripción    |
| ------ | ----------------- | -------------- |
| `POST` | `/api/auth/login` | Iniciar sesión |

### Usuarios

| Método   | Endpoint          | Descripción          | Requiere JWT |
| -------- | ----------------- | -------------------- | ------------ |
| `GET`    | `/api/users`      | Listar usuarios      | No           |
| `POST`   | `/api/users`      | Crear usuario        | No           |
| `PUT`    | `/api/users/:id`  | Actualizar usuario   | No           |
| `DELETE` | `/api/users/:id`  | Eliminar usuario     | No           |
| `DELETE` | `/api/users/self` | Auto-eliminar cuenta | **Sí**       |

### Cursos

| Método   | Endpoint           | Descripción      | Requiere JWT | Requiere ADMIN |
| -------- | ------------------ | ---------------- | ------------ | -------------- |
| `GET`    | `/api/courses`     | Listar cursos    | No           | No             |
| `POST`   | `/api/courses`     | Crear curso      | **Sí**       | **Sí**         |
| `PUT`    | `/api/courses/:id` | Actualizar curso | **Sí**       | **Sí**         |
| `DELETE` | `/api/courses/:id` | Eliminar curso   | **Sí**       | **Sí**         |

### Headers Requeridos

**Para endpoints con autenticación JWT:**

```
x-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🔑 Variables de Entorno

```env
# Puerto
PORT=8000

# Base de datos
MONGODB_CNN=mongodb://localhost:27017/calistenia-db

# JWT
SECRET_KEY_JWT=tu_clave_super_secreta_aqui

# Ambiente
NODE_ENV=development
```

**Para MongoDB remoto (Atlas):**

```env
MONGODB_CNN=mongodb+srv://usuario:contraseña@cluster.mongodb.net/calistenia-db
```

---

## 🛠️ Stack Tecnológico

| Tecnología            | Versión | Uso                  |
| --------------------- | ------- | -------------------- |
| **Node.js**           | 16+     | Runtime              |
| **TypeScript**        | 5.x     | Tipado estático      |
| **Express**           | 5.x     | Framework web        |
| **MongoDB**           | 5.x+    | Base de datos        |
| **Mongoose**          | 9.x     | ODM                  |
| **jsonwebtoken**      | 9.x     | Autenticación        |
| **bcryptjs**          | 3.x     | Hash de contraseñas  |
| **express-validator** | 7.x     | Validaciones         |
| **CORS**              | 2.x     | Control de orígenes  |
| **dotenv**            | 17.x    | Variables de entorno |

**DevDependencies principales:**

- `ts-node-dev` - Ejecutar TypeScript en desarrollo
- `@types/*` - Tipos de TypeScript

---

## 📜 Scripts npm

```bash
npm run dev       # Desarrollo con recarga automática
npm run build     # Compilar TypeScript
npm start         # Ejecutar compilado
npm test          # Tests (no configurado)
```

---

## 🔒 Seguridad Implementada

- ✅ JWT para autenticación stateless
- ✅ Hash de contraseñas con bcryptjs
- ✅ Validación de entrada con express-validator
- ✅ CORS configurado
- ✅ Middleware para validar roles (ADMIN_ROLE / USER_ROLE)
- ✅ Soft delete (estado de usuario en lugar de eliminar)

---

## 📝 Normas de Desarrollo

1. **Nombrado de archivos:**
   - Controllers, routes, models: `entidad.tipo.ts` (ej: `user.controller.ts`)
   - Interfaces: `Create_[Entidad].ts` (ej: `Create_IUsers.ts`)
   - Middlewares: `validar-[funcion].ts` (ej: `validar-admin.ts`)

2. **Estructura:**
   - Interfaz define tipos
   - Modelo define esquema
   - Controlador define lógica
   - Routes define endpoints

3. **Error handling:**
   - Siempre usar try-catch en controllers
   - Status codes correctos (201, 400, 401, 403, 500)
   - Mensajes de error descriptivos

4. **Middlewares:**
   - `validarJWT` → para rutas autenticadas
   - `validarAdmin` → para rutas solo admin
   - `validarCampos` → para validaciones de entrada

---

## 🚀 Próximos Pasos

1. Revisar endpoints con Thunder Client o Postman
2. Modificar según necesidades del proyecto
3. Agregar nuevas entidades siguiendo los 5 pasos
4. Implementar tests unitarios cuando sea necesario

---

**Última actualización:** Febrero 2026  
**Versión:** 1.0.0
