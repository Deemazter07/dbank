import { dbank } from "../../declarations/dbank";

async function queryBalance() {
  const value = document.getElementById("value");
  let currentAmount = await dbank.checkBalance();
  currentAmount = Math.round(currentAmount * 100) / 100;

  value.innerText = currentAmount;
}

window.addEventListener("load", queryBalance());

document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const button = event.target.querySelector("#submit-btn");

    // * get input element
    let inputAmount = document.getElementById("input-amount").value;
    let inputWithdraw = document.getElementById("withdrawal-amount").value;

    // * top up
    if (inputAmount.length !== 0) {
      button.setAttribute("disabled", true);
      inputAmount = parseFloat(inputAmount);
      await dbank.topUp(inputAmount);
    }

    // * withdraw
    if (inputWithdraw.length !== 0) {
      button.setAttribute("disabled", true);
      inputWithdraw = parseFloat(inputWithdraw);
      await dbank.withdraw(inputWithdraw);
    }

    // * compound
    await dbank.compound();

    // * refetch balance
    await queryBalance();

    // * remove attribute loading statement
    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";
    button.removeAttribute("disabled");
  });
