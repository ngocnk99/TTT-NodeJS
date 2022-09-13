const case1 = () => {
  const currentObject = {
    a: "case1",
    b: [1],
  };
  const copyObject = { ...currentObject, copy: true };

  console.log("copy", copyObject);

  copyObject.b = [1, 2, 3];

  console.log("sau khi sửa, copy:", copyObject);
  console.log("sau khi sửa, current:", currentObject);
};

const case2 = () => {
  const currentObject = {
    a: "case2",
    b: [1],
  };
  const copyObject = { ...currentObject, copy: true };

  console.log("copy", copyObject);

  copyObject.b.push(2, 3);

  console.log("sau khi sửa, copy:", copyObject);
  console.log("sau khi sửa, current:", currentObject);
};

case1();
case2();

// Giải thích tại sao có sự khác nhau giữa case1 và case2
