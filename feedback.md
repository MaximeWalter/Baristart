# Feedback

### Git
- Meilleure utilisation de l'outil => faire des commits plus régulier
  - 1 commit par fonctionnalité (auth, suppression de compte, création de la naviguation, ...)
  - 1 commit par jour dans le sens où si tu écris une ligne de code ne va pas dormir sans commit.
- .gitignore pour ne pas déployer certains fichiers git sensibles ou volumineux
- Kraken

> Premier pas avec Git permet d'avoir un pied dans le DevOps

### Misc
- `yarn.lock` et `package.lock`. Les 2 traitents les peer deps differement, il ne faut jamais en avoir 2 dans le meme projet.

### **Style**
- Etre responsive au maximum => Utiliser des pourcentages de taille au lieu de taille fix en pixel
- Utiliser l'API Dimensions 
```javascript
import { Dimensions } from 'react-native';

const height = Dimensions.get('screen').height
const widht = Dimensions.get('screen').width
```
- Variabiliser les couleurs
### Structure de projet
- Englober la logique dans un dossier src
- Compartimenter tes fichiers sources en fonction de ta navigation
### Utilisation des composants
- Plus utiliser des composants => TextInput, Button, Calendrier, Dropdowns, ...
### Firebase
- Vérifer l'init de Firebase une seule fois à la racine
```javascript
  if (!getApps()?.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
```
- La sécuration de Firebase 
- Difference entre Auth et Firestore
### Global State
- Implémenter une librairie de global state => Recoil
- Créer des global hooks => useUser, useSubscription, useTheme, ....
### Gestion de projet (**Jira**, Notion ...)
- Utiliser Notion 
  - Créer des épiques => Les fonctionnalités (Auth, Notificatinos, Academy, Forum, ...)
  - Créer des taches dans tes épiques. Par ex pour l'épique Auth:  
      1. Setup Firebase
      2. Enable Auth
      3. Implementer l'UI
      4. Connecter l'UI a Firebase
   