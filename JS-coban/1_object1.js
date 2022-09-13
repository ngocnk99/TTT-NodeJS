const example1 = () => {
  const key1 = "userName";
  const key2 = "password";
  const object1 = { a: 1, [key1]: "ngocnk99" };

  console.log("object1", object1);

  object1[key2] = "123456";
  console.log("object1", object1);
};

const example2 = () => {
  const object2 = { 0: "a", 1: "b", 2: "c" };
  object2.length = 3;

  object2.__proto__.forEach = Array.prototype.forEach;

  object2.forEach((e, index) => {
    console.log(`index ${index} : ${e}`);
  });
};

example1();
example2();

// đọc hiểu example1, example2
