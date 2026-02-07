# 🚀 NodeJS TypeScript REST API Boilerplate

**Calistenia API** - Un boilerplate profesional para construir APIs REST con Node.js, TypeScript, Express y MongoDB, con autenticación JWT incorporada.

---

## 📋 Tabla de Contenidos

1. [Instalación y Configuración](#instalación-y-configuración)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Flujo de Trabajo de la API](#flujo-de-trabajo-de-la-api)
4. [Endpoints Disponibles](#endpoints-disponibles)
5. [Variables de Entorno](#variables-de-entorno)
6. [Extensiones Recomendadas VS Code](#extensiones-recomendadas-vs-code)
7. [Mejoras Futuras](#mejoras-futuras)
8. [Nuevos Features Sugeridos](#nuevos-features-sugeridos)

---

## 🛠️ Instalación y Configuración

### Requisitos Previos

- **Node.js** v16+ ([descargar](https://nodejs.org/))
- **npm** v7+ (viene con Node.js)
- **MongoDB** corriendo localmente o una conexión remota
- **VS Code** (recomendado)

### Pasos de Instalación

#### 1. Clonar/Configurar el Proyecto

```bash
# Navegar al directorio del proyecto
cd c:\Users\[TU_USUARIO]\Documents\proyectos-de-programacion\NodeJS-TypeScript-REST-api-boilerplate
```

#### 2. Instalar Dependencias

```bash
npm install
```

Este comando instala automáticamente todas las dependencias necesarias:

- **express** v5.2.1 - Framework web
- **mongoose** v9.0.0 - ODM para MongoDB
- **jsonwebtoken** v9.0.3 - Manejo de JWT
- **bcryptjs** v3.0.3 - Hash de contraseñas
- **express-validator** v7.3.1 - Validación de datos
- **cors** v2.8.5 - Compartir recursos entre orígenes
- **dotenv** v17.2.3 - Variables de entorno

**DevDependencies** (desarrollo):

- **ts-node-dev** v2.0.0 - Ejecutar TypeScript en desarrollo
- **@types/...** - Tipos de TypeScript para las librerías

#### 3. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```bash
# .env
PORT=8000
MONGODB_CNN=mongodb://localhost:27017/calistenia-db
SECRET_KEY_JWT=tu_clave_secreta_muy_segura_aqui_12345
NODE_ENV=development
```

> **Nota**: Para MongoDB remoto (MongoDB Atlas):
>
> ```
> MONGODB_CNN=mongodb+srv://usuario:contraseña@cluster.mongodb.net/calistenia-db
> ```

#### 4. Iniciar la Aplicación

**Modo Desarrollo** (con recarga automática):

```bash
npm run dev
```

**Modo Producción**:

```bash
npm run build
npm start
```

**Resultado esperado**:

```
Conectando a la Base de Datos...
Base de datos online
🚀 Servidor corriendo en puerto 8000
```

---

## 📁 Estructura del Proyecto

```
NodeJS-TypeScript-REST-api-boilerplate/
│
├── 📄 package.json                 # Configuración del proyecto y dependencias
├── 📄 tsconfig.json                # Configuración del compilador TypeScript
├── 📄 .env                         # Variables de entorno (no incluir en git)
│
├── 📂 src/                         # Código fuente principal
│   │
│   ├── 📄 index.ts                 # Punto de entrada - Carga variables env y crea el servidor
│   ├── 📄 server.ts                # Clase Server - Configuración de Express, rutas y middlewares
│   │
│   ├── 📂 controllers/             # Lógica de negocio de cada ruta
│   │   ├── auth.controller.ts      # Controlador de autenticación (login, registro)
│   │   └── user.controller.ts      # Controlador de usuarios (CRUD operations)
│   │
│   ├── 📂 routes/                  # Definición de rutas y endpoints
│   │   ├── auth.routes.ts          # Rutas de autenticación con validaciones
│   │   └── user.routes.ts          # Rutas CRUD de usuarios con middlewares
│   │
│   ├── 📂 models/                  # Esquemas de MongoDB (Mongoose)
│   │   └── user.model.ts           # Esquema de usuario con campos y métodos
│   │
│   ├── 📂 middlewares/             # Funciones intermedias de Express
│   │   ├── validar-campos.ts       # Valida errores de express-validator
│   │   └── validar-jwt.ts          # Verifica y autentica tokens JWT
│   │
│   ├── 📂 interfaces/              # Tipos e interfaces de TypeScript
│   │   └── Create_IUsers.ts        # Interfaz de Usuario
│   │
│   ├── 📂 helpers/                 # Funciones utilitarias
│   │   └── create_JWT.ts           # Genera tokens JWT firmados
│   │
│   └── 📂 database/                # Configuración de conexión
│       └── config.ts               # Conexión a MongoDB
│
└── 📂 dist/                        # Código compilado (generado por tsc)

```

### 📌 Desglose de Funcionalidades

#### **src/index.ts** - Inicializador de la aplicación

- Carga las variables de entorno desde `.env`
- Instancia la clase Server
- Inicia el servidor

```typescript
// Flujo: .env → Server → Escucha en puerto
```

---

#### **src/server.ts** - Configuración principal del servidor

```
Responsabilidades:
├── Crear instancia de Express
├── Conectar a la Base de Datos MongoDB
├── Aplicar Middlewares (CORS, JSON parsing, archivos estáticos)
└── Registrar rutas de la aplicación
```

**Rutas Configuradas**:

- `POST /api/auth/login` - Autenticación
- `GET /api/users` - Obtener usuarios
- `POST /api/users` - Crear usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario
- `DELETE /api/users/self` - Eliminar propia cuenta (requiere JWT)

---

#### **src/controllers/** - Lógica de negocio

**auth.controller.ts** - Gestión de autenticación

```
login(email, password)
├── Buscar usuario en BD
├── Validar contraseña (bcryptjs)
├── Generar JWT si es válida
└── Responder con token o error
```

**user.controller.ts** - Gestión de usuarios (CRUD)

```
getUsers()           → Obtiene todos los usuarios
postUser()           → Crea nuevo usuario (encripta contraseña)
putUser()            → Actualiza usuario (maneja hash de contraseña)
delUser()            → Elimina usuario por ID
delSelfUser()        → Permite que usuario elimine su propia cuenta
```

---

#### **src/routes/** - Definición de endpoints

**auth.routes.ts**

```typescript
POST /login
  ├── Validaciones: email válido, password no vacío
  ├── Middleware: validarCampos
  └── Controlador: login

Flujo de Request:
  Client → Express → Validaciones → validarCampos → login() → Response
```

**user.routes.ts**

```typescript
GET    /                 → getUsers()
POST   /                 → postUser() + validaciones + validarCampos
PUT    /:id              → putUser() + validaciones + validarCampos
DELETE /:id              → delUser() + validarJWT + validarCampos
DELETE /self             → delSelfUser() + validarJWT

Donde:
- validarCampos: Verifica que los valores cumplan las reglas
- validarJWT: Autentica con token JWT
```

---

#### **src/middlewares/** - Procesamiento intermedio

**validar-campos.ts** - Valida datos de request

```
Captura errores de express-validator
├── Si hay errores → Responde con status 400
└── Si está todo bien → Continúa al siguiente middleware
```

**validar-jwt.ts** - Autentica con tokens JWT

```
Verifica token en header 'x-token'
├── Token vacío → Error 401
├── Token inválido/expirado → Error 401
├── Usuario no existe → Error 401
├── Usuario inactivo → Error 401
└── Todo correcto → Inyecta userId en request y continúa
```

---

#### **src/models/user.model.ts** - Esquema de BD

```typescript
Usuario {
  name: String (requerido)
  email: String (requerido, único)
  password: String (requerido, hasheada)
  img: String (opcional)
  rol: ADMIN_ROLE | USER_ROLE (requerido)
  status: Boolean (activo/inactivo, default: true)
  google: Boolean (autenticación externa, default: false)
}

Método toJSON():
  Excluye password y __v
  Renombra _id a uid en respuesta
```

---

#### **src/helpers/create_JWT.ts** - Generación de tokens

```
Input: id de usuario
↓
Firma token con SECRET_KEY_JWT
↓
Duración: 12 horas
↓
Output: JWT token string
```

---

## 🔄 Flujo de Trabajo de la API

### 1️⃣ REGISTRO DE USUARIO

```
Cliente SendsRequest
  ↓
POST /api/users
  ├─ Headers: { "Content-Type": "application/json" }
  ├─ Body: { "name": "Juan", "email": "juan@mail.com", "password": "pass123", "rol": "USER_ROLE" }
  ↓
Express Router (user.routes.ts)
  ├─ Valida: nombre obligatorio
  ├─ Valida: password >= 6 caracteres
  ├─ Valida: email válido
  ├─ Ejecuta: validarCampos middleware
  ↓
postUser Controller
  ├─ Genera salt con bcryptjs
  ├─ Hashea la contraseña
  ├─ Crea documento User en MongoDB
  ├─ Guarda en BD
  ↓
Respuesta 201 Created
  └─ { "msg": "Usuario creado correctamente", "user": {...} }
```

### 2️⃣ LOGIN (Autenticación)

```
Cliente SendsRequest
  ↓
POST /api/auth/login
  ├─ Body: { "email": "juan@mail.com", "password": "pass123" }
  ↓
Express Router (auth.routes.ts)
  ├─ Valida: email obligatorio y válido
  ├─ Valida: password obligatorio
  ├─ Ejecuta: validarCampos middleware
  ↓
login Controller
  ├─ Busca usuario por email en BD
  ├─ Valida que usuario exista
  ├─ Valida que usuario esté activo (status: true)
  ├─ Compara password con hash usando bcryptjs
  ├─ Si es válida → Crea JWT
  ├─ Si es inválida → Responde error 400
  ↓
createJWToken Helper
  ├─ Firma token con SECRET_KEY_JWT
  ├─ Expira en 12 horas
  ↓
Respuesta 200 OK
  └─ { "msg": "Login successful", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

### 3️⃣ ACCESO A RUTAS PROTEGIDAS

```
Cliente SendsRequest
  ↓
DELETE /api/users/self
  ├─ Headers: { "x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
  ↓
Express Router (user.routes.ts)
  ├─ Ejecuta validarJWT middleware
  ↓
validarJWT Middleware
  ├─ Obtiene token del header 'x-token'
  ├─ Si no hay token → Error 401
  ├─ Verifica firma del token con SECRET_KEY_JWT
  ├─ Extrae id del payload del token
  ├─ Busca usuario en BD por ese id
  ├─ Valida que usuario sea activo
  ├─ Inyecta userId en req.body
  ├─ next() → Continúa
  ↓
delSelfUser Controller
  ├─ Obtiene usuarioAuth de req
  ├─ Marca status del usuario como false (soft delete)
  ├─ Actualiza en BD
  ↓
Respuesta 200 OK
  └─ Usuario desactivado correctamente
```

### 4️⃣ ACTUALIZAR USUARIO (Con validaciones)

```
Cliente SendsRequest
  ↓
PUT /api/users/64a2b3c4d5e6f7g8h9i0j1k2
  ├─ Body: { "name": "Nuevo Nombre", "email": "nuevo@mail.com", "rol": "ADMIN_ROLE" }
  ↓
Express Router (user.routes.ts)
  ├─ Valida: nombre obligatorio
  ├─ Valida: email válido
  ├─ Valida: rol en ["ADMIN_ROLE", "USER_ROLE"]
  ├─ Ejecuta: validarCampos
  ↓
putUser Controller
  ├─ Extrae id de params
  ├─ Si password viene → Hashea la nueva contraseña
  ├─ Usa findByIdAndUpdate con { new: true }
  ├─ Retorna usuario actualizado
  ↓
Respuesta 200 OK
  └─ { "user": {...actualizado...} }
```

---

## 📡 Endpoints Disponibles

### Autenticación

| Método | Endpoint          | Descripción    | Auth |
| ------ | ----------------- | -------------- | ---- |
| `POST` | `/api/auth/login` | Iniciar sesión | ❌   |

**Request:**

```json
{
  "email": "usuario@mail.com",
  "password": "contraseña123"
}
```

**Response (200):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Usuarios

| Método   | Endpoint          | Descripción                | Auth |
| -------- | ----------------- | -------------------------- | ---- |
| `GET`    | `/api/users`      | Obtener todos los usuarios | ❌   |
| `POST`   | `/api/users`      | Crear nuevo usuario        | ❌   |
| `PUT`    | `/api/users/:id`  | Actualizar usuario por ID  | ❌   |
| `DELETE` | `/api/users/:id`  | Eliminar usuario por ID    | ✅   |
| `DELETE` | `/api/users/self` | Eliminar propia cuenta     | ✅   |

**POST /api/users - Crear Usuario**

```json
{
  "name": "Carlos García",
  "email": "carlos@mail.com",
  "password": "password123",
  "rol": "USER_ROLE"
}
```

**PUT /api/users/:id - Actualizar Usuario**

```json
{
  "name": "Nombre Actualizado",
  "email": "nuevo@mail.com",
  "password": "nuevapass123",
  "rol": "ADMIN_ROLE"
}
```

**DELETE /api/users/self - Eliminar Propia Cuenta**

```
Header: x-token = [JWT_TOKEN]
```

---

## 🔑 Variables de Entorno

Crear archivo `.env` en la raíz:

```bash
# Puerto del servidor
PORT=8000

# Conexión MongoDB
MONGODB_CNN=mongodb://localhost:27017/calistenia-db

# Llave secreta para firmar JWT
SECRET_KEY_JWT=tu_clave_super_secreta_cambiar_en_produccion

# Ambiente
NODE_ENV=development
```

### Valores Utilizados en el Proyecto

| Variable         | Uso                                      | Ejemplo                                        |
| ---------------- | ---------------------------------------- | ---------------------------------------------- |
| `PORT`           | Puerto de escucha del servidor           | `8000`                                         |
| `MONGODB_CNN`    | URL de conexión a MongoDB                | `mongodb://localhost:27017/calistenia-db`      |
| `SECRET_KEY_JWT` | Clave para firmar y verificar tokens JWT | `tu_clave_super_secreta_cambiar_en_produccion` |

---

## 💻 Extensiones Recomendadas VS Code

Instalar estas extensiones para mejor experiencia de desarrollo:

```bash
# Abrir VS Code y instalar:
```

| Extensión                                  | ID                                 | Proposito                                    |
| ------------------------------------------ | ---------------------------------- | -------------------------------------------- |
| **Thunder Client**                         | `rangav.vscode-thunder-client`     | Cliente HTTP integrado (prueba de endpoints) |
| **MongoDB for VS Code**                    | `mongodb.mongodb-vscode`           | Explorador y gestor de MongoDB               |
| **REST Client**                            | `humao.rest-client`                | Ejecutar requests HTTP desde .rest files     |
| **Thunder Client**                         | `rangav.vscode-thunder-client`     | Cliente HTTP para testing                    |
| **TypeScript Vue Plugin**                  | `vue.vscode-typescript-vue-plugin` | Soporte TypeScript mejorado                  |
| **ES7+ React/Redux/React-Native snippets** | `dsznajder.es7-react-js-snippets`  | Snippets de código rápido                    |
| **Prettier - Code Formatter**              | `esbenp.prettier-vscode`           | Formateo automático de código                |
| **ESLint**                                 | `dbaeumer.vscode-eslint`           | Linting para detectar errores                |

**Instalación rápida al presionar `Ctrl+Shift+X`:**

1. Buscar la extensión por nombre
2. Hacer click en "Install"

---

## ⚡ Scripts Disponibles

```bash
# Desarrollo con recarga automática
npm run dev

# Compilar TypeScript a JavaScript
npm run build

# Ejecutar aplicación compilada
npm start

# Testear (aún no configurado)
npm test

# Instalar nuevas dependencias
npm install [nombre-paquete]

# Instalar dependencias de desarrollo
npm install --save-dev [nombre-paquete]
```

---

## 🚀 Mejoras Futuras

### 1. **Validaciones Más Robustas**

- [ ] Validar unicidad de email en tiempo real
- [ ] Rates limiting para prevenir abuso
- [ ] Validación de contraseña fuerte (mayús, minús, números, símbolos)
- [ ] Confirmar email antes de activar cuenta

### 2. **Seguridad**

- [ ] Implementar refresh tokens para JWT
- [ ] Logging detallado de accesos (morgan)
- [ ] Helmet.js para headers de seguridad
- [ ] HTTPS obligatorio en producción
- [ ] Encriptación de datos sensibles

### 3. **Base de Datos**

- [ ] Índices en campos frecuentemente buscados (email)
- [ ] Paginación en listados
- [ ] Filtros y búsqueda avanzada
- [ ] Soft delete completo (con timestamps)
- [ ] Auditoría de cambios (quién, cuándo, qué cambió)

### 4. **Testing**

- [ ] Jest para unit tests
- [ ] Supertest para integration tests
- [ ] Coverage >80% de código
- [ ] Tests en CI/CD pipeline

### 5. **Documentación API**

- [ ] Swagger/OpenAPI para documentación interactiva
- [ ] Postman/Insomnia collections
- [ ] Ejemplos de uso en varios lenguajes

### 6. **Logging y Monitoreo**

- [ ] Winston o Pino para logging estructurado
- [ ] Sentry para error tracking
- [ ] Prometheus para métricas
- [ ] Dashboard de monitoreo

### 7. **Performance**

- [ ] Redis para caching
- [ ] Compresión GZIP
- [ ] Clustering de Node.js
- [ ] GraphQL como alternativa a REST

### 8. **Docker**

- [ ] Dockerfile para containerización
- [ ] Docker Compose para orquestación
- [ ] Configuración multi-ambiente

---

## 📋 Nuevos Features Sugeridos

### Feature 1: **Roles y Permisos Avanzados**

```
├── Expandir rol system (ADMIN, MODERATOR, USER, GUEST)
├── Middleware de autorización basado en roles
├── Tabla de permisos por rol
└── Auditoría de acciones por rol
```

**Archivos a crear:**

- `src/middlewares/validar-rol.ts`
- `src/models/role.model.ts`
- `src/models/permission.model.ts`
- `src/controllers/role.controller.ts`

---

### Feature 2: **Autenticación Social**

```
├── Login con Google OAuth2
├── Login con GitHub
├── Login con Facebook
├── Vincular múltiples cuentas sociales a un usuario
└── Migración automática de perfiles

Integración con:
- passport.js
- oauth2-proxy
```

**Archivos a crear:**

- `src/middlewares/validar-oauth.ts`
- `src/controllers/oauth.controller.ts`
- `src/routes/oauth.routes.ts`

---

### Feature 3: **Gestión de Equipos**

```
├── Crear equipos
├── Invitar miembros
├── Roles dentro del equipo
├── Proyectos por equipo
└── Permisos granulares
```

**Archivos a crear:**

- `src/models/team.model.ts`
- `src/controllers/team.controller.ts`
- `src/routes/teams.routes.ts`

---

### Feature 4: **Perfil de Usuario Extendido**

```
├── Foto de perfil con cloudinary/S3
├── Biografía y datos públicos
├── Seguidores/Seguidos
├── Badges y logros
├── Historial de actividad
└── Notificaciones por email
```

**Archivos a crear:**

- `src/models/profile.model.ts`
- `src/controllers/profile.controller.ts`
- `src/middlewares/upload-file.ts`

---

### Feature 5: **Sistema de Calistenia**

```
Dado que es "Calistenia API":
├── Rutinas de ejercicios
├── Ejercicios por categoría
├── Progreso del usuario
├── Estadísticas de entrenamiento
└── Comunidad de usuarios

Archivos a crear:
- src/models/routine.model.ts
- src/models/exercise.model.ts
- src/models/progress.model.ts
- src/controllers/routine.controller.ts
- src/routes/routine.routes.ts
```

---

### Feature 6: **Sistema de Notificaciones**

```
├── Notificaciones en tiempo real (Socket.io)
├── Email notifications
├── Push notifications (FCM)
├── Centro de notificaciones
└── Preferencias de notificación por usuario
```

**Librerías:**

- socket.io
- nodemailer
- firebase-admin

---

### Feature 7: **Búsqueda y Filtros Avanzados**

```
├── Búsqueda full-text
├── Filtros complejos
├── Agregaciones avanzadas
├── Búsqueda geográfica (si aplica)
└── Historial de búsquedas
```

**Integración:**

- MongoDB Text Search
- Elasticsearch (opcional)

---

### Feature 8: **API Rate Limiting y Throttling**

```
├── Límite de requests por IP
├── Límite de requests por usuario
├── Límite por endpoint
└── Reseteo automático (horario, diario, mensual)
```

**Librería:**

- express-rate-limit

```typescript
// Ejemplo de uso
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests
});

app.use("/api/", limiter);
```

---

## 🎯 Flujo de Desarrollo Recomendado

```
1. Desarrollo Local
   ├─ npm run dev (recarga automática)
   ├─ Usar Thunder Client/Postman para testear
   └─ Debugger de VS Code

2. Testing
   ├─ Escribir tests antes del código (TDD)
   ├─ npm run test (cuando esté configurado)
   └─ Cobertura mínima 80%

3. Compilación
   ├─ npm run build
   └─ Verificar que compile sin errores

4. Staging
   ├─ Subir a rama develop
   ├─ Tests en CI/CD
   └─ Desplegar en staging

5. Producción
   ├─ Merge a main/production
   ├─ Doble verificación
   ├─ Desplegar con Blue-Green Deployment
   └─ Monitoreo activo
```

---

## 📞 Soporte y Contacto

Para preguntas o problemas:

1. Revisar issue en el repositorio
2. Abrir un nuevo issue describiendo el problema
3. Con stack trace o pasos para reproducir
4. Versión de Node.js y sistema operativo

---

## 📜 Licencia

ISC (Included in package.json)

---

## 🙏 Agradecimientos

Boilerplate creado con mejores prácticas de:

- TypeScript
- Clean Code
- REST API Standards
- Security Best Practices

---

**Última actualización**: Febrero 2026  
**Versión**: 1.0.0  
**Estado**: Activo y en mejora continua
