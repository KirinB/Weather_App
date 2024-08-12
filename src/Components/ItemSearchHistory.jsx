import trash_icon from "./../assets/trash.png";
import search_icon from "./../assets/search_icon.png";
import React, { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";
const ItemSearchHistory = ({ data, index }) => {
  const { handleDeleteItemHistory, handleInfoItemHistory } =
    useContext(SearchContext);
  // useEffect(() => {
  //   // console.log(historySearch);
  // }, [historySearch]);
  return (
    <div
      className="w-full bg-[#1A1A1A]/50 mt-[18px] py-[13px] pl-[21px] pr-[15px] rounded-2xl flex justify-between cursor-pointer"
      onClick={() => {
        handleInfoItemHistory(index);
      }}
    >
      <div className="flex items-center justify-center">{data.city}</div>
      <div className="flex justify-center items-center">
        <p className="text-sm text-white/50 w-[180px] text-right">
          {data.time}
        </p>
        <img
          className="mx-[10px] border-[2px] border-white/40 p-[9px] rounded-full cursor-pointer"
          src={search_icon}
          onClick={() => {
            handleInfoItemHistory(index);
          }}
          alt=""
        />
        <img
          className="border-[2px] border-white/40 p-[9px] rounded-full cursor-pointer"
          src={trash_icon}
          onClick={() => {
            handleDeleteItemHistory(index);
          }}
          alt=""
        />
      </div>
    </div>
  );
};

export default ItemSearchHistory;
