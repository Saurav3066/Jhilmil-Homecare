import React from 'react'
const Card = ({ title, subtitle, image, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        backdrop-blur-xl bg-white/20 
        border border-white/30 
        shadow-[0_8px_32px_rgba(0,0,0,0.2)]
        rounded-3xl p-7 cursor-pointer
        transition-all duration-500
        hover:shadow-[0_12px_45px_rgba(0,0,0,0.25)]
        hover:bg-white/30 hover:-translate-y-1
      "
    >
      {/* Image */}
      {/* {image && (
        <div className="overflow-hidden rounded-2xl mb-4">
          <img
            src={image}
            alt={title}
            className="
              w-full h-44 object-cover rounded-2xl
              transition-transform duration-700
              hover:scale-110
            "
          />
        </div>
      )} */}

      {/* Title */}
      {title && (
        <h2 className="
          text-xl font-bold text-blue-900 
        ">
          {title}
        </h2>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm text-blue-700 mt-1">
          {subtitle}
        </p>
      )}

      {/* Children */}
      <div className="mt-4 text-blue-800 font-medium">
        {children}
      </div>
    </div>
  );
};

export default Card;

