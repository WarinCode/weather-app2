import { JSX, FC, ReactNode, useEffect, Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";
import withReactContent, { ReactSweetAlert } from "sweetalert2-react-content";
const MySwal: ReactSweetAlert = withReactContent(Swal);
import ReactLoading from "react-loading";

interface NotFoundProps {
  children: ReactNode;
  src: string;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  isSubmit: boolean;
  setIsSubmit: Dispatch<SetStateAction<boolean>>;
  loadTime: (delay: number) => void;
  clearValue: () => void;
  statusCode: number;
}

const showError = (): void => {
  setTimeout((): void => {
    MySwal.fire({
      icon: "error",
      title: (
        <h2 id="show-react" className="capitalize font-bold">
          react-project
        </h2>
      ),
      text: "Error หาข้อมูลไม่เจอโปรดลองค้นหาใหม่อีกครั้ง!",
      showConfirmButton: false,
    });
  }, 800);
};

const NotFound: FC<NotFoundProps> = ({
  children,
  src,
  isError,
  setIsError,
  loading,
  isSubmit,
  setIsSubmit,
  loadTime,
  clearValue,
  statusCode
}): JSX.Element => {

  useEffect((): void => {
    loadTime(2000);
    if(!isError){ 
      setIsError(false);
    } else {
      statusCode === 404 && showError();
      clearValue();
      setIsSubmit(false);
    }
  }, [isSubmit]);

  return (
    <>
      {loading ? (
        <ReactLoading
          type={"cylon"}
          color="rgb(249 115 22)"
          height={667}
          width={375}
          className="mx-auto"
        />
      ) : (
        <div className="flex flex-col mx-auto w-full items-center justify-center my-16">
          <img src={src} alt={src.toString()} className="w-1/3 h-1/3 sm:w-3/4" />
          <p>{children}</p>
        </div>
      )}
    </>
  );
};

export default NotFound;
