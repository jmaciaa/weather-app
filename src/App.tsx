import { useEffect, useState } from "react"
import { useAsync } from "react-use"
import { fetchCurrentLocation, fetchWeatherData } from "./api"
import { Current } from "./components/Current"
import { Forecast } from "./components/Forecast"
import { Loader } from "./components/Loader"
import { SearchBar } from "./components/SearchBar"
import { SearchData } from "./types"
import "./App.css"
import { buildCityLabel } from "./utils"
import { Landing } from "./components/Landing"

type Location = { lat: number; lon: number; city: string }

function App() {
  const [location, setLocation] = useState<Location | null>(null)
  const {
    value: weather,
    loading,
    error,
  } = useAsync(async () => {
    if (location) return await fetchWeatherData(location.lat, location.lon)
  }, [location])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords
        const currentLocation = await fetchCurrentLocation(lat, lon)
        const { city, region, countryCode } = currentLocation[0]
        setLocation({
          lat,
          lon,
          city: buildCityLabel(city, region, countryCode),
        })
      },
      (e) => console.log(e)
    )
  }, [])

  const changeLocation = async (searchData: SearchData) => {
    const { value, label } = searchData
    setLocation({ lat: value[0], lon: value[1], city: label })
  }

  return (
    <div className="App">
      <SearchBar changeLocation={changeLocation} />
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Ups... Something went wrong. Please reload the page</div>
      ) : weather && location ? (
        <>
          <Current
            currentWeather={weather.current}
            city={location.city}
            timezoneOffset={weather.timezone_offset}
          />
          <Forecast daily={weather.daily} />
        </>
      ) : (
        <Landing />
      )}
    </div>
  )
}

export default App
