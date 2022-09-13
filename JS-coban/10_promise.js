// examp Promise
const myFirstPromise = new Promise((resolve, reject) => {
  console.log("bắt đầu chờ");
  const condition = true; // false
  if (condition) {
    setTimeout(function () {
      resolve("Hoàn thành"); // fulfilled
    }, 1000);
  } else {
    reject("có lỗi");
  }
});

myFirstPromise
  .then((successMsg) => {
    console.log("ok");
    console.log(successMsg);
  })
  .catch((errorMsg) => {
    console.log("trường hợp có lỗi");
    console.log(errorMsg);
  });

// đọc hiểu
