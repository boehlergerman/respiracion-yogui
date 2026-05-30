const DB_NAME = "respiracion-yogui";
const DB_VERSION = 1;
const SUPABASE_URL = "https://gdxfolbvlfzeyyddfnck.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_FoXU2fyxg-xuCI4HmILYGA_yzD7yLPM";
const PROFILE_STORAGE_KEY = "respiracion-yogui-profile";
const TRACK_VOLUME = 0.34;
const POSTURE_MUSIC_VOLUME = 0.18;
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

const POSTURE_ROUTINES = {
  anxious: {
    name: "Soltar el pecho",
    objective: "Bajar ansiedad y aflojar el torso",
    poses: [
      { id: "seated", name: "Sentada con manos al corazón", cue: "Apoyá los pies y suavizá los hombros." },
      { id: "arms-up", name: "Brazos arriba", cue: "Inhalá alargando costados sin tensionar el cuello." },
      { id: "twist", name: "Torsión sentada", cue: "Girate suave hacia un lado y luego hacia el otro." },
      { id: "forward-fold", name: "Pinza sentada", cue: "Cerrate hacia adelante y soltá la cabeza." },
      { id: "seated", name: "Cierre en quietud", cue: "Volvé al centro y observá el cuerpo." },
    ],
  },
  stressed: {
    name: "Descarga suave",
    objective: "Aflojar hombros, cuello y espalda alta",
    poses: [
      { id: "shoulders", name: "Círculos de hombros", cue: "Mové hombros lento hacia atrás y hacia abajo." },
      { id: "side-stretch", name: "Estiramiento lateral", cue: "Llevá un brazo arriba y abrí un costado." },
      { id: "twist", name: "Torsión sentada", cue: "Girate sin forzar y respirá en la espalda." },
      { id: "forward-fold", name: "Pinza suave", cue: "Dejá que el peso te cierre hacia adelante." },
      { id: "seated", name: "Manos sobre piernas", cue: "Quedate quieta y soltá la mandíbula." },
    ],
  },
  tired: {
    name: "Descanso despierto",
    objective: "Recuperar energía sin exigencia",
    poses: [
      { id: "seated", name: "Base sentada", cue: "Sentate cómoda y apoyá bien la pelvis." },
      { id: "arms-up", name: "Alargar columna", cue: "Subí brazos y crecé desde la cintura." },
      { id: "side-stretch", name: "Abrir costados", cue: "Estirá un lado y después el otro." },
      { id: "heart-opener", name: "Abrir pecho", cue: "Llevá hombros atrás y abrí el corazón." },
      { id: "seated", name: "Integrar", cue: "Respirá natural y notá la energía disponible." },
    ],
  },
  distracted: {
    name: "Volver al centro",
    objective: "Enfocar atención con movimientos simples",
    poses: [
      { id: "seated", name: "Mirada al frente", cue: "Elegí un punto fijo y respiralo." },
      { id: "arms-up", name: "Subir y bajar brazos", cue: "Mové brazos con ritmo lento." },
      { id: "twist", name: "Torsión consciente", cue: "Girate siguiendo la respiración." },
      { id: "forward-fold", name: "Cierre hacia adelante", cue: "Bajá y quedate unos segundos." },
      { id: "seated", name: "Centro estable", cue: "Volvé arriba con calma." },
    ],
  },
  "low energy": {
    name: "Abrir vitalidad",
    objective: "Activar cuerpo y ánimo",
    poses: [
      { id: "arms-up", name: "Brazos arriba", cue: "Subí brazos amplio y despertá el torso." },
      { id: "heart-opener", name: "Apertura de pecho", cue: "Separá clavículas y respirá profundo." },
      { id: "side-stretch", name: "Costados activos", cue: "Estirá un lado y el otro con presencia." },
      { id: "shoulders", name: "Hombros en movimiento", cue: "Mové hombros para liberar energía." },
      { id: "seated", name: "Cierre activo", cue: "Sentí el cuerpo más disponible." },
    ],
  },
  "sleep better": {
    name: "Cierre nocturno",
    objective: "Tranquilizar y preparar descanso",
    poses: [
      { id: "seated", name: "Sentada tranquila", cue: "Apoyá manos y bajá la mirada." },
      { id: "twist", name: "Torsión sentada", cue: "Girate suave hacia un lado y hacia el otro." },
      { id: "arms-up", name: "Brazos largos", cue: "Subí brazos sin esfuerzo y soltá hombros." },
      { id: "forward-fold", name: "Pinza hacia adelante", cue: "Cerrate en pinza y dejá caer la cabeza." },
      { id: "seated", name: "Cierre en calma", cue: "Volvé lento y quedate en silencio." },
    ],
  },
  balanced: {
    name: "Equilibrio sentado",
    objective: "Sostener calma y claridad",
    poses: [
      { id: "seated", name: "Eje sentado", cue: "Crecé desde la columna." },
      { id: "arms-up", name: "Brazos arriba", cue: "Alargá el cuerpo con suavidad." },
      { id: "twist", name: "Torsión equilibrada", cue: "Girate a ambos lados." },
      { id: "side-stretch", name: "Estiramiento lateral", cue: "Abrí costados y respiración." },
      { id: "seated", name: "Quietud final", cue: "Cerrá con una respiración natural." },
    ],
  },
};

