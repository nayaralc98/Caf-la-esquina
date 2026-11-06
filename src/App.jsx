import { useState } from 'react';

const CARTA = [
  { nombre: 'Café con leche', detalle: 'Nuestro café de especialidad, con leche cremosa', precio: '1,80 €' },
  { nombre: 'Flat white', detalle: 'Doble de espresso con una capa fina de leche', precio: '2,50 €' },
  { nombre: 'Cruasán de mantequilla', detalle: 'Hojaldrado y horneado cada mañana', precio: '1,90 €' },
  { nombre: 'Tostada con tomate', detalle: 'Pan de pueblo, tomate rallado y aceite de oliva', precio: '2,80 €' },
  { nombre: 'Bizcocho del día', detalle: 'Pregunta qué hemos horneado hoy', precio: '2,20 €' },
  { nombre: 'Chocolate caliente', detalle: 'Espeso, para mojar', precio: '2,60 €' },
];

const HORARIO = [
  { dias: 'Lunes a viernes', horas: '7:30 – 20:00' },
  { dias: 'Sábados', horas: '8:30 – 14:00' },
  { dias: 'Domingos', horas: 'Cerrado' },
];

function Placa() {
  return (
    <div className="placa" role="img" aria-label="Placa de azulejos: Café La Esquina, Calle del Olmo 12">
      <div className="azulejos">
        <span className="placa-calle">Calle del Olmo, 12</span>
        <span className="placa-nombre">
          Café
          <br />
          La Esquina
        </span>
        <span className="placa-lema">desde temprano</span>
      </div>
    </div>
  );
}

function Fila({ izquierda, derecha, children }) {
  return (
    <li>
      <div className="fila">
        <span>{izquierda}</span>
        <span className="puntos" aria-hidden="true" />
        <span>{derecha}</span>
      </div>
      {children}
    </li>
  );
}

// Envía el formulario a Netlify Forms (funciona una vez publicada la web en Netlify).
async function enviarContacto(datos) {
  const cuerpo = new URLSearchParams({ 'form-name': 'contacto', ...datos }).toString();
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: cuerpo,
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
}

function Contacto() {
  const [estado, setEstado] = useState('listo'); // listo | enviando | enviado | error

  async function alEnviar(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const datos = Object.fromEntries(new FormData(form));
    setEstado('enviando');
    try {
      await enviarContacto(datos);
      form.reset();
      setEstado('enviado');
    } catch {
      setEstado('error');
    }
  }

  if (estado === 'enviado') {
    return (
      <div className="enviado" role="status">
        <p className="enviado-titulo">¡Gracias! Hemos recibido tu mensaje.</p>
        <p>Te responderemos pronto.</p>
        <button className="btn sec" type="button" onClick={() => setEstado('listo')}>
          Escribir otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form className="formulario" name="contacto" onSubmit={alEnviar}>
      <p className="oculto">
        <label>
          No rellenes este campo: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label>
        Nombre
        <input name="nombre" type="text" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Mensaje
        <textarea name="mensaje" rows={5} required />
      </label>
      {estado === 'error' && (
        <p className="error" role="alert">
          No se ha podido enviar el mensaje. Revisa tu conexión y vuelve a intentarlo.
        </p>
      )}
      <button className="btn pri" type="submit" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando…' : 'Enviar mensaje'}
      </button>
    </form>
  );
}

export default function App() {
  return (
    <>
      <header className="portada">
        <div className="contenedor portada-rejilla">
          <div>
            <h1>Tu café de siempre, hecho con calma</h1>
            <p className="entradilla">
              Café de especialidad y bollería que horneamos cada mañana, en la esquina de tu calle.
            </p>
            <div className="acciones">
              <a className="btn pri" href="#horario">
                Ven a vernos
              </a>
              <a className="btn sec" href="#carta">
                Ver la carta
              </a>
            </div>
          </div>
          <Placa />
        </div>
      </header>

      <main>
        <section className="seccion nosotros" aria-labelledby="t-nosotros">
          <div className="contenedor estrecho">
            <h2 id="t-nosotros">Un rincón del barrio para empezar bien el día</h2>
            <p>
              Somos una cafetería pequeña donde el café se prepara sin prisa. Trabajamos con café de especialidad y
              hacemos nuestra bollería en casa: cruasanes, magdalenas y bizcochos que salen del horno cada mañana.
            </p>
            <p>Ven a desayunar, a trabajar un rato o a charlar con tus vecinos. Aquí siempre hay sitio.</p>
          </div>
        </section>

        <section className="seccion carta" id="carta" aria-labelledby="t-carta">
          <div className="contenedor estrecho">
            <h2 id="t-carta">Lo que más pedís</h2>
            <ul className="lista">
              {CARTA.map((p) => (
                <Fila key={p.nombre} izquierda={p.nombre} derecha={p.precio}>
                  <p>{p.detalle}</p>
                </Fila>
              ))}
            </ul>
          </div>
        </section>

        <section className="seccion horario" id="horario" aria-labelledby="t-horario">
          <div className="contenedor dos-columnas">
            <div>
              <h2 id="t-horario">Te esperamos</h2>
              <p className="direccion">
                Calle del Olmo, 12
                <br />
                Madrid
              </p>
              <a
                className="enlace"
                href="https://www.openstreetmap.org/search?query=Calle%20del%20Olmo%2012%20Madrid"
                target="_blank"
                rel="noreferrer"
              >
                Cómo llegar
              </a>
            </div>
            <ul className="lista">
              {HORARIO.map((h) => (
                <Fila key={h.dias} izquierda={h.dias} derecha={h.horas} />
              ))}
            </ul>
          </div>
        </section>

        <section className="seccion contacto" id="contacto" aria-labelledby="t-contacto">
          <div className="contenedor dos-columnas">
            <div>
              <h2 id="t-contacto">¿Nos escribes?</h2>
              <p>
                Para encargar un bizcocho, reservar mesa para un grupo o cualquier otra cosa, déjanos tu mensaje y te
                respondemos.
              </p>
            </div>
            <Contacto />
          </div>
        </section>
      </main>

      <footer className="pie">
        <div className="contenedor pie-rejilla">
          <p>
            <strong>Café La Esquina</strong>
            <br />
            Calle del Olmo, 12 · Madrid
          </p>
          <nav aria-label="Redes sociales" className="redes">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </nav>
          <p className="aviso">Proyecto de práctica: cafetería ficticia.</p>
        </div>
      </footer>
    </>
  );
}
