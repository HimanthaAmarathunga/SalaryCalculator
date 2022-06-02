import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faRotateLeft,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./CalculateSalary.css";

export default function CalSal() {
  const [basicSalaryField, setBasicSalary] = useState([{ basicSalary: "" }]);
  const [earningField, setEarnings] = useState([{ earning: "" }]);
  const [deductionField, setDeduction] = useState([{ deduction: "" }]);
  const [checked, setChecked] = useState(false);
  //   const {reset} = useState();

  const handleBasicSalaryFormChange = (event, index) => {
    let data = [...basicSalaryField];
    data[index][event.target.name] = event.target.value;
    setBasicSalary(data);
  };

  const handleEarningsFormChange = (event, index) => {
    let data = [...earningField];
    data[index][event.target.name] = event.target.value;
    data[index]["etfepf"] = false;
    setEarnings(data);
  };

  const handleDeductionsFormChange = (event, index) => {
    let data2 = [...deductionField];
    data2[index][event.target.name] = event.target.value;
    setDeduction(data2);
  };

  const addEarningsFields = () => {
    let object = {
      earning: "",
    };
    setEarnings([...earningField, object]);
  };

  const addDeductionsFields = () => {
    let object = {
      deduction: "",
    };
    setDeduction([...deductionField, object]);
  };

  const removeEarningsField = (index) => {
    let data1 = [...earningField];
    data1.splice(index, 1);
    setEarnings(data1);
  };

  const removeDeductionsField = (index) => {
    let data = [...deductionField];
    data.splice(index, 1);
    setDeduction(data);
  };

  const BasicSalary = () => {
    return basicSalaryField.reduce((total, item) => {
      return total + Number(item.basicSalary);
    }, 0);
  };

  const NetEarnings = () => {
    return earningField.reduce((total, item) => {
      return total + Number(item.earning);
    }, 0);
  };

  const GrossEarnings = () => {
    return NetEarnings() + BasicSalary();
  };

  const GrossDeductions = () => {
    return deductionField.reduce((total, item) => {
      return total + Number(item.deduction);
    }, 0);
  };

  const GrossSalary = () => {
    return NetEarnings() - GrossDeductions();
  };

  const NetSalary = () => {
    return GrossSalary() + BasicSalary() - EmployeeTotalEPF();
  };

  const EmployerEPF = () => {
    return earningField.reduce((total, item) => {
      if (item.etfepf) {
        return ((total + Number(item.earning)) * 12) / 100;
      } else {
        return total;
      }
    }, 0);
  };

  const EmployerETF = () => {
    return earningField.reduce((total, item) => {
      if (item.etfepf) {
        return ((total + Number(item.earning)) * 3) / 100;
      } else {
        return total;
      }
    }, 0);
  };

  const CostToCompany = () => {
    return (
      BasicSalary() +
      NetEarnings() -
      GrossDeductions() +
      EmployerTotalEPF() +
      EmployerTotalETF()
    );
  };

  const EmployeeEarningEPF = () => {
    return earningField.reduce((total, item) => {
      if (item.etfepf) {
        return ((total + Number(item.earning)) * 8) / 100;
      } else {
        return total;
      }
    }, 0);
  };

  const EmployeeBSEPF = () => {
    return basicSalaryField.reduce(() => {
      return (BasicSalary() * 8) / 100;
    }, 0);
  };
  const EmployeeBSEPF1 = () => {
    return basicSalaryField.reduce(() => {
      return (BasicSalary() * 12) / 100;
    }, 0);
  };
  const EmployeeBSEPF2 = () => {
    return basicSalaryField.reduce(() => {
      return (BasicSalary() * 3) / 100;
    }, 0);
  };

  const EmployeeTotalEPF = () => {
    return EmployeeBSEPF() + EmployeeEarningEPF();
  };

  const EmployerTotalEPF = () => {
    return EmployeeBSEPF1() + EmployerEPF();
  };

  const EmployerTotalETF = () => {
    return EmployeeBSEPF2() + EmployerETF();
  };

  const handleChange = (event, index) => {
    let data = [...earningField];
    if (event.target.checked) {
      data[index]["etfepf"] = true;
    } else {
      data[index]["etfepf"] = false;
    }
    setEarnings(data);

    console.log(data);
  };

  const reset = (res) => {
    console.log(basicSalaryField);
    setEarnings([{ earning: '' }]);
    setBasicSalary([{ basicSalary: '' }]);
    setDeduction([{ deduction: '' }]);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="CalculateSalaryContainer">
            <div className="row">
              <div className="col">
                <h3 className="CalcYourSal">Calculate Your Salary</h3>
              </div>
              <div className="col">
                <a
                  type="button"
                  className="btnReset"
                  onClick={(res) => reset(res)}
                >
                  <FontAwesomeIcon icon={faRotateLeft} /> Reset
                </a>
              </div>
            </div>
            <form>
              <div className="row FormGroup">
                <div>
                  <label className="SalaryLabels">Basic Salary</label>
                </div>
                {basicSalaryField.map((item, index) => (
                  <div className="col SalaryInputsFields1" key={index}>
                    <input
                      className="SalaryInputs"
                      type="number"
                      min={0}
                      id="basicSalary"
                      name="basicSalary"
                      value={item.basicSalary}
                      placeholder="Enter Basic Salary"
                      onChange={(event) =>
                        handleBasicSalaryFormChange(event, index)
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="row FormGroup">
                <div>
                  <label className="SalaryLabels">Earnings</label>
                  <label className="SalarySubLabels">
                    Allowance, Fixed Allowance, Bonus and etc.
                  </label>
                </div>

                {earningField.map((item, index) => (
                  <div className="col " key={index}>
                    <div className="SalaryInputsFields">
                      <input
                        className="SalaryInputs"
                        type="number"
                        min={0}
                        id="earning"
                        name="earning"
                        placeholder="Enter Earning"
                        value={item.earning}
                        onChange={(event) =>
                          handleEarningsFormChange(event, index)
                        }
                      />
                      {index ? (
                        <a
                          type="button"
                          className="buttonRemove"
                          onClick={() => removeEarningsField(index)}
                        >
                          <FontAwesomeIcon icon={faCircleXmark} />
                        </a>
                      ) : null}

                      <input
                        className="checkbox"
                        type="checkbox"
                        name="epf/etf"
                        id="epf/etf"
                        value={checked}
                        onChange={(e) => handleChange(e, index)}
                      />
                      <label>EPF/ETF</label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="button-section">
                <a
                  className="buttonAdd"
                  type="button"
                  onClick={addEarningsFields}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add New Allowance
                </a>
              </div>

              <div className="hr">
                <hr />
              </div>
              <div className="row FormGroup">
                <div>
                  <label className="SalaryLabels">Deductions</label>
                  <label className="SalarySubLabels">
                    Salary Advances, Loan Deductions and all
                  </label>
                </div>
                {deductionField.map((item, index) => (
                  <div className="col " key={index}>
                    <div className="SalaryInputsFields2">
                      <input
                        className="SalaryInputs"
                        type="number"
                        min={0}
                        id="deduction"
                        name="deduction"
                        placeholder="Enter Deduction"
                        value={item.deduction}
                        onChange={(event) =>
                          handleDeductionsFormChange(event, index)
                        }
                      />
                      {index ? (
                        <a
                          type="button"
                          className="buttonRemove"
                          onClick={() => removeDeductionsField(index)}
                        >
                          <FontAwesomeIcon icon={faCircleXmark} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              <div className="button-section">
                <a
                  className="buttonAdd"
                  type="button"
                  onClick={addDeductionsFields}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add New Deduction
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="ShowSalaryContainer">
            <div className="row">
              <div className="col">
                <h3 className="YourSal">Your Salary</h3>
              </div>
              <table>
                <tr className="TableRowHeading">
                  <td className="Your-Salary-Sub-topic">Items</td>
                  <td className="Your-Salary-Sub-topic-right">Amount</td>
                </tr>
                <tr className="TableRowField">
                  <td className="Salary-topic-labels">Basic Salary</td>
                  <td className="Salary-valuesBS">
                    {BasicSalary().toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                </tr>
                <tr className="TableRowField">
                  <td className="Salary-topic-labels2">Gross Earning</td>
                  <td className="Salary-valuesGE">
                    {GrossEarnings().toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                </tr>
                <tr className="TableRowField">
                  <td className="Salary-topic-labels2">Gross Deduction</td>
                  <td className="Salary-valuesGD">
                    {GrossDeductions().toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                </tr>
                <tr className="TableRowField">
                  <td className="Salary-topic-labels2">Employee EPF (8%)</td>
                  <td className="Salary-valuesEPF">
                    {EmployeeTotalEPF().toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                </tr>
                <tr className="TableRowFieldNS">
                  <td className="Salary-topic-labelsNS">
                    Net Salary (Take Home)
                  </td>
                  <td className="Salary-valuesNS">{NetSalary().toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
                <tr className="TableRowField">
                  <td className="Your-Salary-Sub-topic2">
                    Contribution from the Employer
                  </td>
                  <td></td>
                </tr>
                <tr className="TableRowField">
                  <td className="Salary-topic-labels3">Employer EPF (12%)</td>
                  <td className="Salary-valuesEEPF">
                    {EmployerTotalEPF().toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                </tr>
                <tr className="TableRowField">
                  <td className="Salary-topic-labels3">Employer ETF (3%)</td>
                  <td className="Salary-valuesEETF">
                    {EmployerTotalETF().toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                </tr>
                <tr className="TableRowField">
                  <td className="Salary-topic-labels3">
                    CTC (Cost to Company)
                  </td>
                  <td className="Salary-valuesCTC">
                    {CostToCompany().toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
