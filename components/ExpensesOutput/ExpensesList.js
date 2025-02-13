import { FlatList } from "react-native";
import ExpensesItem from "./ExpenseItem";

const renderExpensesItem = (itemData) => {
  return <ExpensesItem {...itemData.item} />;
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpensesItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
