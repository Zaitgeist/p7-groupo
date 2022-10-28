ReadMe //

____________________________________________APPLICATION___________________________________________________


A la racine du dossier Frontend ouvrir un terminal puis exécuter la commande:

npm install

puis

npm run dev

Normalement le site devrait etre live à l'adresse : http://127.0.0.1:5173/

A la racine du dossier Backend creer un fichier ".env" avec les informations suivantes :

mongo_uri = mongodb://localhost:27017/DB | A remplacer par l'url de connection à votre database mongo
token = RANDOM_TOKEN | Renseigner un token si besoin

Puis toujours a la racine du dossier Backend ouvrir un terminal puis exécuter la commande:


npm install

puis 

nodemon  server

Le server devrait démarrer sur le port 5000


____________________________________________DATABASE___________________________________________________

Dans la base de données que vous avez renseigné au préalable 

Importer les collections : "Comment" "Post" "Users" 

_______________________________________________________________________________________________________

L'inscription demande un Nom d'utilisateur d'une longueur contenu entre 3 et 12 caractéres
Le mail doit étre un mail valide type "xxxx@xxxx.fr"
Et le mot de passe comporter 8 caractéres minimum.
