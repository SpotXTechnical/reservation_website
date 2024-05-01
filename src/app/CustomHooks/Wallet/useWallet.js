import { getUserBalance, getUserTransactions } from "../../Apis/Transactions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useWallet = () => {
  const { user } = useSelector((state) => state.auth);
  const [balanceData, setBalanceData] = useState(null);
  const [transactionsData, setTransactionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        setLoading(true);
        if (user?.id) {
          const balanceResponse = await getUserBalance();
          setBalanceData(balanceResponse.data);
          const transactionsResponse = await getUserTransactions();
          setTransactionsData(transactionsResponse.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTransactions();
  }, [user]);
  return { balanceData, transactionsData, loading, error };
};
