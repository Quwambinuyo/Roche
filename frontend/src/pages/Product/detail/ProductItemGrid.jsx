import React from "react";
import { Link } from "react-router-dom";
import RevealImage from "../../../components/UI/RevealImage";

const ProductItemGrid = ({ title, items }) => (
  <div>
    <p className="text-xs font-semibold tracking-widest text-secondary/50 uppercase mb-4">
      {title}
    </p>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
      {items.map((item) => (
        <Link key={item.slug} to={`/shop/${item.slug}`} className="group block">
          <RevealImage
            src={item.image}
            alt={item.name}
            className="w-full aspect-[3/4] rounded-2xl"
            imgClassName="transition-transform duration-500 group-hover:scale-110"
          />
          <p className="text-sm font-semibold text-secondary mt-3">
            {item.name}
          </p>
          <p className="text-sm text-secondary/60">{item.price}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default ProductItemGrid;
