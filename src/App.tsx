import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [champions, setChampions] = useState<any>([]);
  const [championsLeft, setChampionsLeft] = useState<any>([]);
  const [championsRight, setChampionsRight] = useState<any>([]);
  const [championsLeftOthers, setChampionsLeftOthers] = useState<any>([]);
  const [championsRightOthers, setChampionsRightOthers] = useState<any>([]);

  const [btnGerar, setBtnGerar] = useState(true);
  const [btnGerarOthers, setBtnGerarOthers] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/11.13.1/data/en_US/champion.json`
      )
      .then((res) => {
        var data = res.data.data;

        let result = Object.keys(data).map((key) => [Number(key), data[key]]);

        console.log(result.length);
        setChampions(result);
      });
  }, []);

  function gerarSorteio() {
    const arrayLeft = [];
    const arrayRight = [];

    for (let index = 0; index <= 4; index++) {
      let num = Math.round(Math.random() * (155 - 0) + 0);

      while (arrayLeft.indexOf(num) > -1) {
        num = Math.round(Math.random() * (155 - 0) + 0);
      }

      arrayLeft.push(num);
    }

    for (let index = 0; index <= 4; index++) {
      let num = Math.round(Math.random() * (155 - 0) + 0);

      while (arrayRight.indexOf(num) > -1) {
        num = Math.round(Math.random() * (155 - 0) + 0);
      }

      arrayRight.push(num);
    }

    setChampionsLeft(arrayLeft);
    setChampionsRight(arrayRight);
  }

  function gerarOther() {
    const arrayLeftOthers = [];
    const arrayRightOthers = [];

    for (let index = 0; index <= 4; index++) {
      let num = Math.round(Math.random() * (155 - 0) + 0);

      while (
        arrayLeftOthers.indexOf(num) > -1 &&
        championsLeft.indexOf(num) > -1 &&
        championsRight.indexOf(num) > -1
      ) {
        num = Math.round(Math.random() * (155 - 0) + 0);
      }

      arrayLeftOthers.push(num);
    }

    for (let index = 0; index <= 4; index++) {
      let num = Math.round(Math.random() * (155 - 0) + 0);

      while (
        arrayRightOthers.indexOf(num) > -1 &&
        championsLeft.indexOf(num) > -1 &&
        championsRight.indexOf(num) > -1
      ) {
        num = Math.round(Math.random() * (155 - 0) + 0);
      }

      arrayRightOthers.push(num);
    }

    setChampionsLeftOthers(arrayLeftOthers);
    setChampionsRightOthers(arrayRightOthers);
  }

  function zerar() {
    setChampionsLeft([]);
    setChampionsLeftOthers([]);
    setChampionsRight([]);
    setChampionsRightOthers([]);
  }

  return (
    <div className="app">
      <h1>Sorteio de Aram - Exodia</h1>

      <hr />

      <div className="buttons">
        <button onClick={zerar} disabled={!btnGerar}>
          Reiniciar
        </button>
        <button onClick={gerarSorteio} disabled={!btnGerar}>
          Gerar Times
        </button>
        <button onClick={gerarOther} disabled={!btnGerarOthers}>
          Gerar Bonus
        </button>
      </div>
      <div className="box-times">
        <div className="box">
          {championsLeft.map((item: string | number) => {
            return (
              <div className="champion">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/champion/${champions[item][1].image.full}`}
                />
                <span>{champions[item][1].name}</span>
              </div>
            );
          })}
        </div>
        <div className="box">
          {championsRight.map((item: string | number) => {
            return (
              <div className="champion">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/champion/${champions[item][1].image.full}`}
                />
                <span>{champions[item][1].name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="box-times-others">
        <div className="box">
          {championsLeftOthers.map((item: string | number) => {
            return (
              <div className="champion">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/champion/${champions[item][1].image.full}`}
                />
              </div>
            );
          })}
        </div>
        <div className="box">
          {championsRightOthers.map((item: string | number) => {
            return (
              <div className="champion">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/11.13.1/img/champion/${champions[item][1].image.full}`}
                />
              </div>
            );
          })}
        </div>
        <br />
      </div>
    </div>
  );
}

export default App;
