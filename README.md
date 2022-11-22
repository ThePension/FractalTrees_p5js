# FractalTrees_p5js
Fractal trees using P5JS

![result image](https://github.com/ThePension/FractalTrees_p5js/blob/main/result.png)

## Preview
- On github hosting page : https://thepension.github.io/FractalTrees_p5js/
- On P5js web editor : https://editor.p5js.org/ThePension/sketches/9vt0OVYWT

## 1. Structure source
La demande pour cet exercice est de créer des fractales. Nous sommes partis sur l'idée de faire des fractacles de type arbres chaotiques, ou les angles, le nombre d'enfants et les couleurs seraient aléatoires. Nous avons aussi utilisé le bruit (Perlin noise) pour faire bouger aléatoirement nos fractales, afin de donner une impression de vie.
Le résultat final est des fractales ressemblant à des algues de couleurs différentes, flottant au fond de l'océan, perturbées par un courant marin (simulé par le bruit).
Les contraintes pour ce Laboratoire sont d'utiliser les Design Patterns suivants :

 * Singleton
 * Composite

Le Singleton permet d'instancier de façon unique la classe de dessin "Drawer". Celle-ci permet de dessiner un cercle ou une ligne suivant une coordonnée et une couleur.
Chacune des branches de nos algues (arbres) utilisent cette classe pour se dessiner elle-mêmes, et utilisent donc la même instance de dessin.

Nous avons utilisé le Composite pour faire les branches et les feuilles des fractales.<br>
D'une classe "Component" abstraite sont dérivées deux classes filles, "Branch" et "Leaf" qui doivent toutes deux implémenter les méthodes de <i>draw()</i> et <i>update()</i>.

Chacune des branches s'occupe de créer ses enfants (lors de sa construction). Le nombre d'enfant est aléatoire, la valeur d'enfants maximale est choisie par l'utilisateur.
Si aucune branche n'est créée, ou que la profondeur maximale est atteinte (également déterminée par l'utilisateur), une feuille est créée (symbolisée par les ronds).

Lorsqu'une branche est mise à jour (modification de l'angle afin de créer une impression de mouvement), elle met également à jour ses enfants directs.
Cela nous permet de mettre uniquement à jour la racine (tronc) de notre arbre, et non de mettre à jour toutes les branches manuellement.

## 2. Les DPs
### 2.1 Le Singleton
Le singleton est un design pattern dont l'objectif est de limiter le nombre d'instance d'une classe, afin de gagner en espace mémoire. Généralement, le singleton limite le nombre d'instance à 1, mais il est possible de faire varier cette valeur.


### 2.1.1 Faiblesses Singleton
Utiliser un singleton complique les tests unitaires. Le couplage entre une classe et un singleton est, du fait que le singleton introduit des états globaux à l'application, un couplage fort. Ce couplage fort empêche les tests unitaires sur une classe seule, on se retrouve à tester la classe et son singleton. 

Utiliser un singleton a tendance à cacher les dépendances. Habituellement, quand une classe a besoin d'une ressource externe, c'est immédiatement visible. Mais dans le cas d'un singleton, quand une classe l'appelle, ça ne se voit pas directement dans le constructeur ou les méthodes.

Si on crée un singleton avec la méthode populaire de lazy loading 

```CPP
public static Singleton getInstance() {
    if (instance == null) {
        instance = new Singleton();
    }
    return instance;
} 
```
il est possible de se retrouver avec plusieurs instances de singleton dans le cas où plusieurs thread accèdent en parallèle à la méthode <i>getInstance()</i>.


### 2.1.2 Forces Singleton
Un singleton peut servir à coordonner un programme autour d'une unique instance. Par exemple la gameloop d'un jeu est souvent un singleton car on a besoin d'une seule boucle pour tout le jeu.

Une autre force du singleton est son efficacité. En limitant le nombre d'instance en mémoire et en forçant tout le monde à référer à cette unique instance (au lieu d'avoir chaque utilisateur qui crée une nouvelle instance). Ceci économise de la place en mémoire en évitant la redondance.

