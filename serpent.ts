//prend en entrée une liste de participant triée par niveau ainsi que le nombre de groupe et le tableau des groupe listé

function attributionEQuipe_Groupe(listeP: list, nbrGroupe: number, T: tableau){
    let i=0;//donne le groupe 
    let sens=0; //fait le serpent  0 = -> sinon <-
    while (nonvide(listeP)){
        if (sens==0 && i<nbrGroupe){
            T[i].append(tete(listeP));
            listeP=queue(listeP);
            i++;
        }
        else if (sens!=0 && i>=0){
            T[i].append(tete(listeP));
            listeP=queue(listeP);
            i--;
        }
        else if (sens == 0){sens=1;}
        else {sens=0;}
    }
}