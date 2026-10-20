# Pruebas de seguridad – Actividad 15

Estado de cada prueba P1–P10. **El equipo de desarrollo no tenía MySQL instalado**, por lo que solo se pudieron
ejecutar las pruebas que no dependen de la base de datos. El resto queda con el procedimiento listo para ejecutarse.

| Prueba | Procedimiento | Resultado esperado | Estado |
|---|---|---|---|
| P1 acceso anónimo | `curl http://localhost:3000/api/servicios` sin sesión | 401 sin datos | Ejecutada: 401 `{"error":"Inicie sesión"}` |
| P2 verificación | Registrar y hacer login sin abrir el enlace | 403 | Pendiente (requiere MySQL) |
| P3 rate limit | 6 logins en 15 minutos | 429 desde el sexto intento | Ejecutada: intentos 1-5 respondieron (500 por no haber MySQL) y el 6.º respondió 429 |
| P4 2FA | Activar TOTP, salir, entrar sin y con código | 401 y luego 200 | Pendiente (requiere MySQL) |
| P5 roles | Usuario normal hace `POST /api/servicios` | 403 | Pendiente (requiere MySQL); sin sesión responde 401 |
| P6 CSRF | Sesión válida, `POST` sin `x-csrf-token` | 403 | Pendiente (requiere MySQL) |
| P7 cookie | DevTools > Application > Cookies | `iw.sid` con HttpOnly | Pendiente (requiere MySQL) |
| P8 localStorage | DevTools > Local Storage | Sin token de sesión | El código no usa localStorage (revisado en `App.vue`) |
| P9 SQL | Registrar nombre con comillas | No altera la consulta | Todas las consultas usan `pool.execute` con parámetros `?` |
| P10 contraseña | `SELECT password_hash FROM usuarios` | Solo hash bcrypt | Pendiente (requiere MySQL); el código guarda `bcrypt.hash(password, 12)` |

Las pruebas pendientes deben completarse con MySQL en funcionamiento y adjuntarse con capturas
(sin mostrar contraseñas, códigos TOTP ni cookies).