const POSTURE_GUIDES = {
  seated: {
    src: "https://images.pexels.com/photos/7592387/pexels-photo-7592387.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Persona sentada en postura simple con la espalda larga.",
    movement: "Apoyá la pelvis, relajá hombros y dejá que la espalda crezca.",
    voice: "Sentate cómoda, apoyá la pelvis y dejá que los hombros bajen. Mantené una respiración natural.",
  },
  "arms-up": {
    src: "https://images.pexels.com/photos/8534274/pexels-photo-8534274.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Persona sentada elevando los brazos con suavidad.",
    movement: "Subí los brazos al inhalar y aflojá el cuello al sostener.",
    voice: "Elevá los brazos con suavidad. Crecé desde la cintura, sin endurecer el cuello ni la mandíbula.",
  },
  twist: {
    src: "https://images.unsplash.com/photo-1767611129027-c8c9e40c02e3?auto=format&fit=crop&w=1200&q=80",
    alt: "Persona haciendo una torsión sentada de yoga.",
    movement: "Girá desde el abdomen, primero a un lado y luego al otro.",
    voice: "Girate despacio desde el abdomen. No fuerces el cuello. Volvé al centro y repetí hacia el otro lado.",
  },
  "forward-fold": {
    src: "https://images.pexels.com/photos/7500426/pexels-photo-7500426.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Persona realizando una pinza sentada hacia adelante.",
    movement: "Cerrate hacia adelante y soltá el peso de la cabeza.",
    voice: "Cerrate hacia adelante con calma. Soltá la cabeza, aflojá la espalda y dejá que la respiración te acompañe.",
  },
  "side-stretch": {
    src: "https://images.pexels.com/photos/31427093/pexels-photo-31427093.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Persona haciendo un estiramiento lateral sentada.",
    movement: "Alargá un costado, respiralo y cambiá hacia el otro lado.",
    voice: "Llevá un brazo arriba y estirá un costado. Respirá ahí, volvé lento y cambiá hacia el otro lado.",
  },
  "heart-opener": {
    src: "https://images.pexels.com/photos/8534274/pexels-photo-8534274.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Persona abriendo el pecho con los brazos elevados.",
    movement: "Abrí clavículas, llevá hombros atrás y suavizá el pecho.",
    voice: "Abrí el pecho sin empujar. Llevá los hombros hacia atrás y dejá que entre un poco más de aire.",
  },
  shoulders: {
    src: "https://images.pexels.com/photos/8534274/pexels-photo-8534274.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Persona sentada moviendo hombros y brazos de forma suave.",
    movement: "Hacé círculos lentos con hombros, hacia atrás y hacia abajo.",
    voice: "Mové los hombros en círculos lentos. Suben, van hacia atrás y bajan, sin apuro.",
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
  supabase: null,
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
    endingWarned: false,
    finishing: false,
  },
  posture: {
    running: false,
    paused: false,
    intervalId: null,
    remainingSeconds: 0,
    currentPoseIndex: 0,
    lastSpokenIndex: -1,
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
  initSupabase();
  if (isSupabaseEnabled()) {
    state.user = await getStoredProfile();
  } else {
    await seedRoutines();
    state.user = await getOrCreateUser();
  }
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
  if (isSupabaseEnabled()) {
    if (storeName === "Routine") {
      const { data, error } = await state.supabase.from("routines").select("*").order("name");
      if (error) throw error;
      return data.map(fromSupabaseRoutine);
    }

    if (storeName === "Session") {
      if (!state.user?.id) return [];
      const { data, error } = await state.supabase
        .from("sessions")
        .select("*")
        .eq("user_id", state.user.id)
        .order("date", { ascending: true });
      if (error) throw error;
      return data.map(fromSupabaseSession);
    }
  }

  return requestToPromise(tx(storeName).getAll());
}

async function addRecord(storeName, record) {
  if (isSupabaseEnabled()) {
    if (storeName === "Session") {
      const { data, error } = await state.supabase
        .from("sessions")
        .insert(toSupabaseSession(record))
        .select()
        .single();
      if (error) throw error;
      return data.id;
    }

    if (storeName === "User") {
      const { data, error } = await state.supabase.from("profiles").insert(toSupabaseProfile(record)).select().single();
      if (error) throw error;
      return data.id;
    }
  }

  return requestToPromise(tx(storeName, "readwrite").add(record));
}

async function putRecord(storeName, record) {
  if (isSupabaseEnabled()) {
    if (storeName === "Session") {
      const { error } = await state.supabase.from("sessions").update(toSupabaseSession(record)).eq("id", record.id);
      if (error) throw error;
      return record.id;
    }

    if (storeName === "User") {
      const { error } = await state.supabase.from("profiles").update(toSupabaseProfile(record)).eq("id", record.id);
      if (error) throw error;
      return record.id;
    }
  }

  return requestToPromise(tx(storeName, "readwrite").put(record));
}

async function getRecord(storeName, id) {
  if (isSupabaseEnabled()) {
    if (storeName === "Routine") {
      if (!isUuid(id)) return null;
      const { data, error } = await state.supabase.from("routines").select("*").eq("id", id).single();
      if (error) throw error;
      return fromSupabaseRoutine(data);
    }

    if (storeName === "Session") {
      if (!isUuid(id)) return null;
      const { data, error } = await state.supabase.from("sessions").select("*").eq("id", id).single();
      if (error) throw error;
      return fromSupabaseSession(data);
    }

    if (storeName === "User") {
      if (!isUuid(id)) return null;
      const { data, error } = await state.supabase.from("profiles").select("*").eq("id", id).single();
      if (error) throw error;
      return fromSupabaseProfile(data);
    }
  }

  const localKey = Number.isNaN(Number(id)) ? id : Number(id);
  return requestToPromise(tx(storeName).get(localKey));
}

async function safeGetRecord(storeName, id) {
  try {
    return await getRecord(storeName, id);
  } catch (error) {
    return null;
  }
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

function initSupabase() {
  if (!window.supabase?.createClient || !SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) return;
  state.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

function isSupabaseEnabled() {
  return Boolean(state.supabase);
}

async function getStoredProfile() {
  const stored = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || "null");
  if (!stored?.id) return null;

  try {
    return await getRecord("User", stored.id);
  } catch (error) {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    return null;
  }
}

async function handleAliasLogin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const alias = normalizeAlias(form.alias.value);
  const pin = form.pin.value.trim();
  const message = form.querySelector("[data-auth-message]");

  if (!alias || pin.length < 4) {
    message.textContent = "Usá un alias y un PIN de al menos 4 números.";
    return;
  }

  form.querySelector("button[type='submit']").disabled = true;
  message.textContent = "Entrando...";

  try {
    const pin_hash = await hashPin(alias, pin);
    const { data: existing, error } = await state.supabase.from("profiles").select("*").eq("alias", alias).maybeSingle();
    if (error) throw error;

    if (existing && existing.pin_hash !== pin_hash) {
      message.textContent = "Ese alias existe, pero el PIN no coincide.";
      form.querySelector("button[type='submit']").disabled = false;
      return;
    }

    const profile = existing ? fromSupabaseProfile(existing) : await createRemoteProfile(alias, pin_hash);
    state.user = profile;
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({ id: profile.id, alias: profile.alias }));
    navigate("moods");
  } catch (error) {
    message.textContent = "No pude entrar. Probá de nuevo en un momento.";
    form.querySelector("button[type='submit']").disabled = false;
  }
}

