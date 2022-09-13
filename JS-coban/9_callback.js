// examp callback

function printString(text) {
  console.log("start");
  setTimeout(function () {
    // callback
    console.log("text", text);
  }, 1000);
  console.log("end1");
}

printString("hello");

// examp Promise
const myFirstPromise = new Promise((resolve, reject) => {
  const condition = true;
  if (condition) {
    setTimeout(function () {
      resolve("Promise is resolved!"); // fulfilled
    }, 300);
  } else {
    reject("Promise is rejected!");
  }
});

myFirstPromise
  .then((successMsg) => {
    console.log(successMsg);
  })
  .catch((errorMsg) => {
    console.log(errorMsg);
  });

// đọc hiểu
