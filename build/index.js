(() => {
  const fs = require("fs");
  const path = require("path");
  const { styles } = require("./console.style");
  const docDictMap = require("./docDictMap.json");
  //   read
  const baseDoc = fs.readFileSync(path.join(__dirname, "./baseDoc.md"), "utf8");
  const changelogDoc = fs.readFileSync(
    path.join(__dirname, "../CHANGELOG.md"),
    "utf8"
  );

  const basePath = path.join(__dirname, "../src");
  const files = fs.readdirSync(basePath);
  console.log(styles["green"], "准备读取以下文件");
  console.log(styles["blue"], files.join(","));
  const docs = files.map((fileName) => {
    console.log(styles["green"], `正在读取${fileName}`);
    const data = fs.readFileSync(`${basePath}/${fileName}`, "utf8");
    console.log(styles["green"], `读取完成，正在解析${fileName}`);
    const rNote = /(\/\/.*$)|(\/\*(.|\s)*?\*\/)/g;
    const fileNoteList = data.match(rNote);
    const docsReturn = (content = []) => {
      return { file: fileName, content };
    };
    if (!(fileNoteList && fileNoteList.length)) {
      console.log(styles["green"], `${fileName}无需解析`);
      return docsReturn();
    }
    const textList = fileNoteList.map((m, index, list) => {
      const rNoteRow = /(@(.|\s)*?\r\n)/g;
      const rows = m.match(rNoteRow);
      console.log(
        styles["green"],
        `解析进度${new Array(list.length)
          .fill("-")
          .map((a, j) => (index >= j ? "*" : "-"))
          .join("")}`
      );
      if (!(rows && rows.length)) return [];
      return rows.reduce((pre, row) => {
        const arr = row.substr(1, row.length - 3).split(" ");
        const [key, value] = [arr.shift(), arr.join(" ")];
        pre.push({ key, value });
        return pre;
      }, []);
    });
    console.log(styles["green"], `${fileName}解析完成`);
    return docsReturn(textList);
  });
  console.log(styles["green"], "全部文件解析完成");

  //   write
  console.log(styles["green"], "开始转码");
  const writeText = [
    baseDoc,
    "[TOC]",
    changelogDoc,
    "# api 文档",
    ...docs.map((fileData) => {
      const ctx = fileData.content
        .map((ms) => {
          return ms
            .map(({ key, value }) => {
              return docDictMap[key].style.replace("{i}", value);
            })
            .join("\r\n");
        })
        .join("\r\n");
      return ctx;
    }),
  ].join("\r\n");
  console.log(styles["green"], "转码完成");
  console.log(styles["green"], "正在写入");
  fs.writeFileSync(path.join(__dirname, "../README.md"), writeText);
  console.log(styles["green"], "写入完毕");
})();
