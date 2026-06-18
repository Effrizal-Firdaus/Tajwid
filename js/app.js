// STATE 
const S = {
  bab: null,       // '1_mad' | '2_ghoiru' | '3_idghom' | '4_ro'
  sub: null,
  detail: null,
  screen: 'mode',
  history: [],
};

// SCREENS 
const SCREENS = ['screenWelcome','screenMode','screenSub','screenDetail','screenResult'];

function showScreen(id) {
  SCREENS.forEach(s => document.getElementById(s).classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  document.getElementById(id).classList.add('slide-in');
  setTimeout(() => document.getElementById(id).classList.remove('slide-in'), 400);
  S.screen = id;
  // Sembunyikan progress bar di welcome screen
  const pw = document.getElementById('progressWrap');
  if (pw) pw.style.display = (id === 'screenWelcome') ? 'none' : '';
  updateProgress();
}

function mulai() {
  showScreen('screenMode');
}

function pushHistory(s) { S.history.push(s); }
function goBack() {
  if (!S.history.length) return;
  const prev = S.history.pop();
  showScreen(prev);
}

function updateProgress() {
  const stepsEl = document.getElementById('progressSteps');
  const labelEl = document.getElementById('progressLabel');
  const steps = ['Bab','Sub Bab','Materi','Hasil'];
  const map = { screenMode:1, screenSub:2, screenDetail:3, screenResult:4 };
  const active = map[S.screen] || 1;
  stepsEl.innerHTML = steps.map((_,i) => {
    const n = i+1;
    const cls = n < active ? 'done' : n === active ? 'active' : '';
    const txt = n < active ? '✓' : n;
    return `<div class="step-dot ${cls}">${txt}</div>${i < steps.length-1 ? `<div class="step-line ${n < active ? 'done':''}"></div>` : ''}`;
  }).join('');
  labelEl.textContent = active ? `Langkah ${active} dari ${steps.length}` : 'Pilih Bab';
}

// BAB (MODE) DATA 
const BABS = [
  { id:'1_mad',    icon:'1.', label:'Hukum Mad',          desc:"Mad Ashli & Mad Far'i (15 jenis)" },
  { id:'2_ghoiru', icon:'2.', label:'Hukum Ghoiru Mad',   desc:'Gunnah, Nun Mati/Tanwin, Mim Mati, Alif Lam, Qolqolah, Lam Jalalah' },
  { id:'3_idghom', icon:'3.', label:'Hukum Idghom',       desc:'Mutamatsilain, Mutaqorribain, Mutajanisain' },
  { id:'4_ro',     icon:'4.', label:"Hukum Ro'",         desc:"Ro' Tafkhim (Tebal) & Ro' Tarqiq (Tipis)" },
];

// SUB BAB DATA 
const SUBS = {
  '1_mad': [
    { id:'mad_ashli',  icon:'🌱', label:'A. Mad Ashli',    desc:"Mad Thobi'i — 1 hukum" },
    { id:'mad_fari',   icon:'🍃', label:"B. Mad Far'i",    desc:'14 hukum Mad' },
  ],
  '2_ghoiru': [
    { id:'gunnah',     icon:'🔔', label:'1. Gunnah Musyaddadah', desc:'Mim/Nun bertasydid' },
    { id:'nun_mati',   icon:'🔔', label:'2. Hukum Nun Mati / Tanwin', desc:"5 hukum: Idghom, Iqlab, Idhar, Ikhfa'" },
    { id:'mim_mati',   icon:'🔔', label:'3. Hukum Mim Mati', desc:"3 hukum: Idghom Mimi, Idhar Syafawi, Ikhfa' Syafawi" },
    { id:'alif_lam',   icon:'🔔', label:"4. Hukum Alif Lam Ma'rifah", desc:'Qomariyah & Syamsyiyah' },
    { id:'qolqolah',   icon:'🔔', label:'5. Hukum Qolqolah', desc:'Sughro & Kubro' },
    { id:'lam_jalalah',icon:'🔔', label:'6. Lam Jalalah', desc:'Tafkhim & Tarqiq' },
  ],
  '3_idghom': [
    { id:'mutamatsilain',   icon:'♻️', label:'1. Idghom Mutamatsilain', desc:'Huruf sama bertemu' },
    { id:'mutaqorribain',   icon:'♻️', label:'2. Idghom Mutaqorribain', desc:'Huruf berdekatan makhrojnya' },
    { id:'mutajanisain',    icon:'♻️', label:'3. Idghom Mutajanisain',  desc:'Huruf sejenis makhrojnya beda sifat' },
  ],
  '4_ro': [
    { id:'ro_tafkhim', icon:'🔴', label:"1. Ro' Tafkhim", desc:"Ro' dibaca tebal" },
    { id:'ro_tarqiq',  icon:'🔵', label:"2. Ro' Tarqiq",  desc:"Ro' dibaca tipis" },
  ],
};

// DETAIL DATA 
const DETAILS = {
  // ── BAB 1: MAD ASHLI ──
  mad_ashli: [
    { id:'thobi_i', icon:'📖', label:"Mad Thobi'i", sublabel:'Panjang Watak' }
  ],
  // ── BAB 1: MAD FAR'I ──
  mad_fari: [
    { id:'wajib_muttashil',               icon:'📖', label:'1. Mad Wajib Muttashil',                sublabel:'Panjang harus sambung' },
    { id:'jaiz_munfashil',                icon:'📖', label:'2. Mad Jaiz Munfashil',                 sublabel:'Panjang boleh pisah' },
    { id:'arid_lissukun',                 icon:'📖', label:'3. Mad Arid Lissukun',                  sublabel:'Panjang datang karna disukun (mati)' },
    { id:'badal',                         icon:'📖', label:'4. Mad Badal',                          sublabel:'Panjang pengganti (huruf)' },
    { id:'iwad',                          icon:'📖', label:'5. Mad Iwad',                           sublabel:'Panjang pengganti' },
    { id:'lazim_kalimi_mutsaqqol',        icon:'📖', label:'6. Mad Lazim Kalimi Mutsaqqol',         sublabel:'Panjang tetap — berat' },
    { id:'lazim_kalimi_mukhoffaf',        icon:'📖', label:'7. Mad Lazim Kalimi Mukhoffaf',         sublabel:'Panjang tetap — ringan' },
    { id:'lazim_harfi_mukhoffaf_musyba',  icon:'📖', label:"8. Mad Lazim Harfi Mukhoffaf",          sublabel:'Huruf ringan (3 huruf dibaca pendek)' },
    { id:'lazim_harfi_musyba_mutsaqqol',  icon:'📖', label:"9. Mad Lazim Harfi Musyba' Mutsaqqol",  sublabel:'Huruf kenyang berat' },
    { id:'lazim_harfi_musyba_mukhoffaf',  icon:'📖', label:"10. Mad Lazim Harfi Musyba' Mukhoffaf", sublabel:'Huruf kenyang ringan' },
    { id:'layyin',                        icon:'📖', label:'11. Mad Layyin',                        sublabel:'Panjang lunak' },
    { id:'shilah_qoshiroh',               icon:'📖', label:'12. Mad Shilah Qoshiroh',               sublabel:'Panjang sambung pendek' },
    { id:'shilah_thowilah',               icon:'📖', label:'13. Mad Shilah Thowilah',               sublabel:'Panjang sambung panjang' },
    { id:'tamkin',                        icon:'📖', label:'14. Mad Tamkin',                        sublabel:'Panjang tempat' },
    { id:'farqi',                         icon:'📖', label:'15. Mad Farqi',                         sublabel:'Panjang pisah' },
  ],
  // ── BAB 2: GUNNAH ──
  gunnah: [
    { id:'gunnah_musyaddadah', icon:'🔔', label:'Gunnah Musyaddadah', sublabel:'Dengung dengan disangatkan' }
  ],
  // ── BAB 2: NUN MATI ──
  nun_mati: [
    { id:'idghom_bigunnah',   icon:'🍁', label:'1. Idghom Bigunnah',   sublabel:'Masuk mendengung' },
    { id:'idghom_bilagunnah', icon:'🍁', label:'2. Idghom Bilagunnah', sublabel:'Masuk tidak mendengung' },
    { id:'iqlab',             icon:'🍁', label:'3. Iqlab',             sublabel:'Membalik' },
    { id:'idhar_halqi',       icon:'🍁', label:'4. Idhar Halqi',       sublabel:'Jelas di tenggorokan' },
    { id:'ikhfa_haqiqi',      icon:'🍁', label:"5. Ikhfa' Haqiqi",    sublabel:'Samar sebenarnya' },
  ],
  // ── BAB 2: MIM MATI ──
  mim_mati: [
    { id:'idghom_mimi',    icon:'🌸', label:'1. Idghom Mimi',    sublabel:'Masuk bertemu dengan Mim' },
    { id:'idhar_syafawi',  icon:'🌸', label:'2. Idhar Syafawi',  sublabel:'Jelas di bibir' },
    { id:'ikhfa_syafawi',  icon:'🌸', label:"3. Ikhfa' Syafawi", sublabel:'Samar di bibir' },
  ],
  // ── BAB 2: ALIF LAM ──
  alif_lam: [
    { id:'qomariyah',  icon:'🌙', label:'1. Alif Lam Qomariyah',  sublabel:'Alif Lam disukun' },
    { id:'syamsyiyah', icon:'☀️', label:'2. Alif Lam Syamsyiyah', sublabel:'Didepannya ada huruf bertasydid' },
  ],
  // ── BAB 2: QOLQOLAH ──
  qolqolah: [
    { id:'qolqolah_sughro', icon:'🌍', label:'1. Qolqolah Sughro', sublabel:'Ditengah kalimat' },
    { id:'qolqolah_kubro',  icon:'🌍', label:'2. Qolqolah Kubro',  sublabel:'Diakhir kalimat' },
  ],
  // ── BAB 2: LAM JALALAH ──
  lam_jalalah: [
    { id:'lam_tafkhim', icon:'✨', label:'1. Lam Jalalah Tafkhim', sublabel:'Tebal' },
    { id:'lam_tarqiq',  icon:'✨', label:'2. Lam Jalalah Tarqiq',  sublabel:'Tipis' },
  ],
  // ── BAB 3: IDGHOM ──
  mutamatsilain: [{ id:'mutamatsilain_detail', icon:'♻️', label:'Idghom Mutamatsilain', sublabel:'Huruf sama bertemu huruf sama' }],
  mutaqorribain: [{ id:'mutaqorribain_detail', icon:'♻️', label:'Idghom Mutaqorribain', sublabel:'Huruf berdekatan makhrojnya' }],
  mutajanisain:  [{ id:'mutajanisain_detail',  icon:'♻️', label:'Idghom Mutajanisain',  sublabel:'Huruf sejenis makhrojnya, beda sifat' }],
  // ── BAB 4: RO' ──
  ro_tafkhim: [
    { id:'ro_tafkhim_a', icon:'🔴', label:'a. Berharokat Fathah / Dhomah',              sublabel:"Ro' tebal karena harokat" },
    { id:'ro_tafkhim_b', icon:'🔴', label:'b. Sukun / Waqof — didahului Fathah/Dhomah', sublabel:"Ro' tebal karena waqof" },
    { id:'ro_tafkhim_c', icon:'🔴', label:'c. Waqof — didahului Mad Fathah/Dhomah',     sublabel:"Ro' tebal setelah mad" },
    { id:'ro_tafkhim_d', icon:'🔴', label:'d. Waqof — didahului sukun & fathah/dhomah', sublabel:"Ro' tebal berlapis" },
  ],
  ro_tarqiq: [
    { id:'ro_tarqiq_a', icon:'🔵', label:'a. Berharokat Kasroh',                           sublabel:"Ro' tipis karena kasroh" },
    { id:'ro_tarqiq_b', icon:'🔵', label:"b. Sukun / Waqof — didahului Kasroh",            sublabel:"Ro' tipis karena waqof setelah kasroh" },
    { id:'ro_tarqiq_c', icon:'🔵', label:"c. Waqof — didahului Ya' Sukun",                 sublabel:"Ro' tipis setelah Ya' sukun" },
    { id:'ro_tarqiq_d', icon:'🔵', label:'d. Waqof — didahului sukun & kasroh sebelumnya', sublabel:"Ro' tipis berlapis" },
  ],
};

// RESULT DATABASE 
const RES = {

  // ═══ BAB 1: MAD ASHLI ═══
  thobi_i: {
    bab:'mad', badge:'MAD ASHLI', icon:'🌱',
    title:"Mad Thobi'i",
    subtitle:'Panjang Watak',
    def:"Mad dimana suatu huruf tidak layak berada kecuali bersama huruf mad.",
    huruf:['ا','ي','و'],
    hurufLabel:'Huruf Mad:',
    panjang:'1 Alif / 2 Harokat',
    cara:[
      {label:'Sebelum ا', val:'ada Fathah ( َ )'},
      {label:'Sebelum ي', val:'ada Kasroh ( ِ )'},
      {label:'Sebelum و', val:'ada Dhomah ( ُ )'},
    ],
    contoh:[
      {arab:'جَا', ket:'ا — sebelumnya fathah'},
      {arab:'جِي', ket:'ي — sebelumnya kasroh'},
      {arab:'جُو', ket:'و — sebelumnya dhomah'},
    ],
  },

  // ═══ BAB 1: MAD FAR'I ═══
  wajib_muttashil: {
    bab:'mad', badge:"MAD FAR'I", icon:'🍃',
    title:'Mad Wajib Muttashil',
    subtitle:'Panjang Harus Sambung',
    def:"Mad Thobi'i bertemu dengan Hamzah (ء) dalam 1 kalimat.",
    panjang:'2½ Alif / 3 Alif = 5 atau 6 Harokat',
    cara:'Dibaca panjang 2½ atau 3 alif — hamzah dan mad dalam satu kalimat tidak boleh dipisah.',
    contoh:[
      {arab:'جَآءَ', ket:'(Kalimat 1)'},
    ],
  },

  jaiz_munfashil: {
    bab:'mad', badge:"MAD FAR'I", icon:'🍃',
    title:'Mad Jaiz Munfashil',
    subtitle:'Panjang Boleh Pisah',
    def:"Mad Thobi'i bertemu dengan Alif (أ) di lain kalimat.",
    panjang:'2 Alif atau 2½ Alif = 4 atau 5 Harokat',
    cara:'Boleh dibaca 2 atau 2½ alif karena mad dan alif berada di dua kalimat berbeda.',
    contoh:[
      {arab:'وَمَآ أَنزَلَ', ket:'وَمَآ = kalimat 1 | أَنزَلَ = kalimat 2'},
    ],
  },

  arid_lissukun: {
    bab:'mad', badge:"MAD FAR'I", icon:'🍃',
    title:'Mad Arid Lissukun',
    subtitle:'Panjang Datang Karna Disukun (Mati)',
    def:"Mad Thobi'i bertemu dengan huruf yang diwaqofkan.",
    panjang:'1 – 3 Alif atau 1 – 6 Harokat',
    cara:'Boleh dibaca 1, 2, atau 3 alif karena huruf di akhir dibaca sukun saat waqof.',
    contoh:[
      {arab:'يَعْلَمُوْنَ', ket:'dibaca waqof → يَعْلَمُوْنْ'},
    ],
  },

  badal: {
    bab:'mad', badge:"MAD FAR'I", icon:'🍃',
    title:'Mad Badal',
    subtitle:'Panjang Pengganti (Huruf)',
    def:"Hamzah (ء) bertemu dengan mad dalam 1 kalimat, yang mendahului Hamzah-nya. Hamzah selalu di awal kalimat.",
    panjang:'1 Alif / 2 Harokat',
    cara:"Dibaca panjang 1 alif.",
    contoh:[
      {arab:'اِيْمَان', ket:'Contoh 1'},
      {arab:'اٰاْدَم',   ket:'mewakili "mad dan hamzah" — Contoh 3'},
      {arab:'اٰيٰتِ اللّٰهِ', ket:'ا di awal kalimat — Contoh 3'},
    ],
  },

  iwad: {
    bab:'mad', badge:"MAD FAR'I", icon:'🍃',
    title:'Mad Iwad',
    subtitle:'Panjang Pengganti',
    def:'Apabila ada Fathah Ten ( ً) di akhir kalimat yang diwaqofkan.',
    panjang:'1 Alif / 2 Harokat',
    cara:'Tanwin fathah ( ً) di akhir kalimat saat waqof dibaca panjang 1 alif sebagai pengganti tanwin.',
    contoh:[
      {arab:'حَزَنًا',  ket:'Contoh 1'},
      {arab:'وَعِلْمًا', ket:'Contoh 2'},
      {arab:'نَارًا',   ket:'Contoh 3'},
    ],
  },

  lazim_kalimi_mutsaqqol: {
    bab:'mad', badge:'MAD LAZIM KALIMI', icon:'🍃',
    title:'Mad Lazim Kalimi Mutsaqqol',
    subtitle:'Berat',
    def:'Apabila ada mad bertemu Siddah ( ّ) dalam 1 kalimat.',
    panjang:'3 Alif / 6 Harokat',
    cara:'Dibaca panjang 3 alif atau 6 harokat karena ada tasydid (berat/mutsaqqol) setelah huruf mad.',
    contoh:[
      {arab:'الْحَآقَّةُ', ket:'mad bertemu tasydid dalam 1 kalimat'},
    ],
  },

  lazim_kalimi_mukhoffaf: {
    bab:'mad', badge:'MAD LAZIM KALIMI', icon:'🍃',
    title:'Mad Lazim Kalimi Mukhoffaf',
    subtitle:'Ringan',
    def:'Apabila ada mad bertemu sukun dalam 1 kalimat.',
    panjang:'3 Alif / 6 Harokat',
    cara:'Dibaca panjang 3 alif atau 6 harokat karena ada sukun (ringan/mukhoffaf) setelah huruf mad. Contoh langka dalam Al-Qur\'an.',
    contoh:[
      {arab:'آلْئٰنَ', ket:'Yunus : 51 & 91 — mad bertemu sukun'},
    ],
  },

  lazim_harfi_mukhoffaf_musyba: {
    bab:'mad', badge:'MAD LAZIM HARFI', icon:'🍃',
    title:'Mad Lazim Harfi Mukhoffaf',
    subtitle:'Huruf Ringan (no. 8)',
    def:'Huruf fawatih (pembuka surat) di awal surat yang terdiri dari 3 huruf namun huruf tengahnya bukan huruf mad, dibaca pendek.',
    panjang:'1 Alif / 2 Harokat (huruf tengah dibaca pendek)',
    syarat:[
      'Syarat 1: Berada di awal surat',
      'Syarat 2: Termasuk 5 huruf: ح ي ط ه ر (حي طهر) — Mukhoffaf Harfi',
    ],
    cara:'Huruf dibaca 3 nama huruf namun mad-nya pendek. Tidak ada idghom atau ikhfa di dalamnya.',
    contoh:[
      {arab:'حٰمٙ — ح', ket:'ح : Mad Lazim Harfi Mukhoffaf (8)'},
      {arab:'طٰهٰ — ط', ket:'ط : Mad Lazim Harfi Mukhoffaf (8)'},
      {arab:'طٰهٰ — ه', ket:'ه : Mad Lazim Harfi Mukhoffaf (8)'},
      {arab:'يٰسٙ — ي', ket:'ي : Mad Lazim Harfi Mukhoffaf (8)'},
    ],
  },

  lazim_harfi_musyba_mutsaqqol: {
    bab:'mad', badge:'MAD LAZIM HARFI', icon:'🍃',
    title:"Mad Lazim Harfi Musyba' Mutsaqqol",
    subtitle:'Kenyang — Berat (no. 9)',
    def:"Huruf fawatih yang memiliki 3 huruf, huruf tengahnya huruf mad, dan ada Idghom atau Ikhfa' (berat).",
    panjang:'3 Alif / 6 Harokat',
    syarat:[
      "Syarat 1: Berada di awal surat",
      "Syarat 2: Termasuk 8 huruf: م ك ل س ع ص ق ن (نقص عسلكم) — Musyba'",
      "Syarat 3-I: Ada Idghom atau Ikhfa' → Mutsaqqol (Berat)",
    ],
    cara:"Dibaca panjang 3 alif / 6 harokat karena ada idghom atau ikhfa' yang memberikan keberatan pada bacaan.",
    contoh:[
      {arab:'الٙمٙ — أل', ket:"أل : Mad Lazim Harfi Musyba' Mutsaqqol (9)"},
      {arab:'عٙسٙقٙ — ع', ket:"ع : Mad Lazim Harfi Musyba' Mutsaqqol (9)"},
      {arab:'عٙسٙقٙ — س', ket:"س : Mad Lazim Harfi Musyba' Mutsaqqol (9)"},
    ],
  },

  lazim_harfi_musyba_mukhoffaf: {
    bab:'mad', badge:'MAD LAZIM HARFI', icon:'🍃',
    title:"Mad Lazim Harfi Musyba' Mukhoffaf",
    subtitle:'Kenyang — Ringan (no. 10)',
    def:"Huruf fawatih yang memiliki 3 huruf, huruf tengahnya huruf mad, dan tidak ada Idghom atau Ikhfa' (ringan).",
    panjang:'3 Alif / 6 Harokat',
    syarat:[
      "Syarat 1: Berada di awal surat",
      "Syarat 2: Termasuk 8 huruf: م ك ل س ع ص ق ن (نقص عسلكم) — Musyba'",
      "Syarat 3-II: Tidak ada Idghom atau Ikhfa' → Mukhoffaf (Ringan)",
    ],
    cara:"Dibaca panjang 3 alif / 6 harokat karena huruf tengahnya adalah huruf mad penuh, tanpa idghom/ikhfa'.",
    contoh:[
      {arab:'حٰمٙ — م',  ket:"م : Mad Lazim Harfi Musyba' Mukhoffaf (10)"},
      {arab:'كٙهٰيٰعٙصٙ — ك', ket:"ك : Mad Lazim Harfi Musyba' Mukhoffaf (10)"},
      {arab:'عٙسٙقٙ — ص', ket:"ص : Mad Lazim Harfi Musyba' Mukhoffaf (10)"},
      {arab:'الٙمٙ — م', ket:"م : Mad Lazim Harfi Musyba' Mukhoffaf (10)"},
    ],
  },

  layyin: {
    bab:'mad', badge:"MAD FAR'I", icon:'🍃',
    title:'Mad Layyin',
    subtitle:'Panjang Lunak',
    def:"Apabila ada Fathah ( َ) bertemu dengan Waw sukun (وْ) atau Ya' sukun (يْ) dan kalimat selanjutnya harus waqof / tidak waqof.",
    panjang:'1 Alif – 3 Alif',
    cara:"Huruf waw/ya' sukun yang didahului fathah dibaca dengan lembut/lunak. Panjang bacaan fleksibel 1–3 alif.",
    contoh:[
      {arab:'مِنْ شَيْءٍ اِلَّا',    ket:'Contoh 1 — يْ (ya\' sukun)'},
      {arab:'عَلَيْكَ',      ket:'Contoh 2 — يْ (ya\' sukun)'},
      {arab:'وَأَوْحَيْنَآ', ket:'Contoh 3 — وْ (waw sukun)'},
      {arab:'مِنْ نَوْمِ', ket:'Contoh 4 — وْ (waw sukun)'},
    ],
  },

  shilah_qoshiroh: {
    bab:'mad', badge:"MAD FAR'I", icon:'🍃',
    title:'Mad Shilah Qoshiroh',
    subtitle:'Panjang Sambung Pendek',
    def:"Apabila ada Ha' Dhomir (ىه) sebelumnya ada huruf hidup dan sesudahnya Ha' Dhomir tidak ada Alif atau Hamzah (ء / أ).",
    panjang:'1 Alif / 2 Harokat',
    cara:"Ha' Dhomir dibaca disambung (washol) dengan bacaan pendek 1 alif karena setelahnya tidak ada hamzah.",
    contoh:[
      {arab:'مِنْ قَبْلِهٖ لَمِنَ',  ket:'Contoh 1 — هِ tidak diikuti hamzah'},
      {arab:'بِهٖ وَأَجْمَعُ',      ket:'Contoh 2 — هِ tidak diikuti hamzah'},
    ],
  },

  shilah_thowilah: {
    bab:'mad', badge:"MAD FAR'I", icon:'🍃',
    title:'Mad Shilah Thowilah',
    subtitle:'Panjang Sambung Panjang',
    def:"Apabila ada Ha' Dhomir dimana sebelumnya ada huruf hidup dan sesudahnya Ha' Dhomir ada Alif atau Hamzah.",
    panjang:'3 Alif / 6 Harokat',
    cara:"Ha' Dhomir dibaca disambung (washol) dengan bacaan panjang 3 alif / 6 harokat karena setelahnya ada hamzah.",
    contoh:[
      {arab:'وَإِخْوَتِهٖٙ اٰيٰتِ',      ket:'Contoh 1 — هِ diikuti alif atau hamzah'},
      {arab:'أَشُدَّهُٙ أٰتَيْنٰهُ',   ket:'Contoh 2 — هُ diikuti alif atau hamzah'},
    ],
  },

  tamkin: {
    bab:'mad', badge:"MAD FAR'I", icon:'🍃',
    title:'Mad Tamkin',
    subtitle:'Panjang Tempat',
    def:"Apabila ada Ya' yang di-siddah (يّ) bertemu dengan Ya' sukun (يْ).",
    panjang:'1 Alif / 2 Harokat',
    cara:"Ya' yang bertasydid bertemu ya' sukun — dibaca dengan memberi tempat (tamkin) pada ya' tersebut sepanjang 1 alif.",
    contoh:[
      {arab:'حُيِّيْتُمْ', ket:"يِّيْ — ya' tasydid bertemu ya' sukun"},
    ],
  },

  farqi: {
    bab:'mad', badge:"MAD FAR'I", icon:'🍃',
    title:'Mad Farqi',
    subtitle:'Panjang Pisah',
    def:"Mad yang digunakan untuk memindahkan Istiqham (pertanyaan) atau Khobar (berita).",
    panjang:'3 Alif / 6 Harokat',
    cara:"Dibaca panjang 3 alif / 6 harokat sebagai pembeda antara kalimat istiqham (pertanyaan) dan khobar (berita). Terdapat dalam Yunus: 59, Al-An'am: 144, 134, 59.",
    contoh:[
      {arab:'قُلْ أٙللّٰهُ أَذِنَ', ket:'Istiqham (pertanyaan) — Yunus: 59'},
      {arab:'قُلْ أٙللّٰهُ أَذِنَ', ket:'Khobar (berita) — Al-An\'am: 144'},
    ],
  },

  // ═══ BAB 2: GHOIRU MAD ═══
  gunnah_musyaddadah: {
    bab:'ghoiru', badge:'GHOIRU MAD', icon:'🔔',
    title:'Gunnah Musyaddadah',
    subtitle:'Dengung Dengan Disangatkan',
    def:'Hukum mim (مّ) atau nun (نّ) yang bertasydid — dibaca dengan dengung yang disangatkan.',
    huruf:['نّ','مّ'],
    hurufLabel:'Huruf:',
    panjang:'1 Alif / 2 Harokat',
    cara:'Nun atau Mim bertasydid dibaca dengan dengung penuh selama 2 harokat (1 alif). Dengung keluar dari pangkal hidung.',
    contoh:[
      {arab:'إِنَّ', ket:'نّ — nun bertasydid'},
      {arab:'ثُمَّ', ket:'مّ — mim bertasydid'},
    ],
  },

  // ── NUN MATI ──
  idghom_bigunnah: {
    bab:'ghoiru', badge:'NUN MATI / TANWIN', icon:'🔔',
    title:'Idghom Bigunnah',
    subtitle:'Masuk Dengan Mendengung',
    def:'Apabila ada Nun Mati atau Tanwin bertemu dengan huruf Idghom Bigunnah, maka dibaca masuk dan mendengung.',
    huruf:['ي','ن','م','و'],
    hurufLabel:'Huruf Idghom Bigunnah:',
    panjang:'1 Alif / 2 Harokat',
    cara:'Nun mati/tanwin dimasukkan (idghom) ke huruf berikutnya disertai dengung selama 2 harokat.',
    contoh:[
      {arab:'أَن يَّقُوْلَ',  ket:'Contoh 1 — nun mati bertemu ي'},
      {arab:'إِنْ نَّقُوْلُ', ket:'Contoh 2 — nun mati bertemu ن'},
    ],
    catatan:"Idhar Wajib (Pengecualian):\nوَانٍ dan دُنْيَا — ada huruf Idghom Bigunnah tetapi dibaca jelas (bukan masuk dengan mendengung) karena keduanya dalam 1 kalimat.",
  },

  idghom_bilagunnah: {
    bab:'ghoiru', badge:'NUN MATI / TANWIN', icon:'🔔',
    title:'Idghom Bilagunnah',
    subtitle:'Masuk Dengan Tidak Mendengung',
    def:'Apabila ada Nun Mati atau Tanwin bertemu dengan huruf Idghom Bilagunnah, maka dibaca masuk dan tidak mendengung.',
    huruf:['ل','ر'],
    hurufLabel:'Huruf Idghom Bilagunnah:',
    cara:'Nun mati/tanwin dimasukkan (idghom) ke huruf ل atau ر tanpa dengung — langsung lebur.',
    contoh:[
      {arab:'عَن رَّسُوْلٍ',  ket:'Contoh 1 — nun mati bertemu ر'},
      {arab:'مِنْ رَّبِّهِمْ', ket:'Contoh 2 — nun mati bertemu ر'},
    ],
  },

  iqlab: {
    bab:'ghoiru', badge:'NUN MATI / TANWIN', icon:'🔔',
    title:'Iqlab',
    subtitle:'Membalik',
    def:'Apabila ada Nun Mati atau Tanwin bertemu dengan huruf Iqlab, maka dibaca membalik.',
    huruf:['ب'],
    hurufLabel:'Huruf Iqlab:',
    panjang:'1 Alif / 2 Harokat',
    cara:"Nun mati/tanwin dibalik menjadi bunyi mim (م) samar disertai dengung selama 2 harokat, kemudian masuk ke huruf ب.",
    contoh:[
      {arab:' عَوَانٌۢ بَيْنَ', ket:'Contoh 1 — tanwin bertemu ب'},
      {arab:'تُنۢبِتُ',        ket:'Contoh 2 — nun mati bertemu ب'},
    ],
  },

  idhar_halqi: {
    bab:'ghoiru', badge:'NUN MATI / TANWIN', icon:'🔔',
    title:'Idhar Halqi',
    subtitle:'Jelas Di Tenggorokan',
    def:'Apabila ada Nun Mati atau Tanwin bertemu dengan huruf Idhar Halqi, maka dibaca jelas.',
    huruf:['أ','ح','خ','ع','غ','ه'],
    hurufLabel:'Huruf Idhar Halqi:',
    cara:'Nun mati/tanwin dibaca jelas (tidak lebur, tidak dengung) karena huruf berikutnya keluar dari tenggorokan (halqi).',
    contoh:[
      {arab:'يَنْأَوْنَ',  ket:'Contoh 1 — bertemu أ'},
      {arab:'يَنْحِتُوْنَ', ket:'Contoh 2 — bertemu ح'},
      {arab:'مِنْ خَيْرٍ',  ket:'Contoh 3 — bertemu خ'},
    ],
    catatan:"Idhar Wajib:\n1. وَانٍ\n2. دُنْيَا\n(Ada huruf Idghom Bigunnah akan tetapi dibaca jelas bukan masuk dengan mendengung)",
  },

  ikhfa_haqiqi: {
    bab:'ghoiru', badge:'NUN MATI / TANWIN', icon:'🔔',
    title:"Ikhfa' Haqiqi",
    subtitle:'Samar Sebenarnya',
    def:"Apabila ada Nun Mati atau Tanwin bertemu dengan huruf Ikhfa' Haqiqi, maka dibaca samar.",
    huruf:['ت','ث','ج','د','ذ','ز','س','ش','ص','ض','ط','ظ','ف','ق','ك'],
    hurufLabel:"Huruf Ikhfa' Haqiqi:",
    panjang:'1 Alif / 2 Harokat',
    cara:"Nun mati/tanwin dibaca samar (antara jelas dan masuk) dengan dengung ringan selama 2 harokat. Lidah tidak menyentuh langit-langit.",
    contoh:[
      {arab:'أُنزِلَ',     ket:'Contoh 1 — bertemu ز'},
      {arab:'مِنْ ثَمَرَةٍ', ket:'Contoh 2 — bertemu ث'},
      {arab:'وَأَنتُمْ',   ket:'Contoh 3 — bertemu ت'},
    ],
  },

  // ── MIM MATI ──
  idghom_mimi: {
    bab:'ghoiru', badge:'MIM MATI', icon:'🔔',
    title:'Idghom Mimi',
    subtitle:'Masuk Bertemu Dengan Mim (م)',
    def:'Apabila ada Mim Mati (مْ) bertemu dengan huruf Idghom Mimi yaitu م, maka dibaca masuk.',
    huruf:['م'],
    hurufLabel:'Huruf Idghom Mimi:',
    panjang:'1 Alif / 2 Harokat',
    cara:'Mim mati dimasukkan (idghom) ke mim berikutnya disertai dengung dari bibir selama 2 harokat.',
    contoh:[
      {arab:'لَهُمْ مَثَلًا', ket:'مْ bertemu م — masuk dengan dengung'},
    ],
  },

  idhar_syafawi: {
    bab:'ghoiru', badge:'MIM MATI', icon:'🔔',
    title:'Idhar Syafawi',
    subtitle:'Jelas Di Bibir',
    def:'Apabila ada Mim Mati (مْ) bertemu dengan huruf Idhar Syafawi yaitu selain م dan ب, maka dibaca jelas.',
    hurufLabel:'Huruf Idhar Syafawi:',
    hurufKet:'Semua huruf hijaiyah selain م dan ب',
    cara:'Mim mati dibaca jelas tanpa dengung karena huruf berikutnya bukan ب maupun م. Bibir menutup sempurna saat mengucap mim.',
    contoh:[
      {arab:'تَهُمْ اَمْ لَمْ',   ket:'Contoh 1 — مْ bertemu ا'},
      {arab:'لَكُمْ ضَرَّ', ket:'Contoh 2 — مْ bertemu ض'},
    ],
  },

  ikhfa_syafawi: {
    bab:'ghoiru', badge:'MIM MATI', icon:'🔔',
    title:"Ikhfa' Syafawi",
    subtitle:'Samar Di Bibir',
    def:"Apabila ada Mim Mati (مْ) bertemu dengan huruf Ikhfa' Syafawi yaitu ب, maka dibaca samar.",
    huruf:['ب'],
    hurufLabel:"Huruf Ikhfa' Syafawi:",
    panjang:'1 Alif / 2 Harokat',
    cara:"Mim mati dibaca samar (tidak jelas, tidak masuk) disertai dengung dari bibir selama 2 harokat saat bertemu ب.",
    contoh:[
      {arab:'وَهُمْ بِالْأَخِرَةِ', ket:'مْ bertemu ب — samar di bibir'},
    ],
  },

  // ── ALIF LAM ──
  qomariyah: {
    bab:'ghoiru', badge:"ALIF LAM MA'RIFAH", icon:'🌙',
    title:'Alif Lam Qomariyah',
    subtitle:'Alif Lam Disukun — Dibaca Jelas',
    def:'Apabila ada Alif Lam yang disukun (الْ) — maka Lam dibaca jelas.',
    cara:"Huruf Lam (ل) dibaca jelas/terang tidak lebur ke huruf sesudahnya karena huruf berikutnya bukan huruf syamsiyah.",
    contoh:[
      {arab:'فِى الْبَحْرِ',        ket:'Contoh 1 — الْ dibaca jelas'},
      {arab:'يَوْمِ الْقِيَامَةِ',   ket:'Contoh 2 — الْ dibaca jelas'},
    ],
  },

  syamsyiyah: {
    bab:'ghoiru', badge:"ALIF LAM MA'RIFAH", icon:'☀️',
    title:'Alif Lam Syamsyiyah',
    subtitle:'Di Depannya Ada Huruf Bertasydid — Lam Lebur',
    def:'Apabila di depan Alif Lam ada kalimat yang di-siddah ( ّ) — maka Lam diidghomkan (lebur) ke huruf berikutnya.',
    cara:"Huruf Lam (ل) tidak dibaca/lebur masuk ke huruf sesudahnya yang bertasydid. Tanda tasydid menunjukkan lebur-nya huruf Lam.",
    contoh:[
      {arab:'الطَّارِقُ',    ket:'Contoh 1 — ل lebur ke ط'},
      {arab:'الدَّارُ',      ket:'Contoh 2 — ل lebur ke د'},
    ],
  },

  // ── QOLQOLAH ──
  qolqolah_sughro: {
    bab:'ghoiru', badge:'QOLQOLAH', icon:'🔔',
    title:'Qolqolah Sughro',
    subtitle:'Memantul — Di Tengah Kalimat',
    def:'Huruf Qolqolah yang berada di tengah kalimat dalam keadaan sukun (tidak diwaqofkan).',
    huruf:['ب','ج','د','ط','ق'],
    hurufLabel:'Huruf Qolqolah:',
    cara:'Huruf Qolqolah yang sukun di tengah kalimat dibaca dengan pantulan/getaran ringan (sughro = kecil).',
    contoh:[
      {arab:'اِجْتِهَادَ', ket:'Qolqolah Sughro — جْ di tengah kalimat'},
    ],
  },

  qolqolah_kubro: {
    bab:'ghoiru', badge:'QOLQOLAH', icon:'🔔',
    title:'Qolqolah Kubro',
    subtitle:'Memantul — Di Akhir Kalimat',
    def:'Huruf Qolqolah yang berada di akhir kalimat (diwaqofkan / dimatikan).',
    huruf:['ب','ج','د','ط','ق'],
    hurufLabel:'Huruf Qolqolah:',
    cara:'Huruf Qolqolah yang sukun di akhir kalimat/waqof dibaca dengan pantulan/getaran kuat (kubro = besar).',
    contoh:[
      {arab:'أَحَدٌ', ket:'Qolqolah Kubro — دْ di akhir kalimat (waqof)'},
    ],
  },

  // ── LAM JALALAH ──
  lam_tafkhim: {
    bab:'ghoiru', badge:'LAM JALALAH', icon:'🔔',
    title:'Lam Jalalah Tafkhim',
    subtitle:'Tebal',
    def:"Apabila sebelum lafadz اللّٰه ada fathah atau dhomah, maka Lam Jalalah dibaca tebal (tafkhim).",
    cara:"Lam pada lafadz اللّٰه diucapkan tebal/berat dengan lidah bagian tengah naik ke langit-langit.",
    contoh:[
      {arab:'اللَّهَ', ket:'Sebelumnya fathah — dibaca tebal'},
      {arab:'اللَّهُ', ket:'Sebelumnya dhomah — dibaca tebal'},
    ],
  },

  lam_tarqiq: {
    bab:'ghoiru', badge:'LAM JALALAH', icon:'🔔',
    title:'Lam Jalalah Tarqiq',
    subtitle:'Tipis',
    def:"Apabila sebelum lafadz اللّٰه ada kasroh, maka Lam Jalalah dibaca tipis (tarqiq).",
    cara:"Lam pada lafadz اللّٰه diucapkan tipis/ringan karena didahului harokat kasroh.",
    contoh:[
      {arab:'بِاللّٰهِ', ket:'Sebelumnya kasroh ( بِ ) — dibaca tipis'},
      {arab:'لِلّٰهِ',   ket:'Sebelumnya kasroh ( لِ ) — dibaca tipis'},
    ],
  },

  // ═══ BAB 3: IDGHOM ═══
  mutamatsilain_detail: {
    bab:'idghom', badge:'IDGHOM', icon:'♻️',
    title:'Idghom Mutamatsilain',
    subtitle:'Huruf Sama Bertemu Huruf Sama',
    def:'Semua huruf yang disukun bertemu dengan huruf berharokat yang sama atau semisal.',
    cara:'Cara membacanya: tidak mendengung — huruf pertama dimasukkan ke huruf kedua yang sama.',
    contoh:[
      {arab:'وَقَدْ دَّخَلُ',   ket:'Contoh 1: دْ - دَ'},
      {arab:'كَانَتْ تَّعْمَلُ', ket:'Contoh 2: تْ - تَ'},
    ],
    catatan:'Khusus نْ - نَ dan مْ - مَ: dibaca mendengung (dengan gunnah).',
  },

  mutaqorribain_detail: {
    bab:'idghom', badge:'IDGHOM', icon:'♻️',
    title:'Idghom Mutaqorribain',
    subtitle:'Huruf Berdekatan Makhrojnya',
    def:'Apabila suatu huruf disukun bertemu dengan huruf berharokat di hadapannya dan huruf-huruf tersebut berdekatan makhrojnya serta persamaan lain.',
    huruf:['قْ','ك','لْ','ر'],
    hurufLabel:'Sifat huruf:',
    cara:"I. Hanya hilang qolqolah, sifat isti'la ق tetap.\nII. Hilang qolqolahnya dan sifat isti'la ق.",
    contoh:[
      {arab:'وَقُلْ رَّبِّ',      ket:'Contoh 1: لْ bertemu ر'},
      {arab:'أَلَمْ نَخْلُقْكُمْ', ket:'Contoh 2: قْ bertemu ك'},
    ],
    catatan:"Dalam pengelompokan ada yang berpendapat:\nMutajanisain:\n 1. ث ---> ذ \n 2. ت <--- ---> د \n 3. ق ---> ك \n 4. ت <--- ---> ط \n 5. ب ---> م \n 6. ذ <--- ---> ظ\nMutaqorribain: \n 1. ل ---> ر ",
  },

  mutajanisain_detail: {
    bab:'idghom', badge:'IDGHOM', icon:'♻️',
    title:'Idghom Mutajanisain',
    subtitle:'Huruf Sejenis Makhrojnya, Beda Sifat',
    def:'Apabila suatu huruf yang disukun bertemu dengan huruf berharokat di hadapannya dan huruf tersebut sejenis makhrojnya tapi lain sifatnya.',
    huruf:['د','ت','ط','ث','ذ','ظ','ب','م'],
    hurufLabel:'Huruf (Bacaan Imam Hafes : 8 huruf):',
    cara:"Huruf pertama dimasukkan ke huruf kedua yang sejenis makhrojnya. Tidak mendengung kecuali ب bertemu م.",
    contoh:[
      {arab:'وَإِنْ عُدتُّمْ عُدْنَا',      ket:'Contoh 1 — دْ bertemu ت'},
      {arab:'قَدْ أُجِيبَتْ دَّعْوَتُكُمَا', ket:'Contoh 2 — تْ bertemu دَّ'},
      {arab:'وَكَفَرَ طَّآئِفَةٌ',          ket:'Contoh 3 — رَ طَّ (ط bertemu ط)'},
      {arab:'وَلَئِنْ بَسَطْتَّ',             ket:'Contoh 4 — طْ bertemu ت'},
    ],
    catatan:"Hanya hilang qolqolahnya — sifat isti'la dan ithbaq ط tetap.",
  },

  // ═══ BAB 4: RO' ═══
  ro_tafkhim_a: {
    bab:'ro', badge:"RO' TAFKHIM", icon:'🔴',
    title:"Ro' Tafkhim (a)",
    subtitle:'Bila Berharokat Fathah atau Dhomah',
    def:"Ro' dibaca tebal bila berharokat fathah atau dhomah.",
    cara:"Cara membaca: pengucapan Ro' diikuti bibir agak maju ke depan (tebal/berat).",
    contoh:[
      {arab:'رَفَعَ',       ket:'Contoh 1 — رَ fathah'},
      {arab:'أَلَمْ تَرَ',  ket:'Contoh 2 — رَ fathah'},
      {arab:'رُفِعَتْ',    ket:'Contoh 3 — رُ dhomah'},
      {arab:'لِيَشْتَرُوا', ket:'Contoh 4 — رُ dhomah'},
    ],
  },

  ro_tafkhim_b: {
    bab:'ro', badge:"RO' TAFKHIM", icon:'🔴',
    title:"Ro' Tafkhim (b)",
    subtitle:'Bila Disukun / Waqof — Didahului Fathah atau Dhomah',
    def:"Ro' disukun atau dimatikan karena waqof dan didahului harokat fathah atau dhomah.",
    cara:"Ro' sukun/waqof yang sebelumnya fathah atau dhomah dibaca tebal karena mengikuti harokat yang mendahuluinya.",
    contoh:[
      {arab:'وَأَرْسَلَ',   ket:'Contoh 1 — رْ didahului فَ (fathah)'},
      {arab:'تَرْمِيهِمْ',  ket:'Contoh 2 — رْ didahului تَ (fathah)'},
      {arab:'وَالأَرْضُ',   ket:'Contoh 3 — رْ didahului أَ (fathah)'},
      {arab:'هُوَ الأَبْتَرْ', ket:'Contoh 4 — waqof, didahului fathah'},
      {arab:'وَانْحَرْ',    ket:'Contoh 5 — waqof, didahului fathah'},
    ],
  },

  ro_tafkhim_c: {
    bab:'ro', badge:"RO' TAFKHIM", icon:'🔴',
    title:"Ro' Tafkhim (c)",
    subtitle:'Bila Waqof — Didahului Mad Fathah atau Mad Dhomah',
    def:"Ro' dimatikan karena waqof dan didahului mad fathah atau mad dhomah.",
    cara:"Ro' waqof yang sebelumnya mad fathah (ا) atau mad dhomah (و) dibaca tebal mengikuti harokat mad.",
    contoh:[
      {arab:'الأَبْرَارَ',   ket:'Contoh 1 — mad fathah (رَا) lalu waqof'},
      {arab:'هُوَ الْغَفُوْرُ', ket:'Contoh 2 — mad dhomah (وْ) lalu waqof'},
    ],
  },

  ro_tafkhim_d: {
    bab:'ro', badge:"RO' TAFKHIM", icon:'🔴',
    title:"Ro' Tafkhim (d)",
    subtitle:'Bila Waqof — Didahului Huruf Sukun & Harokat Fathah/Dhomah',
    def:"Ro' dimatikan karena waqof dengan didahului huruf sukun dan huruf berharokat fathah atau dhomah.",
    cara:"Ro' waqof yang sebelumnya huruf sukun, sedang huruf sebelum sukun itu berharokat fathah/dhomah → Ro' dibaca tebal.",
    contoh:[
      {arab:'الْعَصْرِ', ket:'Contoh 1 — صْ sukun, sebelumnya عَ fathah'},
      {arab:'خُسْرٍ',   ket:'Contoh 2 — سْ sukun, sebelumnya خُ dhomah'},
      {arab:'وَالصَّبْرِ', ket:'Contoh 3 — بْ sukun, sebelumnya صَ fathah'},
    ],
  },

  ro_tarqiq_a: {
    bab:'ro', badge:"RO' TARQIQ", icon:'🔵',
    title:"Ro' Tarqiq (a)",
    subtitle:'Bila Berharokat Kasroh',
    def:"Ro' dibaca tipis bila berharokat kasroh.",
    cara:"Ro' yang berharokat kasroh (رِ) dibaca tipis/ringan — bibir tidak maju, lidah tipis.",
    contoh:[
      {arab:'رِجَالٌ', ket:"رِ — kasroh, dibaca tipis"},
    ],
  },

  ro_tarqiq_b: {
    bab:'ro', badge:"RO' TARQIQ", icon:'🔵',
    title:"Ro' Tarqiq (b)",
    subtitle:"Bila Sukun / Waqof — Didahului Kasroh",
    def:"Ro' sukun atau dimatikan karena waqof dan didahului kasroh.",
    cara:"Ro' sukun/waqof yang sebelumnya kasroh dibaca tipis karena mengikuti kasroh yang mendahuluinya.",
    contoh:[
      {arab:'وَفِرْعَوْنَ',  ket:'Contoh 1 — رْ didahului فِ kasroh'},
      {arab:'السَّرَائِرُ',  ket:'Contoh 2 — رْ didahului رَا (mad) kasroh'},
    ],
  },

  ro_tarqiq_c: {
    bab:'ro', badge:"RO' TARQIQ", icon:'🔵',
    title:"Ro' Tarqiq (c)",
    subtitle:"Bila Waqof — Didahului Ya' Sukun",
    def:"Ro' dimatikan karena waqof dan didahului Ya' sukun.",
    cara:"Ro' waqof yang sebelumnya Ya' sukun (يْ) dibaca tipis karena ya' sukun memiliki pengaruh kasroh.",
    contoh:[
      {arab:'خَبِيْر', ket:'Contoh 1 — يْ lalu رْ waqof'},
      {arab:'بَصِيْر', ket:'Contoh 2 — يْ lalu رْ waqof'},
      {arab:'خَيْر',   ket:'Contoh 3 — يْ lalu رْ waqof'},
    ],
  },

  ro_tarqiq_d: {
    bab:'ro', badge:"RO' TARQIQ", icon:'🔵',
    title:"Ro' Tarqiq (d)",
    subtitle:"Bila Waqof — Didahului Huruf Sukun & Kasroh Sebelumnya",
    def:"Ro' dimatikan karena waqof dan didahului huruf bersukun dan huruf sebelumnya lagi berharokat kasroh.",
    cara:"Ro' waqof yang sebelumnya huruf sukun, sedang huruf sebelum sukun itu berharokat kasroh → Ro' dibaca tipis.",
    contoh:[
      {arab:'حِجْرٍ', ket:'جْ sukun, sebelumnya حِ kasroh'},
    ],
    catatan:"TERKECUALI:\n(a) Huruf yang bersukun tersebut adalah huruf isti'la (ف غ ظ ط ض ص خ) → maka Ro' dibaca TEBAL.\nContoh: مِنْ قِطْرٍ | مِنْ مِصْرَ\n\n(b) Ro' sukun bila menghadapi huruf isti'la (ر خ ص ض ط ظ غ ف) dibaca TEBAL walaupun didahului kasroh.\nContoh: مِرْصَادًا | فِي قِرْطَاسٍ | وَإِرْصَادًا\nKhusus: فِرْقٍ boleh juga dibaca tipis.\n\n(c) Ro' sukun dibaca TEBAL bila didahului hamzah washol walaupun harokatnya kasroh.\nContoh: إِرْجِعِي | ارْتَبْتُمْ | ارْتَابُوا",
  },
};

// RENDER SCREENS 
// LANJUT HANDLERS 
function lanjutMode() {
  if (!S._pendingBab) return;
  S.bab = S._pendingBab;
  S._pendingBab = null;
  S.sub = null;
  S.detail = null;
  S.history = ['screenMode'];
  renderSubScreen();
  showScreen('screenSub');
}

function lanjutSub() {
  if (!S._pendingSub) return;
  S.sub = S._pendingSub;
  S._pendingSub = null;
  pushHistory('screenSub');
  const details = DETAILS[S.sub] || [];
  if (details.length === 1) {
    S.detail = details[0].id;
    renderResult();
    showScreen('screenResult');
  } else {
    renderDetailScreen();
    showScreen('screenDetail');
  }
}

function lanjutDetail() {
  if (!S._pendingDetail) return;
  S.detail = S._pendingDetail;
  S._pendingDetail = null;
  pushHistory('screenDetail');
  renderResult();
  showScreen('screenResult');
}

function setBab(bab) {
  S.bab = bab;
  S.sub = null;
  S.detail = null;
  S.history = ['screenMode'];
  renderSubScreen();
  showScreen('screenSub');
}

function renderSubScreen() {
  const c = document.getElementById('subOptions');
  c.innerHTML = '';
  // Reset tombol lanjut
  const lanjutBtn = document.getElementById('lanjutSub');
  if (lanjutBtn) { lanjutBtn.disabled = true; }
  S._pendingSub = null;

  const subs = SUBS[S.bab] || [];
  const bab = BABS.find(b=>b.id===S.bab);
  document.getElementById('subTitle').textContent = bab ? bab.label : '';
  document.getElementById('subDesc').textContent = bab ? bab.desc : '';
  subs.forEach(sub => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-icon">${sub.icon}</span><div class="option-text"><strong>${sub.label}</strong><span>${sub.desc}</span></div><div class="option-check">✓</div>`;
    btn.onclick = () => {
      // Select visual
      document.querySelectorAll('#subOptions .option-btn').forEach(el => el.classList.remove('selected'));
      btn.classList.add('selected');
      S._pendingSub = sub.id;
      if (lanjutBtn) lanjutBtn.disabled = false;
    };
    c.appendChild(btn);
  });
}

