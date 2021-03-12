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
        - Remover historial *Santi* - OK
        - Hacer que vender y favoritos aparezcan solo si el usuario esta logeado *Santi* - OK
        - Agregar links a las categorias *Santi* - OK
    * Product Details
        - Hacer que el boton de editar aparezca solo si esta logeado y el owner del producto *Santi* - OK
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