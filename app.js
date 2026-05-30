const DB_NAME = "respiracion-yogui";
const DB_VERSION = 1;
const TRACK_VOLUME = 0.34;
const RAIN_VOLUME = 0.08;
const VOICE_RATE = 0.74;
const VOICE_PITCH = 1.08;
const VOICE_VOLUME = 0.38;

const MOODS = [
  {
    id: "anxious",
    label: "Ansiosa",
    hint: "Para bajar la urgencia interna y encontrar espacio.",
  },
  {
    id: "stressed",
    label: "Estresada",
    hint: "Para soltar tensión acumulada en el cuerpo.",
  },
  {
    id: "tired",
    label: "Cansada",
    hint: "Para descansar sin desconectarte del todo.",
  },
  {
    id: "distracted",
    label: "Distraída",
    hint: "Para volver al presente con suavidad.",
  },
  {
    id: "low energy",
    label: "Con poca energía",
    hint: "Para activar el ánimo sin exigirte.",
  },
  {
    id: "sleep better",
    label: "Dormir mejor",
    hint: "Para preparar una noche más tranquila.",
  },
  {
    id: "balanced",
    label: "Equilibrada",
    hint: "Para sostener calma y claridad.",
  },
];

const ROUTINES = [
  {
    name: "Calma Lunar",
    mood: "anxious",
    inhale_seconds: 4,
    hold_seconds: 2,
    exhale_seconds: 6,
    second_hold_seconds: 0,
    duration_minutes: 4,
    description: "Una exhalación más larga para invitar al sistema nervioso a bajar el ritmo.",
    objective: "calmar ansiedad",
  },
  {
    name: "Hombros Suaves",
    mood: "stressed",
    inhale_seconds: 4,
    hold_seconds: 4,
    exhale_seconds: 6,
    second_hold_seconds: 2,
    duration_minutes: 5,
    description: "Un patrón redondo para liberar presión y recuperar una sensación de pausa.",
    objective: "soltar tensión",
  },
  {
    name: "Descanso Claro",
    mood: "tired",
    inhale_seconds: 4,
    hold_seconds: 1,
    exhale_seconds: 5,
    second_hold_seconds: 0,
    duration_minutes: 3,
    description: "Respiración estable y breve para descansar sin caer en pesadez.",
    objective: "renovar energía suave",
  },
  {
    name: "Centro Presente",
    mood: "distracted",
    inhale_seconds: 4,
    hold_seconds: 4,
    exhale_seconds: 4,
    second_hold_seconds: 4,
    duration_minutes: 4,
    description: "Respiración cuadrada para recuperar foco, orden y presencia.",
    objective: "mejorar concentración",
  },
  {
    name: "Brillo Interior",
    mood: "low energy",
    inhale_seconds: 5,
    hold_seconds: 2,
    exhale_seconds: 4,
    second_hold_seconds: 0,
    duration_minutes: 4,
    description: "Inhalaciones amplias para despertar vitalidad de forma amable.",
    objective: "activar energía",
  },
  {
    name: "Nido Nocturno",
    mood: "sleep better",
    inhale_seconds: 4,
    hold_seconds: 0,
    exhale_seconds: 8,
    second_hold_seconds: 0,
    duration_minutes: 6,
    description: "Un ritmo lento centrado en exhalar para acompañar el descanso.",
    objective: "favorecer el sueño",
  },
  {
    name: "Equilibrio Serena",
    mood: "balanced",
    inhale_seconds: 5,
    hold_seconds: 5,
    exhale_seconds: 5,
    second_hold_seconds: 0,
    duration_minutes: 5,
    description: "Un flujo parejo para mantener la calma y cuidar tu energía.",
    objective: "sostener equilibrio",
  },
];

