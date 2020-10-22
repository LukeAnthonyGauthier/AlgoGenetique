import React from "react";
import Graph from "react-graph-vis";
import "./App.css";
import GenPopulation from "./app/class/genPopulation";
import GenerationGraph from "./app/class/generationGraph";
import { v4 as uuidv4 } from "uuid";


function App() {

  const options = {
    nodes: {
      shape: "dot",
      size: 30,
      font: {
        size: 32,
      },
    },
    layout: {
      hierarchical: false,
      randomSeed: 0,
    },
    interaction: {
      dragNodes: true,
      dragView: true,
    },
    physics: {
      enabled: false,
    },
    edges: {
      color: "#000000",
      arrows: {
        to: false,
      },
    },
    height: "500px",

  };

  const graphTest = new GenerationGraph(10,4);
  let graph = graphTest.generationGraph();
  let population = new GenPopulation(8, graph);
  population.cyclePopulation();
  console.log(population);

  const events = { };
  return (

    <div>
      <h1>Félicitaion voici la reponce! cela a pris {population.nombreGeneration} génération</h1>
      <Graph   
        key={uuidv4()}
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
  
      <Graph
        key={uuidv4()}
        graph={population.winner}
        options={options}
        events={events}
        getNetwork={(network) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
    </div>
  );
}

export default App;