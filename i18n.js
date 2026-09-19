/* Seen — couche de langue (FR / EN).
   Principe : l'app est écrite en anglais dans le code ; ce fichier traduit au
   moment où le texte arrive dans le DOM (textContent, innerHTML, title,
   placeholder). Pour ajouter une traduction, il suffit d'ajouter une entrée
   dans DICT_FR (ou un motif dans PATTERNS_FR pour les textes avec des chiffres
   ou des noms dedans). Aucun autre fichier à toucher. */
(function () {
  var LANG_KEY = "seen_lang";
  function detect() {
    try { var v = localStorage.getItem(LANG_KEY); if (v === "fr" || v === "en") return v; } catch (e) {}
    return String(navigator.language || "en").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
  }
  var LANG = detect();
  window.LANG = LANG;
  window.seenLang = function () { return LANG; };
  window.tmdbLang = function () { return LANG === "fr" ? "fr-FR" : "en-US"; };
  window.numLocale = function () { return LANG === "fr" ? "fr-FR" : "en-US"; };
  window.setSeenLang = function (l) {
    if (l !== "fr" && l !== "en") return;
    try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
    location.reload();
  };

  var DICT_FR = {
    /* ---- auth ---- */
    "Log in": "Connexion",
    "Create account": "Créer un compte",
    "Username": "Nom d'utilisateur",
    "How your friend will see you": "Le nom que verront tes amis",
    "Email": "E-mail",
    "you@example.com": "toi@exemple.com",
    "Password": "Mot de passe",
    "At least 6 characters": "6 caractères minimum",
    "Please fill in email and password.": "Remplis l'e-mail et le mot de passe.",
    "Please choose a username.": "Choisis un nom d'utilisateur.",
    "Please wait...": "Un instant…",
    "Account created.": "Compte créé.",
    "Account created. Check your email to confirm, then log in.": "Compte créé. Confirme ton e-mail, puis connecte-toi.",

    /* ---- barre du haut / menu ---- */
    "Notifications": "Notifications",
    "View my profile": "Voir mon profil",
    "Your rank": "Ton rang",
    "Edit profile": "Modifier le profil",
    "Settings": "Réglages",
    "Log out": "Déconnexion",
    "You": "Toi",

    /* ---- navigation ---- */
    "Home": "Accueil",
    "Search": "Rechercher",
    "Collection": "Collection",
    "Next": "À suivre",
    "Social": "Social",
    "Stats": "Stats",
    "‹ Home": "‹ Accueil",
    "‹ Friends": "‹ Amis",

    /* ---- accueil ---- */
    "Welcome back": "Content de te revoir",
    "Total watch time": "Temps de visionnage",
    "Watching": "En cours",
    "Watchlist": "À voir",
    "Pick for me!": "Choisis pour moi !",
    "Let Seen choose your next watch from your watchlist": "Laisse Seen piocher dans ta liste à voir",
    "Universe watch orders": "Ordres de visionnage",
    "Latest achievements": "Derniers succès",
    "See all ›": "Tout voir ›",
    "Continue watching": "Reprendre",
    "Your gems 💎": "Tes pépites 💎",
    "Recommended for you": "Recommandé pour toi",
    "Good night": "Bonne nuit",
    "Good morning": "Bonjour",
    "Good afternoon": "Bon après-midi",
    "Good evening": "Bonsoir",
    "Your collection is empty. Add something from Search.": "Ta collection est vide. Ajoute un titre depuis la recherche.",
    "Create your own": "Crée le tien",
    "Build a custom watch order": "Construis ton propre ordre",
    "Custom": "Perso",

    /* ---- recherche ---- */
    "Search a film or series...": "Cherche un film ou une série…",
    "Loading trending...": "Chargement des tendances…",
    "Trending this week": "Tendances de la semaine",
    "Finding recommendations...": "Recherche de recommandations…",
    "Searching...": "Recherche…",
    "Searching…": "Recherche…",
    "Results": "Résultats",
    "No image": "Pas d'image",
    "Series": "Série",
    "Movie": "Film",
    "Watched ✓": "Vu ✓",
    "Mark watched": "Marquer vu",
    "Added to watchlist": "Ajouté à la liste à voir",
    "Removed from watchlist": "Retiré de la liste à voir",
    "Marked as watched": "Marqué comme vu",
    "Untitled": "Sans titre",
    "No results.": "Aucun résultat.",
    "Search failed.": "Échec de la recherche.",

    /* ---- collection ---- */
    "My gems 💎": "Mes pépites 💎",
    "All": "Tout",
    "Watched": "Vu",
    "Loading your collection...": "Chargement de ta collection…",
    "Your collection is empty. Add titles from Search.": "Ta collection est vide. Ajoute des titres depuis la recherche.",
    "Nothing here yet.": "Rien ici pour l'instant.",

    /* ---- fiche titre ---- */
    "Where to watch (France)": "Où regarder (France)",
    "Status": "Statut",
    "Progress": "Progression",
    "Your rating": "Ta note",
    "Rewatches": "Revisionnages",
    "Gem": "Pépite",
    "Mark as a gem": "Marquer comme pépite",
    "One of your gems": "Une de tes pépites",
    "Recommend to a friend": "Recommander à un ami",
    "Cast": "Casting",
    "Remove from collection": "Retirer de la collection",
    "Loading...": "Chargement…",
    "Loading…": "Chargement…",
    "No description available.": "Pas de description disponible.",
    "Stream": "Streaming",
    "Rent": "Location",
    "Buy": "Achat",
    "Other…": "Autres…",
    "Saved": "Enregistré",
    "Removed": "Retiré",
    "Could not remove": "Suppression impossible",
    "Not saved. Try logging out and back in.": "Pas enregistré. Déconnecte-toi puis reconnecte-toi.",
    "Added to gems 💎": "Ajouté aux pépites 💎",
    "Removed from gems": "Retiré des pépites",
    "Watch next": "Prochain épisode",
    "All caught up": "À jour",
    "Unmark whole season": "Décocher la saison",
    "Mark whole season": "Cocher la saison",
    "seen once so far": "vu une fois pour l'instant",

    /* ---- succès ---- */
    "First steps": "Premiers pas",
    "Add your first title": "Ajoute ton premier titre",
    "Cinephile": "Cinéphile",
    "10 films watched": "10 films vus",
    "Bingewatcher": "Bingewatcher",
    "5 series finished": "5 séries terminées",
    "Critic": "Critique",
    "Rate 10 titles": "Note 10 titres",
    "Big screen": "Grand écran",
    "25 films watched": "25 films vus",
    "Marathoner": "Marathonien",
    "10 series finished": "10 séries terminées",
    "Curator": "Curateur",
    "Pick 6 gems": "Choisis 6 pépites",
    "Librarian": "Bibliothécaire",
    "50 titles total": "50 titres au total",
    "common": "commun",
    "uncommon": "peu commun",
    "epic": "épique",
    "legendary": "légendaire",
    "Unlocked": "Débloqué",
    "Unlocked ✓": "Débloqué ✓",
    "achievements unlocked": "succès débloqués",
    "Achievements": "Succès",
    "Badges you've unlocked": "Les succès que tu as débloqués",

    /* ---- rangs ---- */
    "Newbie": "Débutant",
    "Netflix account borrower": "Emprunteur de compte Netflix",
    "Popcorn seller": "Vendeur de popcorn",
    "Trailer addict": "Accro aux bandes-annonces",
    "Just one more episode": "Encore un épisode",
    "Couch critic": "Critique de canapé",
    "IMDb detective": "Détective IMDb",
    "Certified cinephile": "Cinéphile certifié",
    "Festival regular": "Habitué des festivals",
    "The Academy": "L'Académie",
    "Max rank reached 🏆": "Rang maximum atteint 🏆",
    "Rank ladder": "Échelle des rangs",
    "Where your XP comes from": "D'où vient ton XP",
    "Start watching to earn XP.": "Regarde des titres pour gagner de l'XP.",
    "📺 Episodes": "📺 Épisodes",
    "✅ Series finished": "✅ Séries terminées",
    "⭐ Ratings": "⭐ Notes",
    "💎 Gems": "💎 Pépites",
    "↻ Rewatches": "↻ Revisionnages",

    /* ---- profil ---- */
    "Loading your profile...": "Chargement de ton profil…",
    "✏️ Edit profile": "✏️ Modifier le profil",
    "🎨 Appearance": "🎨 Apparence",
    "This is how your profile looks to friends. Tap Edit to change your avatar, colour, bio and what's shown.": "Voilà ton profil tel que le voient tes amis. Touche Modifier pour changer l'avatar, la couleur, la bio et ce qui s'affiche.",
    "Gems": "Pépites",
    "Badges": "Badges",
    "Favourite genres": "Genres préférés",
    "Personalise what friends see when they open your profile.": "Personnalise ce que tes amis voient sur ton profil.",
    "Avatar": "Avatar",
    "Accent colour (used across the app)": "Couleur d'accent (utilisée dans toute l'app)",
    "Status / bio": "Statut / bio",
    "A line about your taste, what you're watching, anything...": "Une phrase sur tes goûts, ce que tu regardes, ce que tu veux…",
    "Favourite genres (up to 3)": "Genres préférés (3 max)",
    "What friends can see": "Ce que tes amis peuvent voir",
    "Save profile": "Enregistrer",
    "Saving...": "Enregistrement…",
    "Profile saved": "Profil enregistré",
    "Up to 3 genres": "3 genres maximum",
    "Use my initial": "Utiliser mon initiale",
    "Gems shelf": "Étagère de pépites",
    "Your pinned gems": "Tes pépites épinglées",
    "Stats row": "Ligne de stats",
    "Watched / gems / badges counts": "Compteurs vus / pépites / badges",
    "Action": "Action", "Adventure": "Aventure", "Animation": "Animation", "Comedy": "Comédie",
    "Crime": "Policier", "Documentary": "Documentaire", "Drama": "Drame", "Fantasy": "Fantastique",
    "Horror": "Horreur", "Mystery": "Mystère", "Romance": "Romance", "Sci-Fi": "SF",
    "Thriller": "Thriller", "Family": "Famille", "Music": "Musique", "War": "Guerre",
    "Western": "Western", "History": "Histoire",
    "Coral": "Corail", "Sunset": "Coucher de soleil", "Gold": "Or", "Lime": "Citron vert",
    "Teal": "Turquoise", "Sky": "Ciel", "Indigo": "Indigo", "Violet": "Violet",
    "Pink": "Rose", "Slate": "Ardoise",

    /* ---- réglages ---- */
    "Appearance and app preferences. Saved on this device.": "Apparence et préférences. Enregistré sur cet appareil.",
    "Language": "Langue",
    "Theme": "Thème",
    "☀️ Light": "☀️ Clair",
    "🌙 Dark": "🌙 Sombre",
    "🖥 System": "🖥 Système",
    "Accent colour": "Couleur d'accent",
    "Start on": "Onglet de départ",
    "Motion": "Animations",
    "Reduce motion": "Réduire les animations",
    "Calmer animations across the app": "Des animations plus calmes dans toute l'app",
    "Episodes": "Épisodes",
    "Show episode titles": "Afficher les titres d'épisodes",
    "Off hides episode names to avoid spoilers": "Désactivé, les noms d'épisodes sont masqués (anti-spoil)",
    "Start tab set": "Onglet de départ enregistré",
    "Episode titles on": "Titres d'épisodes affichés",
    "Episode titles hidden": "Titres d'épisodes masqués",

    /* ---- onglet À suivre ---- */
    "What to watch next: the series you're behind on, plus release dates coming up on your lists.": "Quoi regarder ensuite : les séries sur lesquelles tu as du retard, et les sorties à venir dans tes listes.",
    "Loading what's coming...": "Chargement de la suite…",
    "Checking your series...": "Vérification de tes séries…",
    "Add films or series to your lists to see what's next.": "Ajoute des films ou des séries à tes listes pour voir la suite.",
    "Nothing to catch up on and nothing on the horizon right now.": "Rien à rattraper et rien à l'horizon pour l'instant.",
    "Ready to watch": "Prêt à regarder",
    "Ready to watch · still airing": "À rattraper · en cours de diffusion",
    "Ready to watch · finished series": "À rattraper · séries terminées",
    "Premiere": "Première",
    "Latest": "Dernier épisode",
    "Season": "Saison",
    "Waiting": "En attente",
    "Coming soon": "Bientôt",
    "Still airing": "En cours de diffusion",
    "Finished series": "Séries terminées",
    "New season coming": "Nouvelle saison en approche",
    "Waiting for a sequel": "En attente d'une suite",
    "Out now": "Disponible",
    "Today": "Aujourd'hui",
    "Tomorrow": "Demain",
    "No date announced yet": "Pas encore de date annoncée",
    "Season announced": "Saison annoncée",
    "In production": "En production",
    "New episodes out": "Nouveaux épisodes sortis",
    "New season of": "Nouvelle saison de",
    "New episodes available": "De nouveaux épisodes sont sortis",

    /* ---- social ---- */
    "Friends": "Amis",
    "Add a friend": "Ajouter un ami",
    "Friend's username": "Nom d'utilisateur de l'ami",
    "Find": "Chercher",
    "Recommended to you": "Recommandé par tes amis",
    "Friend requests": "Demandes d'amis",
    "Your friends": "Tes amis",
    "Pending (sent)": "En attente (envoyées)",
    "No friends yet. Add one by username above.": "Pas encore d'amis. Ajoute-en un avec son nom d'utilisateur.",
    "Tap to compare": "Touche pour comparer",
    "wants to be friends": "veut devenir ton ami",
    "request sent": "demande envoyée",
    "Accept": "Accepter",
    "Decline": "Refuser",
    "Cancel": "Annuler",
    "Could not accept": "Impossible d'accepter",
    "Friend added": "Ami ajouté",
    "Already linked": "Déjà connectés",
    "Could not send request": "Envoi impossible",
    "Request sent": "Demande envoyée",
    "Error": "Erreur",
    "Sent": "Envoyé",
    "Sent ✓": "Envoyé ✓",
    "Wants to add you": "Veut t'ajouter",
    "Add": "Ajouter",
    "Add to watchlist": "Ajouter à la liste",
    "Dismiss": "Ignorer",
    "Already recommended": "Déjà recommandé",
    "Could not send": "Envoi impossible",
    "Recommended": "Recommandé",

    /* ---- comparaison ---- */
    "Finished": "Terminé",
    "Seen by both ✓": "Vu par vous deux ✓",
    "Both watching": "En cours tous les deux",
    "Both to watch": "À voir tous les deux",
    "Series in common": "Séries en commun",
    "Remove friend": "Retirer cet ami",
    "not in your collection": "pas dans ta collection",

    /* ---- univers ---- */
    "Watch order": "Ordre de visionnage",
    "Release": "Sortie",
    "Timeline": "Chronologie",
    "A galaxy far, far away": "Une galaxie lointaine, très lointaine",
    "The Marvel Cinematic Universe": "L'univers cinématographique Marvel",
    "Harry Potter & Fantastic Beasts": "Harry Potter et les Animaux fantastiques",
    "The Lord of the Rings & The Hobbit": "Le Seigneur des anneaux et Le Hobbit",
    "Middle-earth": "Terre du Milieu",
    "In-timeline order. Open each series for its chronological episode walkthrough. The Clone Wars finale (the Siege of Mandalore) sits after Revenge of the Sith.": "Ordre chronologique. Ouvre chaque série pour son parcours épisode par épisode. Le final de The Clone Wars (le Siège de Mandalore) se place après La Revanche des Sith.",
    "Films only. The cult order that skips Episode I.": "Films uniquement. L'ordre culte qui saute l'Épisode I.",
    "In-universe order (my best pass; the MCU timeline is debated, easy to tweak).": "Ordre chronologique interne (au mieux ; la chronologie du MCU se discute, facile à ajuster).",
    "Story order. Fantastic Beasts (1920s-30s) comes before Harry Potter.": "Ordre de l'histoire. Les Animaux fantastiques (années 1920-30) viennent avant Harry Potter.",
    "Middle-earth timeline. The Rings of Power (Second Age) first.": "Chronologie de la Terre du Milieu. Les Anneaux de Pouvoir (Second Âge) d'abord.",
    "Up next (you are here)": "À suivre (tu en es là)",
    "Complete": "Terminé",
    "You've seen everything released 🎉": "Tu as vu tout ce qui est sorti 🎉",
    "Upcoming": "À venir",
    "Not seen": "Pas vu",
    "Re-seen": "Revu",
    "To re-watch": "À revoir",
    "Mark re-seen": "Marquer revu",
    "Unmark all": "Tout décocher",
    "Mark all watched": "Tout cocher",
    "Mark all re-seen": "Tout marquer revu",
    "Rewatch this universe": "Revoir cet univers",
    "Restart this rewatch": "Recommencer ce revisionnage",
    "Tap again to confirm": "Touche encore pour confirmer",
    "Show my overall progress instead": "Revenir à ma progression globale",
    "Back to overall progress": "Retour à la progression globale",
    "Edit this universe": "Modifier cet univers",
    "Delete this universe": "Supprimer cet univers",
    "Tap again to delete": "Touche encore pour supprimer",
    "Unsubscribe from this universe": "Se désabonner de cet univers",
    "Rewatch started. Tick titles as you re-watch them.": "Revisionnage lancé. Coche les titres au fur et à mesure.",
    "Subscribed. It's on your home.": "Abonné. C'est sur ton accueil.",
    "Unsubscribed": "Désabonné",
    "Subscribe": "S'abonner",
    "Subscribed": "Abonné",
    "Already subscribed": "Déjà abonné",
    "Loading episodes…": "Chargement des épisodes…",
    "Create a universe": "Créer un univers",
    "Edit universe": "Modifier l'univers",
    "Name": "Nom",
    "Tagline": "Sous-titre",
    "A short subtitle": "Un court sous-titre",
    "e.g. James Bond": "ex. James Bond",
    "Add titles": "Ajouter des titres",
    "Search movies & series…": "Cherche films et séries…",
    "No titles yet. Search above and tap to add.": "Aucun titre. Cherche ci-dessus et touche pour ajouter.",
    "Save changes": "Enregistrer",
    "Create universe": "Créer l'univers",
    "Already added": "Déjà ajouté",
    "Give it a name": "Donne-lui un nom",
    "Add at least one title": "Ajoute au moins un titre",
    "Universe updated": "Univers mis à jour",
    "Universe created": "Univers créé",
    "Universe deleted": "Univers supprimé",
    "Add episodes one by one": "Ajouter les épisodes un par un",
    "Untitled universe": "Univers sans titre",
    "a friend": "un ami",
    "Series · chronological episode order": "Série · ordre chronologique des épisodes",
    "Series · episodes in release order": "Série · épisodes dans l'ordre de diffusion",
    "Series · episode breakdown": "Série · détail par épisode",
    "The Clone Wars: Siege of Mandalore": "The Clone Wars : le Siège de Mandalore",
    "Runs alongside Revenge of the Sith, then continues past it": "Se déroule pendant La Revanche des Sith, puis continue après",
    "The Clone Wars (2008 theatrical film)": "The Clone Wars (film de 2008)",

    /* ---- stats ---- */
    "Computing your stats...": "Calcul de tes stats…",
    "total watch time": "temps de visionnage total",
    "Movies": "Films",
    "Average rating": "Note moyenne",
    "Series time is an estimate based on episode runtimes.": "Le temps des séries est une estimation basée sur la durée des épisodes.",
    "Your ratings": "Tes notes",
    "Top genres": "Genres principaux",
    "By decade": "Par décennie",
    "Languages": "Langues",
    "Countries": "Pays",
    "Hot takes": "Avis tranchés",
    "Where your rating and the crowd disagree the most.": "Là où ta note et celle du public divergent le plus.",
    "Hidden gems": "Pépites cachées",
    "Your highest-rated picks (9-10) that few people have seen.": "Tes meilleures notes (9-10) que peu de gens ont vues.",
    "Most rewatched": "Les plus revus",
    "Familiar faces": "Visages familiers",
    "The people who show up most across what you've watched.": "Les personnes qui reviennent le plus dans ce que tu as vu.",
    "Films vs series (by title)": "Films vs séries (par titre)",
    "You rated above the crowd": "Tu as noté au-dessus du public",
    "The crowd liked these more": "Le public a préféré ceux-là",
    "Rate more titles to reveal your hot takes.": "Note plus de titres pour révéler tes avis tranchés.",
    "Give some 9-10 ratings to surface hidden gems.": "Mets des 9-10 pour faire ressortir tes pépites cachées.",
    "No rewatches logged yet.": "Aucun revisionnage enregistré.",
    "Not enough data yet.": "Pas encore assez de données.",
    "Watch more titles to see recurring names.": "Regarde plus de titres pour voir les noms récurrents.",
    "Nothing here.": "Rien ici.",
    "Actor": "Acteur",
    "Director": "Réalisateur",
    "Creator": "Créateur",
    "Actor · Director": "Acteur · Réalisateur",
    "You've watched them in": "Tu les as vus dans",
    "You can also find them in": "Tu peux aussi les retrouver dans",

    /* ---- ciné club ---- */
    "Your clubs": "Tes clubs",
    "No clubs yet. Create one or join with a code.": "Pas encore de club. Crée-en un ou rejoins-en un avec un code.",
    "Create or join a club": "Créer ou rejoindre un club",
    "Create a new club, or join one with a code.": "Crée un club, ou rejoins-en un avec un code.",
    "New club name": "Nom du nouveau club",
    "e.g. The Popcorn Trio": "ex. Le Trio Popcorn",
    "Create club": "Créer le club",
    "or": "ou",
    "Join with a code": "Rejoindre avec un code",
    "Join club": "Rejoindre",
    "Club created": "Club créé",
    "Enter a code": "Entre un code",
    "Joined!": "C'est fait !",
    "Club not found.": "Club introuvable.",
    "copy": "copier",
    "Code copied": "Code copié",
    "Not seen yet": "Pas encore vu",
    "You've watched it? Give it a rating and a note to log it.": "Tu l'as vu ? Mets une note et un mot pour valider.",
    "What did you think?": "Qu'en as-tu pensé ?",
    "Validate": "Valider",
    "Validated": "Validé",
    "Discussion": "Discussion",
    "No messages yet. Start the conversation.": "Aucun message. Lance la discussion.",
    "No messages yet.": "Aucun message.",
    "Say something about this film…": "Dis quelque chose sur ce film…",
    "Add to the discussion…": "Ajoute un mot à la discussion…",
    "Send": "Envoyer",
    "Close this round": "Clore la manche",
    "Tap again to close the round": "Touche encore pour clore la manche",
    "Round closed": "Manche close",
    "It's your turn to pick the film": "C'est à toi de choisir le film",
    "Propose a film": "Proposer un film",
    "Pass my turn": "Passer mon tour",
    "Turn passed": "Tour passé",
    "Club history": "Historique du club",
    "Search a film": "Chercher un film",
    "Search movies…": "Cherche un film…",
    "Chosen": "Choisi",
    "Watch within": "À voir sous",
    "2 weeks": "2 semaines",
    "1 month": "1 mois",
    "2 months": "2 mois",
    "3 months": "3 mois",
    "Set as this round's film": "Valider le film de la manche",
    "Film set!": "Film choisi !",
    "Give it a rating": "Mets une note",
    "Write a few words": "Écris quelques mots",
    "No reviews recorded.": "Aucun avis enregistré.",
    "Due today": "Pour aujourd'hui",
    "1 day left": "Plus qu'un jour",

    /* ---- notifications ---- */
    "Nothing yet.": "Rien pour l'instant.",
    "Older": "Plus anciennes",
    "New friend request": "Nouvelle demande d'ami",
    "Your turn to pick a film": "À toi de choisir un film",
    "A club film needs your review": "Un film de club attend ton avis",
    "Someone": "Quelqu'un",
    "A friend": "Un ami",
    "a film": "un film",

    /* ---- premier lancement ---- */
    "Welcome to Seen 🎬": "Bienvenue sur Seen 🎬",
    "Your film and series tracker. The gist:": "Ton carnet de films et séries. L'essentiel :",
    "Track what you watch": "Suis ce que tu regardes",
    "Search a title and add it as watching or watched. Series track episode by episode.": "Cherche un titre et ajoute-le en cours ou vu. Les séries se suivent épisode par épisode.",
    "Add friends": "Ajoute des amis",
    "Compare progress and send recommendations from the Social tab.": "Compare vos avancées et envoie des recos depuis l'onglet Social.",
    "Start a ciné club": "Lance un ciné club",
    "Pick a film each round, rate it, and discuss it with your crew.": "Choisis un film à chaque manche, note-le et discutes-en avec ta bande.",
    "Follow big sagas in the right order, or build your own from Home.": "Suis les grandes sagas dans le bon ordre, ou crée le tien depuis l'accueil.",
    "Let's go": "C'est parti",

    /* ---- installation ---- */
    "Install": "Installer",
    "Add Seen to your home screen": "Ajoute Seen à ton écran d'accueil",
    "Install Seen: tap Share, then \"Add to Home Screen\".": "Installer Seen : touche Partager, puis « Sur l'écran d'accueil »."
  };

  /* Textes qui contiennent des chiffres ou des noms : on les traduit par motif. */
  var PATTERNS_FR = [
    /* Les motifs les plus precis d'abord : le premier qui correspond gagne. */
    [/^Results for "(.*)"$/, "Résultats pour « $1 »"],
    [/^(\d+)% to (.+)$/, "$1 % jusqu'à $2"],
    [/^Films (\d+) \((\d+)%\)$/, "Films $1 ($2 %)"],
    [/^Series (\d+) \((\d+)%\)$/, "Séries $1 ($2 %)"],
    [/^(.+) · picks next$/, "$1 · choisit ensuite"],
    [/^(.*) · picked by (.+) · avg (.*)$/, "$1 · choisi par $2 · moy. $3"],
    [/^Rewatch · pass (\d+) · (\d+) of (\d+) watched$/, "Revisionnage · passe $1 · $2 sur $3 vus"],
    [/^(\d+) titles? · watch order$/, "$1 titres · ordre de visionnage"],
    [/^(\d+)\/(\d+) episodes$/, "$1/$2 épisodes"],
    [/^(\d+) members? · code$/, "$1 membres · code"],
    [/^Watching · (S\d+E\d+)$/, "En cours · $1"],
    [/^Watched · (S\d+E\d+)$/, "Vu · $1"],
    [/^Watchlist · (S\d+E\d+)$/, "À voir · $1"],
    [/^Episode · (S\d+E\d+)$/, "Épisode · $1"],
    [/^Series · (.*) · not in your collection$/, "Série · $1 · pas dans ta collection"],
    [/^Movie · (.*) · not in your collection$/, "Film · $1 · pas dans ta collection"],
    [/^Series · not in your collection$/, "Série · pas dans ta collection"],
    [/^Movie · not in your collection$/, "Film · pas dans ta collection"],
    [/^(.+) · seen in (\d+) of your titles$/, "$1 · vu dans $2 de tes titres"],
    [/^(\d+) titles? · (.*)$/, "$1 titres · $2"],
    [/^Error: (.*)$/, "Erreur : $1"],
    [/^Could not load: (.*)$/, "Impossible de charger : $1"],
    [/^Could not save: (.*)$/, "Enregistrement impossible : $1"],
    [/^Search failed: (.*)$/, "Échec de la recherche : $1"],
    [/^Couldn't join: (.*)$/, "Impossible de rejoindre : $1"],
    [/^No results for "(.*)"\.$/, "Aucun résultat pour « $1 »."],
    [/^No user found for "(.*)"\.$/, "Aucun utilisateur trouvé pour « $1 »."],
    [/^seen (\d+) times total$/, "vu $1 fois en tout"],
    [/^Gem shelf full \((\d+)\)\. Remove one first\.$/, "Étagère de pépites pleine ($1). Retires-en une d'abord."],
    [/^Gem shelf full \((\d+) max\)$/, "Étagère de pépites pleine ($1 max)"],
    [/^(\d+) \/ (\d+) gems used$/, "$1 / $2 pépites utilisées"],
    [/^Total: (\d+) seasons, (.+) episodes$/, "Total : $1 saisons, $2 épisodes"],
    [/^Season (\d+)$/, "Saison $1"],
    [/^Episode (\d+)$/, "Épisode $1"],
    [/^Ep (\d+)$/, "Ép. $1"],
    [/^Ep (\d+) · (.*)$/, "Ép. $1 · $2"],
    [/^S(\d+)E(\d+) watched$/, "S$1E$2 vu"],
    [/^Unlocked: (.*)$/, "Débloqué : $1"],
    [/^How to unlock: (.*)$/, "Pour débloquer : $1"],
    [/^Progress: (.*)$/, "Progression : $1"],
    [/^Achievements \((\d+)\/(\d+)\)$/, "Succès ($1/$2)"],
    [/^(\d+) hours?$/, "$1 h"],
    [/^1 movie · (.*)$/, "1 film · $1"],
    [/^(\d+) movies · (.*)$/, "$1 films · $2"],
    [/^(\d+) series · (.*)$/, "$1 séries · $2"],
    [/^(.+) \/ 10 · 1 rated$/, "$1 / 10 · 1 noté"],
    [/^(.+) \/ 10 · (\d+) rated$/, "$1 / 10 · $2 notés"],
    [/^1 rewatch$/, "1 revisionnage"],
    [/^(\d+) rewatches$/, "$1 revisionnages"],
    [/^(\d+) rated · (\d+) not rated \((\d+)% rated\)$/, "$1 notés · $2 non notés ($3 % notés)"],
    [/^Oldest: (.*) \((\d+)\)   ·   Newest: (.*) \((\d+)\)$/, "Le plus ancien : $1 ($2)   ·   Le plus récent : $3 ($4)"],
    [/^(.+) days non-stop$/, "$1 jours non-stop"],
    [/^the LOTR trilogy (.+)$/, "la trilogie du Seigneur des anneaux $1"],
    [/^You (\d+)\/10 · public (.+)\/10$/, "Toi $1/10 · public $2/10"],
    [/^(.*) · popularity (\d+)$/, "$1 · popularité $2"],
    [/^(\d+)% of your collection has been rewatched\.$/, "$1 % de ta collection a été revu."],
    [/^1 title$/, "1 titre"],
    [/^(\d+) titles$/, "$1 titres"],
    [/^1 title you have watched$/, "1 titre que tu as vu"],
    [/^(\d+) titles you have watched$/, "$1 titres que tu as vus"],
    [/^1 member$/, "1 membre"],
    [/^(\d+) members$/, "$1 membres"],
    [/^Loading (.+)'s collection\.\.\.$/, "Chargement de la collection de $1…"],
    [/^(.+)'s watch orders$/, "Les ordres de visionnage de $1"],
    [/^(.+)'s gems 💎$/, "Les pépites de $1 💎"],
    [/^(.+) still on it$/, "$1 est encore dessus"],
    [/^(.+) finished it$/, "$1 l'a terminée"],
    [/^(.+) hasn't started$/, "$1 n'a pas commencé"],
    [/^(.+) is watching$/, "$1 la regarde"],
    [/^(.+) watched, you haven't$/, "$1 a vu, pas toi"],
    [/^Nothing in common yet\. Add more titles or recommend one to (.+)\.$/, "Rien en commun pour l'instant. Ajoute des titres ou recommande-en un à $1."],
    [/^Tap again to remove (.+)$/, "Touche encore pour retirer $1"],
    [/^from (.+)$/, "de $1"],
    [/^Shared by (.+)$/, "Partagé par $1"],
    [/^by (.+)$/, "par $1"],
    [/^(\d+)\/(\d+) watched · (\d+)%$/, "$1/$2 vus · $3 %"],
    [/^(\d+) of (\d+) watched$/, "$1 sur $2 vus"],
    [/^(\d+) of (\d+) watched \(this order\)$/, "$1 sur $2 vus (cet ordre)"],
    [/^Rewatch · pass (\d+) · (.*)$/, "Revisionnage · passe $1 · $2"],
    [/^(\d+)\/(\d+) eps$/, "$1/$2 ép."],
    [/^Rewatch in progress \(pass (\d+)\)\. Your overall collection still counts these as watched\.$/, "Revisionnage en cours (passe $1). Ta collection globale les compte toujours comme vus."],
    [/^Code (.+)$/, "Code $1"],
    [/^Now watching · picked by (.+)$/, "En cours · choisi par $1"],
    [/^Waiting for (.+) to pick the next film$/, "En attente que $1 choisisse le prochain film"],
    [/^(.*) · picked by (.+)$/, "$1 · choisi par $2"],
    [/^(.*) · picked by (.+) · avg (.*)$/, "$1 · choisi par $2 · moy. $3"],
    [/^Watch by (.+)$/, "À voir avant le $1"],
    [/^(\d+) days left$/, "$1 jours restants"],
    [/^Overdue by 1 day$/, "En retard d'un jour"],
    [/^Overdue by (\d+) days$/, "En retard de $1 jours"],
    [/^in (\d+) days$/, "dans $1 jours"],
    [/^@(.+) wants to be friends$/, "@$1 veut devenir ton ami"],
    [/^@(.+) suggested a film$/, "@$1 te suggère un film"],
    [/^1 gem · 1 friend$/, "1 pépite · 1 ami"],
    [/^1 gem · (\d+) friends$/, "1 pépite · $1 amis"],
    [/^(\d+) gems · 1 friend$/, "$1 pépites · 1 ami"],
    [/^(\d+) gems? · (\d+) friends?$/, "$1 pépites · $2 amis"],
    [/^(\d+) episodes?$/, "$1 épisodes"],
    [/^(\d+) episodes? behind · next (S\d+E\d+)$/, "$1 épisodes de retard · prochain $2"],
    [/^(\d+) behind$/, "$1 de retard"],
    [/^Movie · (.*)$/, "Film · $1"],
    [/^Next (S\d+E\d+) · (.*)$/, "Prochain $1 · $2"],
    [/^Premiere · (.*)$/, "Première · $1"],
    [/^Latest · (.*)$/, "Dernier · $1"],
    [/^Season (\d+) · (.*)$/, "Saison $1 · $2"],
    [/^New season of (.+)$/, "Nouvelle saison de $1"],
    [/^(\d+) new episodes? since you finished it$/, "$1 nouveaux épisodes depuis que tu l'as terminée"],
    [/^Series · (\d+) seasons?$/, "Série · $1 saisons"],
    [/^(.*) · Movie$/, "$1 · Film"],
    [/^(.*) · Series$/, "$1 · Série"]
  ];

  function lookup(s) {
    var v = DICT_FR[s];
    if (v !== undefined) return v;
    if (s.length > 260) return null;
    for (var i = 0; i < PATTERNS_FR.length; i++) {
      var p = PATTERNS_FR[i];
      if (p[0].test(s)) return s.replace(p[0], p[1]);
    }
    return null;
  }

  /* Traduit une chaîne simple. */
  function TR(s) {
    if (LANG !== "fr" || s == null) return s;
    s = String(s);
    if (!/[A-Za-z]/.test(s)) return s;
    var raw = s.trim();
    if (!raw) return s;
    var v = lookup(raw);
    return v === null ? s : s.replace(raw, v);
  }
  window.TR = TR;

  /* Traduit un fragment HTML : le texte entre les balises + quelques attributs. */
  function TH(html) {
    if (LANG !== "fr" || html == null) return html;
    html = String(html);
    if (!/[A-Za-z]/.test(html)) return html;
    if (html.indexOf("<") < 0) return TR(html);
    html = html.replace(/>([^<>]+)</g, function (m, txt) {
      var raw = txt.trim();
      if (!raw || !/[A-Za-z]/.test(raw)) return m;
      var v = lookup(raw);
      return v === null ? m : ">" + txt.replace(raw, v) + "<";
    });
    html = html.replace(/(placeholder|title|aria-label)="([^"]*)"/g, function (m, attr, val) {
      var v = lookup(val.trim());
      return v === null ? m : attr + '="' + v.replace(/"/g, "&quot;") + '"';
    });
    return html;
  }
  window.TH = TH;

  if (LANG === "fr") {
    document.documentElement.setAttribute("lang", "fr");
    try {
      var ih = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");
      Object.defineProperty(Element.prototype, "innerHTML", {
        configurable: true, enumerable: ih.enumerable,
        get: function () { return ih.get.call(this); },
        set: function (v) { ih.set.call(this, TH(v)); }
      });
    } catch (e) {}
    try {
      var tc = Object.getOwnPropertyDescriptor(Node.prototype, "textContent");
      Object.defineProperty(Node.prototype, "textContent", {
        configurable: true, enumerable: tc.enumerable,
        get: function () { return tc.get.call(this); },
        set: function (v) { tc.set.call(this, TR(v)); }
      });
    } catch (e) {}
    try {
      var ti = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "title");
      Object.defineProperty(HTMLElement.prototype, "title", {
        configurable: true, enumerable: ti.enumerable,
        get: function () { return ti.get.call(this); },
        set: function (v) { ti.set.call(this, TR(v)); }
      });
    } catch (e) {}
  }

  /* Le HTML déjà présent dans la page n'est pas passé par innerHTML :
     on le traduit une fois, au démarrage. */
  var SPECIAL = [
    ["#nav-search .nl", "Recherche"],
    ['#filters .pill[data-f="watched"]', "Vus"],
    ['#filters .pill[data-f="watchlist"]', "À voir"],
    ['#filters .pill[data-f="watching"]', "En cours"],
    ["#home-inprogress + .hh-lab", "En cours"],
    ["#home-watchlist + .hh-lab", "À voir"]
  ];
  var STAT_ROWS = [["stat-movies", "Films"], ["stat-series", "Séries"],
                   ["stat-avg", "Note moyenne"], ["stat-rewatch", "Revisionnages"]];

  window.applyStaticI18n = function () {
    if (LANG !== "fr") return;
    SPECIAL.forEach(function (p) {
      var el = document.querySelector(p[0]);
      if (el) el.firstChild ? (el.firstChild.nodeValue = p[1]) : (el.appendChild(document.createTextNode(p[1])));
    });
    STAT_ROWS.forEach(function (p) {
      var el = document.getElementById(p[0]);
      if (el && el.previousElementSibling && el.previousElementSibling.firstChild)
        el.previousElementSibling.firstChild.nodeValue = p[1];
    });
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [], n;
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var raw = node.nodeValue, k = raw.trim();
      if (!k || !/[A-Za-z]/.test(k)) return;
      var v = lookup(k);
      if (v !== null) node.nodeValue = raw.replace(k, v);
    });
    ["placeholder", "title", "aria-label"].forEach(function (attr) {
      document.querySelectorAll("[" + attr + "]").forEach(function (el) {
        var v = lookup(el.getAttribute(attr).trim());
        if (v !== null) el.setAttribute(attr, v);
      });
    });
  };
})();
