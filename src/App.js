import logo from './logo.svg';
import './App.css';
import { BsCloudDrizzle, BsWind } from "react-icons/bs";
import { WiSunset } from "react-icons/wi";
import { CiPercent } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [apiData, setapiData] = useState({});
  const [city, setcity] = useState("dhaka");
  const getWeather = async () => {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ff07bb363ca45dd77b9c22323573cb58`;
    const res = await axios.get(api);
    const allData = res.data;
    const { temp, pressure, humidity } = allData.main;
    const { main: weathermood } = allData.weather[0];
    const { name } = allData;
    const { country, sunset } = allData.sys;
    const { speed } = allData.wind;
    const weatherData = {
      temp,
      pressure,
      humidity,
      weathermood,
      name,
      country,
      sunset,
      speed,
    };
    setapiData(weatherData);
    setcity("");
  };
  useEffect(() => {
    getWeather();
  }, []);
  const sec = apiData.sunset;
  const date = new Date(sec * 1000);
  const timeStr = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <div className="bg-[#2f2f2e] text-white w-screen h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="mb-10 flex flex-col text-center md:flex-row">
          <input
            className="w-30 md:w-60 rounded md:rounded-none md:rounded-l pl-4 text-black py-1 focus:outline-none"
            type="text"
            name=""
            id=""
            placeholder="Search here..."
            value={city}
            onChange={(e) => setcity(e.target.value)}
          />
          <button
            onClick={getWeather}
            className="px-2 bg-sky-400 rounded md:rounded-none md:rounded-r mt-2 md:mt-0 py-1"
          >
            Search
          </button>
        </div>
        <div className="w-6/6 md:w-2/6 text-center bg-white text-black rounded-lg overflow-hidden">
          <div className="flex h-28">
            <div className="w-3/4 bg-black text-white flex items-center justify-center">
              <div className="text-2xl lg:text-5xl">{apiData.temp}°</div>
              <div className="text-left ml-4 text-gray-300">
                <div className="text-xl lg:text-4xl">{apiData.weathermood}</div>
                <div className="text-xs">
                  {apiData.name}, {apiData.country}
                </div>
              </div>
            </div>
            <div className="w-1/4 text-xs xl:text-xl flex justify-center items-center px-3 bg-sky-400 text-white">
              {new Date().toLocaleString()}
            </div>
          </div>
          <div className="grid grid-cols-2 xl:flex flex-col xl:flex-row justify-evenly">
            <div className="flex my-6 mx-2">
              <div className="text-4xl mx-3 text-sky-500">
                <WiSunset />
              </div>
              <div className="text-xs text-left">
                <div>{timeStr}pm</div>
                <div>sunset</div>
              </div>
            </div>
            <div className="flex my-6 mx-2">
              <div className="text-3xl mt-1 mx-3 text-sky-500">
                <CiPercent />
              </div>
              <div className="text-xs text-left">
                <div>{apiData.humidity}</div>
                <div>humidity</div>
              </div>
            </div>
            <div className="flex my-6 mx-2">
              <div className="text-3xl mt-1 mx-3 text-sky-500">
                <BsCloudDrizzle />
              </div>
              <div className="text-xs text-left">
                <div>{apiData.pressure} MM</div>
                <div>pressure</div>
              </div>
            </div>
            <div className="flex my-6 mx-2">
              <div className="text-3xl mt-1 mx-3 text-sky-500">
                <BsWind />
              </div>
              <div className="text-xs text-left">
                <div>{apiData.speed}</div>
                <div>wind</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