const MUSIC_THEMES = {
  anxious: {
    name: "Sleep Music No. 1",
    file: "assets/audio/sleep-music-no-1-chris-haugen.mp3",
    rain: true,
  },
  stressed: {
    name: "Jomon Grove",
    file: "assets/audio/jomon-grove-the-mini-vandals.mp3",
    rain: false,
  },
  tired: {
    name: "Sleep Music No. 1",
    file: "assets/audio/sleep-music-no-1-chris-haugen.mp3",
    rain: false,
  },
  distracted: {
    name: "Jomon Grove",
    file: "assets/audio/jomon-grove-the-mini-vandals.mp3",
    rain: true,
  },
  "low energy": {
    name: "Akatsuki Rising",
    file: "assets/audio/akatsuki-rising-the-mini-vandals.mp3",
    rain: false,
  },
  "sleep better": {
    name: "Sleep Music No. 1 + lluvia suave",
    file: "assets/audio/sleep-music-no-1-chris-haugen.mp3",
    rain: true,
  },
  balanced: {
    name: "Jomon Grove",
    file: "assets/audio/jomon-grove-the-mini-vandals.mp3",
    rain: false,
  },
};

const assetAvailability = new Map();

const FEELINGS_AFTER = [
  { id: "calm", label: "Más tranquila", hint: "Mi respiración se siente más amplia." },
  { id: "focused", label: "Más enfocada", hint: "Tengo un poco más de claridad." },
  { id: "rested", label: "Más descansada", hint: "El cuerpo bajó un cambio." },
  { id: "energized", label: "Con más energía", hint: "Me siento suavemente activa." },
  { id: "same", label: "Igual que antes", hint: "Quiero registrarlo como parte del proceso." },
  { id: "heavy", label: "Todavía cargada", hint: "Necesito más tiempo o una pausa distinta." },
];

const state = {
  db: null,
  user: null,
  mood: null,
  routine: null,
  sessionId: null,
  session: {
    running: false,
    paused: false,
    intervalId: null,
    phaseTimeoutId: null,
    remainingSeconds: 0,
    currentPhaseIndex: 0,
    currentPhaseLabel: "",
  },
  audio: {
    context: null,
    unlocked: false,
    voiceEnabled: true,
    musicEnabled: true,
    musicGain: null,
    musicElement: null,
    musicSource: null,
    musicNodes: [],
    musicIntervals: [],
    routineId: null,
    spanishVoice: null,
  },
};

const app = document.querySelector("#app");