async function createRemoteProfile(alias, pin_hash) {
  const { data, error } = await state.supabase.from("profiles").insert({ alias, pin_hash }).select().single();
  if (error) throw error;
  return fromSupabaseProfile(data);
}

function logoutProfile() {
  localStorage.removeItem(PROFILE_STORAGE_KEY);
  state.user = null;
  navigate("auth");
}

function normalizeAlias(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_]/g, "");
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value));
}

async function hashPin(alias, pin) {
  const data = new TextEncoder().encode(`${alias}:${pin}:respiracion-yogui-v0`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function fromSupabaseProfile(profile) {
  return {
    id: profile.id,
    name: profile.alias,
    alias: profile.alias,
    pin_hash: profile.pin_hash,
    created_at: profile.created_at,
  };
}

function toSupabaseProfile(profile) {
  return {
    alias: profile.alias || profile.name,
    pin_hash: profile.pin_hash,
  };
}

function fromSupabaseRoutine(routine) {
  return { ...routine };
}

function fromSupabaseSession(session) {
  return {
    id: session.id,
    user: session.user_id,
    routine: session.routine_id,
    mood_before: session.mood_before,
    mood_after: session.mood_after || "",
    date: session.date,
    completed: session.completed,
  };
}

function toSupabaseSession(session) {
  return {
    user_id: session.user,
    routine_id: session.routine,
    mood_before: session.mood_before,
    mood_after: session.mood_after || null,
    date: session.date,
    completed: session.completed,
  };
}

function navigate(route) {
  window.location.hash = route;
}

function getRoute() {
  return window.location.hash.replace("#", "") || "welcome";
}

async function renderRoute() {
  const route = getRoute();
  const keepRoutineAudio = route.startsWith("postures/");
  stopSessionTimers({ keepAudio: keepRoutineAudio });
  stopPostureTimers();

  if (route === "auth") return renderAuthPage();
  if (isSupabaseEnabled() && !state.user && route !== "welcome") return renderAuthPage();
  if (route === "moods") return renderMoodPage();
  if (route.startsWith("routine/")) return renderRoutinePage(route.split("/")[1]);
  if (route.startsWith("session/")) return renderSessionPage(route.split("/")[1]);
  if (route.startsWith("postures/")) return renderPosturePage(route.split("/")[1]);
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
        <button class="button" type="button" data-route="${isSupabaseEnabled() && !state.user ? "auth" : "moods"}">Comenzar</button>
      </div>
    </section>
  `;
  bindRoutes();
}

function renderAuthPage() {
  app.className = "app-shell";
  app.innerHTML = `
    <section class="screen panel">
      ${brandBar("welcome")}
      <p class="eyebrow">Tu espacio</p>
      <h2>Entrá con tu alias</h2>
      <p class="lead">Usá el mismo alias y PIN para recuperar tus sesiones en cualquier dispositivo.</p>
      <form class="auth-form" data-auth-form>
        <label>
          <span>Alias</span>
          <input name="alias" type="text" autocomplete="username" placeholder="sofibone" required />
        </label>
        <label>
          <span>PIN</span>
          <input name="pin" type="password" inputmode="numeric" autocomplete="current-password" minlength="4" placeholder="••••" required />
        </label>
        <p class="auth-message" data-auth-message></p>
        <div class="actions">
          <button class="button" type="submit">Entrar</button>
        </div>
      </form>
    </section>
  `;

  bindRoutes();
  document.querySelector("[data-auth-form]").addEventListener("submit", handleAliasLogin);
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
  const routine = await safeGetRecord("Routine", routineId);
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
  const session = await safeGetRecord("Session", sessionId);
  if (!session) return navigate("moods");

  const routine = await safeGetRecord("Routine", session.routine);
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
  stopPostureTimers();
  const session = await safeGetRecord("Session", sessionId);
  if (!session) return navigate("moods");
  const insights = await buildSessionInsights();

  app.className = "app-shell";
  app.innerHTML = `
    <section class="screen screen-wide panel">
      ${brandBar("moods")}
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
      <div class="insights" data-insights>
        ${renderInsights(insights)}
      </div>
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
      document.querySelector("[data-insights]").innerHTML = renderInsights(await buildSessionInsights());
    });
  });
}

