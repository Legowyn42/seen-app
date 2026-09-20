/* Seen — achievements.
   Definitions + rule engine. The app feeds it a context (what the user has
   watched, the cached TMDB fact sheets, the watch log, a bit of app data) and
   gets back, for every achievement, how far along the user is.

   To add one: append a line to ACHIEVEMENTS, add its French description to
   i18n.js. Nothing else to wire up.

   ids/ = TMDB ids, resolved by title+year against the TMDB API.            */
(function () {

  // ============================ TMDB id sets ============================
  var D = {
    mattDamon:   [857, 157336, 286217],                       // Saving Private Ryan, Interstellar, The Martian
    notHeroes:   [1955, 380, 398978],                         // Elephant Man, Rain Man, The Irishman
    fabledFox:   10315, fabledCrow: 9495,
    trains:      [961, 396535, 718930],                       // The General, Train to Busan, Bullet Train
    groundhog:   137,
    shrek:       [808, 809, 810, 10192],
    princess:    [408, 11224, 10882, 10144, 10020, 812, 10530, 10674, 10198, 38757, 62177, 109445, 277834, 527774],
    filmStudent: [15, 539, 269],                              // Citizen Kane, Psycho, Breathless
    polis:       [19, 49014, 592831],                         // Metropolis, Cosmopolis, Megalopolis
    coen3:       [134, 11775, 4944],                          // O Brother, Intolerable Cruelty, Burn After Reading
    zaz:         [813, 8764, 12151],                          // Airplane!, Top Secret!, Ruthless People
    blues:       525,
    cornetto:    [747, 4638, 107985],                         // Shaun of the Dead, Hot Fuzz, The World's End
    python:      [762, 583, 4543],
    cursed:      [14164, 10196, 2486],                        // Dragonball Evolution, The Last Airbender, Eragon
    theRoom:     17473,
    centipede:   [37169, 74997, 94365],
    filmbro:     [1359, 550, 475557],                         // American Psycho, Fight Club, Joker
    dune:        [841, 438631, 693134],
    nineteen84:  9314,
    terminator:  [218, 280],
    independence:602, nightmareXmas: 9479, bttf: 105, lotrTwoTowers: 121,
    morbius:     526896,
    trekFilms:   [152, 154, 157, 168, 172, 174, 193, 199, 200, 201, 13475, 54138, 188927],
    mcuInfinity: [1726, 1724, 10138, 10195, 1771, 24428, 68721, 76338, 100402, 118340, 99861, 102899,
                  271110, 284052, 283995, 315635, 284053, 284054, 299536, 363088, 299537, 299534, 429617],
    dceu:        [49521, 209112, 297761, 297762, 141052, 791373, 297802, 287947, 495764, 464052,
                  436969, 436270, 594767, 298618, 565770, 572802],
    dceuPairs:   [[141052, 791373]],                          // Justice League / Snyder cut: either one counts
    xmenFox:     [36657, 36658, 36668, 2080, 49538, 76170, 127585, 246655, 263115, 320288, 293660, 383498, 340102],
    batman:      [2661, 268, 364, 414, 415, 272, 155, 49026, 209112, 414906],
    fantastic4:  [22059, 9738, 1979, 166424, 617126],
    johnWick:    [245891, 324552, 458156, 603692, 541671],
    expendables: [27578, 76163, 138103, 299054],
    snyderNonDC: [924, 1271, 13183, 23629, 41216, 503736, 848326, 934632],
    disneyToon:  [15969, 9732, 14128, 12242, 10898, 11238, 13761],
    rockJungle:  [10159, 72545, 353486, 512200, 512195, 451048],
    hybrid:      [856, 433, 12335, 11114, 2300, 14239, 4523, 10715, 13850, 379686, 400650],
    seanBeanDies:[120, 710, 9869, 8195, 7299, 1635, 41215, 8398],   // + Game of Thrones S1E9, below
    seanBeanGot: 1399, seanBeanGotEp: "S1E9",
    bestPicture: [28966, 65203, 143, 42861, 33680, 56164, 3078, 12311, 43277, 43278, 34106, 770, 223,
                  43266, 27367, 289, 17661, 28580, 887, 33667, 23383, 25430, 705, 2769, 27191, 11426,
                  654, 15919, 2897, 826, 17281, 665, 284, 1725, 947, 5769, 11113, 15121, 874, 10633,
                  17917, 3116, 11202, 1051, 238, 9277, 240, 510, 1366, 703, 11778, 12102, 16619, 9443,
                  783, 11050, 279, 606, 792, 746, 380, 403, 581, 274, 33, 424, 13, 197, 409, 597, 1934,
                  14, 98, 453, 1574, 122, 70, 1640, 1422, 6977, 12405, 12162, 45269, 74643, 68734,
                  76203, 194662, 314365, 376867, 399055, 490132, 496243, 581734, 776503, 545611,
                  872585, 1064213],
    fastCollection: 9485,

    // ---- TV ----
    tvBreakingBad: 1396, tvBetterCall: 60059, elCamino: 559969,
    tvOfficeUK: 2996, tvParks: 8592, tvB99: 48891, tvGoodPlace: 66573,
    tvFleabag: 67070, tvPawPatrol: 57532, tvFma2003: 37863, tv24: 1973, tvNcis: 4614,
    tvJlu: 84200, tvJluEp: "S2E11",                           // For the Man Who Has Everything
    tvFmaEp: "S1E7",                                          // Night of the Chimera's Cry
    trekShows:   [253, 1992, 655, 580, 1855, 314, 67198, 85949, 85948, 106393, 103516],
    arrowverse:  [1412, 60735, 62688, 62643, 89247, 71663, 62125, 75486, 60743, 95057],
    legoSw:      [253760, 66837, 61513, 63722, 83558, 66487, 289417, 321813, 137128, 289411],
    tvDoctorWho63: 121, tvDoctorWho05: 57243, tvDoctorWhoMovie: 9284,

    // ---- people ----
    p: { seanBean: 48, willSmith: 2888, tomCruise: 500, gosling: 30614, jodieFoster: 1038,
         nicolasCage: 2963, pedroPascal: 1253360, gillianJacobs: 94098, meryl: 5064,
         alanTudyk: 21088, marilyn: 3149, defunes: 11187, bruceLee: 19429, jackieChan: 18897,
         theRock: 18918, melBrooks: 14639, michaelBay: 865, snyder: 15217, hitchcock: 2636,
         johnWilliams: 491, morricone: 1259 },
    siblingDirectors: [[1223,1224],[9340,9339],[19271,19272],[7395,7396],[227564,129561],
                       [11447,11448],[56209,45138],[24279,24281],[12987,3415],[45407,45405],
                       [56501,56502],[5537972,31033],[3288,3289]],
    companies: { pixar: 3, ghibli: 10342 },
    networks:  { netflix: 213, hbo: 49, prime: 1024, max: 3186 },

    // ---- Star Wars films, for May the 4th ----
    starWars: [1893, 1894, 1895, 11, 1891, 1892, 140607, 181808, 181812, 330459, 348350, 12180],

    // ---- Doctor Who: one entry per Doctor. Season ranges on the classic run,
    //      explicit episode keys on the modern specials. ----
    doctors: [
      {n:1,  show:121,   seasons:[1,2,3]},        {n:2,  show:121,   seasons:[4,5,6]},
      {n:3,  show:121,   seasons:[7,8,9,10,11]},  {n:4,  show:121,   seasons:[12,13,14,15,16,17,18]},
      {n:5,  show:121,   seasons:[19,20,21]},     {n:6,  show:121,   seasons:[22,23]},
      {n:7,  show:121,   seasons:[24,25,26]},     {n:8,  movie:9284},
      {n:9,  show:57243, seasons:[1]},            {n:10, show:57243, seasons:[2,3,4]},
      {n:11, show:57243, seasons:[5,6,7]},        {n:12, show:57243, seasons:[8,9,10]},
      {n:13, show:57243, seasons:[11,12,13]},     {n:14, show:57243, seasons:[14]},
      {n:15, show:57243, seasons:[15,16]}
    ],

    // ---- continents, for Pangea ----
    continents: {
      AF:"africa", NA_:"america_n", SA:"america_s", AS:"asia", EU:"europe", OC:"oceania"
    },
    eu27: ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT",
           "LU","MT","NL","PL","PT","RO","SK","SI","ES","SE"],
    africa: ["DZ","AO","BJ","BW","BF","BI","CM","CV","CF","TD","KM","CD","CG","CI","DJ","EG","GQ",
             "ER","SZ","ET","GA","GM","GH","GN","GW","KE","LS","LR","LY","MG","MW","ML","MR","MU",
             "MA","MZ","NA","NE","NG","RW","ST","SN","SC","SL","SO","ZA","SS","SD","TZ","TG","TN",
             "UG","ZM","ZW"]
  };

  // ============================ context helpers ============================
  // The app hands over:
  //   entries : [{tmdb, type:'movie'|'tv', status, rating, eps:[epKeys], rewatch, cinema, f:facts}]
  //   logs    : [{tmdb, type, ep, date:'YYYY-MM-DD', kind}]   kind 'backfill' = approximate
  //   app     : { watchlist, recosAdded, subsOnMine, roadToEndgame, westernCollection,
  //               mutualWesternReco, recommendedBadS1, universeCount }
  function ctx(state) {
    var entries = state.entries || [], logs = state.logs || [];
    var x = { entries: entries, logs: logs, app: state.app || {} };

    x.movies  = entries.filter(function (e) { return e.type === "movie" && e.status === "watched"; });
    x.tvSeen  = entries.filter(function (e) { return e.type === "tv" && e.status === "watched"; });
    x.tvAny   = entries.filter(function (e) { return e.type === "tv" && (e.status === "watched" || (e.eps && e.eps.length)); });
    x.tvAll   = entries.filter(function (e) { return e.type === "tv"; });

    var mSet = new Set(x.movies.map(function (e) { return e.tmdb; }));
    var tSeen = new Set(x.tvSeen.map(function (e) { return e.tmdb; }));
    var tAny = new Set(x.tvAny.map(function (e) { return e.tmdb; }));
    var epsBy = {};
    entries.forEach(function (e) { if (e.type === "tv") epsBy[e.tmdb] = new Set(e.eps || []); });

    x.seenMovie = function (id) { return mSet.has(id); };
    x.seenTv    = function (id) { return tSeen.has(id); };
    x.startedTv = function (id) { return tAny.has(id); };
    x.epsOf     = function (id) { return epsBy[id] || new Set(); };
    x.hasEp     = function (id, ep) { return x.epsOf(id).has(ep) || tSeen.has(id); };

    x.hasMovies = function (list) { var n = 0; list.forEach(function (i) { if (mSet.has(i)) n++; }); return n; };
    x.hasTv     = function (list) { var n = 0; list.forEach(function (i) { if (tSeen.has(i)) n++; }); return n; };
    x.startedTvCount = function (list) { var n = 0; list.forEach(function (i) { if (tAny.has(i)) n++; }); return n; };

    // Some sets hold alternative versions of the same film (Justice League / Snyder cut).
    x.hasMoviesAlt = function (list, pairs) {
      var skip = new Set();
      (pairs || []).forEach(function (p) { if (mSet.has(p[0]) && mSet.has(p[1])) skip.add(p[1]); });
      var n = 0; list.forEach(function (i) { if (mSet.has(i) && !skip.has(i)) n++; }); return n;
    };

    x.cnt    = function (p) { return x.movies.filter(function (e) { return e.f && p(e.f, e); }).length; };
    x.cntTv  = function (p) { return x.tvAny.filter(function (e) { return e.f && p(e.f, e); }).length; };
    x.cntTvSeen = function (p) { return x.tvSeen.filter(function (e) { return e.f && p(e.f, e); }).length; };
    x.cntAll = function (p) {
      return x.movies.filter(function (e) { return e.f && p(e.f, e); }).length +
             x.tvAny.filter(function (e) { return e.f && p(e.f, e); }).length;
    };
    x.distinct = function (list, p) {
      var s = new Set();
      list.forEach(function (e) { if (e.f) { var v = p(e.f, e); if (Array.isArray(v)) v.forEach(function (k) { s.add(k); }); else if (v) s.add(v); } });
      return s.size;
    };

    // ---- facts shorthands ----
    x.g  = function (f, name) { return (f.g || []).indexOf(name) >= 0; };
    x.k  = function (f, kw)   { return (f.k || []).indexOf(kw) >= 0; };
    x.kAny = function (f, list) { return (f.k || []).some(function (w) { return list.indexOf(w) >= 0; }); };
    x.c  = function (f, code) { return (f.c || []).indexOf(code) >= 0; };
    x.cAny = function (f, list) { return (f.c || []).some(function (w) { return list.indexOf(w) >= 0; }); };
    x.year = function (f) { var y = parseInt((f.d || "").slice(0, 4), 10); return isFinite(y) ? y : 0; };
    x.inCast = function (f, pid) { return (f.cast || []).some(function (p) { return p[0] === pid; }); };
    x.character = function (f, re) { return (f.cast || []).some(function (p) { return re.test(p[2] || ""); }); };
    x.crewIs = function (f, pid, jobs) {
      return (f.crew || []).some(function (p) { return p[0] === pid && (!jobs || jobs.indexOf(p[2]) >= 0); });
    };
    x.directors = function (f) { return (f.crew || []).filter(function (p) { return p[2] === "Director"; }); };
    x.company = function (f, id) { return (f.comp || []).indexOf(id) >= 0; };
    x.network = function (f, id) { return (f.net || []).indexOf(id) >= 0; };

    x.actor   = function (pid) { return x.cnt(function (f) { return x.inCast(f, pid); }); };
    x.actorAny = function (pid) { return x.cntAll(function (f) { return x.inCast(f, pid); }); };
    x.directed = function (pid) { return x.cnt(function (f) { return x.crewIs(f, pid, ["Director"]); }); };
    x.scored   = function (pid) { return x.cnt(function (f) { return x.crewIs(f, pid, ["Original Music Composer", "Music"]); }); };

    // ---- watch log ----
    var real = logs.filter(function (l) { return l.kind !== "backfill"; });
    x.realLogs = real;
    x.times = function (id) { return logs.filter(function (l) { return l.tmdb === id; }).length; };
    x.onDay = function (mm, dd, pred) {
      return real.filter(function (l) {
        var p = (l.date || "").split("-");
        if (+p[1] !== mm || +p[2] !== dd) return false;
        return !pred || pred(l);
      }).length;
    };
    x.betweenDays = function (from, to, pred) {   // from/to = [month, day], inclusive, may wrap a year
      return real.filter(function (l) {
        var p = (l.date || "").split("-"); var m = +p[1], d = +p[2];
        var v = m * 100 + d, a = from[0] * 100 + from[1], b = to[0] * 100 + to[1];
        var ok = a <= b ? (v >= a && v <= b) : (v >= a || v <= b);
        return ok && (!pred || pred(l));
      }).length;
    };
    x.sameDay = function (idA, idB) {
      var da = new Set(real.filter(function (l) { return l.tmdb === idA; }).map(function (l) { return l.date; }));
      return real.some(function (l) { return l.tmdb === idB && da.has(l.date); }) ? 1 : 0;
    };
    x.apartByDays = function (idA, idB, days) {
      var A = real.filter(function (l) { return l.tmdb === idA; }).map(function (l) { return +new Date(l.date); });
      var B = real.filter(function (l) { return l.tmdb === idB; }).map(function (l) { return +new Date(l.date); });
      for (var i = 0; i < A.length; i++) for (var j = 0; j < B.length; j++)
        if (Math.abs(A[i] - B[j]) >= days * 86400000) return 1;
      return 0;
    };
    x.streak = function () {
      var days = [...new Set(real.map(function (l) { return l.date; }))].filter(Boolean).sort();
      var best = 0, run = 0, prev = null;
      days.forEach(function (d) {
        var t = +new Date(d);
        run = (prev !== null && t - prev === 86400000) ? run + 1 : 1;
        prev = t; if (run > best) best = run;
      });
      return best;
    };

    // ---- episodes ----
    x.epTotal = function (p) {
      var n = 0;
      x.tvAll.forEach(function (e) {
        if (p && !(e.f && p(e.f, e))) return;
        n += (e.eps || []).length || (e.status === "watched" && e.f ? (e.f.ne || 0) : 0);
      });
      return n;
    };
    x.isAnime = function (f) {
      return x.g(f, "Animation") && ((f.oc || []).indexOf("JP") >= 0 || x.k(f, "anime") || f.l === "ja");
    };
    return x;
  }

  // ============================ the achievements ============================
  // A(id, name, description, category, rarity, emoji, need, calc)
  // calc(x) returns how many of `need` are done. Booleans return 0 or 1.
  var ACH = [];
  function A(id, n, d, cat, r, e, need, calc, opts) {
    var o = { id: id, n: n, d: d, cat: cat, r: r, e: e, need: need, calc: calc };
    if (opts) for (var k in opts) o[k] = opts[k];
    ACH.push(o);
  }
  var COLOURS = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

  // ---------------------------- Achievement Hunter ----------------------------
  A("casting_spoilers", "Casting spoilers", "Watch Sean Bean die 5 times", "hunter", "uncommon", "💀", 5,
    function (x) { return x.hasMovies(D.seanBeanDies) + (x.hasEp(D.seanBeanGot, D.seanBeanGotEp) ? 1 : 0); });
  A("matt_damon", "Rescue Matt Damon", "Watch Saving Private Ryan, Interstellar and The Martian", "hunter", "uncommon", "🪖", 3,
    function (x) { return x.hasMovies(D.mattDamon); });
  A("worst_heroes", "Worst super-heroes ever", "Watch The Elephant Man, Rain Man and The Irishman", "hunter", "uncommon", "🦸", 3,
    function (x) { return x.hasMovies(D.notHeroes); });
  A("loremaster", "Loremaster", "Have someone subscribe to your custom collection", "hunter", "uncommon", "📚", 1,
    function (x) { return x.app.subsOnMine > 0 ? 1 : 0; });
  A("fabled", "Fabled", "Watch Fantastic Mr Fox and The Crow on the same day", "hunter", "rare", "🦊", 1,
    function (x) { return x.sameDay(D.fabledFox, D.fabledCrow); });
  A("i_like_trains", "I like trains", "Watch The General, Train to Busan and Bullet Train", "hunter", "rare", "🚂", 3,
    function (x) { return x.hasMovies(D.trains); });
  A("fanfare", "Fanfare", "Watch 15 movies scored by John Williams", "hunter", "rare", "🎼", 15,
    function (x) { return x.scored(D.p.johnWilliams); });
  A("siblingly_love", "Siblingly love", "Watch 5 movies directed by different couples of siblings", "hunter", "rare", "👬", 5,
    function (x) {
      var hit = new Set();
      x.movies.forEach(function (e) {
        if (!e.f) return;
        var ids = x.directors(e.f).map(function (p) { return p[0]; });
        D.siblingDirectors.forEach(function (pair, i) {
          if (ids.indexOf(pair[0]) >= 0 && ids.indexOf(pair[1]) >= 0) hit.add(i);
        });
      });
      return hit.size;
    });
  A("peak_tv", "Peak television", "Watch 50 episodes rated 90% or above", "hunter", "rare", "📺", 50,
    function (x) { return x.app.peakEpisodes || 0; });
  A("groundhog", "Okay campers, rise and shine", "Watch Groundhog Day 5 times", "hunter", "epic", "⏰", 5,
    function (x) { return x.times(D.groundhog); });
  A("movie_rainbow", "Movie Rainbow", "Watch 7 movies named after each colour of the rainbow", "hunter", "epic", "🌈", 7,
    function (x) {
      var hit = new Set();
      x.movies.forEach(function (e) {
        var t = ((e.f && e.f.t) || e.title || "").toLowerCase();
        COLOURS.forEach(function (c) { if (new RegExp("\\b" + c + "\\b").test(t)) hit.add(c); });
      });
      return hit.size;
    });
  A("absolute_cinema", "Absolute Cinema", "Watch 1895 movies", "hunter", "legendary", "🎬", 1895,
    function (x) { return x.movies.length; });

  // ---------------------------- Animation ----------------------------
  A("ogre", "It's all ogre now", "Watch all Shrek movies", "animation", "uncommon", "🧅", 4,
    function (x) { return x.hasMovies(D.shrek); });
  A("edward", "Ed...Ward", "Get traumatized forever", "animation", "uncommon", "⚗️", 1,
    function (x) { return x.hasEp(D.tvFma2003, D.tvFmaEp) ? 1 : 0; });
  A("outsourcing", "Outsourcing", "Watch an animated movie not made in the US or Japan", "animation", "uncommon", "🌐", 1,
    function (x) { return x.cnt(function (f) { return x.g(f, "Animation") && !x.c(f, "US") && !x.c(f, "JP") && (f.c || []).length; }) ? 1 : 0; });
  A("paw_patrol", "All Cops Are Barkers", "Watch an episode of Paw Patrol", "animation", "uncommon", "🐶", 1,
    function (x) { return x.startedTv(D.tvPawPatrol) ? 1 : 0; });
  A("violent_lamp", "Violent lamp", "Watch 15 Pixar movies", "animation", "rare", "💡", 15,
    function (x) { return x.cnt(function (f) { return x.company(f, D.companies.pixar); }); });
  A("drawn_that_way", "Not bad, just drawn that way", "Watch 5 movies mixing live-action and animation", "animation", "rare", "🐰", 5,
    function (x) {
      var n = x.hasMovies(D.hybrid);
      n += x.cnt(function (f, e) { return D.hybrid.indexOf(e.tmdb) < 0 && x.k(f, "live action and animation"); });
      return n;
    });
  A("hand_drawn", "100% hand-drawn", "Watch an animated series made in the 20th century", "animation", "rare", "✏️", 1,
    function (x) { return x.cntTv(function (f) { var y = x.year(f); return x.g(f, "Animation") && y >= 1901 && y <= 2000; }) ? 1 : 0; });
  A("princess", "Pretty princess", "Watch all Disney princess movies", "animation", "epic", "👸", 14,
    function (x) { return x.hasMovies(D.princess); });
  A("ghibli", "A heart's a heavy burden", "Watch all Studio Ghibli movies", "animation", "epic", "🏰", 22,
    function (x) { return x.cnt(function (f) { return x.company(f, D.companies.ghibli) && (f.rt || 0) >= 60; }); });
  A("weeb", "Weeb", "Start watching 50 different anime series", "animation", "epic", "🍥", 50,
    function (x) { return x.cntTv(function (f) { return x.isAnime(f); }); });
  A("over_9000", "It's over 9000!", "Watch over 9000 episodes of anime", "animation", "legendary", "💥", 9001,
    function (x) { return x.epTotal(function (f) { return x.isAnime(f); }); });

  // ---------------------------- Cinephile ----------------------------
  A("the_pile", "Add it to the pile", "Have a watchlist of 100 movies", "cinephile", "uncommon", "📋", 100,
    function (x) { return x.app.watchlist || 0; });
  A("best_picture", "And the award goes to...", "Watch 10 best-picture oscar winning movies", "cinephile", "uncommon", "🏆", 10,
    function (x) { return x.hasMovies(D.bestPicture); });
  A("film_student", "Film student", "Watch Citizen Kane, Psycho and Breathless", "cinephile", "uncommon", "🎓", 3,
    function (x) { return x.hasMovies(D.filmStudent); });
  A("unemployed", "Unemployed", "Watch 5 movies over 4 hours long", "cinephile", "epic", "⏳", 5,
    function (x) { return x.cnt(function (f) { return (f.rt || 0) > 240; }); });
  A("call_the_polis", "Call the Polis", "Watch Metropolis, Cosmopolis and Megalopolis", "cinephile", "epic", "🏙️", 3,
    function (x) { return x.hasMovies(D.polis); });
  A("good_listener", "Good listener", "Watch 10 movies recommended to you", "cinephile", "rare", "👂", 10,
    function (x) { return x.app.recosAdded || 0; });
  A("back_in_my_day", "Back in my day", "Watch 10 movies made before 1960", "cinephile", "rare", "🎞️", 10,
    function (x) { return x.cnt(function (f) { var y = x.year(f); return y && y < 1960; }); });
  A("female_gaze", "The female gaze", "Watch 20 movies directed by a woman", "cinephile", "rare", "👩‍🎬", 20,
    function (x) { return x.cnt(function (f) { return x.directors(f).some(function (p) { return p[3] === 1; }); }); });
  A("colorless", "Colorless", "Watch 100 black & white movies", "cinephile", "legendary", "🖤", 100,
    function (x) { return x.cnt(function (f) { return x.k(f, "black and white"); }); });

  // ---------------------------- Comedy ----------------------------
  A("what_did_we_learn", "What did we learn?", "Watch O Brother Where Art Thou?, Intolerable Cruelty and Burn After Reading", "comedy", "uncommon", "🤦", 3,
    function (x) { return x.hasMovies(D.coen3); });
  A("shush", "Shush", "Watch a silent movie comedy", "comedy", "uncommon", "🤫", 1,
    function (x) { return x.cnt(function (f) { return x.g(f, "Comedy") && (x.k(f, "silent film") || !(f.sp || []).length || (f.sp || []).indexOf("xx") >= 0); }) ? 1 : 0; });
  A("zaz", "ZAZ", "Watch 3 movies directed by Zucker, Abrahams and Zucker", "comedy", "uncommon", "✈️", 3,
    function (x) { return x.hasMovies(D.zaz); });
  A("blues_brothers", "On a mission from God", "Watch The Blues Brothers", "comedy", "uncommon", "🕶️", 1,
    function (x) { return x.seenMovie(D.blues) ? 1 : 0; });
  A("cornetto", "You've got red on you", "Watch the Cornetto Trilogy", "comedy", "uncommon", "🍦", 3,
    function (x) { return x.hasMovies(D.cornetto); });
  A("schurely", "Schurely", "Watch Parks and Recreation, Brooklyn 99 and The Good Place", "comedy", "rare", "🧇", 3,
    function (x) { return x.hasTv([D.tvParks, D.tvB99, D.tvGoodPlace]); });
  A("monty_python", "Messiah and very naughty boy", "Watch all 3 Monty Python movies", "comedy", "rare", "🥥", 3,
    function (x) { return x.hasMovies(D.python); });
  A("mel_brooks", "Where did I go right?", "Watch 5 movies directed by Mel Brooks", "comedy", "rare", "🎭", 5,
    function (x) { return x.directed(D.p.melBrooks); });
  A("laugh_track", "Laugh track", "Watch 100 sitcom episodes", "comedy", "rare", "🤣", 100,
    function (x) {
      return x.epTotal(function (f) {
        if (x.k(f, "sitcom")) return true;
        return x.g(f, "Comedy") && !x.g(f, "Animation") && !x.g(f, "Talk") && !x.g(f, "Reality") && !x.g(f, "Documentary");
      });
    });
  A("british_office", "Before it was cool", "Watch the British Office", "comedy", "rare", "📎", 1,
    function (x) { return x.seenTv(D.tvOfficeUK) ? 1 : 0; });
  A("defunes", "Muskatnuss", "Watch 10 movies featuring Louis de Funès", "comedy", "epic", "🌰", 10,
    function (x) { return x.actor(D.p.defunes); });
  A("hader_200", "Comedy writer", "Watch Bill Hader's 200 essential comedies", "comedy", "legendary", "✍️", 200,
    function () { return 0; }, { pending: true });

  // ---------------------------- Globe-Trotter ----------------------------
  D.continentSets = {
    europe: ["AL","AD","AT","BY","BE","BA","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU",
             "IS","IE","IT","XK","LV","LI","LT","LU","MT","MD","MC","ME","NL","MK","NO","PL","PT",
             "RO","RU","SM","RS","SK","SI","ES","SE","CH","UA","GB","VA","SU","CS","YU","DD"],
    asia:   ["AF","AM","AZ","BH","BD","BT","BN","KH","CN","GE","HK","IN","ID","IR","IQ","IL","JP",
             "JO","KZ","KW","KG","LA","LB","MY","MV","MN","MM","NP","KP","OM","PK","PS","PH","QA",
             "SA","SG","KR","LK","SY","TW","TJ","TH","TL","TR","TM","AE","UZ","VN","YE"],
    america_n: ["CA","US","MX","GT","BZ","SV","HN","NI","CR","PA","CU","DO","HT","JM","PR","TT","BS","BB"],
    america_s: ["AR","BO","BR","CL","CO","EC","GY","PY","PE","SR","UY","VE"],
    oceania: ["AU","NZ","FJ","PG","SB","VU","WS","TO","NC","PF"]
  };
  D.continentSets.africa = D.africa;

  A("cocorico", "Cocorico", "Watch 15 French movies", "globe", "uncommon", "🇫🇷", 15,
    function (x) { return x.cnt(function (f) { return x.c(f, "FR"); }); });
  A("uk_cinema", "Cinema innit", "Watch 10 movies from the UK", "globe", "uncommon", "🇬🇧", 10,
    function (x) { return x.cnt(function (f) { return x.c(f, "GB"); }); });
  A("jp_cinema", "シネマ", "Watch 30 Japanese movies", "globe", "uncommon", "🇯🇵", 30,
    function (x) { return x.cnt(function (f) { return x.c(f, "JP"); }); });
  A("bollywood", "सिनेमा", "Watch 10 Bollywood movies", "globe", "rare", "🇮🇳", 10,
    function (x) { return x.cnt(function (f) { return f.l === "hi" && x.c(f, "IN"); }); });
  A("russian", "кино", "Watch 10 Russian movies", "globe", "rare", "🇷🇺", 10,
    function (x) { return x.cnt(function (f) { return x.cAny(f, ["RU", "SU"]); }); });
  A("oz_cinema", "ɐɯǝuıƆ", "Watch 10 movies from Australia or New Zealand", "globe", "rare", "🦘", 10,
    function (x) { return x.cnt(function (f) { return x.cAny(f, ["AU", "NZ"]); }); });
  A("pangea", "Pangea", "Watch a movie from each continent", "globe", "rare", "🗺️", 6,
    function (x) {
      var hit = new Set();
      x.movies.forEach(function (e) {
        if (!e.f) return;
        Object.keys(D.continentSets).forEach(function (k) {
          if (x.cAny(e.f, D.continentSets[k])) hit.add(k);
        });
      });
      return hit.size;
    });
  A("korean", "कोरियाई", "Watch 10 Korean movies", "globe", "epic", "🇰🇷", 10,
    function (x) { return x.cnt(function (f) { return x.c(f, "KR"); }); });
  A("chinese", "韩国人", "Watch 10 Chinese movies", "globe", "epic", "🇨🇳", 10,
    function (x) { return x.cnt(function (f) { return x.c(f, "CN"); }); });
  A("schengen", "Schengen Cinema", "Watch 50 movies made in the EU", "globe", "epic", "🇪🇺", 50,
    function (x) { return x.cnt(function (f) { return x.cAny(f, D.eu27); }); });
  A("circle_of_life", "Circle of life", "Watch 10 African movies", "globe", "legendary", "🌍", 10,
    function (x) { return x.cnt(function (f) { return x.cAny(f, D.africa); }); });

  // ---------------------------- Horror ----------------------------
  A("dracula", "Bloodthirst", "Watch 5 movies where Dracula is a character", "horror", "uncommon", "🧛", 5,
    function (x) { return x.cnt(function (f) { return x.k(f, "dracula") || x.character(f, /dracula/i); }); });
  A("werewolf", "Awooo", "Watch 5 movies featuring a werewolf", "horror", "uncommon", "🐺", 5,
    function (x) { return x.cnt(function (f) { return x.k(f, "werewolf"); }); });
  A("devil", "Highway to hell", "Watch 10 movies where the Devil is a character", "horror", "rare", "😈", 10,
    function (x) { return x.cnt(function (f) { return x.kAny(f, ["devil", "satan", "lucifer"]) || x.character(f, /\b(devil|satan|lucifer)\b/i); }); });
  A("lovecraft", "Cosmically horrible", "Watch 5 movie adaptations of a Lovecraft story", "horror", "rare", "🐙", 5,
    function (x) { return x.cnt(function (f) { return x.kAny(f, ["h. p. lovecraft", "cthulhu mythos"]); }); });

  // ---------------------------- Nanard ----------------------------
  A("cursed_trifecta", "Cursed trifecta", "Watch Dragonball Evolution, The Last Airbender and Eragon", "nanard", "uncommon", "🪦", 3,
    function (x) { return x.hasMovies(D.cursed); });
  A("one_too_many", "One too many", "Watch 4 fourth movies", "nanard", "uncommon", "4️⃣", 4,
    function (x) { return x.cnt(function (f) { return f.cpos === 4; }); });
  A("oh_hi_mark", "Oh hi Mark", "Watch The Room", "nanard", "uncommon", "🏈", 1,
    function (x) { return x.seenMovie(D.theRoom) ? 1 : 0; });
  A("michael_bay", "Explosions, Bayby!", "Watch 3 movies directed by Michael Bay", "nanard", "uncommon", "💣", 3,
    function (x) { return x.directed(D.p.michaelBay); });
  A("connoisseur", "Connoisseur", "Rate 8 or higher a movie with a user score under 5", "nanard", "uncommon", "🍷", 1,
    function (x) { return x.cnt(function (f, e) { return (e.rating || 0) >= 8 && (f.v || 0) < 5 && (f.vc || 0) >= 10; }) ? 1 : 0; });
  A("bad_first_season", "Bro I promise it gets better", "Recommend a TV show with a first season rating under 50%", "nanard", "uncommon", "🤞", 1,
    function (x) { return x.app.recommendedBadS1 ? 1 : 0; });
  A("snyder_cut", "#ReleaseTheSnyderCut", "Watch 5 non-DCU movies directed by Zack Snyder", "nanard", "rare", "✂️", 5,
    function (x) { return x.hasMovies(D.snyderNonDC); });
  A("pixellated", "Pixellated", "Watch 10 live-action movie adaptations of a video game", "nanard", "rare", "🎮", 10,
    function (x) { return x.cnt(function (f) { return x.k(f, "based on video game") && !x.g(f, "Animation"); }); });
  A("mouse_milking", "Mouse-milking", "Watch 5 direct-to-DVD Disney sequels", "nanard", "rare", "🐭", 5,
    function (x) { return x.hasMovies(D.disneyToon); });
  A("centipede", "Pucker up", "Watch all Human Centipede movies", "nanard", "epic", "🤢", 3,
    function (x) { return x.hasMovies(D.centipede); });
  A("garbage_taste", "Garbage taste", "Watch 30 movies with a user score under 50%", "nanard", "epic", "🗑️", 30,
    function (x) { return x.cnt(function (f) { return (f.v || 0) < 5 && (f.vc || 0) >= 10; }); });

  // ---------------------------- Romance ----------------------------
  A("meet_cute", "Meet cute", "Watch 5 rom-coms", "romance", "uncommon", "💕", 5,
    function (x) { return x.cnt(function (f) { return x.g(f, "Romance") && x.g(f, "Comedy"); }); });
  A("better_than_twilight", "Still better than Twilight", "Watch a romance movie rated 5 or less", "romance", "uncommon", "🌘", 1,
    function (x) { return x.cnt(function (f) { return x.g(f, "Romance") && (f.v || 0) <= 5 && (f.vc || 0) >= 10; }) ? 1 : 0; });
  A("polycule", "Potential polycule", "Watch 3 movies with a love triangle", "romance", "uncommon", "🔺", 3,
    function (x) { return x.cnt(function (f) { return x.k(f, "love triangle"); }); });
  A("fleabag_s2", "This is a love story", "Watch the second season of Fleabag", "romance", "uncommon", "⛪", 1,
    function (x) {
      if (x.seenTv(D.tvFleabag)) return 1;
      var s = x.epsOf(D.tvFleabag), n = 0;
      s.forEach(function (k) { if (k.indexOf("S2E") === 0) n++; });
      return n >= 6 ? 1 : 0;
    });
  A("taste_rainbow", "Taste the rainbow", "Watch 5 movies about gay romance", "romance", "rare", "🏳️‍🌈", 5,
    function (x) { return x.cnt(function (f) { return x.g(f, "Romance") && x.kAny(f, ["gay theme", "gay interest", "lgbt", "male homosexuality", "gay couple"]); }); });
  A("musicals", "Once more, with feeling", "Watch 25 musicals", "romance", "epic", "🎶", 25,
    function (x) { return x.cnt(function (f) { return x.k(f, "musical"); }); });

  // ---------------------------- Sci-Fi ----------------------------
  A("engage", "Engage", "Finish a Star Trek TV show", "scifi", "uncommon", "🖖", 1,
    function (x) { return x.hasTv(D.trekShows) ? 1 : 0; });
  A("dune", "The spice must flow", "Watch all adaptations of Dune", "scifi", "uncommon", "🪱", 3,
    function (x) { return x.hasMovies(D.dune); });
  A("b_movie", "B-Movie enjoyer", "Watch 5 movies in both Sci-Fi and Horror genres", "scifi", "uncommon", "👽", 5,
    function (x) { return x.cnt(function (f) { return x.g(f, "Science Fiction") && x.g(f, "Horror"); }); });
  A("nineteen84", "Litteraly 1984", "Watch 1984's 1984", "scifi", "uncommon", "👁️", 1,
    function (x) { return x.seenMovie(D.nineteen84) ? 1 : 0; });
  A("martian", "Martian", "Watch 5 movies with the word Mars in the title", "scifi", "rare", "🔴", 5,
    function (x) { return x.cnt(function (f, e) { return /\bmars\b/i.test((f && f.t) || e.title || ""); }); });
  A("trek_movies", "Live long and prosper", "Watch all Star Trek movies", "scifi", "rare", "🚀", 13,
    function (x) { return x.hasMovies(D.trekFilms); });
  A("no_cgi", "Who needs CGI", "Watch 15 Sci-Fi movies from before 1985", "scifi", "rare", "🛸", 15,
    function (x) { return x.cnt(function (f) { var y = x.year(f); return x.g(f, "Science Fiction") && y && y < 1985; }); });
  A("lego_sw", "Revenge of the Brick", "Watch a Lego Star Wars episode", "scifi", "rare", "🧱", 1,
    function (x) { return x.startedTvCount(D.legoSw) ? 1 : 0; });
  A("terminator", "I'll be back", "Watch Terminator and Terminator 2 a year apart", "scifi", "epic", "🤖", 1,
    function (x) { return x.apartByDays(D.terminator[0], D.terminator[1], 365); });
  A("all_doctors", "Time and relative dimension in space", "Watch a Doctor Who episode with each Doctor", "scifi", "epic", "🌀", 15,
    function (x) {
      var n = 0;
      D.doctors.forEach(function (doc) {
        if (doc.movie) { if (x.seenMovie(doc.movie)) n++; return; }
        var eps = x.epsOf(doc.show);
        if (x.seenTv(doc.show)) { n++; return; }
        var hit = false;
        eps.forEach(function (k) {
          var m = /^S(\d+)E\d+$/.exec(k);
          if (m && doc.seasons.indexOf(+m[1]) >= 0) hit = true;
        });
        if (hit) n++;
      });
      return n;
    });
  A("answer_42", "The answer to everything", "Watch an episode from 42 different Sci-Fi TV shows", "scifi", "epic", "🌌", 42,
    function (x) { return x.cntTv(function (f) { return x.g(f, "Sci-Fi & Fantasy"); }); });

  // ---------------------------- Seasonal ----------------------------
  // These read the watch log, and only rows logged for real (not the backfill).
  A("july4", "Murica", "Watch Independence Day on July 4th", "seasonal", "uncommon", "🇺🇸", 1,
    function (x) { return x.onDay(7, 4, function (l) { return l.tmdb === D.independence; }) ? 1 : 0; });
  A("spooky", "Spooky season", "Watch a horror movie on October 31st", "seasonal", "uncommon", "🎃", 1,
    function (x) { return x.onDay(10, 31, function (l) { return l.f && x.g(l.f, "Horror"); }) ? 1 : 0; });
  A("nightmare_xmas", "Is this Halloween?", "Watch The Nightmare Before Christmas between October 31st and December 25th", "seasonal", "uncommon", "🕸️", 1,
    function (x) { return x.betweenDays([10, 31], [12, 25], function (l) { return l.tmdb === D.nightmareXmas; }) ? 1 : 0; });
  A("may4", "May the force be with you", "Watch a Star Wars movie on May the 4th", "seasonal", "rare", "⚔️", 1,
    function (x) { return x.onDay(5, 4, function (l) { return D.starWars.indexOf(l.tmdb) >= 0; }) ? 1 : 0; });
  A("valentine", "Love season", "Watch a romance movie on February 14th", "seasonal", "rare", "❤️", 1,
    function (x) { return x.onDay(2, 14, function (l) { return l.f && x.g(l.f, "Romance"); }) ? 1 : 0; });
  A("gigawatts", "1.21 Gigawatts", "Watch Back to the Future on November 5th", "seasonal", "rare", "⚡", 1,
    function (x) { return x.onDay(11, 5, function (l) { return l.tmdb === D.bttf; }) ? 1 : 0; });
  A("hohoho", "Ho ho ho", "Watch a Christmas movie on December 25th", "seasonal", "rare", "🎅", 1,
    function (x) { return x.onDay(12, 25, function (l) { return l.f && x.k(l.f, "christmas"); }) ? 1 : 0; });
  A("never_forget", "Never forget", "Watch The Lord of the Rings: The Two Towers on September 11th", "seasonal", "epic", "🕯️", 1,
    function (x) { return x.onDay(9, 11, function (l) { return l.tmdb === D.lotrTwoTowers; }) ? 1 : 0; });
  A("full_calendar", "Full calendar", "Watch something 365 days in a row", "seasonal", "legendary", "📅", 365,
    function (x) { return x.streak(); });

  // ---------------------------- Star collector ----------------------------
  A("will_smith", "Keep his wife's name out of your mouth", "Watch 10 movies featuring Will Smith", "star", "uncommon", "👋", 10,
    function (x) { return x.actor(D.p.willSmith); });
  A("tom_cruise", "So I get a new safety guy", "Watch 10 movies featuring Tom Cruise", "star", "uncommon", "🛩️", 10,
    function (x) { return x.actor(D.p.tomCruise); });
  A("gosling", "Litteraly me", "Watch 10 movies featuring Ryan Gosling", "star", "uncommon", "🚗", 10,
    function (x) { return x.actor(D.p.gosling); });
  A("jodie_foster", "Hard to impress", "Watch 10 movies featuring Jodie Foster", "star", "uncommon", "🐑", 10,
    function (x) { return x.actor(D.p.jodieFoster); });
  A("nic_cage", "Not the bees", "Watch 10 movies featuring Nicolas Cage", "star", "rare", "🐝", 10,
    function (x) { return x.actor(D.p.nicolasCage); });
  A("pedro", "Pedro Pedro Pedro", "Watch 40 titles featuring Pedro Pascal", "star", "rare", "👶", 40,
    function (x) { return x.actorAny(D.p.pedroPascal); });
  A("britta", "Oh, Britta's in this?", "Watch a movie featuring Gillian Jacobs", "star", "rare", "🎨", 1,
    function (x) { return x.actor(D.p.gillianJacobs) ? 1 : 0; });
  A("meryl", "She can do anything", "Watch 10 movies featuring Meryl Streep", "star", "rare", "👗", 10,
    function (x) { return x.actor(D.p.meryl); });
  A("tudyk", "A leaf on the wind", "Watch 100 titles featuring Alan Tudyk", "star", "epic", "🍃", 100,
    function (x) { return x.actorAny(D.p.alanTudyk); });
  A("marilyn", "Marilyn Diptych", "Watch 5 titles featuring Marilyn Monroe", "star", "epic", "💋", 5,
    function (x) { return x.actorAny(D.p.marilyn); });

  // ---------------------------- Super-Hero ----------------------------
  A("infinity_saga", "Snap", "Watch every movie from the MCU Infinity Saga", "hero", "uncommon", "🫰", 23,
    function (x) { return x.hasMovies(D.mcuInfinity); });
  A("snyderverse", "On my planet it means Hope", "Watch every Snyderverse DC movie", "hero", "uncommon", "🦸‍♂️", 15,
    function (x) { return Math.min(15, x.hasMoviesAlt(D.dceu, D.dceuPairs)); });
  A("fox_xmen", "To me, my X-Men", "Watch all Fox X-Men movies", "hero", "uncommon", "❌", 13,
    function (x) { return x.hasMovies(D.xmenFox); });
  A("alan_moore", "Alan Moore approved", "Watch the only adaptation of his work Alan Moore likes", "hero", "uncommon", "🪄", 1,
    function (x) { return x.hasEp(D.tvJlu, D.tvJluEp) ? 1 : 0; });
  A("all_batman", "I am vengeance", "Watch every Batman movie", "hero", "rare", "🦇", 10,
    function (x) { return x.hasMovies(D.batman); });
  A("morbin", "It's morbin time", "Watch Morbius twice", "hero", "rare", "🩸", 2,
    function (x) { return x.times(D.morbius); });
  A("fantastic4", "Say that again?", "Watch all Fantastic Four movies", "hero", "rare", "🔥", 5,
    function (x) { return x.hasMovies(D.fantastic4); });
  A("arrowverse", "You have failed this city", "Finish the Arrowverse", "hero", "epic", "🏹", 10,
    function (x) { return x.hasTv(D.arrowverse); });
  A("road_to_endgame", "Infinity Gauntlet", "Finish the Road to Endgame collection", "hero", "epic", "🧤", 1,
    function (x) { return x.app.roadToEndgame ? 1 : 0; });
  A("tights", "Tights over pants", "Watch 1938 super-hero titles", "hero", "legendary", "🩲", 1938,
    function (x) { return x.cntAll(function (f) { return x.k(f, "superhero"); }); });

  // ---------------------------- Western ----------------------------
  A("high_noon", "High noon", "Watch 12 westerns", "western", "uncommon", "🤠", 12,
    function (x) { return x.cnt(function (f) { return x.g(f, "Western"); }); });
  A("morricone", "Sound of harmonica", "Watch 5 movies scored by Ennio Morricone", "western", "uncommon", "🎵", 5,
    function (x) { return x.scored(D.p.morricone); });
  A("modern_western", "Modern times", "Watch 10 westerns made in the 21st century", "western", "rare", "🏜️", 10,
    function (x) { return x.cnt(function (f) { return x.g(f, "Western") && x.year(f) >= 2001; }); });
  A("standoff", "Stand-off", "Recommend a western to a friend who already recommended it to you", "western", "rare", "🔫", 1,
    function (x) { return x.app.mutualWesternReco ? 1 : 0; });
  A("bounty_hunter", "Bounty Hunter", "Complete a western-themed collection", "western", "epic", "💰", 1,
    function (x) { return x.app.westernCollection ? 1 : 0; });
  A("sunset", "Ride into the sunset", "Watch 100 westerns", "western", "legendary", "🌅", 100,
    function (x) { return x.cnt(function (f) { return x.g(f, "Western"); }); });

  // ---------------------------- Action ----------------------------
  A("godzilla", "Oh no, there goes Tokyo", "Watch 5 Godzilla movies", "action", "uncommon", "🦖", 5,
    function (x) { return x.cnt(function (f, e) { return /godzilla/i.test((f && f.t) || e.title || "") || x.k(f, "godzilla"); }); });
  A("fisticuffs", "Fisticuffs", "Watch an action movie from before 1950", "action", "uncommon", "👊", 1,
    function (x) { return x.cnt(function (f) { var y = x.year(f); return x.g(f, "Action") && y && y < 1950; }) ? 1 : 0; });
  A("fast_furious", "Quick and angry", "Watch 5 Fast and Furious movies", "action", "uncommon", "🏎️", 5,
    function (x) { return x.cnt(function (f) { return f.co === D.fastCollection; }); });
  A("john_wick", "Baba yaga", "Watch all John Wick movies", "action", "uncommon", "🐕", 5,
    function (x) { return x.hasMovies(D.johnWick); });
  A("kung_fu", "I know Kung Fu", "Watch 5 movies featuring Bruce Lee and 5 featuring Jackie Chan", "action", "rare", "🥋", 10,
    function (x) { return Math.min(5, x.actor(D.p.bruceLee)) + Math.min(5, x.actor(D.p.jackieChan)); });
  A("rock_jungle", "The jungle rocks", "Watch 5 movies featuring Dwayne Johnson in the jungle", "action", "rare", "🌴", 5,
    function (x) { return x.hasMovies(D.rockJungle); });
  A("expendables", "Still got it", "Watch all Expendables movies", "action", "rare", "💪", 4,
    function (x) { return x.hasMovies(D.expendables); });
  A("season_of_24", "That's a lot of hours", "Watch a season of 24", "action", "rare", "⏱️", 1,
    function (x) {
      if (x.seenTv(D.tv24)) return 1;
      var by = {}; x.epsOf(D.tv24).forEach(function (k) { var m = /^S(\d+)E/.exec(k); if (m) by[m[1]] = (by[m[1]] || 0) + 1; });
      return Object.keys(by).some(function (s) { return by[s] >= 20; }) ? 1 : 0;
    });

  // ---------------------------- TV Aficionado ----------------------------
  A("pandemic", "Pandemic memories", "Watch a season of a show made in 2020 or 2021", "tv", "uncommon", "😷", 1,
    function (x) { return x.cntTv(function (f) { return (f.sa || []).some(function (y) { return y === 2020 || y === 2021; }); }) ? 1 : 0; });
  A("netflix", "Second screen friendly", "Watch 5 Netflix original shows", "tv", "uncommon", "📱", 5,
    function (x) { return x.cntTv(function (f) { return x.network(f, D.networks.netflix); }); });
  A("hbo", "Prestige TV", "Watch 5 HBO original shows", "tv", "uncommon", "🐉", 5,
    function (x) { return x.cntTv(function (f) { return x.network(f, D.networks.hbo) || x.network(f, D.networks.max); }); });
  A("short_british", "Where's the rest of it?", "Watch 5 British series with under 10 episodes", "tv", "uncommon", "☕", 5,
    function (x) { return x.cntTvSeen(function (f) { return (f.oc || []).indexOf("GB") >= 0 && (f.ne || 0) > 0 && f.ne < 10; }); });
  A("breaking_bad", "The one who knocks", "Watch all of Breaking Bad and its spin-offs", "tv", "uncommon", "🚪", 3,
    function (x) { return x.hasTv([D.tvBreakingBad, D.tvBetterCall]) + (x.seenMovie(D.elCamino) ? 1 : 0); });
  A("binge_marathon", "Binging marathon", "Finish a TV series over 10 seasons long", "tv", "rare", "🍿", 1,
    function (x) { return x.cntTvSeen(function (f) { return (f.ns || 0) >= 11; }) ? 1 : 0; });
  A("prime", "Funding Bezos", "Watch 5 Prime original shows", "tv", "rare", "📦", 5,
    function (x) { return x.cntTv(function (f) { return x.network(f, D.networks.prime); }); });
  A("polyglot", "Polyglot", "Watch 10 TV shows in a language other than English, French or Japanese", "tv", "rare", "🗣️", 10,
    function (x) { return x.cntTv(function (f) { return f.l && ["en", "fr", "ja"].indexOf(f.l) < 0; }); });
  A("single_channel", "Single channel", "Watch a TV show made before 1960", "tv", "rare", "📻", 1,
    function (x) { return x.cntTv(function (f) { var y = x.year(f); return y && y < 1960; }) ? 1 : 0; });
  A("finales", "Everything ends", "Watch 100 show finales", "tv", "epic", "🏁", 100,
    function (x) {
      return x.tvAll.filter(function (e) {
        if (!e.f || ["Ended", "Canceled"].indexOf(e.f.st) < 0 || !e.f.le) return false;
        return e.status === "watched" || (e.eps || []).indexOf(e.f.le) >= 0;
      }).length;
    });
  A("cancelled", "#AndAMovie", "Watch 25 cancelled TV shows", "tv", "epic", "🚫", 25,
    function (x) { return x.cntTvSeen(function (f) { return f.st === "Canceled"; }); });
  A("year_off", "A year off your life", "Have a combined watchtime of 8760 hours of TV", "tv", "legendary", "⌛", 525600,
    function (x) {
      var m = 0;
      x.tvAll.forEach(function (e) {
        if (!e.f) return;
        var eps = (e.eps || []).length || (e.status === "watched" ? (e.f.ne || 0) : 0);
        m += eps * (e.f.ert || 42) * (1 + (e.rewatch || 0));
      });
      return Math.round(m);
    });

  // ---------------------------- Crime ----------------------------
  A("hitchcock", "Master of Suspense", "Watch 5 crime movies by Alfred Hitchcock", "crime", "uncommon", "🚿", 5,
    function (x) { return x.cnt(function (f) { return x.crewIs(f, D.p.hitchcock, ["Director"]) && x.g(f, "Crime"); }); });
  A("whodunit", "The butler did it", "Watch 5 whodunits", "crime", "uncommon", "🤵", 5,
    function (x) { return x.cnt(function (f) { return x.k(f, "whodunit"); }); });
  A("gangster", "Made man", "Watch 5 gangster movies", "crime", "uncommon", "🕴️", 5,
    function (x) { return x.cnt(function (f) { return x.g(f, "Crime") && x.kAny(f, ["gangster", "mafia", "mobster", "organized crime"]); }); });
  A("true_crime", "History of violence", "Watch 5 crime movies based on true events", "crime", "uncommon", "📰", 5,
    function (x) { return x.cnt(function (f) { return x.g(f, "Crime") && x.k(f, "based on true story"); }); });
  A("objection", "Objection", "Rate a courtroom drama at least 4 points above or below its audience score", "crime", "uncommon", "⚖️", 1,
    function (x) {
      return x.cnt(function (f, e) {
        return x.g(f, "Drama") && x.kAny(f, ["courtroom", "courtroom drama"]) &&
               e.rating && (f.v || 0) && Math.abs(e.rating - f.v) >= 4;
      }) ? 1 : 0;
    });
  A("filmbro", "Filmbro role models", "Watch American Psycho, Fight Club and Joker", "crime", "uncommon", "🧼", 3,
    function (x) { return x.hasMovies(D.filmbro); });
  A("crime_decades", "A life of crime", "Watch a crime movie from each decade starting 1900", "crime", "rare", "🚔", 13,
    function (x) {
      var hit = new Set();
      x.movies.forEach(function (e) {
        if (!e.f || !x.g(e.f, "Crime")) return;
        var y = x.year(e.f); if (y >= 1900 && y < 2030) hit.add(Math.floor(y / 10) * 10);
      });
      return hit.size;
    });
  A("crime_100", "Violence isn't the answer, it's the question", "Watch 100 crime movies", "crime", "rare", "🔪", 100,
    function (x) { return x.cnt(function (f) { return x.g(f, "Crime"); }); });
  A("sherlocks", "Elementary", "Watch 10 different actors playing Sherlock Holmes", "crime", "rare", "🔍", 10,
    function (x) {
      var who = new Set();
      x.entries.forEach(function (e) {
        if (!e.f || (e.status !== "watched" && !(e.eps || []).length)) return;
        (e.f.cast || []).forEach(function (p) { if (/sherlock holmes/i.test(p[2] || "")) who.add(p[0]); });
      });
      return who.size;
    });
  A("prison_escape", "Let me out", "Watch 5 movies about a prison escape", "crime", "rare", "⛓️", 5,
    function (x) { return x.cnt(function (f) { return x.k(f, "prison escape"); }); });
  A("ncis_20", "Major Case response team", "Watch 20 or more seasons of NCIS", "crime", "epic", "⚓", 20,
    function (x) {
      if (x.seenTv(D.tvNcis)) return 20;
      var by = {}; x.epsOf(D.tvNcis).forEach(function (k) { var m = /^S(\d+)E/.exec(k); if (m) by[m[1]] = (by[m[1]] || 0) + 1; });
      return Object.keys(by).filter(function (s) { return by[s] >= 18; }).length;
    });
  A("heists", "You might be on a list now", "Watch 50 heist movies or TV shows", "crime", "epic", "💎", 50,
    function (x) { return x.cntAll(function (f) { return x.k(f, "heist"); }); });

  // ============================ engine ============================
  var CATS = [
    ["hunter", "Achievement Hunter"], ["animation", "Animation"], ["cinephile", "Cinephile"],
    ["comedy", "Comedy"], ["globe", "Globe-Trotter"], ["horror", "Horror"], ["nanard", "Nanard"],
    ["romance", "Romance"], ["scifi", "Science-Fiction"], ["seasonal", "Seasonal"], ["star", "Star collector"],
    ["hero", "Super-Hero"], ["western", "Western"], ["action", "Action"], ["tv", "TV Aficionado"],
    ["crime", "Crime"]
  ];
  var XP = { uncommon: 60, rare: 150, epic: 400, legendary: 1000 };

  function evaluate(state) {
    var x = ctx(state);
    return ACH.map(function (a) {
      var have = 0;
      try { have = a.calc(x) || 0; } catch (e) { have = 0; }
      have = Math.max(0, Math.min(have, a.need));
      return { id: a.id, n: a.n, d: a.d, cat: a.cat, r: a.r, e: a.e,
               need: a.need, have: have, done: have >= a.need, pending: !!a.pending };
    });
  }

  window.SeenAchievements = {
    list: ACH, cats: CATS, xp: XP, ids: D, evaluate: evaluate, count: ACH.length
  };
})();