document.addEventListener("DOMContentLoaded", async () => {
  state.db = await openDatabase();
  await seedRoutines();
  state.user = await getOrCreateUser();
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
});

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("User")) {
        const userStore = db.createObjectStore("User", { keyPath: "id", autoIncrement: true });
        userStore.createIndex("created_at", "created_at");
      }

      if (!db.objectStoreNames.contains("Routine")) {
        const routineStore = db.createObjectStore("Routine", { keyPath: "id", autoIncrement: true });
        routineStore.createIndex("mood", "mood", { unique: true });
      }

      if (!db.objectStoreNames.contains("Session")) {
        const sessionStore = db.createObjectStore("Session", { keyPath: "id", autoIncrement: true });
        sessionStore.createIndex("user", "user");
        sessionStore.createIndex("routine", "routine");
        sessionStore.createIndex("date", "date");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function tx(storeName, mode = "readonly") {
  return state.db.transaction(storeName, mode).objectStore(storeName);
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAll(storeName) {
  return requestToPromise(tx(storeName).getAll());
}

async function addRecord(storeName, record) {
  return requestToPromise(tx(storeName, "readwrite").add(record));
}

async function putRecord(storeName, record) {
  return requestToPromise(tx(storeName, "readwrite").put(record));
}

async function getRecord(storeName, id) {
  return requestToPromise(tx(storeName).get(Number(id)));
}

async function seedRoutines() {
  const routines = await getAll("Routine");
  if (routines.length > 0) return;

  for (const routine of ROUTINES) {
    await addRecord("Routine", routine);
  }
}

async function getOrCreateUser() {
  const users = await getAll("User");
  if (users[0]) return users[0];

  const id = await addRecord("User", {
    name: "Invitada",
    created_at: new Date().toISOString(),
  });

  return getRecord("User", id);
}

function navigate(route) {
  window.location.hash = route;
}

function getRoute() {
  return window.location.hash.replace("#", "") || "welcome";
}

async function renderRoute() {
  stopSessionTimers();
  const route = getRoute();

  if (route === "moods") return renderMoodPage();
  if (route.startsWith("routine/")) return renderRoutinePage(route.split("/")[1]);
  if (route.startsWith("session/")) return renderSessionPage(route.split("/")[1]);
  if (route.startsWith("feedback/")) return renderFeedbackPage(route.split("/")[1]);

  renderWelcomePage();
}

function renderWelcomePage() {
  app.className = "app-shell";
  app.innerHTML = `
    <section class="screen panel">
      ${brandBar()}
      <p class="eyebrow">Pausa consciente</p>
      <h1>Respiración Yogui</h1>
      <p class="lead">
        Elige cómo te sientes y recibe una rutina de respiración pensada para acompañarte en este momento.
      </p>
      <div class="actions">
        <button class="button" type="button" data-route="moods">Comenzar</button>
      </div>
    </section>
  `;
  bindRoutes();
}

function renderMoodPage() {
  app.className = "app-shell";
  app.innerHTML = `
    <section class="screen screen-wide panel">
      ${brandBar("welcome")}
      <h2>¿Cómo te sientes ahora?</h2>
      <div class="mood-grid">
        ${MOODS.map(
          (mood) => `
            <button class="mood-card" type="button" data-mood="${mood.id}" aria-pressed="false">
              <h3>${mood.label}</h3>
              <span>${mood.hint}</span>
            </button>
          `,
        ).join("")}
      </div>
    </section>
  `;

  document.querySelectorAll("[data-mood]").forEach((button) => {
    button.addEventListener("click", async () => {
      state.mood = button.dataset.mood;
      const routine = await routineForMood(state.mood);
      navigate(`routine/${routine.id}`);
    });
  });
}

async function renderRoutinePage(routineId) {
  const routine = await getRecord("Routine", routineId);
  if (!routine) return navigate("moods");

  state.routine = routine;
  state.mood = routine.mood;

  app.className = "app-shell";
  app.innerHTML = `
    <section class="screen screen-wide panel">
      ${brandBar("moods")}
      <p class="eyebrow">Rutina recomendada</p>
      <h2>${routine.name}</h2>
      <p class="lead">${routine.description}</p>
      <div class="routine-layout">
        <div class="routine-visual" aria-hidden="true">
          <div class="lotus"><span></span></div>
        </div>
        <dl class="detail-list">
          <div class="detail">
            <dt>Duración</dt>
            <dd>${routine.duration_minutes} minutos</dd>
          </div>
          <div class="detail">
            <dt>Patrón</dt>
            <dd>${patternLabel(routine)}</dd>
          </div>
          <div class="detail">
            <dt>Objetivo</dt>
            <dd>${sentenceCase(routine.objective)}</dd>
          </div>
          <div class="detail">
            <dt>Música</dt>
            <dd>${musicThemeFor(routine).name}</dd>
          </div>
        </dl>
      </div>
      <div class="actions">
        <button class="button" type="button" data-start-session="${routine.id}">Iniciar rutina</button>
        <button class="button button-secondary" type="button" data-route="moods">Cambiar estado</button>
      </div>
    </section>
  `;

  bindRoutes();
  document.querySelector("[data-start-session]").addEventListener("click", async () => {
    await unlockAudio();
    const sessionId = await addRecord("Session", {
      user: state.user.id,
      routine: routine.id,
      mood_before: routine.mood,
      mood_after: "",
      date: new Date().toISOString(),
      completed: false,
    });
    state.sessionId = sessionId;
    navigate(`session/${sessionId}`);
  });
}

async function renderSessionPage(sessionId) {
  const session = await getRecord("Session", sessionId);
  if (!session) return navigate("moods");

  const routine = await getRecord("Routine", session.routine);
  if (!routine) return navigate("moods");

  state.sessionId = session.id;
  state.routine = routine;

  app.className = "app-shell";
  app.innerHTML = `
    <section class="session-screen">
      <div class="topbar">
        <div class="brand"><span class="brand-mark"></span><span>${routine.name}</span></div>
        <div class="timer" data-timer>${formatTime(routine.duration_minutes * 60)}</div>
      </div>
      <div class="session-space">
        <div class="breath-wrap">
          <div class="breath-circle" data-circle>
            <div class="breath-text" data-instruction>Inhala</div>
          </div>
        </div>
        <div class="session-meta">
          <span>${patternLabel(routine)}</span>
          <span class="audio-status" data-audio-status>${audioStatusLabel()}</span>
        </div>
        <div class="actions" style="justify-content: center;">
          <button class="button button-soft" type="button" data-pause> Pausar </button>
          <button class="button button-secondary" type="button" data-audio-toggle aria-pressed="${String(isAudioEnabled())}">
            ${audioButtonLabel()}
          </button>
          <button class="button button-danger" type="button" data-finish>Finalizar</button>
        </div>
      </div>
    </section>
  `;

  startBreathingSession(routine, session.id);
  document.querySelector("[data-pause]").addEventListener("click", togglePause);
  document.querySelector("[data-audio-toggle]").addEventListener("click", toggleAudio);
  document.querySelector("[data-finish]").addEventListener("click", () => finishSession(session.id, false));
}

async function renderFeedbackPage(sessionId) {
  stopSessionTimers();
  const session = await getRecord("Session", sessionId);
  if (!session) return navigate("moods");

  app.className = "app-shell";
  app.innerHTML = `
    <section class="screen screen-wide panel">
      ${brandBar("moods")}
      <p class="eyebrow">Cierre</p>
      <h2>¿Cómo te sientes después?</h2>
      <p class="lead">Elige una respuesta para guardar tu sesión.</p>
      <div class="feedback-grid">
        ${FEELINGS_AFTER.map(
          (feeling) => `
            <button class="feedback-card" type="button" data-after="${feeling.id}" aria-pressed="false">
              <h3>${feeling.label}</h3>
              <span>${feeling.hint}</span>
            </button>
          `,
        ).join("")}
      </div>
      <p class="saved-note" data-saved hidden>Sesión guardada.</p>
      <div class="actions">
        <button class="button button-secondary" type="button" data-route="moods">Nueva rutina</button>
      </div>
    </section>
  `;

  bindRoutes();
  document.querySelectorAll("[data-after]").forEach((button) => {
    button.addEventListener("click", async () => {
      document.querySelectorAll("[data-after]").forEach((item) => item.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      session.mood_after = button.dataset.after;
      session.completed = true;
      session.date = session.date || new Date().toISOString();
      await putRecord("Session", session);
      document.querySelector("[data-saved]").hidden = false;
    });
  });
}

async function routineForMood(mood) {
  const routines = await getAll("Routine");
  return routines.find((routine) => routine.mood === mood) || routines[0];
}

function brandBar(backRoute) {
  return `
    <div class="topbar">
      <div class="brand"><span class="brand-mark"></span><span>Respiración Yogui</span></div>
      ${backRoute ? `<button class="button button-secondary" type="button" data-route="${backRoute}">Volver</button>` : ""}
    </div>
  `;
}

function bindRoutes() {
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.route));
  });
}

