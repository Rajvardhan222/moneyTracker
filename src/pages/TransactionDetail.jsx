import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeTemplate from "@/utils/HomeTemplate";
import BackTexttemplate from "@/utils/BackTexttemplate";
import { useGetTransactionByIdMutation } from "@/reactQuery/queryMutatuion";

function TransactionDetail() {
  const { id } = useParams();
  const { mutateAsync: getTransactionById, isPending } =
    useGetTransactionByIdMutation();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const loadTransaction = async () => {
      const response = await getTransactionById({ id: Number(id) });
      setTransaction(response?.data?.message?.transaction || null);
    };

    if (id) {
      loadTransaction();
    }
  }, [id, getTransactionById]);

  return (
    <HomeTemplate>
      <BackTexttemplate header="Transaction Detail">
        <div className="w-full max-w-4xl mx-auto mt-6">
          <div className="rounded-[2rem] bg-white/35 backdrop-blur-xl border border-white/60 shadow-xl px-6 sm:px-8 lg:px-10 py-8">
            {isPending && (
              <p className="text-center text-[#91919F] font-semibold">
                Loading...
              </p>
            )}
            {!isPending && !transaction && (
              <p className="text-center text-[#91919F] font-semibold">
                Transaction not found.
              </p>
            )}
            {!isPending && transaction && (
              <div className="flex flex-col gap-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#91919F]">Type</p>
                    <p
                      className={`text-lg font-semibold ${
                        transaction.type === "E"
                          ? "text-[#FD3C4A]"
                          : "text-[#00A86B]"
                      }`}
                    >
                      {transaction.type === "E" ? "Expense" : "Income"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#91919F]">Amount</p>
                    <p className="text-3xl font-semibold">
                      {transaction.type === "E" ? "-" : "+"}₹
                      {transaction.amount}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/70 backdrop-blur-lg border border-white/60 px-4 py-3">
                    <p className="text-sm text-[#91919F]">Category</p>
                    <p className="text-lg font-semibold">
                      {transaction.category}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/70 backdrop-blur-lg border border-white/60 px-4 py-3">
                    <p className="text-sm text-[#91919F]">Wallet</p>
                    <p className="text-lg font-semibold">
                      #{transaction.associatedWallet}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/70 backdrop-blur-lg border border-white/60 px-4 py-4">
                  <p className="text-sm text-[#91919F]">Description</p>
                  <p className="text-lg font-semibold">
                    {transaction.description || "-"}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/70 backdrop-blur-lg border border-white/60 px-4 py-3">
                    <p className="text-sm text-[#91919F]">Created At</p>
                    <p className="text-lg font-semibold">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/70 backdrop-blur-lg border border-white/60 px-4 py-3">
                    <p className="text-sm text-[#91919F]">Updated At</p>
                    <p className="text-lg font-semibold">
                      {new Date(transaction.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </BackTexttemplate>
    </HomeTemplate>
  );
}

export default TransactionDetail;
