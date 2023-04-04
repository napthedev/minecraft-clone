import { FC } from "react";
import { useStore } from "../hooks/useStore";
import Cube from "./Cube";

const Cubes: FC = () => {
  const cubes = useStore((store) => store.cubes);

  return (
    <>
      {cubes.map((cube) => (
        <Cube key={cube.key} position={cube.pos} />
      ))}
    </>
  );
};

export default Cubes;
