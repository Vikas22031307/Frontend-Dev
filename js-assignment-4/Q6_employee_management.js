// Q6: Employee Management System (Classes + Object Methods)
class Employee {
  constructor(id, name, department, salary) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.salary = salary; // monthly salary
  }

  getAnnualSalary() {
    return +(this.salary * 12);
  }

  applyBonus(percent) {
    if (percent < 0) throw new Error('Invalid percent');
    this.salary = +(this.salary * (1 + percent/100));
  }
}

// Create 5 employees
const employees = [
  new Employee(1, 'Asha', 'Engineering', 50000),
  new Employee(2, 'Rohit', 'Sales', 40000),
  new Employee(3, 'Sneha', 'HR', 35000),
  new Employee(4, 'Vikram', 'Design', 42000),
  new Employee(5, 'Kavya', 'Support', 30000)
];

// Calculate annual salary for each
const annuals = employees.map(e => ({ id: e.id, name: e.name, annual: e.getAnnualSalary() }));

// Total annual payout using reduce
const totalAnnualPayout = employees.reduce((acc,e) => acc + e.getAnnualSalary(), 0);

if (typeof module !== 'undefined') module.exports = { Employee, employees, annuals, totalAnnualPayout };
