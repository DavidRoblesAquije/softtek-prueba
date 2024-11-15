import { PlanCard } from "./PlanCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export const PlanLista = ({ plans, selectedOption }) => {
  return (
    <Swiper
      className="card__planswipper"
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      breakpoints={{
        500: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      {plans.map((plan, index) => (
        <SwiperSlide key={index}>
          <div className="card card__planslist">
            <PlanCard key={index} plan={plan} selectedOption={selectedOption} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