function patternLabel(routine) {
  const parts = [
    `${routine.inhale_seconds}s inhalar`,
    routine.hold_seconds ? `${routine.hold_seconds}s sostener` : "",
    `${routine.exhale_seconds}s exhalar`,
    routine.second_hold_seconds ? `${routine.second_hold_seconds}s pausa` : "",
  ].filter(Boolean);

  return parts.join(" · ");
}

function sentenceCase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function startBreathingSession(routine, sessionId) {
  stopSessionTimers();

  state.session = {
    running: true,
    paused: false,
    intervalId: null,
    phaseTimeoutId: null,
    remainingSeconds: routine.duration_minutes * 60,
    currentPhaseIndex: 0,
    currentPhaseLabel: "",
  };

  startRoutineAudio(routine);
  renderTimer();
  runPhase();

  state.session.intervalId = window.setInterval(() => {
    if (state.session.paused) return;

    state.session.remainingSeconds -= 1;
    renderTimer();

    if (state.session.remainingSeconds <= 0) {
      finishSession(sessionId, true);
    }
  }, 1000);
}

function buildPhases(routine) {
  return [
    { label: "Inhala", seconds: routine.inhale_seconds, scale: 1, easing: "ease-in-out" },
    { label: "Sostén", seconds: routine.hold_seconds, scale: 1, easing: "linear" },
    { label: "Exhala", seconds: routine.exhale_seconds, scale: 0.72, easing: "ease-in-out" },
    { label: "Pausa", seconds: routine.second_hold_seconds, scale: 0.72, easing: "linear" },
  ].filter((phase) => phase.seconds > 0);
}

