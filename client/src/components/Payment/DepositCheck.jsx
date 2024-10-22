import React, { useEffect } from "react";
import useReservationStore from "../../store/useReservationStore";
import { useNavigate } from "react-router-dom";
import AddCard from "../Card/AddCard";
import { getCardNumber } from "../../service/cardService";
import { useQuery } from "@tanstack/react-query";
import usePaymentStore from "../../store/usePaymentStore";

const DepositCheck = () => {
  const navigate = useNavigate();
  const { partySize, deposit, setIsReservationChecked } = useReservationStore();
  const { lastCardNumber, setLastCardNumber } = usePaymentStore();
  const localedDeposit = deposit.toLocaleString();

  // 해당 사용자의 카드 뒷자리 번호 패치
  const { data: cardNumber, isLoading } = useQuery({
    queryKey: ["getCardNumber"],
    queryFn: getCardNumber,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (!isLoading) {
      setLastCardNumber(cardNumber);
      console.log("불러온 카드 넘버", cardNumber);
    }
  }, [isLoading]);

  return (
    <>
      {!lastCardNumber ? (
        <AddCard />
      ) : (
        <div className="flex flex-col mt-5 gap-5">
          <section className="border border-gray-300 rounded px-7 py-5">
            <div className="flex flex-col gap-1.5 text-base">
              <div className="flex flex-row justify-between">
                <p>1인당 예약금</p>
                <p className="font-medium">5,000원</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>총 예약 인원</p>
                <p className="font-medium">{partySize}</p>
              </div>
            </div>
            <div className="bg-gray-300 h-px -mx-7 mt-5 mb-5 p-0"></div>
            <div className="flex flex-row justify-between font-medium">
              <p>합계</p>
              <p>{localedDeposit}원</p>
            </div>
          </section>
          <p className="text-lg font-semibold">
            총 예약 보장금 <span>{localedDeposit}</span>원
          </p>
          <p>{lastCardNumber}로 끝나는 카드로 결제됩니다.</p>
          <div className="w-full flex flex-row justify-center gap-2">
            <button
              className="border border-gray-300 rounded font-medium w-5/12 h-12"
              onClick={() => setIsReservationChecked(false)}
            >
              이전
            </button>
            {/* 실제 결제가 되는 기능 구현 필요, 현재는 그냥 결제 누르면 예약 완료가 되는 상태 */}
            <button
              className="rounded font-medium w-5/12 h-12 bg-amber-500 text-white"
              onClick={() => navigate("/reservation-completed")}
            >
              결제
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default DepositCheck;
