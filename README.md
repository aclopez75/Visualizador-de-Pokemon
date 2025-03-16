# Visualizador de Pokémon

# Index
Hemos generado la estructura inicial de nuestra aplicación web siguiendo los pasos que requería el proyecto, cabe decir tambíen que hemos usado el idioma inglés en toda la página para darle un aspecto más profesional a nivel código para todo, menos los comentarios.
Empezando por arriba título de la pestaña, hemos añadido un "favicon" de la misma y su vinculación, vinculación correcta con el archivo "style.css".
El body tiene todo el contenido creado y utilizado a posteriori con su respectivo estilo, imagen de fondo, un logo principal como encabezado, el buscador que te permite ingresar un dato según requiera el usuario a su vez una lista de sugerencias en base a los caracteres ingresados con la opción de elegir cualquiera de ellas y mostrarla después en el contenedor principal de la web, visualmente arrojando datos en base a esa búsqueda.

# Style
Hemos empezado por definir una tipografía genérica para todo el proyecto, buscando en Google Fonts una letra que sea redonda y geométrica, escogiendo finalmente "Poppins". Como fondo para el visualizador, hemos encontrado una imagen que muestra todos los Pokémon iniciales de todas las regiones.
Inicialmente, solo se ve en la pantalla el logo de Pokémon con el input que sirve como buscador y, al empezar a escribir, se despliega una lista de sugerencias a la que hemos aplicado un estilo similar al input.
El resto del documento define los estilos de los distintos elementos de la ficha que muestra los datos del Pokémon buscado, que al principio les hemos dado un display none, y solo aparecen al realizar la búsqueda correctamente. Cada apartado de la ficha va agrupado en su div correspondiente, dividiéndola en 3 zonas: visual del Pokémon, datos generales y estadísticas base.
Para dar efectos extra y hacer la experiéncia de usuario más interactiva y visual, hemos añadido diversos hover y elementos de color, como la animación de los Pokémon, el botón de shiny, los tipos de Pokémon con sus colores respectivos y las barras de estadísticas.
Para finalizar, hemos adaptado el diseño a los distintos tipos de pantalla mediante el selector @media, dividiendo entre pantallas mobile y pantallas de tableta.

# Script
Una vez hemos creado el index con los elementos principales de nuestra web, y hemos distribuido dichos elementos, generamos la lógica de nuestro proyecto:
    - Consumimos la api con la función Fetch, con uso de async / await para manejar la asincronía de la respuesta de la API.
    - Creamos una función que genera e indexa elementos al HTML mediante innerHTML. En esta función recorremos la API y obtenemos los valores que nos interesan de esta. También utilizamos funciones callback para consumir la API y poder modificar estos valores en el innerHTML, como por ejemplo al crear las barras dinámicas de los stats, al llamar a la función que genera una imagen de error en caso de que el pokemon llamado no tenga foto trasera, al llamar a los tipos, etc.
    - Utilizamos el método new Audio para importar un sonido y llamarlo al ejecutar el evento click, evento creado para mostrar los shiny de cada pokémon al hacer click en un botón.
    - Creamos la función que inicia la búsqueda cuando el usuario escribe en el input. Esta función tiene como callback a la función fetchPokemon, que es la que consume la API y tiene como callbacks a la función displayPokemon y typeColors, que son las funciones que generan el innerHTML segun los datos de la API.
    - Generamos una función asociada al input que, en base a los carácteres que introduce el usuario, te sugiere una lista ordenada de pokémons que permite al usuario tener sugerencias sobre su busqueda en concreto.
    - Finalmente añadimos una función que resetea la función de las sugerencias y el input, para limpiar todo el contenido una vez se borren los datos de la búsqueda.