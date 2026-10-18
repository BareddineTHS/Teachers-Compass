/* ==========================================================================
   TEACHER'S COMPASS · SITE CONTENT
   --------------------------------------------------------------------------
   This is the only file you need to edit to change what the site shows.
   - Replace every value that starts with "PASTE_" with your real link.
   - Add, remove or reorder items in any list. Keep the commas and quotes.
   - Items marked  sample: true  are examples. Delete them when you add yours.
   ========================================================================== */

window.SITE = {
  name: "Teacher's Compass",
  tagline: "Ready-to-use English materials for Moroccan high school classrooms.",

  /* ---- Google Drive folders (open with "Anyone with the link can view") ---- */
  drives: {
    teachers: "PASTE_TEACHERS_COMPASS_DRIVE_LINK",
    applicants: "PASTE_TEACHING_WELL_DRIVE_LINK",
    crmef: "PASTE_CRMEF_DRIVE_LINK"
  },

  /* ---- Contact ----
     formEndpoint: create a free form at https://formspree.io and paste its URL,
     e.g. "https://formspree.io/f/abcdwxyz". Leave "" until you have it. */
  contact: {
    email: "PASTE_YOUR_EMAIL",
    formEndpoint: ""
  },

  /* ---- Forum submissions ----
     Can be the same Formspree form as contact, or a second one.
     Teachers send a Drive link to their file. You review it, then add it
     to forumPosts below. It is live only after you add it. */
  forum: {
    submitEndpoint: ""
  },

  /* ---- Anonymous comments ----
     Free service: https://cusdis.com (no account needed for visitors,
     every comment waits for your approval). Paste your App ID here. */
  comments: {
    cusdisAppId: ""
  },

  /* ---- Simulation video (YouTube, Unlisted) ----
     Paste only the ID: for https://youtu.be/AbC123xyz the ID is AbC123xyz */
  video: {
    youtubeId: "",
    title: "Lesson simulation: a full reading lesson, step by step",
    note: "Watch how a lesson moves from warm-up to exit ticket. Pause at each stage and compare it with your own plan."
  },

  levels: ["Common Core", "1BAC", "2BAC"],

  types: [
    "Lesson plan", "Worksheet", "Exit ticket", "Warm-up",
    "Review game", "Assessment", "Remedial work"
  ],

  /* Textbooks. "color" is the colour of the book's tile on the site. */
  books: [
    { name: "Visa to the World", color: "#1F6F8B" },
    { name: "Outlook", color: "#7A4B9A" },
    { name: "Al Massar", color: "#2E7D5B" },
    { name: "Ticket to English 1", color: "#C2571A" },
    { name: "Ticket to English 2", color: "#A23B3B" },
    { name: "Gateway to English 1", color: "#2846A8" },
    { name: "Gateway to English 2", color: "#3A5F0B" },
    { name: "Insight into English", color: "#8A6D1F" }
  ],

  /* ---- Teachers' library ----
     type must match one of "types" above, book one of "books", level one of "levels". */
  materials: [
    { title: "Unit 1 reading lesson: full plan with timings", type: "Lesson plan", book: "Ticket to English 1", level: "1BAC", unit: "Unit 1", link: "", sample: true },
    { title: "Gerunds and infinitives practice sheet", type: "Worksheet", book: "Gateway to English 2", level: "2BAC", unit: "Unit 3", link: "", sample: true },
    { title: "Three-question exit ticket: future forms", type: "Exit ticket", book: "Insight into English", level: "Common Core", unit: "Unit 2", link: "", sample: true },
    { title: "Picture prompt warm-ups (10 slides)", type: "Warm-up", book: "Visa to the World", level: "Common Core", unit: "Unit 4", link: "", sample: true },
    { title: "Vocabulary race: review game for a whole unit", type: "Review game", book: "Outlook", level: "1BAC", unit: "Unit 5", link: "", sample: true },
    { title: "Mid-term test with answer key and marking grid", type: "Assessment", book: "Ticket to English 2", level: "2BAC", unit: "Units 1 to 3", link: "", sample: true },
    { title: "Remedial pack: present perfect vs past simple", type: "Remedial work", book: "Al Massar", level: "1BAC", unit: "Unit 2", link: "", sample: true },
    { title: "Writing lesson: an informal email", type: "Lesson plan", book: "Gateway to English 1", level: "Common Core", unit: "Unit 6", link: "", sample: true }
  ],

  /* ---- Teaching Applicants (from the "Teaching Well" Drive) ---- */
  applicants: [
    { title: "Written exam preparation", desc: "Past topics, model answers and a revision plan for the written test.", link: "", sample: true },
    { title: "Oral interview", desc: "Common questions, how to structure an answer, and practice prompts.", link: "", sample: true },
    { title: "Teaching approaches in brief", desc: "CLT, task-based learning and the competency approach, one page each.", link: "", sample: true },
    { title: "Model lesson plans", desc: "Annotated plans for reading, writing, grammar and vocabulary lessons.", link: "", sample: true },
    { title: "Classroom management basics", desc: "Routines, instructions and checking understanding in large classes.", link: "", sample: true },
    { title: "Official documents", desc: "The guidelines and curriculum texts every candidate should know.", link: "", sample: true }
  ],

  /* ---- CRMEF Trainees (from the "CRMEF" Drive) ---- */
  crmef: [
    { title: "Practicum survival guide", desc: "What to prepare before, during and after each school visit.", link: "", sample: true },
    { title: "Observation grids", desc: "Ready-to-print grids for observing your mentor and your peers.", link: "", sample: true },
    { title: "Lesson planning templates", desc: "Editable templates that follow the training centre's format.", link: "", sample: true },
    { title: "Professional portfolio", desc: "Structure, sample entries and reflection prompts.", link: "", sample: true },
    { title: "Action research", desc: "Choosing a topic, collecting data and writing up your project.", link: "", sample: true },
    { title: "Final exam preparation", desc: "Topics, past papers and a revision checklist.", link: "", sample: true }
  ],

  /* ---- Audio tracks ----
     src: a direct link to an .mp3 (for example a file in this website's
     assets/audio folder: "assets/audio/unit1-track2.mp3").
     thumb: optional image path. If empty, a coloured tile is drawn. */
  audio: [
    { title: "Listening 1: A day at the souk", book: "Ticket to English 1", unit: "Unit 1", src: "", thumb: "", sample: true },
    { title: "Listening 2: Interview with a volunteer", book: "Gateway to English 2", unit: "Unit 4", src: "", thumb: "", sample: true },
    { title: "Listening 3: Talking about future plans", book: "Insight into English", unit: "Unit 2", src: "", thumb: "", sample: true },
    { title: "Listening 4: A phone call to a hotel", book: "Visa to the World", unit: "Unit 5", src: "", thumb: "", sample: true }
  ],

  /* ---- Forum: approved posts ----
     Only what you add here appears on the site. */
  forumPosts: [
    { title: "Debate speaking cards with useful phrases", type: "Worksheet", level: "2BAC", from: "A teacher in Fes", date: "2026-10-12", link: "", sample: true },
    { title: "Five-minute grammar warm-ups for the whole year", type: "Warm-up", level: "Common Core", from: "A teacher in Agadir", date: "2026-10-05", link: "", sample: true },
    { title: "Kahoot-style quiz on phrasal verbs", type: "Review game", level: "1BAC", from: "Anonymous", date: "2026-09-28", link: "", sample: true }
  ]
};
