import { Modal } from "@material-ui/core";
import Button from "components/Button";
import FormattedCurrency from "components/FormattedCurrency";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import AddExpense from "./AddExpense";
import ExpenseTable from "./ExpenseTable";

function Expenses({ bucket }) {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <>
      <div className="bg-white border-b-default">
        <div className="page grid gap-10 grid-cols-1 md:grid-cols-sidebar">
          <div>
            <div className="flex">
              <Button onClick={() => setOpenAdd(true)}>
                <FormattedMessage defaultMessage="Submit Expense" />
              </Button>
            </div>
            <div className="my-4">
              <p className="font-lg font-medium">
                <FormattedMessage defaultMessage="Expenses" />
              </p>
              <div className="my-2 mb-8 rounded shadow overflow-hidden bg-gray-100">
                <ExpenseTable expenses={bucket.expenses} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={openAdd}
        className="flex items-center justify-center p-4"
        onClose={() => setOpenAdd(false)}
      >
        <AddExpense bucketId={bucket.id} close={() => setOpenAdd(false)} />
      </Modal>
    </>
  );
}

export default Expenses;
