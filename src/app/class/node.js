import {getRandomArbitrary} from "../fonction/fonction";
/**
 * 1632228 - Luke-Anthony Gauthier
 * 
 * Node
 * 
 * sont des regroupement d'information avec index sont lier par des routes 
 */
export default class Node{
    /**
     * Luke-Anthony Gauthier
     * 
     * Constructeur de Node
     * 
     * @param id est l'identifiant de la node 
     * @returns null
    */ 
    constructor(id) {
      this.id = id;
      this.label = String(id);
      this.group = 0;
      this.nombreConnection=0;
    }
    /**
     * Luke-Anthony Gauthier
     * 
     * couleurAleatoire
     * 
     * change la couleur de la node aléatoirement avec un chiffre
     * 
     * @param max est le chiffre maximal pour les couleur 
     * @returns null
    */ 
    couleurAleatoire(max){
      this.group = getRandomArbitrary(0,max);
    }
}