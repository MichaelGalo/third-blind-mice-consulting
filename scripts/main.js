import { Employees } from "./employees.js";
import { Customers } from "./CustomerList.js";

const mainContainer = document.querySelector("#container");
const employees = await Employees();
const customers = await Customers();

const renderApplication = async () => {
  mainContainer.innerHTML = `
    ${employees}
    ${customers}
    `;
};

renderApplication();
