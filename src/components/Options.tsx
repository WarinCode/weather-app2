import { JSX, FC } from "react";
interface OptionsProps {
  key: number;
  id: string;
  value: string;
  content: string;
}

const Options: FC<OptionsProps> = ({ key, id , value, content }): JSX.Element => {;  
  return (
    <option value={value} key={key} id={id}>
      {content}
    </option>

  );
};

export default Options;
