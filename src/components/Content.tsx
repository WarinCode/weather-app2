import { useContext, JSX, useState, useEffect } from "react";
import { DataContext } from "../App";
import { Response } from "../index";

import ReactCountryFlag from "react-country-flag";
import lookup, { Country } from "country-code-lookup";
import { CiTempHigh } from "react-icons/ci";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FiWind } from "react-icons/fi";

type SearchOutput = Country[];

const Content = (): JSX.Element => {
  const {
    clounds,
    coord: { lon, lat },
    main: { temp, temp_min, temp_max, humidity, pressure },
    name,
    sys: { country },
    weather,
    wind: { speed, gust, deg },
  } = useContext<Response>(DataContext);
  const [countryName, setCountryName] = useState<string>("");
  const [isoCode, setIsoCode] = useState<string>("");

  const countries: SearchOutput = lookup.countries;

  useEffect((): void => {
    for (let val of countries) {
      if (val.iso2 === country) {
        setCountryName(val.country);
        setIsoCode(`(${val.iso2})`);
        break;
      } else {
        continue;
      }
    }
  }, [country]);

  const showContent = (
    variable: any,
    content: string,
    unit: string
  ): string | JSX.Element => {
    return typeof variable === "undefined" || typeof variable !== "number" ? (
      ""
    ) : (
      <p className="sm:text-sm">
        {content} : {variable}{unit}
      </p>
    );
  };

  const covertTempCelsius = (n:number , point:number = 2):string => (n - 273.15).toFixed(point);

  return (
    <section className="flex flex-col items-center justify-center mt-16 w-4/5 h-max border-none rounded-lg shadow-2xl mx-auto bg-gray-900 text-center">
      <header className="text-3xl text-center mt-12 mb-4 md:text-2xl sm:text-xl sm:px-4">
        <ReactCountryFlag
          countryCode={country}
          className="text-4xl me-2"
          svg
        />
        {countryName}
        <p className="text-yellow-300 inline">{isoCode}</p> - {name}
      </header>
      <h2 className="text-2xl mb-6 text-cyan-400 md:text-2xl sm:text-xl">{weather[0].description}</h2>
      <div className="w-full h-max p-4 grid sm:flex sm:flex-col md:flex md:flex-col place-items-center gap-y-12">
        <div
          className="w-10/12 h-max p-7 border-4 text-start rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-stone-950 cursor-default shadow-2xl"
          id="temperature"
        >
          <div className="flex items-center justify-center">
            <CiTempHigh className="w-8 h-8" />
            <h3>อุณหภูมิ</h3>
          </div>
          <hr className="w-3/4 mx-auto h-max mb-3 border-slate-950" />
          <p className="sm:text-sm">
            อุณหภูมิตอนนี้ : {covertTempCelsius(temp)}°C , {temp}°K
          </p>
          <p className="sm:text-sm">
            อุณหภูมิต่ำสุด : {covertTempCelsius(temp_min)}°C , {temp_min}°K
          </p>
          <p className="sm:text-sm">
            อุณหภูมิสูงสุด : {covertTempCelsius(temp_max)}°C , {temp_max}°K
          </p>
          <p className="sm:text-sm">ความชื้น : {humidity}% </p>
          <p className="sm:text-sm">ความดัน : {pressure} hPa</p>
        </div>
        <div
          className="w-9/12 h-max p-7 border-4 text-start rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-400 text-stone-950 cursor-default shadow-2xl"
          id="coordinates"
        >
          <div className="flex items-center justify-center">
            <FaLocationCrosshairs className="w-6 h-6 me-2" />
            <h3>พิกัด</h3>
          </div>
          <hr className="w-3/4 mx-auto mb-3 border-slate-950" />
          <p className="sm:text-sm">ลองจิจูด : {lon}</p>
          <p className="sm:text-sm">ละติจูด : {lat}</p>
        </div>
        <div
          className="w-9/12 h-max p-7 border-4 text-start col-span-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-200 text-stone-950 cursor-default shadow-2xl mb-12"
          id="wind"
        >
          <div className="flex items-center justify-center">
            <FiWind className="w-7 h-7 me-2" />
            <h3>ลม</h3>
          </div>
          <hr className="w-3/4 mx-auto mb-3 border-slate-950" />
          <p className="sm:text-sm">ความเร็วลม : {speed} m/s</p>
          {showContent(gust , "ลมกระโชก" , " m/s")}
          {showContent(deg , "ทิศทางลม" , " deg")}
          {showContent(clounds?.all , "เมฆปกคลุม" , "%")}
        </div>
      </div>
    </section>
  );
};

export default Content;