Le singleton a aussi l'avantage de n'être instancié que quand il est nécessaire (lazy loading).

Un singleton permet d'éviter de déconnecter/reconnecter un utilisateur à un service. Par exemple, si l'utilisateur est connecté sur un site et qu'il appuie de nouveau sur le bouton connecter, le singleton de connexion étant déjà instancié, l'utilisateur ne sera pas déconnecté.

### 2.2 Composite
Le composite est un desgin pattern qui permet une conceptualisation structurelle de nos classes. Il permet d'agencer des objets dans une arboresence, ou chaque objet est contenu et peut être aussi contenant.
### 2.2.1 Faiblesses Composite
Il ne s'applique qu'à des cas très spécifiques. Il peut être difficile de trouver une interface commune à plusieurs classes dans un projet, car les fonctionnalités sont trop différentes. Ce qui aboutit à une interface <i>Component</i> trop générique et plus difficile à comprendre.

### 2.2.2 Forces Composite
Il facilite le travail dans les structures arborescentes complexes, car il utilise de manière optimisée les avantages du polymorphisme et de la résursivité.
Principe ouvert/fermé. Il permet d'introduire facilement des nouveaux types d’éléments dans l'arboresence, sans avoir à réécrire la classe dans laquelle il existe. [refactoring.guru 2022]

## 3. Conclusion
Le composite permet de faire un meilleur héritage à plusieurs niveaux.
Si nous prenons la création d'un arbre, il pourrait être fait avec plusieurs classes différentes pour symbolyser différents types de branche suivant leur niveaux, jusqu'à atteindre les feuilles. Mais cela introduirait un travail fastidieux de copier-coller afin de créer chaque branche et sous-branche, et ne permettrait pas d'ajouter simplement de niveaux supplémentaires dans l'arborescence.

Avec le Composite, qui permet de faire des enfants de sa propre classe, il est facile de créer un arbre avec peu de classes car la récursivité fait que chaque fils est de la même classe parente :  la classe <i>Component</i> à partir de laquelle on peut créer soit une <i>Leaf</i>, qui représente l'extrémité d'une branche (ne peut plus rien contenir), soit une <i>Branch</i>, qui elle peut contenir d'autres <i>Branch</i> ou <i>Leaf</i>.

Le Singleton permet de faire de l'économie de mémoire ; dans notre cas, au lieu de recréer une instance de dessin pour chaque branche (le nombre d'instances augmenterait très rapidement (exponentiel)) (et donc de devoir la détruire), on utilise une instance qui a été faite dans la classe Mère <i>Component</i> qui est abstraite. Chaque enfant voudra créer une nouvelle instance de Drawer (vu que c'est dans le constructeur de la classe mère), mais le singleton leur partagera une instance commune.
## 4. Sources
Pour la création du Singleton:<br>
Stack overflow, 2022, Simplest/cleanest way to implement a singleton in JavaScript [en ligne], Modifié en Septembre 2021, [Consutlé le 30 mars 2022]. Disponible à l’adresse : https://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-a-singleton-in-javascript

Pour les points forts et faibles du Singleton:<br>
Vojtech Ruzicka's Programming Blog, 2016, Singleton Pattern Pitfalls [en ligne], Modifié le 3 juillet 2019, [Consulté le 30 mars 2022]. Disponible à l’adresse : https://www.vojtechruzicka.com/singleton-pattern-pitfalls/

Stack overflow, 2022, What is the advantage of Singleton Design Pattern [en ligne], Août 2021, [Consulté le 30 mars 2022]. Disponible à l’adresse :
https://stackoverflow.com/questions/12901734/what-is-the-advantage-of-singleton-design-pattern

Pour les points forts et faibles du Composite:<br>
Refactoring.Guru., 2022, Composite [en ligne], Date inconnue, [Consulté le 30 mars 2022]. Disponible à l'adresse :
https://refactoring.guru/fr/design-patterns/composite