async function renderPosturePage(sessionId) {
  const session = await safeGetRecord("Session", sessionId);
  if (!session) return navigate("moods");

  const routine = await safeGetRecord("Routine", session.routine);
  if (!routine) return navigate("moods");

  const postureRoutine = postureRoutineFor(routine.mood);
  state.sessionId = session.id;
  state.routine = routine;

  app.className = "app-shell";
  app.innerHTML = `
    <section class="session-screen posture-screen">
      <div class="topbar">
        <div class="brand"><span class="brand-mark"></span><span>${postureRoutine.name}</span></div>
        <div class="timer" data-posture-timer>${formatTime(5 * 60)}</div>
      </div>
      <div class="posture-space">
        <div class="posture-figure-wrap">
          ${postureVisual(postureRoutine.poses[0])}
        </div>
        <div class="posture-copy">
          <p class="eyebrow">5 minutos de posturas</p>
          <h2 data-posture-name>${postureRoutine.poses[0].name}</h2>
          <p class="lead" data-posture-cue>${postureRoutine.poses[0].cue}</p>
          <p class="posture-movement" data-posture-movement>${postureGuideFor(postureRoutine.poses[0]).movement}</p>
          <div class="session-meta">
            <span>${postureRoutine.objective}</span>
            <span class="audio-status" data-posture-step>1 de ${postureRoutine.poses.length}</span>
          </div>
        </div>
        <div class="actions" style="justify-content: center;">
          <button class="button button-soft" type="button" data-posture-pause>Pausar</button>
          <button class="button button-danger" type="button" data-posture-finish>Finalizar</button>
        </div>
      </div>
    </section>
  `;

  startPostureSession(postureRoutine, session.id);
  document.querySelector("[data-posture-pause]").addEventListener("click", togglePosturePause);
  document.querySelector("[data-posture-finish]").addEventListener("click", () => finishPostureSession(session.id));
}

