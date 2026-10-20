# Actividad 15 · Seguridad de la información (IW600)

**Estudiante:** María José Vilches Aranguiz

Aplicación de gestión de servicios tecnológicos con registro, verificación de correo, login con sesión en
cookie HttpOnly, roles, protección CSRF, límite de intentos y segundo factor TOTP.
Stack: Vue 3 (frontend), Express (backend) y MySQL.

## Requisitos
Node.js 22 o superior, npm y MySQL en ejecución.

## Instalación
```bash
cd backend && npm install
cd ../frontend && npm install
```
1. Ejecutar `database/schema.sql` en MySQL Workbench o en la consola `mysql`.
2. Copiar `backend/.env.example` a `backend/.env` y completar los valores propios.
   Variables: `PORT`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `SESSION_SECRET`, `FRONTEND_URL`, `NODE_ENV`.
   El archivo `.env` está ignorado por Git y nunca debe subirse.

## Ejecución (dos terminales)
```bash
# Terminal 1 – API en http://localhost:3000
cd backend && npm run dev

# Terminal 2 – aplicación en http://localhost:5173
cd frontend && npm run dev
```

## Rutas REST
| Método | Ruta | Protección |
|---|---|---|
| GET | `/api/auth/me` | pública |
| GET | `/api/auth/csrf` | sesión |
| POST | `/api/auth/registro` | pública |
| POST | `/api/auth/verificar` | pública |
| POST | `/api/auth/login` | límite de 5 intentos / 15 min |
| POST | `/api/auth/logout` | sesión + CSRF |
| POST | `/api/auth/2fa/preparar`, `/api/auth/2fa/activar` | sesión + CSRF |
| GET | `/api/servicios` | sesión |
| POST, DELETE | `/api/servicios`, `/api/servicios/:id` | sesión + rol admin + CSRF |

## Registro y verificación
1. Registrarse con una contraseña de al menos 12 caracteres.
2. En la consola del backend aparece `ENLACE SOLO LABORATORIO`; abrir ese enlace (no se envía correo real).
3. Iniciar sesión. Para ser administrador, ejecutar en MySQL, solo sobre una cuenta de laboratorio:
   `UPDATE usuarios SET rol='admin' WHERE email='admin.lab@ejemplo.test';`
   No existe endpoint para asignar ese rol, a propósito.

## Activar TOTP
Con sesión iniciada: **Generar QR**, escanearlo con una app autenticadora, escribir el código de 6 dígitos y
**Activar 2FA**. En el siguiente ingreso se pedirá contraseña y código.

## Controles implementados
- Contraseñas con bcrypt (costo 12); el token de verificación se guarda solo como hash SHA-256 y vence a los 30 minutos.
- Sesión en cookie `iw.sid` HttpOnly, SameSite=Lax y Secure en producción; no se usa localStorage.
- Se regenera la sesión al iniciar sesión.
- Autorización en el servidor: `auth` (401) y `admin` (403) en cada endpoint protegido.
- Token CSRF en cabecera `x-csrf-token` para toda petición que modifica datos.
- Límite de 5 intentos de login cada 15 minutos (429).
- Validación en backend y consultas parametrizadas.

## Pruebas
Ver [PRUEBAS_SEGURIDAD.md](PRUEBAS_SEGURIDAD.md). P1 y P3 se ejecutaron; las demás requieren MySQL, que no estaba instalado en el equipo de desarrollo.

## Limitaciones
Prototipo académico: `MemoryStore` para sesiones (se pierden al reiniciar), sin HTTPS, secreto TOTP sin cifrar,
correo simulado por consola, sin recuperación de contraseña ni auditoría. Para producción se requiere HTTPS,
sesiones persistentes, cifrado del secreto TOTP, servicio de correo y gestión de secretos.

## Capturas
Agregar capturas de pruebas positivas y negativas.
