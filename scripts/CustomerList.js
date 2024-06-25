export const Customers = async () => {
  const response = await fetch("http://localhost:8088/customers");
  const customers = await response.json();

  const secondResponse = await fetch(
    "http://localhost:8088/employeeCustomers?_embed=employees&_embed=customers&_expand=customer&_expand=employee"
  );
  const customerRelationships = await secondResponse.json();

  return customers
    .map((customer) => {
      const relationships = customerRelationships.filter((relationship) => {
        if (relationship.customerId === customer.id) {
          return relationship.employee;
        }
      });

      const employees = relationships
        .map((relationship) => {
          return `<li>${relationship.employee.firstName} ${relationship.employee.lastName}</li>`;
        })
        .join("");

      return `
      <div class="customer">
        <header class="customer-name">
            <h2>${customer.name}</h2>
        </header>
        <section class="customer-customers">
            Has worked with the following employees.
            <ul>
            ${employees}
            </ul>
        </section>
        </div>
            `;
    })
    .join("");
};
