const DATA = window.DIAGNOSIS_DATA;
const STAGE2_REVISIONS = {
  amiable: {
    2: { room: "③談話室", theme: "集団での立ち位置", question: "洋館の談話室に入ると、何人かのゴーストがそれぞれ自由に過ごしています。初めて会うゴーストばかりです。あなたはまず、どう過ごそうと思う？", labels: { harmony: "誰かひとりでいるゴーストがいたら、そばに行ってみようかな", performance: "何か手伝えることがないか見てみよう", expression: "話しやすそうなゴーストに声をかけてみたい", observation: "まずは少し離れたところから、みんなの様子を見ていよう" } },
    6: { room: "⑦舞踏会", theme: "社会で使う自分", question: "今夜、洋館では小さな舞踏会が開かれます。たくさんのゴーストが集まる中、あなたはどんなふうに振る舞っていると一番安心できそう？", labels: { harmony: "相手が安心できるように、やわらかく接していたい", performance: "頼られたときに、ちゃんと応えられる自分でいたい", expression: "明るく親しみやすく、楽しい雰囲気でいたい", observation: "無理に目立たず、相手の様子を見ながら過ごしたい" } }
  },
  driving: {
    2: { room: "③談話室", theme: "集団での立ち位置", question: "洋館の談話室に入ると、何人かのゴーストがそれぞれ自由に過ごしています。初めて会うゴーストばかりです。あなたはまず、どう過ごそうと思う？", labels: { harmony: "みんなが過ごしやすそうか、少し気にしておこう", performance: "必要なら、自分から声をかけて場を動かそう", expression: "せっかくだし、楽しい雰囲気を作ってみたい", observation: "まず誰がどんなふうに過ごしているのか把握しよう" } },
    6: { room: "⑦舞踏会", theme: "社会で使う自分", question: "今夜、洋館では小さな舞踏会が開かれます。たくさんのゴーストが集まる中、あなたはどんなふうに振る舞っていると一番安心できそう？", labels: { harmony: "みんなが居心地よく過ごせるように気を配りたい", performance: "必要なら自分が場をまとめる側でいたい", expression: "堂々と振る舞って、場に存在感を出したい", observation: "感情に流されず、冷静に状況を見ていたい" } }
  },
  expressive: {
    2: { room: "③談話室", theme: "集団での立ち位置", question: "洋館の談話室に入ると、何人かのゴーストがそれぞれ自由に過ごしています。初めて会うゴーストばかりです。あなたはまず、どう過ごそうと思う？", labels: { harmony: "誰かと自然に仲良くなれたらいいな", performance: "自分から話題を出して、輪に入ってみよう", expression: "なんだか気になるゴーストのところへ行ってみたい", observation: "どんなゴーストたちなのか、少し眺めていたい" } },
    6: { room: "⑦舞踏会", theme: "社会で使う自分", question: "今夜、洋館では小さな舞踏会が開かれます。たくさんのゴーストが集まる中、あなたはどんなふうに振る舞っていると一番安心できそう？", labels: { harmony: "周りの人が楽しくいられるように振る舞いたい", performance: "自分から声をかけて、場を動かしてみたい", expression: "自分らしさを隠さず、自由に振る舞いたい", observation: "無理に輪に入らず、気になる人や場を眺めていたい" } }
  },
  analytical: {
    2: { room: "③談話室", theme: "集団での立ち位置", question: "洋館の談話室に入ると、何人かのゴーストがそれぞれ自由に過ごしています。初めて会うゴーストばかりです。あなたはまず、どう過ごそうと思う？", labels: { harmony: "邪魔にならないところで、話しかけられたら応じよう", performance: "何か必要なことがありそうなら、自分から動こう", expression: "面白そうな話をしているところがあれば混ざってみたい", observation: "まずこの場所の雰囲気や、みんなの距離感を見ておこう" } },
    6: { room: "⑦舞踏会", theme: "社会で使う自分", question: "今夜、洋館では小さな舞踏会が開かれます。たくさんのゴーストが集まる中、あなたはどんなふうに振る舞っていると一番安心できそう？", labels: { harmony: "話しかけられたら、安心して話せる相手でいたい", performance: "役割が必要なら、きちんと引き受けたい", expression: "自分なりの考えや個性は自然に出していたい", observation: "必要以上に自分を見せず、静かに様子を見ていたい" } }
  }
};
Object.keys(STAGE2_REVISIONS).forEach(function(major) {
  Object.keys(STAGE2_REVISIONS[major]).forEach(function(index) {
    var revision = STAGE2_REVISIONS[major][index];
    var question = DATA.stage2ByMajor[major][Number(index)];
    question.room = revision.room;
    question.theme = revision.theme;
    question.question = revision.question;
    question.options.forEach(function(option) { option.label = revision.labels[option.key]; });
  });
});
const MAJORS = ["amiable", "driving", "expressive", "analytical"];
const MINORS = ["harmony", "performance", "expression", "observation"];
const MAJOR_TIEBREAKER = {
  theme: "ふたつの気配のあいだで",
  question: "洋館で開かれる予定だった催しが、直前になって中止になりました。集まったゴーストたちは、これからどうしようかと戸惑っています。あなたが最初に気になるのは？",
  options: {
    amiable: "みんな、がっかりしたり居心地が悪くなったりしていないかな。",
    driving: "このあとの過ごし方を、早めに決めた方がよさそう。",
    expressive: "せっかく集まったんだから、別の楽しいことができないかな。",
    analytical: "どうして中止になったのか、まず状況を確認したい。"
  }
};
const MINOR_TIEBREAKERS = {
  amiable: { question: "談話室では、何人かのゴーストが楽しそうに話しています。少し離れたところに、輪に入れずにいるゴーストが一人います。あなたが最初にしたいと思うのは？", options: { harmony: "まずそばに行って、安心していられるようにしたい。", performance: "その子が輪に入りやすくなるよう、できることを探したい。", expression: "明るく声をかけて、自然に会話へ招き入れたい。", observation: "その子が本当に輪に入りたいのか、少し様子を見たい。" } },
  driving: { question: "ゴーストたちと森を進んでいると、大きな倒木が道を塞いでいました。みんなが足を止める中、あなたが最初にしようと思うのは？", options: { harmony: "みんなの意見を聞いて、納得できる進み方を決めたい。", performance: "自分が先頭に立って、道を開く方法を試したい。", expression: "別の面白い進み方を提案して、みんなの気持ちを上げたい。", observation: "倒木や周囲を調べて、一番安全で確実な道を見つけたい。" } },
  expressive: { question: "舞踏会の会場に、まだ何も用意されていない小さな舞台があります。「自由に使っていいよ」と言われたとき、最初に心が向くのは？", options: { harmony: "みんなが一緒に楽しめる時間にしたい。", performance: "自分が何かを披露して、舞台を盛り上げたい。", expression: "今ここでしかできない、自分らしいものを表現したい。", observation: "会場の雰囲気を眺めながら、どんな舞台が合うか考えたい。" } },
  analytical: { question: "洋館の書斎で、同じ場所を描いた二枚の地図を見つけました。しかし、描かれている道が少しずつ違います。あなたが最初にしたいと思うのは？", options: { harmony: "みんなが迷わないよう、分かったことを共有しながら確かめたい。", performance: "二枚の違いを整理して、使える地図にまとめたい。", expression: "どちらにもない、新しい道の可能性を考えてみたい。", observation: "細部を見比べて、なぜ違いが生まれたのか突き止めたい。" } }
};
const SHARE_URL = "https://cocomori-labo-diagnosis.pages.dev/";
const RESPONSE_ENDPOINT = "https://script.google.com/macros/s/AKfycbw5clTA3quYP8kf4ATSyyrN270I8rWE5IFuEkiJPLggWdT60sEfsKJj5P-3XVQRuWAb1w/exec";
const DIAGNOSIS_VERSION = "2026-09-04";
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
const state = { page: "title", stage: 1, index: 0, majorScores: {}, minorScores: {}, major: null, result: null, filter: "all", history: [], optionOrders: {}, tieBreak: null, tieResolutions: {}, answers: { stage1: [], stage2: [] }, submissionId: null, responseSubmitted: false };
const $ = function(selector) { return document.querySelector(selector); };
function esc(value) { return String(value == null ? "" : value).replace(/[&<>\"]/g, function(c) { return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
function setAccent(major) { document.documentElement.style.setProperty("--accent", (ATTRIBUTE[major] || ATTRIBUTE.amiable).color); }
function journeyClass() {
  if (state.page === "result") return "journey-result";
  if (state.page === "library") return "journey-library";
  if (state.page === "threshold") return "journey-threshold";
  if (state.page === "tiebreak") return "journey-tiebreak";
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
function newSubmissionId() { return window.crypto && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + "-" + Math.random().toString(36).slice(2); }
function clearJourneyState() { state.stage = 1; state.index = 0; state.majorScores = {}; state.minorScores = {}; state.major = null; state.result = null; state.history = []; state.optionOrders = {}; state.tieBreak = null; state.tieResolutions = {}; state.answers = { stage1: [], stage2: [] }; state.submissionId = newSubmissionId(); state.responseSubmitted = false; }
function startJourney() { clearJourneyState(); transitionTo("question"); }
function resetJourney() { clearJourneyState(); transitionTo("title"); }
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
function topCandidates(scores, order) { var max = Math.max.apply(null, order.map(function(key) { return scores[key] || 0; })); return order.filter(function(key) { return (scores[key] || 0) === max; }); }
function snapshot() { return { stage: state.stage, index: state.index, majorScores: Object.assign({}, state.majorScores), minorScores: Object.assign({}, state.minorScores), major: state.major, result: state.result, optionOrders: JSON.parse(JSON.stringify(state.optionOrders)), tieBreak: state.tieBreak ? JSON.parse(JSON.stringify(state.tieBreak)) : null, tieResolutions: JSON.parse(JSON.stringify(state.tieResolutions)), answers: JSON.parse(JSON.stringify(state.answers)), submissionId: state.submissionId, responseSubmitted: state.responseSubmitted }; }
function finalizeResult(minor) {
  state.result = DATA.types.find(function(type) { return type.major === state.major && type.minor === minor; });
  saveDiagnosisResponse();
  transitionTo("result");
}
function choose(key) {
  state.history.push(snapshot());
  if (state.stage === 1) {
    state.answers.stage1[state.index] = key;
    state.majorScores[key] = (state.majorScores[key] || 0) + 1;
    if (state.index < DATA.stage1.length - 1) { state.index += 1; render(); return; }
    var majorCandidates = topCandidates(state.majorScores, MAJORS);
    if (majorCandidates.length > 1) { state.tieBreak = { phase: "major", candidates: majorCandidates }; transitionTo("tiebreak"); return; }
    state.major = majorCandidates[0]; state.stage = 2; state.index = 0; setAccent(state.major); transitionTo("threshold"); return;
  }
  state.answers.stage2[state.index] = key;
  state.minorScores[key] = (state.minorScores[key] || 0) + 1;
  var stage2 = DATA.stage2ByMajor[state.major];
  if (state.index < stage2.length - 1) { state.index += 1; render(); return; }
  var minorCandidates = topCandidates(state.minorScores, MINORS);
  if (minorCandidates.length > 1) { state.tieBreak = { phase: "minor", candidates: minorCandidates }; transitionTo("tiebreak"); return; }
  var minor = minorCandidates[0];
  finalizeResult(minor);
}
function resolveTie(key) {
  if (!state.tieBreak || state.tieBreak.candidates.indexOf(key) < 0) return;
  var phase = state.tieBreak.phase;
  state.tieResolutions[phase] = { candidates: state.tieBreak.candidates.slice(), selected: key };
  state.tieBreak = null;
  if (phase === "major") { state.major = key; state.stage = 2; state.index = 0; setAccent(key); transitionTo("threshold"); return; }
  finalizeResult(key);
}
function responsePayload() {
  var majorTie = state.tieResolutions.major || {};
  var minorTie = state.tieResolutions.minor || {};
  return {
    submissionId: state.submissionId,
    version: DIAGNOSIS_VERSION,
    stage1Answers: state.answers.stage1.slice(0, 10),
    majorScores: MAJORS.map(function(key) { return state.majorScores[key] || 0; }),
    majorTieCandidates: majorTie.candidates || [],
    majorTieAnswer: majorTie.selected || "",
    major: state.major,
    stage2Answers: state.answers.stage2.slice(0, 10),
    minorScores: MINORS.map(function(key) { return state.minorScores[key] || 0; }),
    minorTieCandidates: minorTie.candidates || [],
    minorTieAnswer: minorTie.selected || "",
    resultId: state.result ? state.result.id : "",
    resultName: state.result ? splitName(state.result.name).main : ""
  };
}
function saveDiagnosisResponse() {
  if (!RESPONSE_ENDPOINT || state.responseSubmitted || !state.result) return;
  state.responseSubmitted = true;
  var body = JSON.stringify(responsePayload());
  if (navigator.sendBeacon) {
    navigator.sendBeacon(RESPONSE_ENDPOINT, new Blob([body], { type: "text/plain;charset=UTF-8" }));
    return;
  }
  fetch(RESPONSE_ENDPOINT, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=UTF-8" }, body: body, keepalive: true }).catch(function() {});
}
function goBack() { var prev = state.history.pop(); if (!prev) return; var fromInterlude = state.page === "threshold" || state.page === "tiebreak"; Object.assign(state, prev); if (fromInterlude) state.page = "question"; render(); }
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
function titleView() { return '<section class="page active page-title"><div class="title-card"><div class="title-eyebrow">CoComori LABO</div><h1 class="title-main"><span class="title-nowrap">こころの<em>守護者</em>に出逢う旅</span></h1><p class="title-sub">あなたを守ってきた子に出会う16タイプ性格診断</p><p class="title-cta-lead">あなたを守り続けてきた子に、会いにいこう</p><div class="title-actions"><button class="btn-primary" data-action="intro">診断をはじめる</button><button class="btn-library-entry" data-action="library"><strong>16人の守護者図鑑を見る</strong><span>旅の前に、森にいる子たちをのぞく</span></button></div></div></section>'; }
function introView() { return '<section class="page active page-intro"><div class="intro-container"><div class="intro-eyebrow">Before the Journey</div><h2 class="intro-title">旅の前に</h2><p class="intro-lead">この診断は、あなたの性格を決めつけるものではありません。これまであなたを守ってきた反応を、16人の守護者との出会いとして受け取るための小さな旅です。</p><div class="intro-stats"><div class="intro-stat"><strong>約5〜8分</strong><span>所要時間</span></div><div class="intro-stat"><strong>20問</strong><span>質問数</span></div><div class="intro-stat"><strong>16タイプ</strong><span>結果</span></div></div><div class="intro-notes"><div class="intro-note"><strong>正解・不正解はありません。</strong><br>今の自分に近いものを、直感で選んでください。</div><div class="intro-note"><strong>迷ったら、少しだけ近い方で大丈夫。</strong><br>診断結果は分類ではなく、あなたを守ってきた子に会うための入口です。</div><div class="intro-note"><strong>結果は持ち帰れます。</strong><br>画像保存、LINE、Xでの共有ができます。</div><div class="intro-note"><strong>回答は匿名で記録されます。</strong><br>診断の改善に使い、氏名・連絡先など個人を特定する情報は収集しません。</div></div><div class="intro-actions"><button class="btn-primary" data-action="start">旅を始める</button></div></div></section>'; }
function questionView() {
  var q = currentQuestion();
  var step = state.stage === 1 ? state.index + 1 : 10 + state.index + 1;
  var progress = Math.round((step / 20) * 100);
  var stageLabel = state.stage === 1 ? "STAGE 1 - ふだんのあなた" : "STAGE 2 - 洋館の奥へ";
  var room = state.stage === 2 ? esc(q.room) + " / " + esc(q.theme) : esc(q.theme);
  var optionKey = state.stage + '-' + (state.stage === 1 ? 'main' : state.major) + '-' + state.index; var options = shuffleOptions(q.options, optionKey).map(function(option) { return '<button class="choice-btn" data-answer="' + esc(option.key) + '">' + esc(option.label) + '</button>'; }).join("");
  return '<section class="page active page-question"><div class="q-container q-container-text"><div class="q-header"><div class="q-stage-label">' + stageLabel + '</div><div class="q-progress"><div class="q-progress-bar" style="width:' + progress + '%"></div></div></div><div class="question-card question-card-text"><div class="question-copy"><div class="room-label">' + room + '</div><p class="q-count">' + step + ' / 20</p><h2 class="q-text">' + esc(q.question) + '</h2><div class="choices">' + options + '</div><div class="q-actions"><button class="btn-subtle" data-action="back" ' + (state.history.length ? "" : "disabled") + '>ひとつ戻る</button><button class="btn-subtle" data-action="reset">最初に戻る</button></div></div></div></div></section>';
}
function tieBreakView() {
  var tie = state.tieBreak;
  var isMajor = tie && tie.phase === "major";
  var question = isMajor ? MAJOR_TIEBREAKER : MINOR_TIEBREAKERS[state.major];
  var intro = tie.candidates.length === 2 ? "ふたつの気配が、同じくらい近くにあります。" : "いくつかの気配が、同じくらい近くにあります。";
  var options = tie.candidates.map(function(key) { return { key: key, label: question.options[key] }; });
  var optionKey = "tiebreak-" + tie.phase + "-" + (state.major || "major") + "-" + tie.candidates.join("-");
  var optionHtml = shuffleOptions(options, optionKey).map(function(option) { return '<button class="choice-btn tiebreak-choice" data-tiebreak-answer="' + esc(option.key) + '">' + esc(option.label) + '</button>'; }).join("");
  return '<section class="page active page-tiebreak"><div class="tiebreak-container"><div class="tiebreak-eyebrow">BETWEEN THE PATHS</div><p class="tiebreak-whisper">' + esc(intro) + '</p><h2 class="tiebreak-title">もうひとつだけ、<br>今のあなたの心に聞いてみましょう。</h2><div class="tiebreak-card"><div class="room-label">追加の問い</div><h3>' + esc(question.question) + '</h3><div class="choices">' + optionHtml + '</div><div class="q-actions"><button class="btn-subtle" data-action="back">ひとつ戻る</button><button class="btn-subtle" data-action="reset">最初に戻る</button></div></div></div></section>';
}
function thresholdView() {
  return '<section class="page active page-threshold"><div class="threshold-wrap"><div class="threshold-eyebrow">BETWEEN THE PATHS</div><div class="guardian-presence" aria-hidden="true"><span class="guardian-glow"></span><span class="guardian-silhouette"><i></i></span><span class="guardian-trail guardian-trail-one"></span><span class="guardian-trail guardian-trail-two"></span><span class="guardian-trail guardian-trail-three"></span></div><p class="threshold-whisper">……かすかに、誰かの気配がする。</p><h2 class="threshold-title">あなたを見守ってきた子が、<br>この先で待っているようです。</h2><p class="threshold-copy">まだ姿はよく見えません。<br>もう少しだけ、こころの奥へ進んでみましょう。</p><div class="threshold-actions"><button class="btn-primary" data-action="continue-stage2">気配をたどる</button><button class="btn-subtle" data-action="back">ひとつ戻る</button></div></div></section>';
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
const MAJOR_INSIGHT = {
  amiable: { short: "つながり", reason: "つながりや居場所" },
  driving: { short: "前へ進める", reason: "物事を前へ進めること" },
  expressive: { short: "自分らしさ", reason: "自分らしく表現すること" },
  analytical: { short: "理解・確認", reason: "状況を理解し、確かめること" }
};
const MINOR_INSIGHT = {
  harmony: { short: "調和を保つ", reason: "周囲との調和を保つ" },
  performance: { short: "役に立つ", reason: "自分が役に立つ" },
  expression: { short: "表現する", reason: "気持ちや個性を表現する" },
  observation: { short: "よく観る", reason: "周囲をよく観察する" }
};
function rankedScores(scores, order) {
  return order.map(function(key, index) { return { key: key, score: scores[key] || 0, order: index }; }).sort(function(a, b) { return b.score - a.score || a.order - b.order; });
}
function scoreRows(scores, order, labels, total, preferred) {
  var ranked = rankedScores(scores, order);
  ranked.sort(function(a, b) { if (a.score !== b.score) return b.score - a.score; if (a.key === preferred) return -1; if (b.key === preferred) return 1; return a.order - b.order; });
  var top = Math.max(1, ranked[0].score);
  return ranked.map(function(item, index) {
    var rowClass = index === 0 ? "is-first" : (index === 1 ? "is-near" : "is-muted");
    return '<div class="result-score-row ' + rowClass + '"><span>' + esc(labels[item.key].short) + '</span><div class="result-score-track"><i style="width:' + Math.round((item.score / top) * 100) + '%"></i></div><strong>' + item.score + '<small>/' + total + '</small></strong></div>';
  }).join("");
}
function resultReasonView(type) {
  var minorRanked = rankedScores(state.minorScores, MINORS);
  var nearMinor = minorRanked.find(function(item) { return item.key !== type.minor; });
  var nearType = nearMinor && DATA.types.find(function(item) { return item.major === type.major && item.minor === nearMinor.key; });
  var nearCopy = nearType ? '<div class="result-near-guardian"><i aria-hidden="true"></i><span>「' + esc(MINOR_INSIGHT[nearMinor.key].short) + '」傾向も近く、<strong>' + esc(splitName(nearType.name).main) + '</strong>の気配もありました。</span></div>' : "";
  var resolved = state.tieResolutions.major || state.tieResolutions.minor;
  var resolutionCopy = resolved ? '<p class="result-tie-resolution">同じくらい近い傾向があったため、最後の追加の問いへの回答から、今回の守護者を選びました。</p>' : "";
  var reasonText = esc(MAJOR_INSIGHT[type.major].reason) + 'を大切にしながら、' + esc(MINOR_INSIGHT[type.minor].reason) + 'ことで守ろうとする傾向が、今回の回答に現れていました。';
  return '<section class="result-reason" aria-labelledby="result-reason-title"><div class="result-reason-eyebrow">今回の守護者が現れた理由</div><h3 id="result-reason-title">あなたの中にある、ふたつの傾向</h3><p class="result-reason-lead">ひとつに決めつけるのではなく、今回よく現れた心の動きを示しています。</p><div class="result-reason-path"><section class="result-score-stage"><header><strong>大切にしていたもの</strong><span>前半10問</span></header>' + scoreRows(state.majorScores, MAJORS, MAJOR_INSIGHT, DATA.stage1.length, type.major) + '</section><div class="result-reason-symbol" aria-hidden="true">＋</div><section class="result-score-stage"><header><strong>よく使っていた守り方</strong><span>後半10問</span></header>' + scoreRows(state.minorScores, MINORS, MINOR_INSIGHT, DATA.stage2ByMajor[state.major].length, type.minor) + '</section><div class="result-reason-symbol" aria-hidden="true">→</div><section class="result-reason-guardian"><span>今回、いちばん近くにいた守護者</span><strong>' + esc(splitName(type.name).main) + '</strong></section></div><div class="result-reason-copy"><strong>なぜ' + esc(splitName(type.name).main) + 'になったの？</strong><p>' + reasonText + '</p>' + resolutionCopy + nearCopy + '</div><p class="result-reason-note">※ 点数はあなたの価値や強さではなく、今回選んだ回答の重なりです。</p></section>';
}
function resultView() {
  var type = state.result;
  var name = splitName(type.name);
  var reaction = reactionParts(type.trigger);
  return '<section class="page active page-result"><div class="result-wrap"><div class="result-eyebrow">Your Guardian</div><h2 class="result-name"><span class="result-name-main">' + esc(name.main) + '</span>' + (name.sub ? '<span class="result-name-sub">' + esc(name.sub) + '</span>' : '') + '</h2><p class="result-catchcopy">' + esc(type.oneLine) + '</p><div class="result-image-wrap"><img class="result-card-img" src="' + esc(type.image) + '" alt="' + esc(type.name) + '"></div>' + resultReasonView(type) + '<section class="result-flow"><article class="result-fear-block"><span>恐れ</span><p>' + esc(type.fear) + '</p></article><article class="result-reaction-block"><span>恐れを守ろうとしたときの反応</span><ol><li><em>気持ち</em><strong>' + esc(reaction.feeling) + '</strong></li><li><em>感情</em><strong>' + esc(reaction.emotion) + '</strong></li><li><em>行動</em><strong>' + esc(reaction.action) + '</strong></li></ol></article></section><section class="result-after-note"><article><h3>育ててきた力</h3><p>' + esc(type.strengths) + '</p></article><article><h3>安心できると</h3><p>' + esc(type.whenSafe) + '</p></article></section><article class="result-story"><div class="result-description">' + resultBodyHtml(type.fullText) + '</div></article><section class="share-section"><div class="share-label">結果を持ち帰る</div><div class="share-actions"><button class="btn-share" data-action="download">画像保存</button><button class="btn-share" data-action="line">LINE</button><button class="btn-share" data-action="x">X</button><button class="btn-share" data-action="copy">結果文コピー</button></div></section><section class="result-discovery"><div class="discovery-actions"><button class="btn-discovery" data-action="library"><strong>16人の守護者図鑑を見る</strong><span>ほかの子たちにも会いに行く</span></button><button class="btn-retry" data-action="restart">もう一度旅をする</button></div></section></div></section>';
}
function libraryView() { var filters = [{key:"all", label:"すべて"}].concat(MAJORS.map(function(key){ return {key:key, label:ATTRIBUTE[key].jp}; })); var types = state.filter === "all" ? DATA.types : DATA.types.filter(function(type){ return type.major === state.filter; }); var filterHtml = filters.map(function(filter){ return '<button class="guardian-filter-btn ' + (state.filter === filter.key ? "is-active" : "") + '" data-filter="' + filter.key + '">' + filter.label + '</button>'; }).join(""); var cards = types.map(function(type){ var current = state.result && state.result.id === type.id; return '<article class="guardian-card ' + (current ? "is-current" : "") + '"><button class="guardian-card-open" data-guardian="' + esc(type.id) + '" aria-haspopup="dialog" aria-label="' + esc(type.name) + 'の紹介を読む"></button><img src="' + esc(type.image) + '" alt="' + esc(type.name) + '"><div class="guardian-card-body"><div class="guardian-card-group">' + esc(type.majorLabel) + ' × ' + esc(type.minorLabel) + '</div><h3 class="guardian-card-name">' + esc(type.name) + '</h3><p class="guardian-card-catch">' + esc(type.oneLine) + '</p><span class="guardian-card-more">この子を知る <span aria-hidden="true">→</span></span>' + (current ? '<div class="guardian-current-badge">あなたの守護者</div>' : '') + '</div></article>'; }).join(""); return '<section class="page active page-guardians"><div class="guardian-container"><div class="guardian-head"><div class="intro-eyebrow">Guardian Library</div><h2 class="guardian-title">16人の守護者図鑑</h2><p class="guardian-lead">気になる子をタップして、性格や大切にしているものを覗いてみましょう。</p></div><div class="guardian-filter-row">' + filterHtml + '</div><div class="guardian-grid">' + cards + '</div><div class="guardian-actions"><button class="btn-primary" data-action="restart">もう一度診断する</button>' + (state.result ? '<button class="btn-subtle" data-action="result">結果へ戻る</button>' : '<button class="btn-subtle" data-action="title">タイトルへ戻る</button>') + '</div></div></section>'; }
function openGuardian(id, opener) {
  var type = DATA.types.find(function(item) { return item.id === id; });
  if (!type || document.querySelector('.guardian-dialog')) return;
  var name = splitName(type.name);
  var reaction = reactionParts(type.trigger);
  var dialog = document.createElement('dialog');
  dialog.className = 'guardian-dialog';
  dialog.setAttribute('aria-labelledby', 'guardian-detail-name');
  dialog.innerHTML = '<div class="guardian-dialog-toolbar"><button class="guardian-dialog-close" autofocus aria-label="紹介を閉じて図鑑に戻る">閉じる ×</button></div>' +
    '<div class="guardian-detail"><header class="guardian-detail-header"><img src="' + esc(type.image) + '" alt="' + esc(type.name) + '"><div><p class="guardian-detail-group">' + esc(type.majorLabel) + ' × ' + esc(type.minorLabel) + '</p><h2 id="guardian-detail-name">' + esc(name.main) + '</h2><p class="guardian-detail-sub">' + esc(name.sub) + '</p><p>' + esc(type.oneLine) + '</p>' + (state.result && state.result.id === type.id ? '<div class="guardian-current-badge">あなたの守護者</div>' : '') + '</div></header>' +
    '<div class="guardian-detail-sections"><section><h3>どんな性格？</h3><p>' + esc(type.traits) + '</p></section>' +
    '<section><h3>大切にしていること</h3><p>' + esc(MAJOR_INSIGHT[type.major].reason) + 'を大切にしながら、' + esc(MINOR_INSIGHT[type.minor].reason) + 'ことで心を守ろうとします。</p></section>' +
    '<section class="guardian-detail-reaction"><h3>不安になったとき</h3><p class="guardian-detail-fear">感じやすい恐れ：' + esc(type.fear) + '</p><dl><dt>浮かぶ気持ち</dt><dd>' + esc(reaction.feeling) + '</dd><dt>感じること</dt><dd>' + esc(reaction.emotion) + '</dd><dt>とりやすい行動</dt><dd>' + esc(reaction.action) + '</dd></dl></section>' +
    '<section><h3>得意なこと・育ててきた力</h3><p>' + esc(type.strengths) + '</p></section>' +
    '<section><h3>安心できると</h3><p>' + esc(type.whenSafe) + '</p></section></div><p class="guardian-detail-keywords">' + esc(type.keywords) + '</p></div>';
  document.body.appendChild(dialog);
  var previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  dialog.addEventListener('close', function() {
    document.body.style.overflow = previousOverflow;
    dialog.remove();
    if (opener && opener.isConnected) opener.focus({ preventScroll: true });
  }, { once: true });
  dialog.querySelector('.guardian-dialog-close').addEventListener('click', function() { dialog.close(); });
  dialog.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      dialog.querySelector('.guardian-dialog-close').focus({ preventScroll: true });
    }
  });
  dialog.addEventListener('click', function(event) {
    var rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.showModal();
}
function surveyInvitation() { return '<aside class="survey-invitation" aria-labelledby="survey-title"><div class="survey-eyebrow">あなたの声を聞かせてください</div><h3 id="survey-title">この診断はいかがでしたか？</h3><p>これからの体験をより良くするため、短いアンケートにご協力いただけるとうれしいです。</p><a class="btn-survey" href="https://forms.gle/TaA3ACcRrwcMb1DW8" target="_blank" rel="noopener noreferrer">アンケートに回答する<span>別のページで開きます</span></a></aside>'; }
function lineInvitation() { return '<aside class="line-invitation" aria-labelledby="line-title"><div class="line-invitation-mark" aria-hidden="true">✉</div><div class="line-invitation-copy"><div class="line-eyebrow">診断の、その先へ</div><h3 id="line-title">あなたの守護者から、手紙が届きます</h3><p>守護者の想いを知り、自分のこころと向き合うためのワークをLINEで受け取れます。</p><a class="btn-line-journey" href="https://lin.ee/5EvIPKV" target="_blank" rel="noopener noreferrer"><strong>LINEで手紙を受け取る</strong><span>守護者の想いを知りにいく</span></a></div></aside>'; }
function render() { setAccent(state.major || "amiable"); document.body.className = journeyClass(); var app = $("#app"); if (state.page === "title") app.innerHTML = titleView(); if (state.page === "intro") app.innerHTML = introView(); if (state.page === "threshold") app.innerHTML = thresholdView(); if (state.page === "tiebreak") app.innerHTML = tieBreakView(); if (state.page === "question") app.innerHTML = questionView(); if (state.page === "result") { app.innerHTML = resultView(); var story = app.querySelector(".result-story"); if (story) story.insertAdjacentHTML("afterend", lineInvitation()); var discovery = app.querySelector(".result-discovery"); if (discovery) discovery.insertAdjacentHTML("afterend", surveyInvitation()); } if (state.page === "library") app.innerHTML = libraryView(); bindEvents(); }
function bindEvents() {
  document.querySelectorAll('[data-guardian]').forEach(function(button) {
    button.addEventListener('click', function() { openGuardian(button.dataset.guardian, button); });
  }); document.querySelectorAll("[data-action]").forEach(function(el){ el.addEventListener("click", function(){ var action = el.dataset.action; if (action === "intro") transitionTo("intro"); if (action === "start" || action === "restart") startJourney(); if (action === "continue-stage2") transitionTo("question"); if (action === "reset") resetJourney(); if (action === "back") goBack(); if (action === "library") transitionTo("library"); if (action === "result") transitionTo("result"); if (action === "title") transitionTo("title"); if (action === "copy") copyResult(); if (action === "line") shareLine(); if (action === "x") shareX(); if (action === "download") downloadImage(); }); }); document.querySelectorAll("[data-answer]").forEach(function(el){ el.addEventListener("click", function(){ var answer = el.dataset.answer; el.blur(); choose(answer); }); }); document.querySelectorAll("[data-tiebreak-answer]").forEach(function(el){ el.addEventListener("click", function(){ var answer = el.dataset.tiebreakAnswer; el.blur(); resolveTie(answer); }); }); document.querySelectorAll("[data-filter]").forEach(function(el){ el.addEventListener("click", function(){ state.filter = el.dataset.filter; render(); }); }); }
lineInvitation = function() {
  var guardianName = state.result ? splitName(state.result.name).main : "";
  return '<aside class="line-invitation" aria-labelledby="line-title"><div class="line-invitation-mark" aria-hidden="true">&#9993;</div><div class="line-invitation-copy"><div class="line-eyebrow">\u8a3a\u65ad\u306e\u3001\u305d\u306e\u5148\u3078</div><h3 id="line-title">\u5b88\u8b77\u8005\u306e\u540d\u524d\u3092\u547c\u3093\u3067\u307f\u3066\u304f\u3060\u3055\u3044</h3><p>LINE\u3067 <strong class="line-guardian-name">\u300c' + esc(guardianName) + '\u300d</strong> \u3068\u9001\u308b\u3068\u3001\u5b88\u8b77\u8005\u304b\u3089\u3042\u306a\u305f\u5b9b\u3066\u306e\u624b\u7d19\u304c\u5c4a\u304d\u307e\u3059\u3002</p><a class="btn-line-journey" href="https://lin.ee/5EvIPKV" target="_blank" rel="noopener noreferrer"><strong>LINE\u3067\u5b88\u8b77\u8005\u306e\u540d\u524d\u3092\u9001\u308b</strong><span>\u53cb\u3060\u3061\u8ffd\u52a0\u5f8c\u3001\u540d\u524d\u3092\u9001\u3063\u3066\u304f\u3060\u3055\u3044</span></a></div></aside>';
};

createKomorebi(); render();
