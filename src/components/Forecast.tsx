import { Weather } from "../types"
import { formatDate, formatTemp, getWeatherIconUrl } from "../utils"
import "./Forecast.css"

type Props = { daily: Weather["daily"] }

export const Forecast = ({ daily }: Props) => {
  return (
    <div className="cards">
      {daily.map(({ dt, weather, temp }) => (
        <div className="card" key={dt}>
          <p>{formatDate(dt)}</p>
          <img
            height={100}
            width={100}
            src={getWeatherIconUrl(weather[0].icon)}
            alt={`${weather[0].main}-icon`}
          />
          <div className="temps">
            <div>
              <p className="temp">{formatTemp(temp.min)}</p>
              <p className="min_max">Min</p>
            </div>
            <div>
              <p className="temp">{formatTemp(temp.max)}</p>
              <p className="min_max">Max</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
