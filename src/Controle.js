class Controle {
    /**
     * Gère les entrées interactives (clavier, souris, touch tactile etc...)
     */
    constructor(Tableau1) {
        this.scene = Tableau1

        //c'est parti !

        this._ecouteClavier();
    }

    /**
     * Méthode pour commencer à écouter le clavier
     * @private
     */
    _ecouteClavier() {
       let me=this
        //quand on appuie sur une touche du clavier
        window.addEventListener("keydown", function (event) {
            if (event.defaultPrevented) {
                return; // je n'explique pas à quoi ça sert ça vous embrouillerait sans raison
            }
            if (event.key === "s") {
                me.scene.joueurGauche.monte();
            }
            if (event.key === "x") {
                me.scene.joueurGauche.descend();
            }
            if (event.key === "j") {
                me.scene.joueurDroite.monte();
            }
            if (event.key === "n") {
                me.scene.joueurDroite.descend();
            }
            event.preventDefault(); // je n'explique pas à quoi ça sert ça vous embrouillerait sans raison
        }, true);
       window.addEventListener("keyup", function (event) {
            if (event.defaultPrevented) {
                return; // je n'explique pas à quoi ça sert ça vous embrouillerait sans raison
            }
            if (event.key === "s") {
                me.scene.joueurGauche.bougepas();
            }
            if (event.key === "x") {
                me.scene.joueurGauche.bougepas();
            }
            if (event.key === "j") {
                me.scene.joueurDroite.bougepas();
            }
            if (event.key === "n") {
                me.scene.joueurDroite.bougepas();
            }
            if (event.code==='Space') {
                if(me.scene.start==0){
                    me.scene.start=1
               me.scene.startF()}
            }
            event.preventDefault(); // je n'explique pas à quoi ça sert ça vous embrouillerait sans raison
        }, true);


    }
}




