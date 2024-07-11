import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expensesperiodName="Total"
      expenses={expensesCtx.expenses}
      fallbackText="No registered expenses found!"
    />
  );
};

export default AllExpenses;
