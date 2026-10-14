# Registro de pruebas funcionales – Actividad 14

Ejecutadas el 14-10-2026 con JSON Server (puerto 3000) y `npm run dev` (puerto 5173).

| Prueba | Acción | Resultado esperado | Resultado obtenido |
|---|---|---|---|
| P1 | Buscar "red" | Coinciden en nombre o descripción | Aprobada: Auditoría de red y Redes Wi-Fi |
| P2 | Filtrar por Soporte | Solo esa categoría | Aprobada: Respaldo de datos y Soporte técnico |
| P3 | Orden por precio descendente | De mayor a menor | Aprobada: $230.000, $180.000, $120.000, $85.000, $45.000 |
| P4 | Seis registros, cambiar página | 5 en la primera, 1 en la segunda | Aprobada: "Página 1 de 2" con 5 filas y "Página 2 de 2" con 1 |
| P5 | Nombre de dos letras | No guarda y muestra mensaje | Aprobada: "Ingrese al menos 3 caracteres." |
| P6 | Precio 0 | No guarda | Aprobada: "Ingrese un precio mayor que cero." |
| P7 | Crear servicio válido | Aparece en listado y db.json | Aprobada: registro creado y visible en la API |
| P8 | Editar precio | Persiste tras recargar | Aprobada: 77000 se mantiene al reabrir el formulario |
| P9 | Cancelar eliminación | El servicio permanece | Aprobada; al confirmar se elimina con mensaje de éxito |
| P10 | Apagar JSON Server y recargar | Mensaje de error sin bloquear la interfaz | Aprobada: "No se pudo conectar con la API." |
