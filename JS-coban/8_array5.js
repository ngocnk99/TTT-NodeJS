const a = [
  { fileName: "homepage.css", path: "static/css/homepage.css" },
  { fileName: "login.css", path: "static/css/login.css" },
  { fileName: "info.css", path: "static/css/info.css" },
  { fileName: "icon.svg", path: "static/image/icon.svg" },
  { fileName: "homepage.js", path: "src/components/homepage.js" },
  { fileName: "login.js", path: "src/components/login.js" },
  { fileName: "info.js", path: "src/components/info.js" },
  { fileName: "index.js", path: "src/index.js" },
];

// Hoàn thanh function để kết quả giống như bên dưới

const tree1 = [
  {
    folderName: "static",
    path: "",
    file: [],
    folders: [
      {
        folderName: "css",
        path: "static/",
        file: ["homepage.css", "login.css", "info.css"],
        folders: [],
      },
      {
        folderName: "image",
        path: "static/",
        file: ["icon.svg"],
        folders: [],
      },
    ],
  },
  {
    folderName: "src",
    path: "",
    file: ["index.js"],
    folders: [
      {
        folderName: "components",
        path: "src/",
        file: ["homepage.js", "login.js", "info.js"],
        folders: [],
      },
    ],
  },
];
