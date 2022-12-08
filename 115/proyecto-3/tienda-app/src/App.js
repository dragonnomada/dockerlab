// import logo from './logo.svg';
// import './App.css';
import imagenDefault from './assets/default.png';
import { useEffect, useState } from 'react';

function useApiProductos() {
  const [status, setStatus] = useState("initialize");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  return {
    status,
    data,
    error,
    async fetch() {
      setStatus("fetching")
      const baseURL = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;
      const url = baseURL + `/api/productos`;
      const response = await fetch(url);
      setStatus("fetched")
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setStatus("completed")
      } else {
        const error = await response.text();
        setStatus('error');
        setError(error);
      }
    }
  }
}

function useApiAgregarProductos() {
  const [status, setStatus] = useState("initialize");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  return {
    status,
    data,
    error,
    async put(sku, nombre) {
      setStatus("fetching")
      const baseURL = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;
      const url = baseURL + `/api/productos/agregar`;
      const response = await fetch(url, {
        method: "put",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          sku,
          nombre
        })
      });
      setStatus("fetched")
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setStatus("completed")
      } else {
        const error = await response.text();
        setStatus('error');
        setError(error);
      }
    }
  }
}

function App() {
  const apiProductos = useApiProductos();

  useEffect(() => {
    apiProductos.fetch();
  }, [])

  return (
    <div className="App">
      <div>
        {/*         
        <pre><code>{JSON.stringify(process.env, null, 2)}</code></pre>
        <pre><code>{JSON.stringify(apiProductos.status)}</code></pre>
        <pre><code>{JSON.stringify(apiProductos.error)}</code></pre>
        <pre><code>{JSON.stringify(apiProductos.data, null, 2)}</code></pre> 
        */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>IMAGEN</th>
              <th>NOMBRE</th>
              <th>CREADO</th>
              <th>ACTUALIZADO</th>
            </tr>
          </thead>
          <tbody>
            {
              apiProductos.data && (
                apiProductos.data.map(producto => (
                  <tr key={`producto-${producto.id}`}>
                    <td>{producto.id}</td>
                    <td>
                      <img style={{ width: 80 }} src={producto.imagen || imagenDefault} />
                    </td>
                    <td>
                      <div>{producto.nombre}</div>
                    </td>
                    <td>{producto.creado}</td>
                    <td>{producto.actualizado || "SIN ACTUALIZAR"}</td>
                    <td>{producto.eliminado || "SIN ELIMINAR"}</td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
