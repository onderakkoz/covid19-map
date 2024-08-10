import React from "react";

const Loader = ({ type }) => {
  if (type === "header")
    return (
      <div data-testid="header-loader" className="flex space-x-2 animate-pulse items-center">
        <div className="bg-gray-400 w-16 lg:w-28 h-[32px] lg:h-[64px] rounded-md " />
        <div className="w-[150px] h-5 rounded-md  bg-gray-400" />
      </div>
    );

  //map ile dönüp ekrana 16 loader bastirabilmek icin 16 elemana sahip bir dizi olusturuyoruz
  const arr = new Array(16).fill();

  return arr.map((i, key) => (
    <div
    data-testid="card-loader"
      key={key}
      className="bg-gray-200 p-4 rounded-lg shadow-md text-transparent min-w-[206px] animate-pulse select-none"
    >
      <p className="bg-gray-300 rounded-md w-2/5 font-semibold mb-2">.</p>
      <h2 className="bg-gray-300 rounded-md w-4/5 font-bold mb-2">.</h2>
    </div>
  ));
};

export default Loader;