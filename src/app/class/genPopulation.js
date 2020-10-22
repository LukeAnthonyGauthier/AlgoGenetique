import EnfantGraph from "./graph"
import _ from 'lodash';
import { getRandomArbitrary, boolRandom } from "../fonction/fonction";
/*
*1632228 Luke-Anthony Gauthier
*
*
*GenPopulation
*
*
*Faite les cycles de générations des populations pour identifé le gagnant
*/
export default class GenPopulation {
    /**
     * Luke-Anthony Gauthier
     * 
     * Constructeur de GenPopulation
     * 
     * @param populationTotal est le nombre de graph par population 
     * @param graph est le graph utiliser pour les population 
     * 
     * @returns null
     */  
    constructor(populationTotal, graph) {
        this.populationTotal = populationTotal;
        this.graph = graph;
        this.winner = undefined;
        this.population = [];
        this.nombreGeneration = 0;


        for (let index = 0; index < populationTotal; index++) {
            let enfantGraph = new EnfantGraph(this.graph.nodes, this.graph.edges, this.graph.nombreCouleur);
            enfantGraph.melangeCouleur();
            this.population.push(enfantGraph);
        }
    }
    /**
     * Luke-Anthony Gauthier
     * 
     * Fait le cycle pour passé dans tout les fonction de façons ordonné 
     * permet de trouvé un gagnant 
     *
     */  
    cyclePopulation() {
        let win = false;
        while (win === false) {
            if (this.pointageEnfants()) {
                win = true;
            }
            if(win === false){
                this.selection();
                this.reproduction();
                this.mutation();
                this.nombreGeneration++;
            }    
        }
    }
    /**
     * Luke-Anthony Gauthier
     * 
     * Boucle sur tout les nodes des graphes pour savoir le nombre d'erreurs 
     * pointage élevé = mauvais
     *
     */  
    pointageEnfants() {
        let i;
        for (i = 0; i < this.population.length; i++) {
            this.population[i].calculDesPoint();
            if (this.population[i].pointage === 0) {
                this.winner = this.population[i];
                return true;
            }
        }

    }
     /**
     * Luke-Anthony Gauthier
     * 
     * prend les mielleur de la génération et détruit les autres 
     * 
     */  
    selection() {
        this.population.sort((a, b) => a.pointage - b.pointage);
        this.population = this.population.slice(0, (Math.round(this.population.length / 4)));
    }
    /**
     * Luke-Anthony Gauthier
     * 
     * Créé les nouveaux membres pour la prochain population
     * 
     */  
    reproduction() {
        let nombreDancien = this.population.length - 1
        let enfant;
        let mom;
        let dad;
        while (this.population.length < this.populationTotal) {

            let incrementeur = 0;
            //choisi deux graph aleatoir differents parmis les restant 
            do {
                 mom = this.population[getRandomArbitrary(0, nombreDancien)]
                 dad = this.population[getRandomArbitrary(0, nombreDancien)]
            } while (mom === dad);

            enfant = new EnfantGraph(this.graph.nodes, this.graph.edges, this.graph.nombreCouleur);

            // Fait un nouveau membres du graphique avec des morceaux de papa et maman
            enfant.nodes.forEach(node => {

                if (boolRandom()) {
                    node.group = _.cloneDeep(dad.nodes[incrementeur].group);
                } else {
                    node.group = _.cloneDeep(mom.nodes[incrementeur].group);
                }
                incrementeur++;
            });

            this.population.push(enfant);
        }
    }
        /**
     * Luke-Anthony Gauthier
     * 
     * Donne des chances de faire muté les nouveau et les meillieur de l'anciéne génération
     * permet de trouvé un gagnant 
     *
     */  
    mutation() {
        // donne chance de mutation
        if (boolRandom()) {
            let typeMuation = getRandomArbitrary(0, 100);
            let mutant;
            let i
            let populationTotal = this.population.length-1
            let nodeTotal = this.population[0].nodes.length-1;
           
            //Mutant singulié
            if (typeMuation <= 50) {
                //mutation singulière
                mutant = this.population[getRandomArbitrary(0, populationTotal)];
               
                if (typeMuation => 25) {
                    mutant.nodes[getRandomArbitrary(0, nodeTotal)].couleurAleatoire(mutant.nombreCouleur);
                }
                //mutaion multiple 
                else {
                   
                    let nombreMutation = getRandomArbitrary(0, getRandomArbitrary(0, nodeTotal))
                    for (i = 0; i < nombreMutation; i++) {
                        mutant.nodes[i].couleurAleatoire(mutant.nombreCouleur);
                    }

                }
            }
            // Multiple Mutants 
            else {
                let nombreMutant = getRandomArbitrary(0, Math.round(populationTotal / 4));
                for (i = 0; i < nombreMutant; i++) {
                    mutant = this.population[getRandomArbitrary(0, populationTotal)];
                    //mutation singulière
                    if (boolRandom) {
                        mutant.nodes[getRandomArbitrary(0, nodeTotal)].couleurAleatoire(mutant.nombreCouleur);
                    }
                    //mutaion multiple  
                    else {
                        let nombreMutation = getRandomArbitrary(0, getRandomArbitrary(0, nodeTotal))
                        for (i = 0; i < nombreMutation; i++) {
                            mutant.nodes[i].couleurAleatoire(mutant.nombreCouleur);
                        }
                    }
                }
            }


        }
    }



}