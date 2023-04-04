import { FC } from "react";
import { usePlane } from "@react-three/cannon";
import { grassTexture } from "../textures";
import { useStore } from "../hooks/useStore";

const Ground: FC = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  const { addCube, cubes } = useStore();

  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((item) =>
          Math.round(item)
        );
        addCube(x, y <= 0 ? 0 : y, z);
      }}
      // @ts-ignore
      ref={ref}
    >
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={grassTexture} />
    </mesh>
  );
};

export default Ground;
