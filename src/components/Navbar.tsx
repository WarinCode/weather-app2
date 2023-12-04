import { JSX } from "react";
import reactLogo from "../assets/react.svg";
import Swal from "sweetalert2";
import withReactContent, { ReactSweetAlert } from "sweetalert2-react-content";

const MySwal: ReactSweetAlert = withReactContent(Swal);

const Navbar = (): JSX.Element => {
  const showDetails = (): void => {
    MySwal.fire({
      title: (
        <h2 id="show-react" className="capitalize font-bold">
          react-project
        </h2>
      ),
      text: "โปรเจคนี้ทำเกี่ยวกับการค้นหาสภาพอากาศในแต่ละพื้นที่ต่างๆบนโลกโดยการค้นหาด้วยชื่อเมือง",
      imageUrl: reactLogo,
      imageHeight: "90px",
      imageWidth: "90px",
      showConfirmButton: false,
      imageAlt: reactLogo.toString(),
      footer: 
        <footer>
          ติดตามผลงานต่างๆได้ที่&nbsp;
          <a
            href="https://github.com/varincode"
            // style={{ color: "rgb(103 232 249)" }}
            className="text-cyan-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com
          </a>
        </footer>
      ,
    });
  };

  return (
    <nav
      className="flex items-center justify-center w-screen h-24 bg-gray-900 shadow-xl"
      onClick={showDetails}
    >
      <img src={reactLogo} className="h-12 transition-all" alt="react logo" />
      <h1 className="ms-2.5 text-xl font-bold capitalize mx-2 cursor-default">
        react-project
      </h1>
    </nav>
  );
};

export default Navbar;
