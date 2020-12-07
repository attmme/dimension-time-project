# Aplicación Dimension Time

### Introducción

Vamos a hacer una aplicación para registrar las horas que vamos a dedicar a la fabricación de la propia aplicación. Nuestra app servirá para calcular nuestra velocidad de programación.

La aplicación realizará las siguientes tareas:

- Registro y Login del usuario
- Introducción de hora de inicio y hora de finalización de la tarea
- Pantalla de comprobación de las horas dedicadas a cada tarea. Acumuladas por días.
- Bonus-track: pantalla horas dedicadas por grupo.

### Requerimientos de construcción

- Realizar un wireframe de pantallas de la aplicación.
- Crear un kanban con las historias de usuario.
- Construir la aplicación
- Subir la aplicación a firebase
  
### Fases de Construcción

__Día 1__
- Entrega del wireframe de la aplicación
- Entrega del backlog de la aplicación (link al trello)

__Día 2__
- Estructura de la aplicación
- Routing inicial
- Presentación con mockups, wireframe, planificación del sprint

__Día 3,6__
- Desarrollo de users'stories
- Presentación del trabajo realizado

__Día 7__
- Despliegue en producción (firebase)
- Presentación final

### Requerimientos técnicos

- La aplicación constará obligatoriamente de los siguientes elementos:
  - Home con hero image
  - Cabecera con barra de navegación: Home, Login, Register, Logout, Time tasks, List tasks
  - Login
  - Register
  - Time Tasks
  - List Tasks (Bonus)
- API y autenticación en Firebase

### Criterios de evaluación

- La aplicación no genera ningún error
- La arquitectura de la aplicación es reconocible y mantenible
- Se utilizan servicios para realizar la conexión al backend
- El menú es reactivo a cambios en la autenticación
- Se utilizan componentes presentacionales separados de enrutables
- Se utilizan guards para proteger las rutas de acceso autenticado
- Los estilos de la aplicación están cuidados: posicionamiento
- Nombres semánticos
- Se siguen los principios de programación de:
    - single responsability (KISS),
    - DRY, 
    - YAGNI, 
    - separación de capas de abstracción
- Los métodos, propiedades y parámetros están tipados

Excelencia:
- La aplicación se ha probado en diferentes dispositivos y navegadores
- Se introducen componentes de dificultad:
  - interceptores
  - content projection
  - animaciones
  - modales
  - frameworks de estilos
  - material customizado
  - gráficas
  - ...
 
### Recomendaciones

- Trabaja por iteraciones. Cada iteración no debe tener errores.
  - Ejemplo de iteraciones:
  1. Componentes, modelos y enrutamiento
  2. Conexión entre componentes
  3. Estilos generales (formularios y listas)
  4. Conexión a servicios
  5. Firebase
  6. Lógica Time Task
  7. Presentación Time Task
  8. Detalles estilos: imagen, colores, fuentes, etc.
  9. Guards, Interceptores
  10. ...

- Podéis hacer pair-programming o división de tareas.

### Herramientas:

- Visual Studio Code (con extensión liveshare),
- Firefox developer edition
- Pencil Project
- slides, canva o similar