function renderDetailScreen() {
  const c = document.getElementById('detailOptions');
  c.innerHTML = '';
  // Reset tombol lanjut
  const lanjutBtn = document.getElementById('lanjutDetail');
  if (lanjutBtn) { lanjutBtn.disabled = true; }
  S._pendingDetail = null;

  const details = DETAILS[S.sub] || [];
  const sub = (SUBS[S.bab]||[]).find(s=>s.id===S.sub);
  document.getElementById('detailTitle').textContent = sub ? sub.label : '';
  document.getElementById('detailDesc').textContent = sub ? sub.desc : '';

  details.forEach(d => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-icon">${d.icon}</span><div class="option-text"><strong>${d.label}</strong><span>${d.sublabel}</span></div><div class="option-check">✓</div>`;
    btn.onclick = () => {
      // Select visual
      document.querySelectorAll('#detailOptions .option-btn').forEach(el => el.classList.remove('selected'));
      btn.classList.add('selected');
      S._pendingDetail = d.id;
      if (lanjutBtn) lanjutBtn.disabled = false;
    };
    c.appendChild(btn);
  });
}

// RENDER RESULT 
function renderResult() {
  const res = RES[S.detail];
  if (!res) { console.warn('No result for:', S.detail); return; }

  const clsMap = { mad:'mad', ghoiru:'ghoiru', idghom:'idghom', ro:'ro' };
  const cls = clsMap[res.bab] || 'mad';

  let html = `<div class="result-card ${cls}">`;
  html += `<div class="result-icon">${res.icon}</div>`;
  html += `<div class="result-badge">${res.badge}</div>`;
  html += `<div class="result-title">${res.title}</div>`;
  if (res.subtitle) html += `<div class="result-subtitle">${res.subtitle}</div>`;

  // DETAIL BOX: Pengertian
  html += `<div class="detail-box">`;
  html += `<div class="detail-title">📖 Pengertian & Ketentuan</div>`;
  html += `<div class="detail-row"><div class="detail-label">Pengertian</div><div class="detail-value">${res.def}</div></div>`;

  // Huruf chips
  if (res.huruf) {
    const chipClass = res.bab==='ro' ? 'orange' : res.bab==='ghoiru' ? 'blue' : '';
    const chips = res.huruf.map(h=>`<span class="huruf-chip ${chipClass}">${h}</span>`).join('');
    html += `<div class="detail-row"><div class="detail-label">${res.hurufLabel||'Huruf:'}</div><div class="detail-value"><div class="huruf-grid">${chips}</div></div></div>`;
  }
  if (res.hurufKet) {
    html += `<div class="detail-row"><div class="detail-label">${res.hurufLabel||'Huruf:'}</div><div class="detail-value">${res.hurufKet}</div></div>`;
  }

  // Panjang
  if (res.panjang) {
    html += `<div class="detail-row"><div class="detail-label">Panjang</div><div class="detail-value"><span class="panjang-badge">📏 ${res.panjang}</span></div></div>`;
  }

  // Cara Baca
  if (res.cara && Array.isArray(res.cara)) {
    const caraHtml = res.cara.map(c=>`<div style="margin-bottom:4px"><span class="cara-tag">${c.label}</span> ${c.val}</div>`).join('');
    html += `<div class="detail-row"><div class="detail-label">Cara Baca</div><div class="detail-value">${caraHtml}</div></div>`;
  } else if (res.cara && typeof res.cara==='string') {
    const caraLines = res.cara.split('\n').map(l=>`<div style="margin-bottom:2px">• ${l}</div>`).join('');
    html += `<div class="detail-row"><div class="detail-label">Cara Baca</div><div class="detail-value">${caraLines}</div></div>`;
  }

  // Syarat
  if (res.syarat) {
    const syaratHtml = res.syarat.map(s=>`<div class="syarat-item">✦ ${s}</div>`).join('');
    html += `<div class="detail-row"><div class="detail-label">Syarat</div><div class="detail-value">${syaratHtml}</div></div>`;
  }

  html += `</div>`; // /detail-box

  // CONTOH BOX
  if (res.contoh && res.contoh.length) {
    html += `<div class="detail-box contoh-section" style="margin-top:12px">`;
    html += `<div class="detail-title">✏️ Contoh</div>`;
    res.contoh.forEach((ct, i) => {
      html += `<div class="contoh-item">`;
      html += `<div class="contoh-arabic">${ct.arab}</div>`;
      if (ct.ket) html += `<div class="contoh-ket">${ct.ket}</div>`;
      html += `</div>`;
      if (i < res.contoh.length - 1) html += `<div class="contoh-divider"></div>`;
    });
    html += `</div>`;
  }

  // CATATAN
  if (res.catatan) {
    const lines = res.catatan.split('\n');
    html += `<div class="special-note warning"><strong>⚠️ Catatan / Pengecualian</strong>${lines.map(l=>`<div>${l}</div>`).join('')}</div>`;
  }

  html += `</div>`; // /result-card
  document.getElementById('resultContainer').innerHTML = html;
}

// RESET 
function reset() {
  Object.assign(S, {bab:null,sub:null,detail:null,screen:'welcome',history:[],_pendingBab:null,_pendingSub:null,_pendingDetail:null});
  ['lanjutMode','lanjutSub','lanjutDetail'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = true;
  });
  document.querySelectorAll('#babOptions .option-btn').forEach(el => el.classList.remove('selected'));
  showScreen('screenWelcome');
}

// Init
updateProgress();