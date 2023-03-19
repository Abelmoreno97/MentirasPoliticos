import { useState } from "react";

function ContadorDeMentiras() {
  const [politicos, setPoliticos] = useState([]);

  function handleAgregarPolitico(politico) {
    setPoliticos([...politicos, politico]);
  }

  function handleAgregarMentira(indexPolitico, mentira) {
    const nuevosPoliticos = [...politicos];
    nuevosPoliticos[indexPolitico].mentiras.push(mentira);
    setPoliticos(nuevosPoliticos);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        width: "100%",
      }}
    >
      <h1>Contador de Mentiras de Políticos</h1>
      <AgregarPolitico onAgregarPolitico={handleAgregarPolitico} />
      <button onClick={() => setPoliticos([])}>Reiniciar</button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {politicos.map((politico, index) => (
          <Politico
            key={index}
            nombre={politico.nombre}
            partido={politico.partido}
            foto={politico.foto}
            mentiras={politico.mentiras}
            onAgregarMentira={(mentira) => handleAgregarMentira(index, mentira)}
          />
        ))}
      </div>
    </div>
  );
}

function AgregarPolitico(props) {
  const [nombre, setNombre] = useState("");
  const [partido, setPartido] = useState("");
  const [foto, setFoto] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const nuevoPolitico = {
      nombre,
      partido,
      foto,
      mentiras: [],
    };
    props.onAgregarPolitico(nuevoPolitico);
    setNombre("");
    setPartido("");
    setFoto("");
  }

  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      <h2>Agregar nuevo político</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <br />
        <label htmlFor="partido">Partido:</label>
        <input
          type="text"
          id="partido"
          value={partido}
          onChange={(e) => setPartido(e.target.value)}
        />
        <br />
        <label htmlFor="foto">FotoURL:</label>
        <input
          type="text"
          id="foto"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
        />
        <br />
        <button type="submit">Agregar político</button>
      </form>
    </div>
  );
}

function Politico(props) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [contenido, setContenido] = useState("");
  const [verdad, setVerdad] = useState("");
  const [mostrarMentiras, setMostrarMentiras] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    props.onAgregarMentira({ contenido, verdad });
    setContenido("");
    setVerdad("");
    setMostrarFormulario(false);
  }

  function handleMostrarMentiras() {
    setMostrarMentiras(!mostrarMentiras);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid black",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <h2>
        Nombre:<br></br>
        {props.nombre}
      </h2>
      <h2>
        Partido:<br></br>
        {props.partido}
      </h2>
      <img
        src={props.foto}
        alt={props.nombre}
        style={{ height: "150px", width: "150px" }}
      />
      <p>Mentiras: {props.mentiras.length}</p>
      <button onClick={handleMostrarMentiras}>
        {mostrarMentiras ? "Ocultar" : "Mostrar"} mentiras
      </button>
      {mostrarMentiras && props.mentiras.length > 0 && (
        <ul>
          {props.mentiras.map((mentira, index) => (
            <li key={index}>
              <p>
                <strong>Contenido:</strong> {mentira.contenido}
              </p>
              <p>
                <strong>Verdad:</strong> {mentira.verdad}
              </p>
            </li>
          ))}
        </ul>
      )}
      {mostrarFormulario ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Contenido:</label>
            <input
              type="text"
              value={contenido}
              onChange={(event) => setContenido(event.target.value)}
            />
          </div>
          <div>
            <label>Verdad:</label>
            <input
              type="text"
              value={verdad}
              onChange={(event) => setVerdad(event.target.value)}
            />
          </div>
          <button type="submit">Agregar</button>
        </form>
      ) : (
        <button onClick={() => setMostrarFormulario(true)}>
          Agregar mentira
        </button>
      )}
    </div>
  );
}

console.log(Politico);

export default ContadorDeMentiras;
