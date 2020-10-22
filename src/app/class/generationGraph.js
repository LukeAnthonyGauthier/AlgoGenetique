import MereGraph from "./graph"
import Node from "./node";
import Route from "./route";
import { boolRandom, getRandomArbitrary } from "../fonction/fonction";

/**
 * 1632228 - Luke-Anthony Gauthier
 * 
 * generationGraph
 * 
 * Permet de faire un graphes aleatoires avec des couleurs maximal et un nombres nodes 
 */
export default class generationGraph {
     /**
     * Luke-Anthony Gauthier
     * 
     * Constructeur de generationGraph
     * 
     * @param nombreNode est le nombre total que le graphe posséderas
     * @param nombreCouleur est le nombre couleur supplémentaire 
     * @returns null
     */  
    constructor(nombreNode, nombreCouleur) {
        this.nombreNode = nombreNode;
        this.nombreCouleur = nombreCouleur;
    }
    /**
     * Luke-Anthony Gauthier
     * 
     * génére le graph avec les information du construteur 
     *
     * @returns un graph avec les liens et node complété 
     */  
    generationGraph() {
        let nodes = [];
        let routes = [];
        let node;
        let route;
        let graph;
        let index;
        let liens;
        let to;
        let routeDupliquer;
        let routePointeSoit;
        let limiteLiens;


        let nombreDeLiensSupplementaire = 0;
        // chemin de base avec un liens minimal 
        for (index = 0; index < this.nombreNode; index++) {
            node = new Node(index);
            nodes.push(node);
            if (index > 0) {
                route = new Route(index - 1, index);
                routes.push(route);
                nodes[index].nombreConnection++;
                nodes[index - 1].nombreConnection++;
            }
        }
        // fait des liens entres les nodes de plus selon le nombre de couleurs 
        for (index = 0; index < this.nombreNode; index++) {
            if (boolRandom() && this.nombreCouleur > 1) {
                nombreDeLiensSupplementaire = getRandomArbitrary(1, (this.nombreCouleur));

                for (liens = 0; liens < nombreDeLiensSupplementaire; liens++) {
                    if (nodes[index].nombreConnection <= this.nombreCouleur) {
                        do {
                            to = getRandomArbitrary(0, nodes.length - 1);

                            routeDupliquer = false;
                            routePointeSoit = false;
                            limiteLiens = false;



                            if (to === index) {
                                routePointeSoit = true;
                            }
                            for (var i = 0; i < routes.length; i++) {
                                if ((routes[i].to === to && routes[i].from === index) || (routes[i].from === to && routes[i].to === index)) {
                                    routeDupliquer = true;
                                }
                            }
                            if (nodes[to].nombreConnection > this.nombreCouleur) {
                                limiteLiens = true;
                            }

                        } while (routeDupliquer === true || routePointeSoit === true || limiteLiens === true);
                        route = new Route(to, index);
                        routes.push(route)
                        nodes[to].nombreConnection++;
                        nodes[index].nombreConnection++;
                    }
                }

            }
        }
        graph = new MereGraph(nodes, routes, this.nombreCouleur);
        return graph
    }
}


