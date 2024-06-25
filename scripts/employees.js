// import { Customers } from "./CustomerList.js";

// const CustomersHTML = await Customers();

export const Employees = async () => {
  const response = await fetch(
    "http://localhost:8088/employees?_expand=computer&_expand=department&_expand=location"
  );
  const employees = await response.json();

  const secondResponse = await fetch(
    "http://localhost:8088/employeeCustomers?_embed=employees&_embed=customers&_expand=customer"
  );
  const customerRelationships = await secondResponse.json();

  return employees
    .map((employee) => {
      const relationships = customerRelationships.filter((relationship) => {
        if (relationship.employeeId === employee.id) {
          return relationship.customer.name;
        }
      });

      const customers = relationships
        .map((relationship) => {
          return `<li>${relationship.customer.name}</li>`;
        })
        .join("");

      return `
              <div class="employee">
                <header class="employee-name">
                <h2>${employee.firstName} ${employee.lastName}</h2>
                </header>
                <section class="employee-computer">
                    <p>Currently using a ${employee.computer.year} ${employee.computer.model}</p>
                </section>
                <section class="employee-department">
                    <p>Works in the ${employee.department.name} department</p>
                </section>
                <section class="employee-location">
                  <p>Works at the ${employee.location.name} office
                </section>
              <section class="employee__customers">
                  Has worked for the following customers.
                  <ul>
                   ${customers}
                  </ul>
              </section>
              </div>
          `;
    })
    .join("");
};
