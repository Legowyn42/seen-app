/* Seen — recherche tolérante aux fautes.
   TMDB pardonne une faute quand un autre mot de la requête est correct
   ("Harri potter" marche), mais rend zéro résultat dès que tous les mots
   distinctifs sont mal écrits ("le signeur des aneaux"). On corrige donc les
   mots nous-mêmes contre un lexique de mots tirés des titres TMDB, enrichi
   automatiquement au fil de l'usage. */
(function () {
  var LEX_KEY = "seen_lex", LEX_TS_KEY = "seen_lex_at", LEX_MAX = 12000;

  var SEED = ("movie star dragon last world spider show black film with love ball wars naruto dead time part night story hunter life king godzilla your dark blue girl death fate piece family harry batman super demon house pokemon potter trek zero american game hero detective avatar blood mission avengers doctor monsters evil lost ninja conan school tokyo city knight little monde belle ghost hotel seven high lion shrek marvel's adventure days girls grand legend secret stay train final monster battle dans furious from good rings club late note pirates slayer white after fast moon planet plus evangelion justice kill kingdom lord island another back home call games runner sword alchemist bleach fullmetal jurassic madagascar once over shippuden wolf iron rise saint vampire alien chicago fire hunger infinity miraculous resident robot saga taxi transformers asterix captain impossible lupin upon young amazing attack bill children dawn friends kung lego magic name order panda place shell street terminator thor twilight doraemon psycho titans verse beauty book caribbean castle code contre first john kenshin partie perfect rising soul academia galaxy great heroes return samurai series space cars devil five flower tales teen wall chan future kimetsu live seiya universe witch yaiba beyond deadpool golden green hobbit mario stranger summer voyage wick will despicable jack next noir online only princess project road tour woman airbender alone america animation apocalypse aventures beast blade conjuring gate guardians league nine park pour superman wonder away crime episode fairy guys heart into jujutsu kaisen nobody patrol stand stars tout academy adventures baby chronicles coco croods don't feel godfather jones legende pretty princesse snow steins strange that walking what before boys chapter murder real shadow stone teenage titan tonight alice chat dernier digimon door earth forever four incredibles inside knightfall lilo list lust matrix mind miss morning ncis orange scream steven stitch tail things this york apes brother dogs dragons fall fantastic force frozen ladybug planete retour revenge secrets slime water bojack breaking butterfly chainsaw deadly driver dune evergarden fantasy father fish indiana insidious kong leon like mandalorian minions mort mummy paradise paris petite ralph reacher reborn rider shin sins there tomorrow venom violet wild wolverine agents angel animated c'est d'un deux dexter dream fifty gold heaven invasion invincible it's kaguya mary play prince prison shades simpsons special trois voice vous welcome wonderland years across aria beasts berserk beyblade born boruto bride bunny clone clover cosmos crown deathly deep django elite enfants equalizer evolution fiction finding fury gantz gladiator gravity haikyu hallows horseman kingsman kiss l'age lady land martin mononoke morty murders obelix ocean's office panther pulp punisher quantum ragnarok rain regular rick ring rurouni ryan shadows sherlock smap solo steel sunshine survivor sweet tous when worlds anneaux bizarre bullet camp case classroom diaries diary dimanche eternal generation genesis hell heros hidden hill inferno jungle lock magical neon really rock royale squad third true wind zootopia amour anne attaque bebop beginning better bros chapitre christmas coraline cowboy dance dieu doom duel eleven empire famille fight free girlfriend guide intouchables jedi jeune konosuba l'amour l'attaque maid marvel middle mile mommy monstres nemo ninjago nous phoenix power prada predator rebellion reincarnation shutter side sing sorciere suicide team temple transylvania wanted about agent animal bete bird boots brotherhood building chicken contes daily does drift everything hangover haut kids later look lucifer magi masters maze mermaid puss service society soir sons sous tale temps tower under wire wonderful world's aang akira aladdin aliens anarchy angeles animaniacs apres arcane archer arthur baki battlestar beastars best blinders bob's boss brave burgers cage century chateau chosen cinema clannad danny darling drive duncan dunk edens element endgame fallen falls fargo ferb flash forrest futurama gabriel's galactica glace guerre gumball gump hakusho half happy harley hazbin help hollywood horror inception interstellar jerry jobless jojo's joker jumanji kaiju korra legends looney loud madness maison maitre malcolm mashle maverick memories metal mewtwo miami moana mouth mulan multiverse mushoku nana okay overlord pacific peaky personal phantom phineas presage prestige prisoners quinn quintessential quintuplets rascal ratatouille ready redo rises rookie rush sabrina sailor sama saul scarface scene seigneur serial shield shining silent slam snyder's sonic south souvenirs spongebob spotless squarepants stargate starting supergirl supernatural tara tensei terminal thing thrones tiger tijden totoro truman tunes twin unchained vendetta vengeance vikings waverly widow wrestling yawara zack zone anatomy beautiful broly clockwork commence dc's destin dinosaur edge eternity exiled fantome full geass heaven's histoire history immortal japan jimmy jours knows made madoka magica married memory modern mondes mutant nest never nightmare odyssey past powerpuff promised puella reincarnated sacree sens silence soko soleil spring supremacy tell theory turtles wish aquaman arrow avec band basket basterds begins bienvenue blanc bloods blooms break cafe camera caraibes certain cite cocco comedy corpse country covenant crazy criminal cuckoo's curse cyberpunk demain derniere desafio district edgerunners elio encanto encore fighting fille flew frieren garden gentlemen ghoul girl's grey grey's hunting inglourious j'ai journey julie leveling lois machines michael midnight migration minutes mobile mockingjay most mother noel nouvelle origins peaks pitt private proposal ramdam ranma redemption reincarne reservoir revenant reze room rosario sakamoto scarlet tenet towers tron wakanda wears wicked wife zombie advent bond bound bourne business charlie ciel cinquieme clash continental couleurs crimes dangers darkness departed dinosaurs doll etait fairly foret france friday gods goodfellas grown gundam hail haine hard heavy hello hoppers judgment just kamen kara kardashians king's kingdoms legacy lucy mare metropolis minus monogatari neiges oddparents parasite patrouille pianist poets prey quand rape reine running saving scenes se7en seal shawshank sopranos spies station stories stray strong suit swapped talk tangled twelve unexpected vers very wizards abyss again aika amphibia april armies arnold ashura automata babysitting banana bang banks banshee barbapapa barbara barbie bear beetlejuice benjamin billions billy blacklist blindspot bluey bocchi bones bonsoir borderland breaker bridgerton broke brooklyn budapest buffy bugonia bullwinkle bungo campus carnage casino catch catching chance charmed chernobyl chez chou chum cielos civil cloud cloverfield colbert commencement community constantine coucou craig creed dahmer daima dallas daredevil david deathwoods decouverte descendants desolation desperate diamond dickinson dimensions dino discovery doomsday dororo double dreaming dreamzzz echangistes education eight elementary enquetes euphoria everywhere expanse experiments fallout familia feet femmes ferrari figures ford fringe frontier garcon gardiens generations genial genisys giant gilmore given glee goat goblin gone gossip gotham grimm grudge hanako handmaid's haunting hawaii healer heartstopper heat hedgehog holmes homeland hope horimiya horses housewives hulk hunters imitation incendies interest inuyasha jacket jacob johnny jugement jump juste kaamelott kelly kengan kombat kpop l'air l'empereur l'ile l'ombre lagoon lain lasso legacies letterman liars limitless lioness logan loki lotus loves luca macgyver machina magique man's mandy mankind marriage match maudit mayday megamind memento menages mentalist midi midsommar mike minecraft mirror mishima moche mode monk mortal motor narcos narnia nation nier noblesse obsession originals outer outlander parks parrain pass peppa person petit philadelphia philosopher's pluto pony portrait possible prairie primal prochain psych queens quotidien rebelde rebels record recreation rent report resurrection returns revengers riverdale robin robots rogue rouge royals samourai scary schindler's scorpion senor senpai sesamo shaman shameless shang sheldon ship shogun short silo sissi sister skam skywalker slow smallville smaug snatch soiree sound spectre spinjitzu spotlight state strain strike strikes suits superstars supreme suspects swift taylor three thunder tijeras tony totally tree trolls tuche tulsa ultimate umbrella university unlimited usual veneno vice victor vivement voyager warrior wasp watchmen wattoo westworld whiplash whisperer winx witcher words works yellowstone yoru zeiten agatha altered always angry assassination attorney awakens baywatch bella blanche blessing bois bone bout brothers carbon cesar chihiro chiikawa cinquante citizen complex corps course crystal cure d'or darker devil's diable digital dingue dungeon eater emily escape espace exorcist faut femme files flow fortress freed freedom fruits galaxie god's goof griffin hana hate homme honor ichi iiird investigation invisible jaws jeux josee jour killer kuroko's l'empire lightning ligne long lune malgre march master mechant mere million monkeys monsieur monstre moving mucize mystere nice nuances oshi other ours penguins perdue peur pianiste piano police pride purge qu'on quiet quiz rage rebirth requiem rope russian sacred serie skull smoking soldier spirit spirited suis sunset survival terror them thrice troop ultimatum unis unit unite vagabond vies visiteurs vita voix want where working wreck africa ahiru akame ancient apartment appartient appleseed arcadia ares avenger aventuriers azkaban badlands banlieue bare beach bears bleu brasil bravo breaks bronzes brutto bug's buono burger burst butler cache candy capo captura cartes cattivo cent chamber chapo chapters chest chevalier chevaliers chien chihayafuru cleopatre clique cobra cold collar collision come complement cons crew crimson cronin's crows culpa curious cursed d'adele d'amelie d'enquete declassified demonic disciple dollar down dress durarara dwarfs elize eminence emperor's erased escobar europe's everybody exit exploits eyes fabuleux fait fantastiques fault fear fellowship female find flintstones fois forces forgotten forteresse frankenstein franxx french friendship futur gachiakuta gambit garfield garterbelt ghostbusters gintama globule goblet goede gorge graham grim groove hacksaw hanma happyness harakiri hearts hedge hell's hellsing hercules heron highschool hikaru hobbs homecoming hommes horizons housemaid howl's inazuma indestructibles index initial internet iruma juan junior kabaneri kamisama kangaroo killers kobayashi's komi l'ascension l'emission l'espace l'etrange labyrinthe lambs legendes legion lelouch level line lorax loup luna majiwaru maquia mars martian matin mazinger meltdown menage merli mickey mighty millennium minds misfit momie mufasa muscles nagatoro nanny ned's neighbor norton notebook nuls ocean oppenheimer pancreas panty parabellum paraiso party pere pets piege placard player poulain pouvoir prejudice prisoner profs progressive punch pursuit qu'est quatre queen's raider raiders ranma1 realm reliques renegade rhapsody ridge romantic rugrats sakura salvail samedi sang saturday sauvage scandal scroll search seasons second seed seinfeld semaine send senos sense sharko shaw shikiyoku shop silver singes sinners sixth skill slechte smile sniper snipers snowpiercer sora sorciers souryo spartacus squelettes starring stocking sunny system tanya tard testament texas than they through tides toilet tomb tonikawa torturer trip trollhunters troy turned ultron uprising victims vigilante vinci vinland voisin volume wardrobe west what's whisper winter wise wizard wrath zodiaque above absolute akito ambulant amies amis animals apothecary arrete arrival auto avant babylon ballad bardock bean beats being bell beni blaze brand bubble cagliostro camping carnets cell cercle cinq clarkson class closer cochinas colere colony combat criminelles crusade curieux dessus disparus downtown drawn eternals experts express extraordinary face fist fort frog front garcons ghidorah give glory goku grace grave hajime hateful have holy homicide hoopa idol infinie interdite ippo jackson journey's kagemusha killing kings klan l'ange l'apothicaire l'arc l'aube l'eau l'ecole l'histoire l'univers lamu landing letter lies lone lucky maman manager marnie matter mechagodzilla meet menace merveilleux mexico mirai mitchells miyu mysteres mystery n'est naked nanas network noire nuit overflow pacte parasyte pat' penguin penny perdu petits peux pluie ponyo potential potte practical premiere pres quete reina ride rocky routes royaume rules save scott sentai sept shape simpson slave sois soldat someone spaceship split steady suzume taboo teacher theatre together tsubasa tueur turning versa " +
  "seigneur anneaux trone fer chateau ambulant voyage chihiro tombeau lucioles princesse mononoke service livraison kiki souvenirs marnie garcon heron vent leve pompoko porco rosso nausicaa laputa arrietty colline coquelicots conte princesse kaguya yamada ronja").split(/\s+/);

  var LEX = null, BYLEN = null;

  function norm(s) {
    return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase().replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();
  }

  function load() {
    if (LEX) return;
    LEX = new Set();
    SEED.forEach(function (w) { if (w) LEX.add(w); });
    try {
      var raw = localStorage.getItem(LEX_KEY);
      if (raw) raw.split(" ").forEach(function (w) { if (w) LEX.add(w); });
    } catch (e) {}
    reindex();
  }
  function reindex() {
    BYLEN = {};
    LEX.forEach(function (w) { (BYLEN[w.length] || (BYLEN[w.length] = [])).push(w); });
  }
  var saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try {
        var arr = Array.from(LEX);
        if (arr.length > LEX_MAX) arr = arr.slice(arr.length - LEX_MAX);
        localStorage.setItem(LEX_KEY, arr.join(" "));
      } catch (e) {}
    }, 800);
  }

  /* Apprend les mots des titres qu'on voit passer. */
  function learn(titles) {
    load();
    var added = 0;
    (titles || []).forEach(function (t) {
      norm(t).split(" ").forEach(function (w) { if (w.length >= 3 && !LEX.has(w)) { LEX.add(w); added++; } });
    });
    if (added) { reindex(); save(); }
  }

  /* Damerau-Levenshtein : une inversion de deux lettres ("wras" pour "wars")
     compte pour une seule faute, ce qui est le cas le plus courant au clavier. */
  function lev(a, b, max) {
    var la = a.length, lb = b.length;
    if (Math.abs(la - lb) > max) return max + 1;
    if (max < 0) return max + 1;
    var d = [], i, j;
    for (i = 0; i <= la; i++) { d[i] = [i]; }
    for (j = 0; j <= lb; j++) { d[0][j] = j; }
    for (i = 1; i <= la; i++) {
      var best = Infinity;
      for (j = 1; j <= lb; j++) {
        var cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        var v = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1])
          v = Math.min(v, d[i - 2][j - 2] + 1);
        d[i][j] = v;
        if (v < best) best = v;
      }
      if (best > max) return max + 1;
    }
    return d[la][lb];
  }

  var STOP = new Set(["le", "la", "les", "des", "du", "de", "un", "une", "et", "aux", "au",
                      "the", "of", "and", "a", "an", "in", "on", "to", "for"]);

  /* Un mot qui est le début d'un mot connu ("throne" -> "thrones") n'est pas
     une faute : on le laisse tel quel plutôt que de le "corriger" de travers. */
  function isPrefixOfKnown(w) {
    for (var d = 1; d <= 3; d++) {
      var bucket = BYLEN[w.length + d];
      if (!bucket) continue;
      for (var i = 0; i < bucket.length; i++) if (bucket[i].indexOf(w) === 0) return true;
    }
    return false;
  }

  function correctWord(w) {
    load();
    if (w.length < 4 || LEX.has(w)) return w;
    if (isPrefixOfKnown(w)) return w;
    var max = w.length >= 6 ? 2 : 1;
    var best = null, bd = max + 1;
    for (var d = -2; d <= 2; d++) {
      var bucket = BYLEN[w.length + d]; if (!bucket) continue;
      for (var i = 0; i < bucket.length; i++) {
        var c = bucket[i];
        var dist = lev(w, c, Math.min(max, bd - 1));
        if (dist < bd) { bd = dist; best = c; if (bd === 1) break; }
      }
      if (bd === 1) break;
    }
    return (best && bd <= max) ? best : w;
  }

  /* Corrige la requête entière. Renvoie null si rien n'a changé. */
  function correct(query) {
    var n = norm(query);
    if (!n) return null;
    var words = n.split(" ");
    var out = words.map(function (w) { return STOP.has(w) ? w : correctWord(w); });
    var fixed = out.join(" ");
    return fixed === n ? null : fixed;
  }

  /* Requêtes de repli, de la plus complète à la plus simple. */
  function fallbacks(query) {
    var n = norm(query);
    var words = n.split(" ").filter(Boolean);
    var content = words.filter(function (w) { return !STOP.has(w) && w.length >= 3; });
    var out = [];
    if (content.length && content.length !== words.length) out.push(content.join(" "));
    if (content.length > 1) {
      content.slice().sort(function (a, b) { return b.length - a.length; })
        .slice(0, 3).forEach(function (w) { out.push(w); });
    }
    return out.filter(function (v, i, a) { return v && v !== n && a.indexOf(v) === i; });
  }

  function grams(s) {
    var g = [], n = " " + norm(s) + " ";
    for (var i = 0; i < n.length - 1; i++) g.push(n.slice(i, i + 2));
    return g;
  }
  /* Similarité de Dice entre deux textes (0 → 1). */
  function sim(a, b) {
    var ga = grams(a), gb = grams(b);
    if (!ga.length || !gb.length) return 0;
    var m = {}, hit = 0;
    ga.forEach(function (x) { m[x] = (m[x] || 0) + 1; });
    gb.forEach(function (x) { if (m[x] > 0) { m[x]--; hit++; } });
    return (2 * hit) / (ga.length + gb.length);
  }

  /* Une fois par semaine, on gonfle le lexique avec les titres populaires TMDB
     dans la langue courante. ~20 requêtes, en arrière-plan, sans bloquer. */
  function enrich(apiKey, lang) {
    try {
      var last = parseInt(localStorage.getItem(LEX_TS_KEY) || "0", 10);
      if (Date.now() - last < 7 * 24 * 3600 * 1000) return;
      localStorage.setItem(LEX_TS_KEY, String(Date.now()));
    } catch (e) {}
    var urls = [];
    ["movie", "tv"].forEach(function (kind) {
      ["popular", "top_rated"].forEach(function (list) {
        for (var p = 1; p <= 5; p++)
          urls.push("https://api.themoviedb.org/3/" + kind + "/" + list +
                    "?api_key=" + apiKey + "&language=" + lang + "&page=" + p);
      });
    });
    var titles = [], done = 0;
    urls.forEach(function (u) {
      fetch(u).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
        (j && j.results || []).forEach(function (x) {
          titles.push(x.title || ""); titles.push(x.name || "");
          titles.push(x.original_title || ""); titles.push(x.original_name || "");
        });
      }).catch(function () {}).then(function () {
        if (++done === urls.length) learn(titles);
      });
    });
  }

  window.SeenFuzzy = { norm: norm, correct: correct, fallbacks: fallbacks, sim: sim, learn: learn, enrich: enrich };
})();
