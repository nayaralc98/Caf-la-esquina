# Café La Esquina

Landing page de una cafetería de barrio **ficticia**, hecha como encargo de práctica para Kodarvia.

- **Previsualización pública:** https://cafelaesquina.netlify.app/
- **Stack:** React 18 + Vite 5, CSS propio (sin librerías de UI). Publicada en Netlify.

## Qué incluye

Una sola página con seis secciones:

1. **Portada** con titular, botones a "Te esperamos" y a la carta, y la placa de azulejos con el nombre del café.
2. **Quiénes somos.**
3. **Carta** con seis productos y precio.
4. **Horario y ubicación**, con enlace "Cómo llegar" a OpenStreetMap.
5. **Formulario de contacto** (nombre, email y mensaje), que envía de verdad.
6. **Pie** con dirección y enlaces a redes.

El diseño está pensado primero para móvil y se adapta a pantallas grandes desde 880 px de ancho. Tiene foco visible al
navegar con teclado y respeta la preferencia de "reducir movimiento".

## Cómo arrancar el proyecto

Necesitas Node.js 18 o superior.

```bash
npm install
npm run dev
```

Abre la dirección que aparece en la terminal (normalmente http://localhost:5173).

Para generar la versión de producción:

```bash
npm run build
```

El resultado queda en la carpeta `dist/`, que es lo que se sube a Netlify.

## Qué está simulado y qué es real

| Parte | Estado |
| --- | --- |
| Nombre, dirección, horario, carta y precios | **Simulado.** La cafetería no existe. |
| Enlaces a Instagram y Facebook | **Simulado.** Llevan a la portada de cada red, no a un perfil. |
| Reseñas, premios o testimonios | No hay. No se inventó ninguno. |
| Formulario de contacto | **Real.** Lo recibe Netlify Forms. |

### Cómo funciona el formulario

- `index.html` contiene una copia oculta del formulario (`name="contacto"`, `data-netlify="true"`) para que Netlify lo
  detecte al publicar. En el proyecto de Netlify hay que tener activada la detección de formularios (_Forms → Enable form
  detection_).
- El formulario de React (`src/App.jsx`, función `enviarContacto`) envía los datos con `fetch` a `/` en formato
  `application/x-www-form-urlencoded`, como pide Netlify.
- Si el envío va bien, se muestra "¡Gracias! Hemos recibido tu mensaje". Si falla, se muestra un aviso de error y se puede
  volver a intentar.
- Lleva un campo trampa invisible (`bot-field`, _honeypot_) para frenar el spam automático.
- En local (`npm run dev`) el formulario **no envía**, porque no hay Netlify detrás, y muestra el aviso de error. Es lo
  esperado.

Los mensajes recibidos se ven en Netlify: _Proyecto → Forms → contacto_.

## Cómo reiniciar los datos de ejemplo

- **Carta y horario:** están en las listas `CARTA` y `HORARIO`, al principio de `src/App.jsx`. Se editan ahí y se vuelve
  a publicar.
- **Mensajes del formulario:** en Netlify, _Forms → contacto_, marca "Select all on page" y pulsa "Delete submission".

## Estructura

```
index.html          Página base y copia oculta del formulario para Netlify
public/favicon.svg  Icono de la pestaña
src/main.jsx        Punto de entrada de React
src/App.jsx         Todas las secciones, los datos de la carta y el formulario
src/estilos.css     Colores, tipografías y maquetación
```

Colores: azul azulejo `#1D3F94`, mantequilla `#F4B731`, pared encalada `#F1F3EE`, verde olmo `#4C6B3C` y espresso
`#2A1D17`. Tipografías: Bricolage Grotesque (títulos) y Newsreader (texto), de Google Fonts.
