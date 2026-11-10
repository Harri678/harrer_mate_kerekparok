import { useEffect, useState } from "react";
import "./App.css";
import type { KerekparType } from "./types/kerekparType";

function App() {
  const [kerekparok, setkerekpar] = useState<KerekparType[]>([]);

  function KerekparLista() {
    const URL = "/kerekparok.json";

    useEffect(() => {
      async function adatokBetoltese() {
        const response = await fetch(URL);
        const data: KerekparType[] = await response.json();
        setkerekpar(data);
      }
      adatokBetoltese();
      document.title = "Kiadó kerékpárok";
    }, []);

    return (
      <>
        <h2>Kerekparok szama</h2>
        <p>{kerekparok.length.toString()}</p>

        <h2>Legolcsobb kerekpar berleti dijja</h2>
        <p>{Math.min(...kerekparok.map((k) => k.napiDij)).toString()}</p>

        <h2>Legdragabb kerekpar berleti dijja</h2>
        <p>{Math.max(...kerekparok.map((k) => k.napiDij)).toString()}</p>
      </>
    );
  }

  function KerekparKiiratas({ kerekpar }: { kerekpar: KerekparType }) {
    const [reszletek, setReszletek] = useState(true);

    return (
      <>
        <h3 className="card-title" style={{ color: kerekpar.szin }}>
          {kerekpar.nev}
        </h3>
        {reszletek && (
          <>
        <p className="card-text">
          <em>{kerekpar.tipus}</em>
        </p>
        <p className="card-text">
          <u>{kerekpar.napiDij}</u>
        </p>
        </>
        )}
        <button
          onClick={() => {
            setReszletek(!reszletek);
            console.log(reszletek);
          }}
        >
          {reszletek ? "Megjelenites" : "Elrejtes"}
        </button>
      </>
    );
  }

  function Kerekpar() {
    return (
      <>
        <h2>Kerekparok listaja</h2>
        <div className="container mt-3">
          {kerekparok.map((kerekpar) => (
            <div className="card" key={kerekpar.id}>
              <div className="card-body" key={kerekpar.id}>
                <KerekparKiiratas kerekpar={kerekpar}></KerekparKiiratas>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <KerekparLista></KerekparLista>
      <Kerekpar></Kerekpar>
    </>
  );
}
export default App;
