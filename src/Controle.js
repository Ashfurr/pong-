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
        //quand on appuie sur une touche du clavier
        window.addEventListener("keydown", function (event) {
            if (event.defaultPrevented) {
                return; // je n'explique pas à quoi ça sert ça vous embrouillerait sans raison
            }
            if (event.key === "s") {
                this.scene.joueurGauche.monte();
            }
            if (event.key === "x") {
                this.scene.joueurGauche.descend();
            }
            if (event.key === "p") {
                this.scene.joueurDroite.monte();
            }
            if (event.key === "m") {
                this.scene.joueurDroite.descend();
            }
            event.preventDefault(); // je n'explique pas à quoi ça sert ça vous embrouillerait sans raison
        }, true);

        //quand on relâche une touche du clavier
        //ici on utilise un switch plutôt que des if, c'est pareil, c'est juste une histoire de pain au chocolat vs chocolatine
        window.addEventListener("keyup", function (event) {
            if (event.defaultPrevented) {
                return; // je n'explique pas à quoi ça sert ça vous embrouillerait pour rien
            }
            switch (event.key) {
                case "a":
                case "q":
                    this.scene.joueurDroite.bougePas()
                    break;
                case "p":
                case "m":
                    joueurDroite.bougePas()
                    break;
            }
            event.preventDefault(); // je n'explique pas à quoi ça sert ça vous embrouillerait sans raison
        }, true);
    }
}




