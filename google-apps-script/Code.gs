const SHEET_ID = "1hwMaJPoXQJxKmkUJJKxPWaE0oR4I9ykzPOMcMCoLBfg";
const SHEET_NAME = "匿名回答";
const MAJORS = ["amiable", "driving", "expressive", "analytical"];
const MINORS = ["harmony", "performance", "expression", "observation"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    validatePayload_(payload);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const submissionId = clean_(payload.submissionId, 80);
    if (sheet.createTextFinder(submissionId).matchEntireCell(true).findNext()) return json_({ ok: true, duplicate: true });
    const row = [new Date(), submissionId, clean_(payload.version, 30)]
      .concat(payload.stage1Answers.map(answer_))
      .concat(payload.majorScores.map(score_))
      .concat([list_(payload.majorTieCandidates), answer_(payload.majorTieAnswer), answer_(payload.major)])
      .concat(payload.stage2Answers.map(answer_))
      .concat(payload.minorScores.map(score_))
      .concat([list_(payload.minorTieCandidates), answer_(payload.minorTieAnswer), clean_(payload.resultId, 80), clean_(payload.resultName, 80)]);
    sheet.appendRow(row);
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error.message || error) });
  } finally {
    lock.releaseLock();
  }
}

function validatePayload_(p) {
  if (!p || typeof p !== "object") throw new Error("invalid payload");
  if (!Array.isArray(p.stage1Answers) || p.stage1Answers.length !== 10) throw new Error("invalid stage1 answers");
  if (!Array.isArray(p.stage2Answers) || p.stage2Answers.length !== 10) throw new Error("invalid stage2 answers");
  if (!Array.isArray(p.majorScores) || p.majorScores.length !== 4) throw new Error("invalid major scores");
  if (!Array.isArray(p.minorScores) || p.minorScores.length !== 4) throw new Error("invalid minor scores");
  p.stage1Answers.forEach(function(v) { if (MAJORS.indexOf(v) < 0) throw new Error("invalid major answer"); });
  p.stage2Answers.forEach(function(v) { if (MINORS.indexOf(v) < 0) throw new Error("invalid minor answer"); });
}

function answer_(value) { return clean_(value, 30); }
function score_(value) { const n = Number(value); return Number.isFinite(n) && n >= 0 && n <= 10 ? n : 0; }
function list_(value) { return Array.isArray(value) ? value.map(answer_).join(",") : ""; }
function clean_(value, max) { return String(value == null ? "" : value).replace(/[\r\n\t]/g, " ").slice(0, max); }
function json_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
