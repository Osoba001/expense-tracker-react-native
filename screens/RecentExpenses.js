import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { GetDateAddDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expense = await fetchExpenses();
        expensesCtx.setExpenses(expense);
      } catch (er) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  // const recentExpenses = expensesCtx.expenses.filter((expense) => {
  //   const today = new Date();
  //   const date7DaysAgo = GetDateAddDays(today, -7);
  //   return expense.date >= date7DaysAgo;
  // });
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = GetDateAddDays(today, -7);
    return expense.date >= date7DaysAgo;
  });
  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching)
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;

  if (isFetching) return <LoadingOverlay />;

  return (
    <ExpensesOutput
      expensesperiodName="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No expense Rrgistered for the last 7 days."
    />
  );
};

export default RecentExpenses;
