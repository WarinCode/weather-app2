import { JSX } from "react";

const Footer = ():JSX.Element => {
  return (
    <footer
      className="flex items-center justify-center w-screen h-24 bg-gray-900 shadow-2xl mt-16"
    >
      <h1 className="ms-2.5 text-xl font-bold capitalize mx-2 cursor-default">
        &copy; all right reserved {new Date().getFullYear()}
      </h1>
    </footer>
  );
};

export default Footer;
