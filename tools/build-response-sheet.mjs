import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "file:///C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";

const outputDir = "outputs/response-collection";
await fs.mkdir(outputDir, { recursive: true });

const headers = [
  "受信日時", "送信ID", "診断バージョン",
  "前半Q1", "前半Q2", "前半Q3", "前半Q4", "前半Q5", "前半Q6", "前半Q7", "前半Q8", "前半Q9", "前半Q10",
  "つながり", "前へ進める", "自分らしさ", "理解・確認", "前半同点候補", "前半追加回答", "選ばれた前半傾向",
  "後半Q1", "後半Q2", "後半Q3", "後半Q4", "後半Q5", "後半Q6", "後半Q7", "後半Q8", "後半Q9", "後半Q10",
  "調和を保つ", "役に立つ", "表現する", "よく観る", "後半同点候補", "後半追加回答", "結果ID", "守護者名"
];

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("匿名回答");
sheet.showGridLines = true;
sheet.freezePanes.freezeRows(1);
sheet.getRangeByIndexes(0, 0, 1, headers.length).values = [headers];
sheet.getRangeByIndexes(0, 0, 1, headers.length).format = {
  fill: "#E8EAED",
  font: { name: "Arial", bold: true, color: "#202124", size: 10 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
  borders: { preset: "outside", style: "thin", color: "#DADCE0" }
};
sheet.getRangeByIndexes(0, 0, 1, headers.length).format.rowHeightPx = 44;
sheet.getRangeByIndexes(0, 0, 1, headers.length).format.columnWidthPx = 108;
sheet.getRange("A:A").format.columnWidthPx = 150;
sheet.getRange("B:B").format.columnWidthPx = 220;
sheet.getRange("R:R").format.columnWidthPx = 180;
sheet.getRange("S:S").format.columnWidthPx = 140;
sheet.getRange("AI:AI").format.columnWidthPx = 180;
sheet.getRange("AJ:AJ").format.columnWidthPx = 140;
sheet.getRange("AL:AL").format.columnWidthPx = 180;

const preview = await workbook.render({ sheetName: "匿名回答", autoCrop: "all", scale: 1, format: "png" });
await fs.writeFile(`${outputDir}/preview.png`, new Uint8Array(await preview.arrayBuffer()));
const inspection = await workbook.inspect({ kind: "region", sheetId: "匿名回答", range: "A1:AL3", maxChars: 5000 });
await fs.writeFile(`${outputDir}/inspection.txt`, inspection.ndjson || String(inspection), "utf8");
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/CoComoriLABO_匿名診断回答.xlsx`);
