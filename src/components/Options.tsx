import { JSX, FC } from "react";
interface OptionsProps {
  key: number;
  value: string;
  content: string;
}

const Options: FC<OptionsProps> = ({key, value, content }): JSX.Element => {;  
  return (
    <option value={value} key={key * Math.random()}>
      {content}
    </option>

  );
};

export default Options;
