import { key } from "./key.js";

const buttonConvert = document.querySelector("#buttonConvert");
const originCoinSlected = document.querySelector("#originCoinSelected");
const destinationCoinSelected = document.querySelector(
  "#destinationCoinSelected"
);
const originCoinInput = document.querySelector("#originCoinInput");
const destinationCoinInput = document.querySelector("#destinationCoinInput");

const button = document.querySelector("#changeSide");

async function receiveData(coinToURL, coinSelected, inputToWrite, inputChange) {
  try {
    let url = `https://v6.exchangerate-api.com/v6/${key}/latest/${coinToURL}`;

    const response = await fetch(url);
    const data = await response.json();
    const exchangeRater = Number(data.conversion_rates[coinSelected]);

    writeConvertedValue(exchangeRater, inputToWrite, inputChange);
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

function writeConvertedValue(exchangerate, inputToWrite, inputChange) {
  if (originCoinInput.value !== destinationCoinInput.value) {
    inputToWrite.value = Number(inputChange.value * exchangerate).toFixed(4);
  }
}

function cleanInputs() {
  destinationCoinInput.value = "";
  originCoinInput.value = "";
}

function verifyInputValue() {
  if (isNaN(originCoinInput.value)) {
    originCoinInput.value = "";
    return;
  }
}

function verifyCoinsSelected() {
  if (originCoinSlected.value === destinationCoinSelected.value) {
    alert("As moedas não podem ser iguais! Selecione duas moedas diferentes!");
    return;
  }
}

function changeInputs() {
  const valurTempSelect = originCoinSlected.value;
  const valueTempInput = originCoinInput.value;

  originCoinSlected.value = destinationCoinSelected.value;
  destinationCoinSelected.value = valurTempSelect;
  originCoinInput.value = destinationCoinInput.value;
  destinationCoinInput.value = valueTempInput;
}

originCoinInput.addEventListener("focus", () => {
  cleanInputs();

  originCoinInput.addEventListener("keyup", () => {
    verifyInputValue();
    verifyCoinsSelected();
    receiveData(
      originCoinSlected.value,
      destinationCoinSelected.value,
      destinationCoinInput,
      originCoinInput
    );
  });
});

destinationCoinInput.addEventListener("focus", () => {
  cleanInputs();

  destinationCoinInput.addEventListener("keyup", () => {
    verifyInputValue();
    verifyCoinsSelected();
    receiveData(
      destinationCoinSelected.value,
      originCoinSlected.value,
      originCoinInput,
      destinationCoinInput
    );
  });
});

destinationCoinSelected.addEventListener("change", () => {
  verifyCoinsSelected();
  receiveData(
    originCoinSlected.value,
    destinationCoinSelected.value,
    destinationCoinInput,
    originCoinInput
  );
});

originCoinSlected.addEventListener("change", () => {
  verifyCoinsSelected();
  receiveData(
    destinationCoinSelected.value,
    originCoinSlected.value,
    originCoinInput,
    destinationCoinInput
  );
});

//Nova função
button.addEventListener("click", changeInputs);
