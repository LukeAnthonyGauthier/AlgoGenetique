import _ from 'lodash';

/**
 * 1632228 - Luke-Anthony Gauthier
 * 
 * Graph
 * 
 * Est un groupe de noeud avec des arêtes
 * Contient les information et les fonction au bon fonciton des graphes
 */
export default class Graphe{
   /**
     * Luke-Anthony Gauthier
     * 
     * Constructeur de Graph
     * 
     * @param nodes est le tableau qui represente tout les nodes du graphe
     * @param routes est le tableau qui represente tout les routes du graphe
     * @param nombreCouleurSuplementaire nombre de couleur de géres par le graphique commence par a 1 obligatoirement 
     * @returns null
     */  
  constructor(nodes , routes, nombreCouleurSuplementaire) {
    this.nodes = _.cloneDeep(nodes);
    this.edges = _.cloneDeep(routes);
    this.nombreCouleur = nombreCouleurSuplementaire;
    this.pointage=0;
    
  }
     /**
     * Luke-Anthony Gauthier
     * 
     * Fait une boucle  sur tout les noeuds et les fait changé de groupe aléatoirement 
     * 
     * @param null
     * @returns null
     */
   melangeCouleur(){
    this.nodes.forEach(node => {
        node.couleurAleatoire(this.nombreCouleur);
    });
  }
 /**
     * Luke-Anthony Gauthier
     * 
     * Fait une boucle  sur tout les noeuds et cacule le pointage
     * 
     * le pointage est le nombre de liens surperflue qu'il posséde 
     * 
     * @param null
     * @returns null
     */

  calculDesPoint(){
    this.pointage=0;
    this.edges.forEach(edge => {
        if(this.nodes[edge.from].group === this.nodes[edge.to].group){

            this.pointage++;
        }     
    });
  }

        

}