function runPhase() {
  const circle = document.querySelector("[data-circle]");
  const instruction = document.querySelector("[data-instruction]");
  if (!circle || !instruction || !state.routine || state.session.paused) return;

  const phases = buildPhases(state.routine);
  const phase = phases[state.session.currentPhaseIndex % phases.length];

  instruction.textContent = phase.label;
  state.session.currentPhaseLabel = phase.label;
  circle.style.setProperty("--phase-ms", `${phase.seconds * 1000}ms`);
  circle.style.setProperty("--breath-scale", String(phase.scale));
  circle.style.transitionTimingFunction = phase.easing;
  speakInstruction(phase.label);

  state.session.phaseTimeoutId = window.setTimeout(() => {
    state.session.currentPhaseIndex += 1;
    runPhase();
  }, phase.seconds * 1000);
}

function togglePause() {
  const button = document.querySelector("[data-pause]");
  const circle = document.querySelector("[data-circle]");
  state.session.paused = !state.session.paused;
  button.textContent = state.session.paused ? "Continuar" : "Pausar";

  if (state.session.paused) {
    window.clearTimeout(state.session.phaseTimeoutId);
    if (circle) circle.style.transitionDuration = "0ms";
    pauseRoutineAudio(true);
    stopVoice();
    return;
  }

  if (circle) circle.style.transitionDuration = "";
  pauseRoutineAudio(false);
  runPhase();
}

async function finishSession(sessionId, completed) {
  stopSessionTimers();
  const session = await getRecord("Session", sessionId);
  if (session) {
    session.completed = completed;
    session.date = session.date || new Date().toISOString();
    await putRecord("Session", session);
  }
  navigate(`feedback/${sessionId}`);
}

function stopSessionTimers() {
  window.clearInterval(state.session.intervalId);
  window.clearTimeout(state.session.phaseTimeoutId);
  stopVoice();
  stopRoutineAudio();
  state.session.running = false;
}

function renderTimer() {
  const timer = document.querySelector("[data-timer]");
  if (timer) timer.textContent = formatTime(Math.max(0, state.session.remainingSeconds));
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function musicThemeFor(routine) {
  return MUSIC_THEMES[routine.mood] || MUSIC_THEMES.balanced;
}

function isAudioEnabled() {
  return state.audio.voiceEnabled || state.audio.musicEnabled;
}

function audioButtonLabel() {
  if (!state.audio.unlocked && isAudioEnabled()) return "Activar audio";
  return isAudioEnabled() ? "Silenciar" : "Activar audio";
}

function audioStatusLabel() {
  if (!isAudioEnabled()) return "Audio apagado";
  return state.audio.unlocked ? "Voz y música activas" : "Audio pendiente";
}

function syncAudioUi() {
  const button = document.querySelector("[data-audio-toggle]");
  const status = document.querySelector("[data-audio-status]");
  if (button) {
    button.textContent = audioButtonLabel();
    button.setAttribute("aria-pressed", String(isAudioEnabled()));
  }
  if (status) status.textContent = audioStatusLabel();
}

async function toggleAudio() {
  if (isAudioEnabled() && !state.audio.unlocked) {
    await unlockAudio();
    if (state.audio.unlocked && state.session.running && !state.session.paused && state.routine) {
      startRoutineAudio(state.routine);
      if (state.session.currentPhaseLabel) speakInstruction(state.session.currentPhaseLabel);
    }
    syncAudioUi();
    return;
  }

  if (!isAudioEnabled()) {
    state.audio.voiceEnabled = true;
    state.audio.musicEnabled = true;
    await unlockAudio();
    if (state.session.running && !state.session.paused && state.routine) {
      startRoutineAudio(state.routine);
      if (state.session.currentPhaseLabel) speakInstruction(state.session.currentPhaseLabel);
    }
    syncAudioUi();
    return;
  }

  state.audio.voiceEnabled = false;
  state.audio.musicEnabled = false;
  stopVoice();
  stopRoutineAudio();
  syncAudioUi();
}

async function unlockAudio() {
  initSpeechVoice();

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    syncAudioUi();
    return false;
  }

  if (!state.audio.context) {
    state.audio.context = new AudioContextClass();
  }

  try {
    if (state.audio.context.state === "suspended") {
      await state.audio.context.resume();
    }
    state.audio.unlocked = state.audio.context.state === "running";
  } catch (error) {
    state.audio.unlocked = false;
  }

  syncAudioUi();
  return state.audio.unlocked;
}

