import React, { useState, useRef, useEffect, useContext } from "react";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import search from "./../assets/search.png";
import ItemSearch from "./ItemSearch";
import { useDebounce } from "../hook";
import { SearchContext } from "../Context/SearchContext";

const Search = () => {
  const {
    inputRef,
    searchValue,
    setSearchValue,
    searchResult,
    setSearchResult,
  } = useContext(SearchContext);

  // const [searchValue, setSearchValue] = useState("");
  // const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(searchValue, 500);

  function handleClearInput() {
    inputRef.current.focus();
    setSearchValue("");
    setSearchResult([]);
  }

  function handleHideResult() {
    setShowResult(false);
  }

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        debounced
      )}&limit=5&appid=${import.meta.env.VITE_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res);
        setLoading(false);
      });
  }, [debounced]);

  return (
    //Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
    <div>
      <Tippy
        onClickOutside={handleHideResult}
        interactive="true"
        placement="bottom"
        maxWidth={700}
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div
            className="w-[700px] bg-[#1a1a1a] text-white py-3 px-1 text-center rounded-lg space-y-3"
            tabIndex="-1"
            {...attrs}
          >
            {searchResult.map((result, index) => (
              <ItemSearch key={index} data={result} />
            ))}
          </div>
        )}
      >
        <div className="flex gap-5 py-5 relative">
          <div className="relative w-full bg-[#1A1A1A]/50 rounded-3xl px-2 h-[60px]">
            <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-3 text-[10px] text-white/40">
              City, Country
            </label>
            <input
              className="flex h-10 w-full border border-input px-3 py-2 text-sm outline-none bg-transparent border-none -mt-2 -mb-4 text-white"
              placeholder="Enter a City Name ..."
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setShowResult(true)}
              value={searchValue}
              ref={inputRef}
            />
            {loading && (
              <span className="absolute text-white right-[20px] top-[50%] translate-y-[-50%]">
                <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
              </span>
            )}

            {!!searchValue && !loading && (
              <button onClick={handleClearInput}>
                <FontAwesomeIcon
                  className="absolute text-white right-[20px] top-[50%] translate-y-[-50%]"
                  icon={faXmark}
                />
              </button>
            )}
          </div>
          <button className="bg-[#28124D] rounded-2xl flex justify-center items-center">
            <img className="p-[17px] p" src={search} alt="" />
          </button>
        </div>
      </Tippy>
    </div>
  );
};

export default Search;
