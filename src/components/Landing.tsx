import "./Landing.css"

export const Landing = () => {
  return (
    <div className="landing">
      <h1 className="welcome">Weather App</h1>
      <div className="icons">☀️⛅🌧️🌩️</div>
      <p className="instructions">
        Please allow access to your location if you wanna see the weather right
        where you are. <br /> Otherwise, select any city in the world in the
        above search bar.
      </p>
    </div>
  )
}
