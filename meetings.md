# Minutas Renuniones de Equipo

## 18-Febrero

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