# Minutas Renuniones de Equipo

## 18-Febrero

Participantes: Simon, Santi

### Tareas para cumplir con el Sprint 4

* Archivos json
    - Agregar categorias a parts.json - *Simon*
    - Generar users.json - *Simon*
    - Agregar user y quantity a carts.json. Cambiar userName a userID. - *Santi*
    - Armar questions.json y sacar la variable de controller - *Santi*

* Completar las routes para las distintas acciones de CRUD. Adaptar los actions y method de los forms.
    - Products - *Santi*
    - Home - *Simon*
    - Register - *Simon*
    - Login - *Simon*
    - Search - *Lucas*

* Terminar de definir flujo (distintas views dependiendo del tipo de usuarios) y pantallas (como se ven dependiendo del tipo de acceso las vistas comunes) - *Todos*

* Cambiar los filtros de search para que sean dinamicos. Cambiarlos para que sean a la izquierda en lugar de arriba. - *Lucas*


## 23-Febrero

### Revision avance

Participantes: Simon, Santi

Se revisa el código hecho por Santi, se hacen ajustes visuales y se hace merge con la branch de Simon para seguir avanzando.
Se remarca preocupación por falta de noticias de Lucas

## 24-Febrero

### Revision avance

Participantes: Simon, Lucas, Santi

* JSONs
    - Definir
        - Brands.json -> *Simon*
            * brandID
            * brandName
        - Models.json -> *Simon*
            * modelID
            * modelName
            * brandID
        - Version.json -> *Simon*
            * versionID
            * versionName
            * brandID
            * modelID
        - Users.json -> *Simon*
            * userID
            * userName
            * firstName
            * LastName
            * email
            * password
            * category (accessType)
            * image (avatar)
            * phone
            * location (province, city, neighbourhood)
            * DNI

* Routes
    - User routes -> *Simon* complete
    - Product routes
        - create -> *Santi* complete
        - store -> *Santi* complete
        - edit -> *Santi* complete
        - update -> *Santi* complete
        - delete -> *Santi* complete
        - search -> *Lucas*

* Controllers
    - mainController -> complete
    - productsController -> *Lucas* agregar metodo de search
    - userControlller -> proximo sprint

* Views
    - Index
        - General view -> *Simon* complete
        - Search form  -> *Lucas* - adaptar formulario para que lleve a la ruta correcta y envie los datos correspondientes
    - Products -> *Santi* complete
    - Register -> *Simon* - revisar el boton de Login
    - Login -> *Simon* -> complete
    - Search -> *Lucas* - cambiar filtros para que esten a la izquierda en la version desktop


## 1-Marzo

### Revisión Avance

Participantes: Simon, Lucas, Santi

Se revisa el código hecho por cada uno.
    - Santi - Se debe terminar de pulir la edición de productos para subir imagenes
    - Lucas - Realizar toda lo correspondiente a la sección del search
    - Simon - Terminó de actualizar register/login y comenzará a trabajar con la sesión de usuarios

## 3-Marzo

### Revisión Avance

Participantes: Simon, Santi

Se revisa el código hecho por cada uno.
    - Santi - Se completaron los requerimientos del sprint 4 referido a productos
    - Simon - Se realizó versión inicial de validación y sesión. Se revisa el código del middleware y se destraba el avance
No se tienen noticias de Lucas -> Santi va a hacer la parte del search

## 4-Marzo

### Revisión Avance y merges

Participantes: Simon, Santi

Lucas abandona el curso

Se hace merge de Simon a Santi y no se encuentran conflictos. Se procede a realizar Pull Requests a develop y main sin conflictos.
Se hace el deploy a Heroku y la pagina funciona correctamente


## 8-Marzo

### Organización Sprint 5

Participantes: Simon, Santi

Se decide reorganizar un poco el código para que quede más prolijo -> crear Model de Productos *Santi*

Cambios a realizar:

    * Search
        - Hacer los filtros dinamicos *Simon*
        - Agregar funcionalidad de busqueda por texto y por los filtros del home / search *Simon*
    * Hearder
        - Remover historial *Santi*
        - Hacer que vender y favoritos aparezcan solo si el usuario esta logeado *Santi*
        - Agregar links a las categorias *Santi*
    * Product Details
        - Hacer que el boton de editar aparezca solo si esta logeado y el owner del producto *Santi*
        - Agregar funcionalidad de favoritos y que solo aparezca si esta logeado *Santi*
    * Cart
        - Agregar funcionalidad entera de cart (agregar y quitar productos) *Simon*
    * JSONs
        - Vehicles: cambiar seller por sellerID *Santi*
        - Parts: cambiar seller por sellerID *Santi*
        - Crear uno de favoritos *Santi*
    * Admin
        - Crear view de admin para editar usuarios *Simon*
    * Product forms
        - Agregar validacion *Santi*
    * Users
        - Arreglar validacion de edicion de usuarios *Simon*


## 12-Marzo

### Revision avance

Participantes: Simon, Santi

Progreso:

    * Productos:
        - Se tiene que terminar de arreglar la parte de validacion para partes y productos - hacer dos rutas
    * Admin:
        - Se implemento version inicial de pantalla de admin con validacion de rol
        - Queda refinar las validaciones con accesos, edicion de usuarios, etc

## 16-Marzo

### Revision avance

Participantes: Simon, Santi

Progreso:

    * Cart:
        - Se creó el Cart model, funcionan los métodos (add/remove).
        - Queda:
            - Vincular el cart al usuario logeado.
            - Definir si va a haber un guest cart. -> Si
            - Definir cómo va a ser el tratamiendo del cart id y su flujo -> Se va a crear un cart solo si el guest hace click en Add to cart. Si la persona esta logeada se chequea si ya tiene uno activo y se asigna a req.session.cartID.
    * Favourites:
        - Se creo version inicial. Falta pasarlo a model e implementar delete.
        - Agregar links e iconos a product details correspondientes a si ya esta en favoritos o no -> agregar middleware
        - Agregar lista de favoritos en dropdown de la navbar.
    * Products:
        - Se implemento express-validator para create y edit.
        - Se agrego middleware de si es el owner del producto.


## 16-Marzo

### Revision avance

Participantes: Simon, Santi

Progreso:

    * Cart:
        - Se implemento el carrito en session.
    * Users:
        - Remover confirm password del json y formularios
        - Pasar password a archivo separado
    * Products:
        - Remover rating del formulario para parts y vehicles
    * Database:
        - Created first draft of database ERD


## 28-Marzo

### Revision avance

Participantes: Simon, Santi

Progreso:

    * DB:
        - Se hizo el seteo inicial de sequelize con el register y login funcionando, quedan ajustar detalles
        - Detalles:
            - Actualizar la query de login para que use los datos incluidos en el primer objeto (usa include: models) - *Santi*
        - Tareas:
            - Users:
                - Crear modelos de carts, carts_users, locations - *Santi*
                - Crear relaciones entre los modelos - *Santi*
                - Actualizar modelo de user para que contega postal_code y address - *Santi*
            - Posts:
                - Crear modelos de products, vehicles, parts, questions, brands, models, vehicle_versions, image_urls - *Simon*
                - Crear relaciones entre los modelos - *Simon*
            - Refactorizar: refactorizar los controladores, middlewares y views que corresponden para cada modelo que se crea. - *Todos*