// examp async
const getText = function (text) {
  return new Promise(function (resolve, reject) {
    console.log("chờ");
    setTimeout(function () {
      // callback
      resolve(text);
    }, 1000);
  });
};

async function printMyAsync() {
  const waitText1 = await getText("1");
  console.log("text1", waitText1);
  const waitText2 = await getText("2");
  console.log("text2", waitText2);
  const waitText3 = await getText("3");
  console.log("text3", waitText3);
}
printMyAsync();

// đọc hiểu
