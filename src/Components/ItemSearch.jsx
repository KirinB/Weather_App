import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";

const ItemSearch = ({ data }) => {
  const { fetchData, setClickTime, setSearchValue, setSearchResult } =
    useContext(SearchContext);

  const handleSearch = () => {
    fetchData(data.name);
    const currentTime = new Date();
    const formattedTime = formatDateTime(currentTime);
    setClickTime(formattedTime);
    setSearchValue("");
    setSearchResult([]);
  };

  const formatDateTime = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; // Chuyển đổi giờ sang định dạng 12h
    const formattedHours = String(hours).padStart(2, "0");

    return `${day}-${month}-${year} ${formattedHours}:${minutes}${ampm}`;
  };

  return (
    <div
      className="text-left text-[14px] cursor-pointer rounded-md py-1 px-2 hover:bg-white/20 "
      onClick={handleSearch}
    >
      <span className="text-[#f8fafc] mr-2">{data.name}</span>
      <span className="text-[#94a3b8]">{data.state || data.country}</span>
    </div>
  );
};

export default ItemSearch;
