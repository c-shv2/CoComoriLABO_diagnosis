const DATA = window.DIAGNOSIS_DATA;
const MAJORS = ["amiable", "driving", "expressive", "analytical"];
const MINORS = ["harmony", "performance", "expression", "observation"];
const SHARE_URL = "";
function characterShortName(name) {
  return String(name || "").split("／")[0];
}
function shareLead(type) {
  var line = String(type.oneLine || "").trim();
  return /子です。?$/.test(line) ? line.replace(/。?$/, "。") : line.replace(/。?$/, "子です。");
}
function shareText(type) {
  var lines = [
    "私のこころを守ってくれていた守護者は「" + characterShortName(type.name) + "」でした。",
    shareLead(type),
    "",
    "あなたの守護者とも出逢ってみよう！"
  ];
  if (SHARE_URL) lines.push(SHARE_URL);
  lines.push("#CoComoriLABO　#こころの守護者に出逢う旅");
  return lines.join("\n");
}
const ATTRIBUTE = {
  amiable: { label: "Amiable", jp: "アミアブル", color: "#8d9d69" },
  driving: { label: "Driving", jp: "ドライビング", color: "#d9635c" },
  expressive: { label: "Expressive", jp: "エクスプレッシブ", color: "#e3a849" },
  analytical: { label: "Analytical", jp: "アナリティカル", color: "#5b8fbd" }
};
const state = { page: "title", stage: 1, index: 0, majorScores: {}, minorScores: {}, major: null, result: null, filter: "all", history: [], optionOrders: {} };
const $ = function(selector) { return document.querySelector(selector); };
function esc(value) { return String(value == null ? "" : value).replace(/[&<>\"]/g, function(c) { return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
function setAccent(major) { document.documentElement.style.setProperty("--accent", (ATTRIBUTE[major] || ATTRIBUTE.amiable).color); }
function journeyClass() {
  if (state.page === "result") return "journey-result";
  if (state.page === "library") return "journey-library";
  if (state.page !== "question") return "journey-start";
  var step = state.stage === 1 ? state.index + 1 : 10 + state.index + 1;
  if (step <= 5) return "journey-deep";
  if (step <= 10) return "journey-mid";
  if (step <= 15) return "journey-light";
  return "journey-sun";
}
function createKomorebi() {
  var layer = $("#komorebi"); if (!layer) return; layer.innerHTML = "";
  for (var i = 0; i < 16; i++) { var beam = document.createElement("span"); beam.className = "komorebi-beam"; beam.style.left = Math.random() * 100 + "%"; beam.style.height = 120 + Math.random() * 220 + "px"; beam.style.animationDuration = 8 + Math.random() * 10 + "s"; beam.style.animationDelay = Math.random() * 8 + "s"; beam.style.setProperty("--angle", -18 + Math.random() * 36 + "deg"); layer.appendChild(beam); }
  for (var j = 0; j < 30; j++) { var dot = document.createElement("span"); dot.className = "komorebi-dot"; var size = 2 + Math.random() * 5; dot.style.width = size + "px"; dot.style.height = size + "px"; dot.style.left = Math.random() * 100 + "%"; dot.style.top = Math.random() * 100 + "%"; dot.style.animationDuration = 5 + Math.random() * 8 + "s"; dot.style.animationDelay = Math.random() * 6 + "s"; layer.appendChild(dot); }
}
function transitionTo(page) { var leaf = $("#leafTransition"); if (!leaf) { state.page = page; render(); return; } leaf.classList.add("show"); window.setTimeout(function() { state.page = page; render(); leaf.classList.remove("show"); }, 240); }
function startJourney() { state.stage = 1; state.index = 0; state.majorScores = {}; state.minorScores = {}; state.major = null; state.result = null; state.history = []; state.optionOrders = {}; transitionTo("question"); }
function resetJourney() { state.stage = 1; state.index = 0; state.majorScores = {}; state.minorScores = {}; state.major = null; state.result = null; state.history = []; state.optionOrders = {}; transitionTo("title"); }
function currentQuestion() { return state.stage === 1 ? DATA.stage1[state.index] : DATA.stage2ByMajor[state.major][state.index]; }
function shuffleOptions(options, key) {
  if (!state.optionOrders[key]) {
    var order = options.map(function(_, index) { return index; });
    for (var i = order.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = order[i]; order[i] = order[j]; order[j] = temp;
    }
    state.optionOrders[key] = order;
  }
  return state.optionOrders[key].map(function(index) { return options[index]; });
}
function winner(scores, order) { return order.reduce(function(best, key) { return !best || (scores[key] || 0) > (scores[best] || 0) ? key : best; }, null); }
function snapshot() { return { stage: state.stage, index: state.index, majorScores: Object.assign({}, state.majorScores), minorScores: Object.assign({}, state.minorScores), major: state.major, result: state.result, optionOrders: JSON.parse(JSON.stringify(state.optionOrders)) }; }
function choose(key) {
  state.history.push(snapshot());
  if (state.stage === 1) {
    state.majorScores[key] = (state.majorScores[key] || 0) + 1;
    if (state.index < DATA.stage1.length - 1) { state.index += 1; render(); return; }
    state.major = winner(state.majorScores, MAJORS); state.stage = 2; state.index = 0; setAccent(state.major); transitionTo("question"); return;
  }
  state.minorScores[key] = (state.minorScores[key] || 0) + 1;
  var stage2 = DATA.stage2ByMajor[state.major];
  if (state.index < stage2.length - 1) { state.index += 1; render(); return; }
  var minor = winner(state.minorScores, MINORS);
  state.result = DATA.types.find(function(type) { return type.major === state.major && type.minor === minor; });
  transitionTo("result");
}
function goBack() { var prev = state.history.pop(); if (!prev) return; Object.assign(state, prev); render(); }
function stripMarkdown(text) { return String(text || "").replace(/^#{2,3}\s*/gm, "").replace(/\*\*(.*?)\*\*/g, "$1").replace(/^>\s*/gm, "").replace(/^-\s*/gm, "・").trim(); }
function resultSections(text) {
  var raw = String(text || "").replace(/^##\s*.+$/m, "").replace(/^\*\*（[^\n]*×[^\n]*｜[^\n]*）\*\*\s*$/gm, "").trim();
  var parts = raw.split(/^###\s*/gm).map(function(part) { return part.trim(); }).filter(Boolean);
  return parts.map(function(part) {
    var lines = part.split(/\n/);
    var title = lines.shift().trim();
    var body = lines.join("\n").trim();
    return { title: title, body: body };
  });
}
function inlineFormat(text) {
  return esc(text).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}
function bodyToHtml(text) {
  var lines = String(text || "").split(/\n/);
  var html = "";
  var list = [];
  function flushList() {
    if (!list.length) return;
    html += '<ul class="result-list">' + list.map(function(item) { return '<li>' + inlineFormat(item) + '</li>'; }).join("") + '</ul>';
    list = [];
  }
  var para = [];
  function flushPara() {
    if (!para.length) return;
    html += '<p>' + inlineFormat(para.join("\n")).replace(/\n/g, "<br>") + '</p>';
    para = [];
  }
  lines.forEach(function(line) {
    var trimmed = line.trim();
    if (!trimmed) { flushPara(); flushList(); return; }
    if (trimmed.indexOf('>') === 0) { flushPara(); flushList(); html += '<blockquote>' + inlineFormat(trimmed.replace(/^>\s*/, "")) + '</blockquote>'; return; }
    if (trimmed.indexOf('- ') === 0) { flushPara(); list.push(trimmed.replace(/^-\s*/, "")); return; }
    flushList(); para.push(trimmed);
  });
  flushPara(); flushList();
  return html;
}
function resultBodyHtml(text) {
  return resultSections(text).map(function(section) {
    return '<section class="result-section"><h3>' + esc(section.title) + '</h3><div class="result-section-body">' + bodyToHtml(section.body) + '</div></section>';
  }).join("");
}
function guardianMessage(type) { var lines = stripMarkdown(type.fullText).split(/\n+/).map(function(line) { return line.trim(); }).filter(Boolean); return lines.find(function(line) { return line.indexOf("あなた") >= 0; }) || type.whenSafe || type.oneLine; }
function copyResult() {
  if (!state.result) return;
  var text = shareText(state.result);
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(function(){toast("シェア文をコピーしました");}, function(){toast("コピーできませんでした");}); else toast("コピーできませんでした");
}
function shareLine() {
  if (!state.result) return;
  var text = encodeURIComponent(shareText(state.result));
  window.open("https://social-plugins.line.me/lineit/share?text=" + text, "_blank", "noopener");
}
function shareX() {
  if (!state.result) return;
  var text = encodeURIComponent(shareText(state.result));
  window.open("https://twitter.com/intent/tweet?text=" + text, "_blank", "noopener");
}
function downloadImage() {
  if (!state.result) return;
  var index = DATA.types.findIndex(function(type) { return type.id === state.result.id; });
  var a = document.createElement("a");
  a.href = state.result.saveImage || (index >= 0 ? (index + 1) + ".png" : state.result.image);
  a.download = a.href.split("/").pop();
  a.click();
}
function toast(message) { var old = $(".toast"); if (old) old.remove(); var el = document.createElement("div"); el.className = "toast"; el.textContent = message; document.body.appendChild(el); requestAnimationFrame(function(){ el.classList.add("show"); }); window.setTimeout(function(){ el.remove(); }, 1800); }
function titleView() { return '<section class="page active page-title"><div class="title-card"><div class="title-eyebrow">CoComori LABO</div><h1 class="title-main"><span class="title-nowrap">こころの<em>守護者</em>に出逢う旅</span></h1><p class="title-sub">あなたを守ってきた子に出会う16タイプ性格診断</p><p class="title-cta-lead">あなたを守り続けてきた子に、会いにいこう</p><button class="btn-primary" data-action="intro">診断をはじめる</button></div></section>'; }
function introView() { return '<section class="page active page-intro"><div class="intro-container"><div class="intro-eyebrow">Before the Journey</div><h2 class="intro-title">旅の前に</h2><p class="intro-lead">この診断は、あなたの性格を決めつけるものではありません。これまであなたを守ってきた反応を、16人の守護者との出会いとして受け取るための小さな旅です。</p><div class="intro-stats"><div class="intro-stat"><strong>約5〜8分</strong><span>所要時間</span></div><div class="intro-stat"><strong>20問</strong><span>質問数</span></div><div class="intro-stat"><strong>16タイプ</strong><span>結果</span></div></div><div class="intro-notes"><div class="intro-note"><strong>正解・不正解はありません。</strong><br>今の自分に近いものを、直感で選んでください。</div><div class="intro-note"><strong>迷ったら、少しだけ近い方で大丈夫。</strong><br>診断結果は分類ではなく、あなたを守ってきた子に会うための入口です。</div><div class="intro-note"><strong>結果は持ち帰れます。</strong><br>画像保存、LINE、Xでの共有ができます。</div></div><div class="intro-actions"><button class="btn-primary" data-action="start">旅を始める</button></div></div></section>'; }
function questionView() {
  var q = currentQuestion();
  var step = state.stage === 1 ? state.index + 1 : 10 + state.index + 1;
  var progress = Math.round((step / 20) * 100);
  var stageLabel = state.stage === 1 ? "STAGE 1 - ふだんのあなた" : "STAGE 2 - 洋館の奥へ";
  var room = state.stage === 2 ? esc(q.room) + " / " + esc(q.theme) : esc(q.theme);
  var optionKey = state.stage + '-' + (state.stage === 1 ? 'main' : state.major) + '-' + state.index; var options = shuffleOptions(q.options, optionKey).map(function(option) { return '<button class="choice-btn" data-answer="' + esc(option.key) + '">' + esc(option.label) + '</button>'; }).join("");
  return '<section class="page active page-question"><div class="q-container q-container-text"><div class="q-header"><div class="q-stage-label">' + stageLabel + '</div><div class="q-progress"><div class="q-progress-bar" style="width:' + progress + '%"></div></div></div><div class="question-card question-card-text"><div class="question-copy"><div class="room-label">' + room + '</div><p class="q-count">' + step + ' / 20</p><h2 class="q-text">' + esc(q.question) + '</h2><div class="choices">' + options + '</div><div class="q-actions"><button class="btn-subtle" data-action="back" ' + (state.history.length ? "" : "disabled") + '>ひとつ戻る</button><button class="btn-subtle" data-action="reset">最初に戻る</button></div></div></div></div></section>';
}
function splitName(name) {
  var parts = String(name || "").split("／");
  return { main: parts[0] || name, sub: parts.slice(1).join("／") };
}
function reactionParts(trigger) {
  var lines = String(trigger || "").split(/\n/).map(function(line) { return line.trim(); }).filter(Boolean);
  return {
    feeling: lines[0] || "",
    emotion: lines[1] || "",
    action: lines.slice(2).join("・") || ""
  };
}
function resultView() {
  var type = state.result;
  var name = splitName(type.name);
  var reaction = reactionParts(type.trigger);
  return '<section class="page active page-result"><div class="result-wrap"><div class="result-eyebrow">Your Guardian</div><h2 class="result-name"><span class="result-name-main">' + esc(name.main) + '</span>' + (name.sub ? '<span class="result-name-sub">' + esc(name.sub) + '</span>' : '') + '</h2><p class="result-catchcopy">' + esc(type.oneLine) + '</p><div class="result-image-wrap"><img class="result-card-img" src="' + esc(type.image) + '" alt="' + esc(type.name) + '"></div><section class="result-flow"><article class="result-fear-block"><span>恐れ</span><p>' + esc(type.fear) + '</p></article><article class="result-reaction-block"><span>恐れを守ろうとしたときの反応</span><ol><li><em>気持ち</em><strong>' + esc(reaction.feeling) + '</strong></li><li><em>感情</em><strong>' + esc(reaction.emotion) + '</strong></li><li><em>行動</em><strong>' + esc(reaction.action) + '</strong></li></ol></article></section><section class="result-after-note"><article><h3>育ててきた力</h3><p>' + esc(type.strengths) + '</p></article><article><h3>安心できると</h3><p>' + esc(type.whenSafe) + '</p></article></section><article class="result-story"><div class="result-description">' + resultBodyHtml(type.fullText) + '</div></article><section class="share-section"><div class="share-label">結果を持ち帰る</div><div class="share-actions"><button class="btn-share" data-action="download">画像保存</button><button class="btn-share" data-action="line">LINE</button><button class="btn-share" data-action="x">X</button><button class="btn-share" data-action="copy">結果文コピー</button></div></section><section class="result-discovery"><div class="discovery-actions"><button class="btn-discovery" data-action="library"><strong>16人の守護者図鑑を見る</strong><span>ほかの子たちにも会いに行く</span></button><button class="btn-retry" data-action="restart">もう一度旅をする</button></div></section></div></section>';
}
function libraryView() { var filters = [{key:"all", label:"すべて"}].concat(MAJORS.map(function(key){ return {key:key, label:ATTRIBUTE[key].jp}; })); var types = state.filter === "all" ? DATA.types : DATA.types.filter(function(type){ return type.major === state.filter; }); var filterHtml = filters.map(function(filter){ return '<button class="guardian-filter-btn ' + (state.filter === filter.key ? "is-active" : "") + '" data-filter="' + filter.key + '">' + filter.label + '</button>'; }).join(""); var cards = types.map(function(type){ var current = state.result && state.result.id === type.id; return '<article class="guardian-card ' + (current ? "is-current" : "") + '"><img src="' + esc(type.image) + '" alt="' + esc(type.name) + '"><div class="guardian-card-body"><div class="guardian-card-group">' + esc(type.majorLabel) + ' × ' + esc(type.minorLabel) + '</div><h3 class="guardian-card-name">' + esc(type.name) + '</h3><p class="guardian-card-catch">' + esc(type.oneLine) + '</p>' + (current ? '<div class="guardian-current-badge">あなたの守護者</div>' : '') + '</div></article>'; }).join(""); return '<section class="page active page-guardians"><div class="guardian-container"><div class="guardian-head"><div class="intro-eyebrow">Guardian Library</div><h2 class="guardian-title">16人の守護者図鑑</h2><p class="guardian-lead">あなたの結果だけでなく、森にいるほかの守護者たちも覗いてみましょう。</p></div><div class="guardian-filter-row">' + filterHtml + '</div><div class="guardian-grid">' + cards + '</div><div class="guardian-actions"><button class="btn-primary" data-action="restart">もう一度診断する</button>' + (state.result ? '<button class="btn-subtle" data-action="result">結果へ戻る</button>' : '<button class="btn-subtle" data-action="title">タイトルへ戻る</button>') + '</div></div></section>'; }
function render() { setAccent(state.major || "amiable"); document.body.className = journeyClass(); var app = $("#app"); if (state.page === "title") app.innerHTML = titleView(); if (state.page === "intro") app.innerHTML = introView(); if (state.page === "question") app.innerHTML = questionView(); if (state.page === "result") app.innerHTML = resultView(); if (state.page === "library") app.innerHTML = libraryView(); bindEvents(); }
function bindEvents() { document.querySelectorAll("[data-action]").forEach(function(el){ el.addEventListener("click", function(){ var action = el.dataset.action; if (action === "intro") transitionTo("intro"); if (action === "start" || action === "restart") startJourney(); if (action === "reset") resetJourney(); if (action === "back") goBack(); if (action === "library") transitionTo("library"); if (action === "result") transitionTo("result"); if (action === "title") transitionTo("title"); if (action === "copy") copyResult(); if (action === "line") shareLine(); if (action === "x") shareX(); if (action === "download") downloadImage(); }); }); document.querySelectorAll("[data-answer]").forEach(function(el){ el.addEventListener("click", function(){ choose(el.dataset.answer); }); }); document.querySelectorAll("[data-filter]").forEach(function(el){ el.addEventListener("click", function(){ state.filter = el.dataset.filter; render(); }); }); }
createKomorebi(); render();
