# Hive FR toolbox

Boite à outils pour la blockchain Hive

## Pré requis

Vous devez avoir NodeJS d'installé : https://nodejs.org/fr

## Installation

cloner le dépôt git

```
git clone https://github.com/Hive-FR/toolbox.git
```

rendez-vous dans le dossier et lancer l'installation des packets

```
cd ./toolbox
npm install
```

lancer la boite à outils

```
npm start
```

## Utilisation

Au démarrage la boite à outils pour la blockchain Hive vous demande ce que vous désirez faire

![image](https://images.hive.blog/DQmWAWHbfvUdogK6f6jQxU3eA2aff3BLecyhYP7A7BeZQ2m/toolbox%20hive-fr.png)

### Générer des clés HIVE

Pour créer un jeu de clés privés compatible pour la blockchain Hive

Les clés générées sont:

- Clé maitre privé (master keys) permettant à elle seule de regénérer toutes les autres clés
- Clés propriétaires (owner keys) privé/publique permettant les opérations les plus sensibles
- Clés actives (active keys) privé/publique permettant les opérations de transfer et de gouvernance
- Clés de publication (posting keys) privé/publique permettant les opérations de publication (post/commentaire)

**ATTENTION : NE COMMUNIQUEZ JAMAIS VOS CLES PRIVEES A DES TIERS !**

Vous avez la possibilité de laisser générer la totalité par la boite à outils ou de spécifier un nom d'utilisateur et/ou une clé maitre.

Exemple de résultat:

![image](https://images.hive.blog/DQmUjCHYN5aMNMXKJwHjiavAypWcBqU3GKByi6zmqy7sjEN/keys.png)

### Re-générer des clés HIVE à partir de la clé maitre (master keys)

### Ajouter une/des clé(s) à un compte Hive avec leur poids

## Contribution

Les demandes de Pull pour de nouvelles fonctionnalités, des corrections de bugs et des suggestions sont les bienvenues !

## Licence

Copyright (C) 2023  @mintrawa (https://hive-fr.com/@mintrawa)

Ce programme est un logiciel libre : vous pouvez le redistribuer et/ou le modifier selon les termes de la Licence Publique Générale GNU telle que publiée par la Free Software Foundation, soit la version 3 de la Licence, soit toute version ultérieure.

Ce programme est distribué dans l'espoir qu'il sera utile, mais SANS AUCUNE GARANTIE ; sans même la garantie implicite de COMMERCIALISATION ou d'ADAPTATION À UN USAGE PARTICULIER. Voir la licence publique générale GNU pour plus de détails.