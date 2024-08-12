import { useContext, useEffect } from "react";
import ItemSearchHistory from "./ItemSearchHistory";
import { SearchContext } from "../Context/SearchContext";

const SearchHistory = () => {
  const { historySearch } = useContext(SearchContext);

  useEffect(() => {
    // console.log(historySearch);
  }, [historySearch]);
  return (
    <div className="w-full mt-[26px] bg-[#1A1A1A]/30 rounded-3xl">
      <div className="p-5">
        <h3 className="mb-2">Search History</h3>

        <div className="flex flex-col">
          {historySearch.map((item, index) => {
            return <ItemSearchHistory data={item} key={index} index={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
