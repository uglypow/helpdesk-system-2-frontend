import { FC } from "react";
import { useBearStore } from "../store/store";

const About: FC = () => {
  const bears = useBearStore((state) => state.bears);

  const increasePopulation = useBearStore((state) => state.increasePopulation);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1>{bears} around here ...</h1>
      <button onClick={increasePopulation}>one up</button>
    </div>
  );
};

export default About;
