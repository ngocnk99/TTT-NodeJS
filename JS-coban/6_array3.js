const a = [
  { id: 37, namme: "Hệ thống", parentId: 0, status: 1 },
  { id: 282, namme: "Nhóm sản phẩm", parentId: 37, status: 1 },
  { id: 289, namme: "Thương hiệu", parentId: 37, status: 1 },
  { id: 290, namme: "Chi nhánh", parentId: 37, status: 1 },
  { id: 307, namme: "Giao dịch", parentId: 0, status: 1 },
  { id: 310, namme: "Báo cáo", parentId: 0, status: 1 },
  { id: 329, namme: "Hàng hóa", parentId: 310, status: 1 },
  { id: 312, namme: "Tài khoản ngân hàng", parentId: 37, status: 1 },
];

const createTree = (list) => {
  return []; // tree;
};

// Hoàn thanh function createTree để tạo 1 tree 2 cấp , kết quả giống như bên dưới

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
        children: [],
      },
      { id: 289, namme: "Thương hiệu", parentId: 37, status: 1, children: [] },
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