async function routineForMood(mood) {
  const routines = await getAll("Routine");
  return routines.find((routine) => routine.mood === mood) || routines[0];
}

function brandBar(backRoute) {
  return `
    <div class="topbar">
      <div class="brand"><span class="brand-mark"></span><span>Respiración Yogui</span></div>
      <div class="topbar-actions">
        ${state.user?.alias ? `<span class="user-chip">${state.user.alias}</span>` : ""}
        ${state.user?.alias ? `<button class="button button-secondary" type="button" data-logout>Cambiar</button>` : ""}
        ${backRoute ? `<button class="button button-secondary" type="button" data-route="${backRoute}">Volver</button>` : ""}
      </div>
    </div>
  `;
}

function bindRoutes() {
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.route));
  });
  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", logoutProfile);
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

async function buildSessionInsights() {
  const [sessions, routines] = await Promise.all([getAll("Session"), getAll("Routine")]);
  const routineById = new Map(routines.map((routine) => [routine.id, routine]));
  const completedSessions = sessions.filter((session) => session.user === state.user.id && session.completed);
  const afterSessions = completedSessions
    .filter((session) => session.mood_after)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    totalCompleted: completedSessions.length,
    favoriteRoutine: mostFrequent(
      completedSessions
        .map((session) => routineById.get(session.routine)?.name)
        .filter(Boolean),
    ),
    topFeeling: mostFrequent(afterSessions.map((session) => feelingLabel(session.mood_after))),
    latestFeeling: feelingLabel(afterSessions[afterSessions.length - 1]?.mood_after),
  };
}

