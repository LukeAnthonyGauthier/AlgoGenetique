// On renvoie un nombre aléatoire entre une valeur min (incluse) 
// et une valeur max (exclue)
export function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}   
 /**
     * Luke-Anthony Gauthier
     * 
     *On renvoie un bool aléatoire 
     *
     * @returns un bool vrai ou faux
     */  
export function boolRandom(){
    let reponse= getRandomArbitrary(0,1);
    if(reponse === 1){
        return true;
    }
    return false;
}