async function startRoutineAudio(routine) {
  if (!state.audio.musicEnabled) {
    syncAudioUi();
    return;
  }

  const context = state.audio.context;
  if (!context || context.state !== "running") {
    syncAudioUi();
    return;
  }

  if (state.audio.routineId === routine.id && state.audio.musicGain) {
    pauseRoutineAudio(false);
    return;
  }

  stopRoutineAudio();

  const theme = musicThemeFor(routine);
  const now = context.currentTime;
  const master = context.createGain();
  const nodes = [master];
  let hasTrack = false;

  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(TRACK_VOLUME, now + 2.2);
  master.connect(context.destination);

  if (theme.file && (await audioAssetExists(theme.file))) {
    const audioElement = new Audio(theme.file);
    audioElement.loop = true;
    audioElement.preload = "auto";
    audioElement.crossOrigin = "anonymous";
    audioElement.volume = 1;

    const source = context.createMediaElementSource(audioElement);
    source.connect(master);
    state.audio.musicElement = audioElement;
    state.audio.musicSource = source;
    hasTrack = true;

    try {
      await audioElement.play();
    } catch (error) {
      hasTrack = false;
    }
  }

  if (theme.rain || !hasTrack) {
    nodes.push(...startRainLayer(context, master, hasTrack ? RAIN_VOLUME : RAIN_VOLUME * 1.6));
  }

  state.audio.musicGain = master;
  state.audio.musicNodes = nodes;
  state.audio.musicIntervals = [];
  state.audio.routineId = routine.id;
  syncAudioUi();
}

function pauseRoutineAudio(paused) {
  const context = state.audio.context;
  const gain = state.audio.musicGain;
  if (!context || !gain) return;

  const now = context.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), now);
  gain.gain.exponentialRampToValueAtTime(paused ? 0.0001 : TRACK_VOLUME, now + 0.8);

  if (state.audio.musicElement) {
    if (paused) {
      window.setTimeout(() => {
        if (state.session.paused && state.audio.musicElement) state.audio.musicElement.pause();
      }, 850);
    } else {
      state.audio.musicElement.play().catch(() => {});
    }
  }
}

function stopRoutineAudio() {
  const context = state.audio.context;
  const nodes = state.audio.musicNodes;

  if (context && state.audio.musicGain) {
    const now = context.currentTime;
    state.audio.musicGain.gain.cancelScheduledValues(now);
    state.audio.musicGain.gain.setValueAtTime(Math.max(state.audio.musicGain.gain.value, 0.0001), now);
    state.audio.musicGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
  }

  if (state.audio.musicElement) {
    state.audio.musicElement.pause();
    state.audio.musicElement.src = "";
    state.audio.musicElement.load();
  }

  nodes.forEach((node) => {
    if (typeof node.stop === "function") {
      try {
        node.stop(context ? context.currentTime + 0.3 : 0);
      } catch (error) {
        // Already stopped.
      }
    }
  });

  state.audio.musicGain = null;
  state.audio.musicElement = null;
  state.audio.musicSource = null;
  state.audio.musicNodes = [];
  state.audio.musicIntervals.forEach((timerId) => {
    window.clearInterval(timerId);
    window.clearTimeout(timerId);
  });
  state.audio.musicIntervals = [];
  state.audio.routineId = null;
}

async function audioAssetExists(url) {
  if (assetAvailability.has(url)) return assetAvailability.get(url);

  try {
    const response = await fetch(url, { method: "HEAD", cache: "no-store" });
    const exists = response.ok;
    assetAvailability.set(url, exists);
    return exists;
  } catch (error) {
    assetAvailability.set(url, false);
    return false;
  }
}

