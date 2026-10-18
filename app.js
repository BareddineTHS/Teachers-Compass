/* Teacher's Compass · site behaviour. Content lives in content.js. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function isSet(v) { return typeof v === "string" && v.trim() !== "" && v.indexOf("PASTE_") !== 0; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function bookColor(name) {
    var b = (S.books || []).filter(function (x) { return x.name === name; })[0];
    return b ? b.color : "#0E5361";
  }
  function openButton(link, label) {
    if (isSet(link)) {
      return '<a class="btn-small" href="' + esc(link) + '" target="_blank" rel="noopener">' + esc(label || "Open") + "</a>";
    }
    return '<span class="btn-small" aria-disabled="true" title="Link not added yet">Coming soon</span>';
  }
  var sampleBadge = function (item) { return item.sample ? ' <span class="badge-sample">Sample</span>' : ""; };

  /* ---------- Router: one page per #hash ---------- */
  var pages = $$(".page").map(function (p) { return p.getAttribute("data-page"); });
  function show() {
    var id = (location.hash || "#home").slice(1);
    if (pages.indexOf(id) === -1) id = "home";
    $$(".page").forEach(function (p) { p.hidden = p.getAttribute("data-page") !== id; });
    $$("[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === id) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    $("#nav").classList.remove("open");
    $("#menuBtn").setAttribute("aria-expanded", "false");
    window.scrollTo(0, 0);
    loadComments(id);
  }
  window.addEventListener("hashchange", show);
  $("#menuBtn").addEventListener("click", function () {
    var open = $("#nav").classList.toggle("open");
    this.setAttribute("aria-expanded", String(open));
  });

  /* ---------- Drive buttons ---------- */
  $$("[data-drive]").forEach(function (a) {
    var link = (S.drives || {})[a.getAttribute("data-drive")];
    if (isSet(link)) { a.href = link; a.target = "_blank"; a.rel = "noopener"; }
    else {
      a.setAttribute("aria-disabled", "true");
      a.textContent += " (link coming soon)";
      a.addEventListener("click", function (e) { e.preventDefault(); });
    }
  });

  /* ---------- Materials ---------- */
  function materialCard(m) {
    return '<article class="material">' +
      '<span class="material-bar" style="background:' + esc(bookColor(m.book)) + '"></span>' +
      '<div class="material-body">' +
        '<div class="meta"><span class="type">' + esc(m.type) + "</span>" + sampleBadge(m) + "</div>" +
        "<h3>" + esc(m.title) + "</h3>" +
        '<div class="meta"><span>' + esc(m.level) + "</span><span>" + esc(m.book) + "</span><span>" + esc(m.unit || "") + "</span></div>" +
      "</div>" + openButton(m.link) +
    "</article>";
  }

  var filter = { q: "", level: "", book: "", type: "" };
  function renderMaterials() {
    var q = filter.q.toLowerCase();
    var list = (S.materials || []).filter(function (m) {
      if (filter.level && m.level !== filter.level) return false;
      if (filter.book && m.book !== filter.book) return false;
      if (filter.type && m.type !== filter.type) return false;
      if (q && (m.title + " " + m.unit + " " + m.book + " " + m.type).toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
    $("#materialList").innerHTML = list.length ? list.map(materialCard).join("") :
      '<p class="empty">No materials match these filters yet. Try another level or textbook.</p>';
    $("#fCount").textContent = list.length + (list.length === 1 ? " material" : " materials");
  }

  (S.levels || []).forEach(function (l) { $("#fLevel").insertAdjacentHTML("beforeend", "<option>" + esc(l) + "</option>"); });
  (S.books || []).forEach(function (b) { $("#fBook").insertAdjacentHTML("beforeend", "<option>" + esc(b.name) + "</option>"); });
  $("#fTypes").innerHTML = ['<button class="chip" type="button" data-type="" aria-pressed="true">All types</button>']
    .concat((S.types || []).map(function (t) { return '<button class="chip" type="button" data-type="' + esc(t) + '" aria-pressed="false">' + esc(t) + "</button>"; })).join("");
  $("#fTypes").addEventListener("click", function (e) {
    var btn = e.target.closest(".chip"); if (!btn) return;
    filter.type = btn.getAttribute("data-type");
    $$(".chip", this).forEach(function (c) { c.setAttribute("aria-pressed", String(c === btn)); });
    renderMaterials();
  });
  $("#fSearch").addEventListener("input", function () { filter.q = this.value; renderMaterials(); });
  $("#fLevel").addEventListener("change", function () { filter.level = this.value; renderMaterials(); });
  $("#fBook").addEventListener("change", function () { filter.book = this.value; renderMaterials(); });
  renderMaterials();

  /* ---------- Home ---------- */
  $("#homeTypes").innerHTML = (S.types || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
  $("#homeRecent").innerHTML = (S.materials || []).slice(0, 6).map(materialCard).join("");
  $("#homeShelf").innerHTML = (S.books || []).map(function (b) {
    return '<button class="book" type="button" data-book="' + esc(b.name) + '" style="background:' + esc(b.color) + '">' +
      "<small>Textbook</small><span>" + esc(b.name) + "</span></button>";
  }).join("");
  $("#homeShelf").addEventListener("click", function (e) {
    var btn = e.target.closest(".book"); if (!btn) return;
    filter.book = btn.getAttribute("data-book");
    $("#fBook").value = filter.book;
    renderMaterials();
    location.hash = "#teachers";
  });

  /* ---------- Applicants and CRMEF ---------- */
  function resourceCard(r) {
    return '<article class="resource"><h3>' + esc(r.title) + sampleBadge(r) + "</h3><p>" + esc(r.desc) + "</p>" + openButton(r.link) + "</article>";
  }
  $("#applicantsList").innerHTML = (S.applicants || []).map(resourceCard).join("");
  $("#crmefList").innerHTML = (S.crmef || []).map(resourceCard).join("");

  var v = S.video || {};
  $("#videoTitle").textContent = v.title || "Lesson simulation";
  $("#videoNote").textContent = v.note || "";
  if (isSet(v.youtubeId)) {
    $("#videoFrame").innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(v.youtubeId) +
      '?rel=0" title="' + esc(v.title) + '" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  } else {
    $("#videoFrame").innerHTML = '<div class="video-placeholder"><div><span class="play" aria-hidden="true"></span>' +
      "<p>The video appears here once its YouTube ID is added.</p></div></div>";
  }

  /* ---------- Audio ---------- */
  function thumb(t, i) {
    if (isSet(t.thumb)) return '<span class="thumb"><img src="' + esc(t.thumb) + '" alt=""></span>';
    var c = bookColor(t.book);
    return '<span class="thumb" aria-hidden="true"><svg viewBox="0 0 76 76" width="100%" height="100%">' +
      '<rect width="76" height="76" fill="' + esc(c) + '"/>' +
      '<g fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"><rect x="22" y="22" width="32" height="32"/>' +
      '<rect x="22" y="22" width="32" height="32" transform="rotate(45 38 38)"/></g>' +
      '<text x="38" y="44" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="18" fill="#fff">' + String(i + 1).padStart(2, "0") + "</text></svg></span>";
  }
  $("#audioList").innerHTML = (S.audio || []).map(function (t, i) {
    var player = isSet(t.src) ? '<audio controls preload="none" src="' + esc(t.src) + '"></audio>' :
      '<p class="muted">Audio file not added yet.</p>';
    return '<article class="track">' + thumb(t, i) +
      '<div class="material-body"><h3>' + esc(t.title) + sampleBadge(t) + '</h3><div class="meta"><span>' + esc(t.book) + "</span><span>" + esc(t.unit) + "</span></div></div>" +
      '<div class="player">' + player + "</div></article>";
  }).join("");

  /* ---------- Forum ---------- */
  $("#forumList").innerHTML = (S.forumPosts || []).map(function (p) {
    return '<article class="post"><div class="meta"><span class="type">' + esc(p.type) + "</span><span>" + esc(p.level) + "</span>" + sampleBadge(p) + "</div>" +
      "<h3>" + esc(p.title) + "</h3>" +
      '<div class="meta"><span>' + esc(p.from || "Anonymous") + "</span><span>" + esc(p.date) + '</span><span class="approved">Approved</span></div>' +
      '<div>' + openButton(p.link) + "</div></article>";
  }).join("") || '<p class="empty">No posts yet. Be the first to share.</p>';
  (S.levels || []).forEach(function (l) { $("#ffLevel").insertAdjacentHTML("beforeend", "<option>" + esc(l) + "</option>"); });
  (S.types || []).forEach(function (t) { $("#ffType").insertAdjacentHTML("beforeend", "<option>" + esc(t) + "</option>"); });

  /* ---------- Forms ---------- */
  function wireForm(form, msgEl, endpoint, okText) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      msgEl.className = "form-msg";
      if (!form.checkValidity()) { msgEl.textContent = "Please fill in the required fields."; form.reportValidity(); return; }
      if (!isSet(endpoint)) {
        msgEl.className = "form-msg note";
        msgEl.textContent = "This form is not connected yet, so nothing was sent. It goes live once a form address is added in content.js.";
        return;
      }
      var data = {};
      new FormData(form).forEach(function (val, key) { data[key] = val; });
      msgEl.textContent = "Sending...";
      fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
        .then(function (r) {
          if (!r.ok) throw new Error();
          msgEl.className = "form-msg ok"; msgEl.textContent = okText; form.reset();
        })
        .catch(function () { msgEl.textContent = "The message could not be sent. Check your connection and try again."; });
    });
  }
  wireForm($("#forumForm"), $("#forumMsg"), (S.forum || {}).submitEndpoint, "Received. Your post will appear here after review.");
  wireForm($("#contactForm"), $("#contactMsg"), (S.contact || {}).formEndpoint, "Message sent. Thank you.");

  var email = (S.contact || {}).email;
  $("#contactEmail").textContent = isSet(email) ? email : "Email address coming soon";
  $("#copyEmail").hidden = !isSet(email);
  $("#copyEmail").addEventListener("click", function () {
    var btn = this;
    var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText(email).then(done, function () { selectText($("#contactEmail")); });
    else selectText($("#contactEmail"));
  });
  function selectText(el) { var r = document.createRange(); r.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(r); }

  /* ---------- Anonymous comments (Cusdis) ---------- */
  var appId = (S.comments || {}).cusdisAppId;
  $$("[data-comments]").forEach(function (block) {
    block.innerHTML = "<h2>Leave an anonymous comment</h2>" + (isSet(appId) ? "" :
      '<p class="form-msg note">Comments open soon. Every comment will be reviewed before it is shown.</p>');
  });
  function loadComments(pageId) {
    if (!isSet(appId)) return;
    var block = $('[data-comments="' + pageId + '"]'); if (!block) return;
    var old = $("#cusdis_thread"); if (old) old.remove();
    var el = document.createElement("div");
    el.id = "cusdis_thread";
    el.setAttribute("data-host", "https://cusdis.com");
    el.setAttribute("data-app-id", appId);
    el.setAttribute("data-page-id", pageId);
    el.setAttribute("data-page-url", location.href);
    el.setAttribute("data-page-title", "Teacher's Compass: " + pageId);
    block.appendChild(el);
    if (window.CUSDIS && window.CUSDIS.initial) { window.CUSDIS.initial(); return; }
    var s = document.createElement("script");
    s.src = "https://cusdis.com/js/cusdis.es.js"; s.async = true; s.defer = true;
    document.body.appendChild(s);
  }

  show();
})();
