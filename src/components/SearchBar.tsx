import AsyncSelect from "react-select/async"
import { getPlaces } from "../utils"
import { SearchData } from "../types"
import "./SearchBar.css"

type Props = { changeLocation: (latAndLong: SearchData) => void }

export const SearchBar = ({ changeLocation }: Props) => {
  const handleChange = (searchData: SearchData | null) =>
    searchData !== null && changeLocation(searchData)

  return (
    <div className="searchbar">
      <AsyncSelect
        placeholder="Search for a city"
        cacheOptions
        defaultOptions
        loadOptions={getPlaces}
        onChange={handleChange}
      />
    </div>
  )
}
