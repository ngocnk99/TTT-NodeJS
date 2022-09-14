const a = [
  { id: 37, namme: "Hệ thống", parentId: 0, status: 1 },
  { id: 282, namme: "Nhóm sản phẩm", parentId: 37, status: 1 },
  { id: 289, namme: "Thương hiệu", parentId: 37, status: 1 },
  { id: 290, namme: "Chi nhánh", parentId: 37, status: 1 },
  { id: 307, namme: "Giao dịch", parentId: 0, status: 1 },
  { id: 310, namme: "Báo cáo", parentId: 0, status: 1 },
  { id: 329, namme: "Hàng hóa", parentId: 310, status: 1 },
  { id: 312, namme: "Tài khoản ngân hàng", parentId: 37, status: 1 },
  { id: 313, namme: "Sản phẩm chất luợng cao", parentId: 282, status: 1 },
  { id: 314, namme: "Thương hiệu quốc tế", parentId: 289, status: 1 },
];

const createTree = (list) => {
  return []; // tree;
};

// Hoàn thanh function createTree để tạo 1 tree(số cấp không biết trước, tùy thuộc vào dữ liệu đầu vào).kết quả giống như bên dưới
// Gợi ý: dùng cách lưu trữ giá trị của object   (object[key])  trong bài tập 1 và 2
const tree = [
  {
    id: 37,
    namme: "Hệ thống",
    parentId: 0,
    status: 1,
    children: [
      {
        id: 282,
        namme: "Nhóm sản phẩm",
        parentId: 37,
        status: 1,
        children: [
          {
            id: 313,
            namme: "Sản phẩm chất luợng cao",
            parentId: 282,
            status: 1,
          },
        ],
      },
      {
        id: 289,
        namme: "Thương hiệu",
        parentId: 37,
        status: 1,
        children: [
          { id: 314, namme: "Thương hiệu quốc tế", parentId: 289, status: 1 },
        ],
      },
      { id: 290, namme: "Chi nhánh", parentId: 37, status: 1, children: [] },
      {
        id: 312,
        namme: "Tài khoản ngân hàng",
        parentId: 37,
        status: 1,
        children: [],
      },
    ],
  },
  { id: 307, namme: "Giao dịch", parentId: 0, status: 1, children: [] },
  {
    id: 310,
    namme: "Báo cáo",
    parentId: 0,
    status: 1,
    children: [
      { id: 329, namme: "Hàng hóa", parentId: 310, status: 1, children: [] },
    ],
  },
];
