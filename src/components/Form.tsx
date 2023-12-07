import {
  FC,
  JSX,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  MutableRefObject,
} from "react";
import Options from "./Options";
import { Cities , List } from "../index";
import Data from "../data/data.json"

import openweatherLogo from "../assets/openweather.png";

import { IoMdSearch } from "react-icons/io";
import { FaTreeCity } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { byIso } from "country-code-lookup";

interface FormProps {
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  isSubmit: boolean;
  setIsSubmit: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  inputRef: MutableRefObject<HTMLInputElement>;
  numberOfSearches:number;
}

const Form: FC<FormProps> = ({
  city,
  setCity,
  setIsSubmit,
  loading,
  inputRef,
  numberOfSearches,
}): JSX.Element => {
  const [list, setList] = useState<List[]>([]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsSubmit(true);
  };

  useEffect(() => {
    const data:List[] = Data.map((item:Cities):List => {
      return {
        name: item.name,
        country: item.country,
        id: item.id
      }
    });
    setList(data);
  } , []);

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>): void => handleSubmit(e)}
      className="flex flex-col items-center justify-center mt-16 w-4/5 h-max border-none rounded-lg shadow-2xl mx-auto bg-gray-900 py-12"
    >
      <img
        src={openweatherLogo}
        alt={openweatherLogo.toString()}
        className="w-4/12 mx-auto"
      />
      <header className="text-3xl text-center my-4 text-orange-400 md:text-2xl md:px-2 sm:text-xl sm:px-2">
        ค้นหาสภาพอากาศ ทุกๆสถานที่บนโลก
      </header>
      <div className="w-full text-center">
        <label className="me-2 text-xl md:hidden" htmlFor="cityName">
          <div className="inline-flex items-center">
            <FaTreeCity className="w-6 h-6" />
            <p className="ms-1">ชื่อเมือง : </p>
          </div>
        </label>
        <input
          type="search"
          list="list"
          id="cityName"
          className="text-slate-300 border-b border-b-1.5 text-xl capitalize outline-none text-center bg-transparent focus:border-b-orange-500 ease duration-300 py-1 caret-orange-500 select-auto md:w-3/5 sm:w-3/4"
          defaultValue={city}
          placeholder="โปรดพิมพ์ชื่อเมือง"
          onChange={(e: ChangeEvent<HTMLInputElement>): void => handleChange(e)}
          spellCheck={false}
          ref={inputRef}
        />
        <datalist id="list">
          {list.map(
            (item: List): JSX.Element => (
              <Options
                value={item.name}
                key={item.id}
                id={String(item.id)}
                content={`ประเทศ ${byIso(item.country)?.country} เมือง ${
                  item.name
                }`}
              />
            )
          )}
        </datalist>
      </div>
      {(loading && numberOfSearches > 1) ? (
        <button
          type="submit"
          className="mt-8 h-12 w-60 bg-orange-900	 text-neutral-50 rounded-3xl font-bold flex items-center justify-center sm:w-3/5 sm:h-10"
          disabled
        >
          <AiOutlineLoading3Quarters className="text-2xl me-2 animate-spin" />
          <p>กำลังค้นหา</p>
        </button>
      ) : (
        <button
          type="submit"
          className="mt-8 h-12 w-60 bg-orange-500	 text-neutral-50 rounded-3xl font-bold hover:bg-orange-600 linear duration-150 flex items-center justify-center active:scale-90 sm:w-3/5 sm:h-10"
        >
          <IoMdSearch className="text-2xl me-1" />
          <p>ค้นหา</p>
        </button>
      )}
    </form>
  );
};

export default Form;
