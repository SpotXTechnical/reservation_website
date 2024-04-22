import { getTransaction } from "../../Apis/Transactions";
import { useEffect, useState } from "react";

export const useTransaction = (card) => {
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const transactionResponse = await getTransaction(card.id);
        setTransactionData(transactionResponse.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (card.reason !== "fine" && card.reason !== "gift_card") {
      fetchTransaction();
    } else {
      return setLoading(false);
    }
  }, [card]);
  return { transactionData, loading, error };
};
