let allButton = document.querySelectorAll("button");
let display = document.getElementById("display");

allButton.forEach(function (button) {
  button.addEventListener("click", function () {
    switch (button.value) {
      case "D":
        deleteHandle();
        break;

      case "R":
        resetHandle();
        break;

      case "+":
      case "-":
      case "/":
      case "*":
        operatorHandle(button.value);
        break;

      case "=":
        evalHandle();
        break;

      case ".":
        decimalHandle(button.value);
        break;

      default:
        checkHandle(button.value);
        break;
    }
  });
});

const deleteHandle = () => {
  if (display.value.length == 1) {
    resetHandle();
  } else {
    let input = display.value;
    let newInput = input.slice(0, -1);
    display.value = newInput;
    display.value = displayHandle();
  }
};

const operatorHandle = (symb) => {
  if (/[\+\-\/\*]$/.test(display.value)) {
    deleteHandle();
    display.value += symb;
    display.value = displayHandle();
  } else if (/[\.]$/.test(display.value)) {
    display.value += "0";
    display.value += symb;
    display.value = displayHandle();
  } else {
    display.value += symb;
    display.value = displayHandle();
  }
};

const resetHandle = () => {
  display.value = "0";
};

const checkHandle = (symb) => {
  if (display.value == "0") {
    display.value = symb;
  } else {
    display.value += symb;
    display.value = displayHandle();
  }
};

const evalHandle = () => {
  let input = display.value.replace(/,/g, "");
  if (/[\+\-\/\*]$/.test(input)) {
    input += "0";
    display.value = eval(input);
    display.value = displayHandle();
  } else {
    let allInput = input;
    display.value = eval(allInput);
    display.value = displayHandle();
  }
};

const decimalHandle = (symb) => {
  let arr = display.value.split(/[\+\-\/\*]/);
  if (arr[arr.length - 1].includes(".")) {
    return;
  } else {
    display.value += symb;
  }
};

const displayHandle = () => {
  let input = display.value.replace(/,/g, "");
  let arr = input.split(/(\+|\-|\*|\/)/g);
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(parseFloat(arr[i]))) {
      result += parseFloat(arr[i]).toLocaleString();
    } else {
      result += arr[i];
    }
  }
  return result;
};

// Theme
const toggle1 = document.getElementById("toggle1");
const toggle2 = document.getElementById("toggle2");
const toggle3 = document.getElementById("toggle3");

const tSwitch = (togglee, remove1, remove2, add) => {
  const container = document.getElementsByClassName("container")[0];
  const head = document.getElementsByClassName("head")[0];
  const toggleSwitch = document.getElementsByClassName("toggle-switch")[0];
  const toggle = document.getElementsByClassName("toggle")[0];
  const button = document.getElementsByClassName("button")[0];
  const number = document.getElementsByClassName("number");
  const operator = document.getElementsByClassName("operator");
  const displayInput = document.getElementById("display");

  togglee.addEventListener("change", () => {
    if (togglee.checked) {
      container.classList.remove(remove1, remove2);
      container.classList.add(add);

      head.classList.remove(remove1, remove2);
      head.classList.add(add);

      toggleSwitch.classList.remove(remove1, remove2);
      toggleSwitch.classList.add(add);

      toggle.classList.remove(remove1, remove2);
      toggle.classList.add(add);

      button.classList.remove(remove1, remove2);
      button.classList.add(add);

      for (let i = 0; i < number.length; i++) {
        number[i].classList.remove(remove1, remove2);
        number[i].classList.add(add);
      }

      for (let i = 0; i < operator.length; i++) {
        operator[i].classList.remove(remove1, remove2);
        operator[i].classList.add(add);
      }

      displayInput.classList.remove(remove1, remove2);
      displayInput.classList.add(add);
    }
  });
};

tSwitch(toggle1, "theme2", "theme3", "theme1");
tSwitch(toggle2, "theme1", "theme3", "theme2");
tSwitch(toggle3, "theme2", "theme1", "theme3");
