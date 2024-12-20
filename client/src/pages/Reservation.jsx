import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useReservationStore from "../store/useReservationStore";

import BookingDetails from "../components/Reservation/BookingDetails";
import TimeSlot from "../components/Reservation/TimeSlot";
import { toast } from "react-toastify";
import AlertToast from "../components/AlertToast";
import PaymentModal from "../components/Payment/PaymentModal";
import OverTime from "../components/Reservation/OverTime";

const Reservation = () => {
  const navigate = useNavigate();

  const { date, timeSlot } = useReservationStore();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  const clickConfirmButtonHandler = () => {
    if (!timeSlot) {
      toast.warning("시간대를 꼭 선택해주세요 :)");
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  // 당일 시간이 오후 8시가 넘을 때 체크, (오후 8시 이후 당일 예약 불가)
  const overtimeCheck = () => {
    const today = new Date();
    const currentTime = today.getHours();

    if (date.toDateString() === today.toDateString()) {
      return currentTime >= 20 ? false : true;
    } else {
      return true;
    }
  };

  return (
    <div className="w-4/6 m-auto flex flex-col items-center text-center gap-10 mt-10 mb-20">
      <div>
        <p className="font-medium text-4xl text-amber-600 mb-5">
          MAKE A RESERVATION
        </p>
        <p className="mb-7 text-base">
          원하시는 테이블 예약을 위해 인원 수, 날짜, 시간대를 선택해 주세요.
        </p>
      </div>
      <BookingDetails />
      <div className="w-full h-px bg-gray-300"></div>
      {overtimeCheck() ? <TimeSlot /> : <OverTime />}
      <div className="flex flex-col gap-10">
        <p>
          당일 취소 및 노쇼 방지를 위해{" "}
          <span className="font-semibold">
            인원에 따른 예약 보장금이 발생합니다.
          </span>
          <p>(보장금은 방문 시 환불되거나, 차감됩니다!)</p>
        </p>
        <button
          className="rounded font-medium w-5/12 h-12 bg-amber-500 text-white m-auto"
          onClick={clickConfirmButtonHandler}
        >
          확인
        </button>
        <AlertToast />
        <PaymentModal
          isPaymentModalOpen={isPaymentModalOpen}
          setIsPaymentModalOpen={setIsPaymentModalOpen}
        />
      </div>
    </div>
  );
};

export default Reservation;
