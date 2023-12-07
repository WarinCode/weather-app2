import {
  useState,
  createContext,
  Context,
  useEffect,
  JSX,
  useRef,
  MutableRefObject,
} from "react";
import Form from "./components/Form";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import { defaultData, Response, apiKey } from "./index";

import ReactLoading from "react-loading";
import axios, { AxiosResponse , HttpStatusCode } from "axios";

import "./style/index.css";
import "./style/style.css";
import undraw from "./assets/undraw_page_not_found_re_e9o6.svg";

let numberOfSearches: number = 0;
const defaultCity: string = "London";

export const DataContext: Context<Response> =
  createContext<Response>(defaultData);

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const App = (): JSX.Element => {
  const [data, setData] = useState<Response>(defaultData);
  const [city, setCity] = useState<string>(defaultCity);
  const [isCity , setIsCity] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const loadTime = (delay: number = 4300): void => {
    setLoading(true);
    setTimeout((): void => {
      setLoading(false);
    }, delay);
  };
  
  const clearValue = ():void => {
    setTimeout((): void => {
      inputRef.current.value = "";
    }, 2000);
  }

  const fetchData = async (apiUrl: string): Promise<Response> => {
    numberOfSearches++;
    try {
      loadTime();
      const response: AxiosResponse<Response> = await axios.get(apiUrl);
      const { data }: AxiosResponse<Response> = response;
      setIsError(false);
      setIsCity(true);
      return data;
    } catch (err: unknown) {
      setIsCity(false);
      setIsError(true);
      throw new Error(err as string);
    }
  };

  useEffect((): void => {
    (async (): Promise<void> => {
      const url: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=th&appid=${apiKey}`;
      const data: Response = await fetchData(url);
      if (!isError) {
        setData(data);
        setIsSubmit(false);
      }
    })();
  }, [isSubmit]);

  return (
    <>
      <DataContext.Provider value={data}>
        <Navbar />
        <Form
          city={city}
          setCity={setCity}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          loading={loading}
          inputRef={inputRef}
          numberOfSearches={numberOfSearches}
        />
        {isError ? (
          <NotFound
            src={undraw}
            isError={isError}
            setIsError={setIsError}
            loading={loading}
            isSubmit={isSubmit}
            setIsSubmit={setIsSubmit}
            loadTime={loadTime}
            clearValue={clearValue}
            statusCode={isError && !isCity ? HttpStatusCode.NotFound : HttpStatusCode.Ok}
          >
            <h3 className="text-2xl font-bold text-center mt-7 pointer-events-none">
              ไม่พบชื่อเมือง <b className="text-orange-500">"{city}"</b>{" "}
              อยู่ในข้อมูลของเราโปรดค้นหาชื่อเมืองที่มีอยู่จริง
            </h3>
          </NotFound>
        ) : loading ? (
          <ReactLoading
            type={"cylon"}
            color="rgb(249 115 22)"
            height={667}
            width={375}
            className="mx-auto"
          />
        ) : (
          <Content />
        )}
        <Footer />
      </DataContext.Provider>
    </>
  );
};

export default App;