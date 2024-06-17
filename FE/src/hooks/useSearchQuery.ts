import { useState, ChangeEvent } from "react";

type UseSearchQueryReturn = [string, (e: ChangeEvent<HTMLInputElement>) => void];

const useSearchQuery = (): UseSearchQueryReturn => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const onSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return [searchQuery, onSearchQueryChange];
};

export default useSearchQuery;
