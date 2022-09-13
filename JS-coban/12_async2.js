const array = [1, 2, 3, 4];

const calculationOneAwait = (number1, number2) => {
  return new Promise(function (resolve, reject) {
    // setTimeout(function () {
    //
    //   resolve();
    // }, 1000);
  });
};

const calculation = (array) => {};

// hoàn thiện calculationOneAwait với giá trị trả về là (number1*number1 + number2),
// nhưng trước đó phải chờ 10 * (number1+ number2) mini giây

// hoàn thiện calculation với đầu vào là mảng các số  [1,2,3,4,..] => kết quả trả ra ((1^2 + 2^2)^2 + 3^2 )^2 +4^2) +...
// in ra  kết quả của các cặp số  (1^ + 2^2)
//                                (1^2 + 2^2)^2 + 3^2 ,..
// vớii mỗi dòng kết quả in ra cách nhau 10 * (number1+ number2)