function mostFrequent(values) {
  const counts = values.reduce((map, value) => map.set(value, (map.get(value) || 0) + 1), new Map());
  const [label, count] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0] || [];
  return label ? { label, count } : null;
}

function feelingLabel(id) {
  return FEELINGS_AFTER.find((feeling) => feeling.id === id)?.label || "";
}

function renderInsights(insights) {
  if (!insights.totalCompleted) {
    return `
      <h3>Tu práctica</h3>
      <p>Cuando guardes tus sesiones, vas a ver acá tus rutinas más usadas y cómo te sentís después.</p>
    `;
  }

  return `
    <h3>Tu práctica</h3>
    <div class="insight-grid">
      <div class="insight-card">
        <span>Sesiones completas</span>
        <strong>${insights.totalCompleted}</strong>
      </div>
      <div class="insight-card">
        <span>Rutina más usada</span>
        <strong>${insights.favoriteRoutine ? `${insights.favoriteRoutine.label} (${insights.favoriteRoutine.count})` : "Sin datos"}</strong>
      </div>
      <div class="insight-card">
        <span>Después te sentís más seguido</span>
        <strong>${insights.topFeeling ? `${insights.topFeeling.label} (${insights.topFeeling.count})` : "Sin datos"}</strong>
      </div>
      <div class="insight-card">
        <span>Último registro</span>
        <strong>${insights.latestFeeling || "Sin datos"}</strong>
      </div>
    </div>
  `;
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
    endingWarned: false,
    finishing: false,
  };

  startRoutineAudio(routine);
  renderTimer();
  runPhase();

  state.session.intervalId = window.setInterval(() => {
    if (state.session.paused) return;

    state.session.remainingSeconds -= 1;
    renderTimer();

    if (state.session.remainingSeconds <= 15 && !state.session.endingWarned) {
      prepareSessionEnding();
    }

    if (state.session.remainingSeconds <= 0) {
      finishSession(sessionId, true, { fromTimer: true });
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

  if (!state.session.endingWarned) instruction.textContent = phase.label;
  state.session.currentPhaseLabel = phase.label;
  circle.style.setProperty("--phase-ms", `${phase.seconds * 1000}ms`);
  circle.style.setProperty("--breath-scale", String(phase.scale));
  circle.style.transitionTimingFunction = phase.easing;
  if (!state.session.endingWarned) speakInstruction(phase.label);

  state.session.phaseTimeoutId = window.setTimeout(() => {
    state.session.currentPhaseIndex += 1;
    runPhase();
  }, phase.seconds * 1000);
}

function togglePause() {
  const button = document.querySelector("[data-pause]");
  const circle = document.querySelector("[data-circle]");
  if (state.session.finishing) return;
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

function prepareSessionEnding() {
  state.session.endingWarned = true;
  const instruction = document.querySelector("[data-instruction]");
  if (instruction) instruction.textContent = "Cerrando";
  fadeRoutineAudioTo(Math.max(TRACK_VOLUME * 0.42, 0.12), 5);
  speakClosingNotice();
}

async function finishSession(sessionId, completed, options = {}) {
  if (state.session.finishing) return;
  state.session.finishing = true;
  window.clearInterval(state.session.intervalId);
  window.clearTimeout(state.session.phaseTimeoutId);
  fadeRoutineAudioTo(POSTURE_MUSIC_VOLUME, completed ? 1.4 : 0.6);

  if (options.fromTimer) {
    const instruction = document.querySelector("[data-instruction]");
    if (instruction) instruction.textContent = "Terminamos";
    await wait(1400);
  } else {
    await wait(500);
  }

  stopVoice();
  state.session.running = false;
  const session = await getRecord("Session", sessionId);
  if (session) {
    session.completed = completed;
    session.date = session.date || new Date().toISOString();
    await putRecord("Session", session);
  }
  navigate(`postures/${sessionId}`);
}

function stopSessionTimers(options = {}) {
  window.clearInterval(state.session.intervalId);
  window.clearTimeout(state.session.phaseTimeoutId);
  stopVoice();
  if (!options.keepAudio) stopRoutineAudio();
  state.session.running = false;
}

function startPostureSession(routine, sessionId) {
  stopPostureTimers();
  state.posture = {
    running: true,
    paused: false,
    intervalId: null,
    remainingSeconds: 5 * 60,
    currentPoseIndex: 0,
    lastSpokenIndex: -1,
  };

  if (state.audio.musicEnabled && state.audio.unlocked && state.routine) {
    startRoutineAudio(state.routine).then(() => fadeRoutineAudioTo(POSTURE_MUSIC_VOLUME, 1.2));
  } else {
    fadeRoutineAudioTo(POSTURE_MUSIC_VOLUME, 1.2);
  }

  renderPosturePose(routine);
  renderPostureTimer();

  state.posture.intervalId = window.setInterval(() => {
    if (state.posture.paused) return;

    state.posture.remainingSeconds -= 1;
    const poseDuration = Math.ceil((5 * 60) / routine.poses.length);
    state.posture.currentPoseIndex = Math.min(
      routine.poses.length - 1,
      Math.floor((5 * 60 - state.posture.remainingSeconds) / poseDuration),
    );

    renderPostureTimer();
    renderPosturePose(routine);

    if (state.posture.remainingSeconds <= 0) {
      finishPostureSession(sessionId);
    }
  }, 1000);
}

function renderPosturePose(routine) {
  const pose = routine.poses[state.posture.currentPoseIndex] || routine.poses[0];
  const guide = postureGuideFor(pose);
  const name = document.querySelector("[data-posture-name]");
  const cue = document.querySelector("[data-posture-cue]");
  const movement = document.querySelector("[data-posture-movement]");
  const step = document.querySelector("[data-posture-step]");

  updatePostureVisual(pose);
  if (name) name.textContent = pose.name;
  if (cue) cue.textContent = pose.cue;
  if (movement) movement.textContent = guide.movement;
  if (step) step.textContent = `${state.posture.currentPoseIndex + 1} de ${routine.poses.length}`;

  if (!state.posture.paused && state.posture.lastSpokenIndex !== state.posture.currentPoseIndex) {
    state.posture.lastSpokenIndex = state.posture.currentPoseIndex;
    speakPostureCue(pose);
  }
}

function renderPostureTimer() {
  const timer = document.querySelector("[data-posture-timer]");
  if (timer) timer.textContent = formatTime(Math.max(0, state.posture.remainingSeconds));
}

function togglePosturePause() {
  const button = document.querySelector("[data-posture-pause]");
  state.posture.paused = !state.posture.paused;
  if (button) button.textContent = state.posture.paused ? "Continuar" : "Pausar";
  pauseRoutineAudio(state.posture.paused, POSTURE_MUSIC_VOLUME);

  if (state.posture.paused) {
    stopVoice();
    return;
  }

  const routine = postureRoutineFor(state.routine?.mood);
  const pose = routine.poses[state.posture.currentPoseIndex] || routine.poses[0];
  speakPostureCue(pose);
}

async function finishPostureSession(sessionId) {
  if (!state.posture.running) return;
  stopPostureTimers();
  stopVoice();
  fadeRoutineAudioTo(0.0001, 0.9);
  await wait(500);
  stopRoutineAudio();
  navigate(`feedback/${sessionId}`);
}

function stopPostureTimers() {
  window.clearInterval(state.posture.intervalId);
  state.posture.running = false;
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

function postureRoutineFor(mood) {
  return POSTURE_ROUTINES[mood] || POSTURE_ROUTINES.balanced;
}

function postureGuideFor(pose) {
  return POSTURE_GUIDES[pose?.id] || POSTURE_GUIDES.seated;
}

function postureVisual(pose) {
  const guide = postureGuideFor(pose);
  return `
    <div class="posture-image-card">
      <img
        class="posture-image"
        data-posture-image
        src="${guide.src}"
        alt="${guide.alt}"
        loading="eager"
      />
      <div class="posture-image-fallback" data-posture-fallback hidden>
        ${postureFigure(pose.id)}
      </div>
    </div>
  `;
}

function updatePostureVisual(pose) {
  const guide = postureGuideFor(pose);
  const image = document.querySelector("[data-posture-image]");
  const fallback = document.querySelector("[data-posture-fallback]");
  const figure = document.querySelector("[data-posture-figure]");

  if (figure) figure.dataset.pose = pose.id;
  if (!image) return;

  image.onload = () => {
    image.hidden = false;
    if (fallback) fallback.hidden = true;
  };
  image.onerror = () => {
    image.hidden = true;
    if (fallback) fallback.hidden = false;
  };

  if (image.src !== guide.src) image.src = guide.src;
  image.alt = guide.alt;
}

function postureFigure(pose) {
  return `
    <div class="posture-figure" data-posture-figure data-pose="${pose}" aria-hidden="true">
      <span class="figure-head"></span>
      <span class="figure-torso"></span>
      <span class="figure-arm figure-arm-left"></span>
      <span class="figure-arm figure-arm-right"></span>
      <span class="figure-leg figure-leg-left"></span>
      <span class="figure-leg figure-leg-right"></span>
      <span class="figure-ground"></span>
    </div>
  `;
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

function pauseRoutineAudio(paused, targetVolume = TRACK_VOLUME) {
  const context = state.audio.context;
  const gain = state.audio.musicGain;
  if (!context || !gain) return;

  fadeRoutineAudioTo(paused ? 0.0001 : targetVolume, 0.8);

  if (state.audio.musicElement) {
    if (paused) {
      window.setTimeout(() => {
        if ((state.session.paused || state.posture.paused) && state.audio.musicElement) state.audio.musicElement.pause();
      }, 850);
    } else {
      state.audio.musicElement.play().catch(() => {});
    }
  }
}

function fadeRoutineAudioTo(targetVolume, durationSeconds) {
  const context = state.audio.context;
  const gain = state.audio.musicGain;
  if (!context || !gain) return;

  const now = context.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), now);
  gain.gain.exponentialRampToValueAtTime(Math.max(targetVolume, 0.0001), now + durationSeconds);
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

function speakClosingNotice() {
  if (!state.audio.voiceEnabled || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance("Tu respiración está por terminar");
  utterance.lang = state.audio.spanishVoice?.lang || "es-MX";
  utterance.rate = VOICE_RATE;
  utterance.pitch = VOICE_PITCH;
  utterance.volume = VOICE_VOLUME;
  if (state.audio.spanishVoice) utterance.voice = state.audio.spanishVoice;
  window.speechSynthesis.speak(utterance);
}

function speakPostureCue(pose) {
  if (!state.audio.voiceEnabled || state.posture.paused || !("speechSynthesis" in window)) return;

  const guide = postureGuideFor(pose);
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(`Ahora, ${pose.name}. ${guide.voice}`);
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

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}