function startRainLayer(context, destination, volume) {
  const rainSource = context.createBufferSource();
  const rainFilter = context.createBiquadFilter();
  const rainGain = context.createGain();
  const rumbleSource = context.createBufferSource();
  const rumbleFilter = context.createBiquadFilter();
  const rumbleGain = context.createGain();
  const nodes = [rainSource, rainFilter, rainGain, rumbleSource, rumbleFilter, rumbleGain];

  rainSource.buffer = createRainNoiseBuffer(context, 0.985);
  rainSource.loop = true;
  rainFilter.type = "bandpass";
  rainFilter.frequency.setValueAtTime(1550, context.currentTime);
  rainFilter.Q.setValueAtTime(0.55, context.currentTime);
  rainGain.gain.setValueAtTime(volume, context.currentTime);
  rainSource.connect(rainFilter);
  rainFilter.connect(rainGain);
  rainGain.connect(destination);

  rumbleSource.buffer = createRainNoiseBuffer(context, 0.995);
  rumbleSource.loop = true;
  rumbleFilter.type = "lowpass";
  rumbleFilter.frequency.setValueAtTime(260, context.currentTime);
  rumbleFilter.Q.setValueAtTime(0.2, context.currentTime);
  rumbleGain.gain.setValueAtTime(volume * 0.22, context.currentTime);
  rumbleSource.connect(rumbleFilter);
  rumbleFilter.connect(rumbleGain);
  rumbleGain.connect(destination);

  rainSource.start();
  rumbleSource.start();
  return nodes;
}

function createRainNoiseBuffer(context, smoothing) {
  const length = context.sampleRate * 4;
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  let previous = 0;

  for (let index = 0; index < length; index += 1) {
    previous = previous * smoothing + (Math.random() * 2 - 1) * (1 - smoothing);
    data[index] = previous;
  }

  return buffer;
}

function initSpeechVoice() {
  if (!("speechSynthesis" in window)) return;

  const assignVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    state.audio.spanishVoice = chooseLatinFemaleVoice(voices);
  };

  assignVoice();
  window.speechSynthesis.onvoiceschanged = assignVoice;
}

function chooseLatinFemaleVoice(voices) {
  const latinLocales = [
    "es-419",
    "es-us",
    "es-mx",
    "es-ar",
    "es-cl",
    "es-co",
    "es-pe",
    "es-uy",
    "es-ve",
    "es-bo",
    "es-cr",
    "es-do",
    "es-ec",
    "es-gt",
    "es-hn",
    "es-ni",
    "es-pa",
    "es-pr",
    "es-py",
    "es-sv",
  ];

  const scoredVoices = voices
    .filter((voice) => voice.lang.toLowerCase().startsWith("es"))
    .map((voice) => {
      const lang = voice.lang.toLowerCase();
      const name = voice.name.toLowerCase();
      let score = 0;

      if (/dalia|paulina|sabina|paloma|soledad|luciana|maria|maría/.test(name)) score += 150;
      if (/google.*(latino|latinoamericano|américa latina|america latina|mexico|méxico|estados unidos|united states)/.test(name)) {
        score += 135;
      }
      if (/microsoft.*(dalia|sabina|paulina)/.test(name)) score += 135;
      if (latinLocales.includes(lang)) score += 120;
      if (/latino|latinoamericano|latin|méxico|mexico|argentina|chile|colombia|perú|peru|uruguay|estados unidos|united states|us spanish/.test(name)) {
        score += 95;
      }
      if (/female|mujer|woman/.test(name)) score += 40;
      if (voice.localService) score += 8;
      if (/monica|mónica|helena|laura/.test(name)) score -= 120;
      if (lang === "es-es" || /españa|spain|castilian|castellano/.test(name)) score -= 260;

      return { voice, score };
    })
    .sort((a, b) => b.score - a.score);

  return scoredVoices[0]?.voice || null;
}

function speakInstruction(label) {
  if (!state.audio.voiceEnabled || state.session.paused || !("speechSynthesis" in window)) return;

  const spokenLabels = {
    Inhala: "Inhala suave",
    Sostén: "Sostén",
    Exhala: "Exhala lento",
    Pausa: "Pausa",
  };

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(spokenLabels[label] || label);
  utterance.lang = state.audio.spanishVoice?.lang || "es-MX";
  utterance.rate = VOICE_RATE;
  utterance.pitch = VOICE_PITCH;
  utterance.volume = VOICE_VOLUME;
  if (state.audio.spanishVoice) utterance.voice = state.audio.spanishVoice;
  window.speechSynthesis.speak(utterance);
}

function stopVoice() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}
