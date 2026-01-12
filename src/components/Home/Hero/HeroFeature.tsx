import React from "react";
import Image from "next/image";

const featureData = [
  {
    img: "/images/icons/icon-01.svg",
    title: "Precios Fijos",
    description: "Sin sorpresas ni extras",
  },
  {
    img: "/images/icons/icon-02.svg",
    title: "Entrega Rápida",
    description: "3-10 días garantizados",
  },
  {
    img: "/images/icons/icon-03.svg",
    title: "Archivos Fuente",
    description: "100% propiedad tuya",
  },
  {
    img: "/images/icons/icon-04.svg",
    title: "Soporte Experto",
    description: "Guía paso a paso",
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="flex flex-wrap items-center gap-7.5 xl:gap-12.5 mt-10">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-4" key={key}>
            <Image src={item.img} alt="icons" width={40} height={41} />

            <div>
              <h3 className="font-medium text-lg text-dark">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
