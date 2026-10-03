(() => {
  const GAMES = window.GAMES || [];
  const ESC_HOLD_MS = 800;
  const LAST_KEY = "qwg:last";
  // カードに並べる説明項目（games.js の info のキー → 見出し）
  const INFO_LABELS = [
    ["time", "プレイ時間"],
    ["status", "状態"],
    ["future", "今後"],
    ["controls", "操作"],
    ["models", "利用モデル"],
  ];

  const $ = (id) => document.getElementById(id);
  const titleScreen = $("title-screen");
  const playScreen = $("play-screen");
  const list = $("game-list");
  const frameWrap = $("frame-wrap");
  const playTitle = $("play-title");

  const gameUrl = (g, file = "index.html") => `games/${encodeURIComponent(g.id)}/build/web/${file}`;

  // ---------- タイトル画面 ----------
  let selected = 0;
  const cards = GAMES.map((g, i) => {
    const li = document.createElement("li");
    li.setAttribute("role", "presentation");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "card";
    btn.setAttribute("role", "option");
    btn.style.setProperty("--accent", g.accent || "#7c86ff");

    const art = document.createElement("div");
    art.className = "card-art";
    if (g.cover || g.icon) {
      const img = document.createElement("img");
      img.src = g.cover || gameUrl(g, g.icon);
      img.alt = "";
      if (g.cover) img.classList.add("cover");
      if (g.pixel) img.classList.add("pixel");
      art.append(img);
    } else {
      const emblem = document.createElement("span");
      emblem.className = "emblem";
      emblem.textContent = g.title;
      art.append(emblem);
    }

    const body = document.createElement("div");
    body.className = "card-body";
    body.innerHTML = `
      <div class="card-head"><span class="card-genre"></span></div>
      <h2 class="card-title"></h2>`;
    body.querySelector(".card-genre").textContent = g.genre || "GAME";
    body.querySelector(".card-title").textContent = g.title;
    if (g.badge) {
      const badge = document.createElement("span");
      badge.className = "card-badge";
      badge.textContent = g.badge;
      body.querySelector(".card-head").append(badge);
    }
    if (g.desc) {
      const desc = document.createElement("p");
      desc.className = "card-desc";
      desc.textContent = g.desc;
      body.append(desc);
    }
    const info = INFO_LABELS.filter(([key]) => g.info?.[key]);
    if (info.length) {
      const dl = document.createElement("dl");
      dl.className = "card-info";
      for (const [key, label] of info) {
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = label;
        dd.textContent = g.info[key];
        dl.append(dt, dd);
      }
      body.append(dl);
    }
    const play = document.createElement("span");
    play.className = "card-play";
    play.textContent = "PLAY ▶";
    body.append(play);

    btn.append(art, body);
    btn.addEventListener("click", () => launch(g));
    btn.addEventListener("mouseenter", () => select(i, false));
    btn.addEventListener("focus", () => select(i, false));

    li.append(btn);
    list.append(li);
    return btn;
  });

  function select(i, focus = true) {
    if (!cards.length) return;
    selected = (i + cards.length) % cards.length;
    cards.forEach((c, j) => {
      c.classList.toggle("selected", j === selected);
      c.setAttribute("aria-selected", j === selected);
    });
    if (focus) cards[selected].focus({ preventScroll: false });
    try { localStorage.setItem(LAST_KEY, GAMES[selected].id); } catch {}
  }

  // 1行に並んでいるカードの数（上下キーの移動量）
  function columns() {
    const top = cards[0]?.offsetTop;
    return cards.filter((c) => c.offsetTop === top).length || 1;
  }

  document.addEventListener("keydown", (e) => {
    if (!titleScreen.hidden) {
      const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -columns(), ArrowDown: columns() }[e.key];
      if (step) {
        e.preventDefault();
        const next = selected + step;
        // 上下は範囲外なら動かさない、左右は端でループ
        if (Math.abs(step) === 1 || (next >= 0 && next < cards.length)) select(next);
      } else if ((e.key === "Enter" || e.key === " ") && document.activeElement === document.body) {
        e.preventDefault();
        launch(GAMES[selected]);
      }
    } else {
      handleEscKey(e);
    }
  });
  document.addEventListener("keyup", (e) => { if (e.key === "Escape") cancelEscHold(); });

  // ---------- プレイ画面 ----------
  let pushedFromTitle = false;

  function launch(g) {
    pushedFromTitle = true;
    location.hash = `play=${encodeURIComponent(g.id)}`;
  }

  function backToTitle() {
    if (pushedFromTitle) {
      history.back();
    } else {
      history.replaceState(null, "", location.pathname + location.search);
      route();
    }
  }

  function startGame(g) {
    frameWrap.replaceChildren();
    const iframe = document.createElement("iframe");
    iframe.src = gameUrl(g);
    iframe.title = g.title;
    iframe.allow = "autoplay; fullscreen; gamepad; cross-origin-isolated";
    iframe.setAttribute("allowfullscreen", "");
    iframe.addEventListener("load", () => {
      iframe.contentWindow.focus();
      // 同一オリジンなのでゲーム内のキー入力も拾える（Esc 長押しでタイトルへ）
      try {
        iframe.contentWindow.addEventListener("keydown", handleEscKey, true);
        iframe.contentWindow.addEventListener("keyup", (e) => { if (e.key === "Escape") cancelEscHold(); }, true);
      } catch {}
    });
    frameWrap.append(iframe);

    playTitle.textContent = g.title;
    document.title = `${g.title} - Quique Web Games`;
    titleScreen.hidden = true;
    playScreen.hidden = false;
  }

  function stopGame() {
    cancelEscHold();
    // iframe を捨てると WASM のメモリと音声も解放される
    frameWrap.replaceChildren();
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    document.title = "Quique Web Games";
    playScreen.hidden = true;
    titleScreen.hidden = false;
  }

  function route() {
    const m = location.hash.match(/^#play=(.+)$/);
    const g = m && GAMES.find((x) => x.id === decodeURIComponent(m[1]));
    if (g) {
      startGame(g);
    } else {
      const wasPlaying = !playScreen.hidden;
      stopGame();
      pushedFromTitle = false;
      select(selected, wasPlaying);
    }
  }

  // ---------- Esc 長押し ----------
  let escTimer = null;
  let gauge = null;

  function handleEscKey(e) {
    if (e.key !== "Escape" || e.repeat || escTimer || playScreen.hidden) return;
    gauge = document.createElement("div");
    gauge.className = "esc-gauge";
    gauge.style.setProperty("--hold", `${ESC_HOLD_MS}ms`);
    gauge.textContent = "Esc 長押しでタイトルへ…";
    frameWrap.append(gauge);
    escTimer = setTimeout(() => { cancelEscHold(); backToTitle(); }, ESC_HOLD_MS);
  }

  function cancelEscHold() {
    clearTimeout(escTimer);
    escTimer = null;
    gauge?.remove();
    gauge = null;
  }

  $("btn-back").addEventListener("click", backToTitle);
  $("btn-fullscreen").addEventListener("click", () => {
    const el = frameWrap;
    const req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (req) req.call(el).catch?.(() => {});
    frameWrap.querySelector("iframe")?.contentWindow.focus();
  });

  window.addEventListener("hashchange", route);

  // 前回選んだゲームにカーソルを合わせておく
  try {
    const last = localStorage.getItem(LAST_KEY);
    const idx = GAMES.findIndex((g) => g.id === last);
    if (idx >= 0) selected = idx;
  } catch {}
  select(selected, false);
  route();
})();
