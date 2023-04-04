import { useBox } from "@react-three/cannon";
import { FC, useState } from "react";
import { dirtTexture } from "../textures";
import { useStore } from "../hooks/useStore";
import { ThreeEvent } from "@react-three/fiber";

interface CubeProps {
  position: [number, number, number];
}

const Cube: FC<CubeProps> = ({ position }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const { addCube, removeCube } = useStore();

  const handleCubeClicked = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (ref.current?.position) {
      // Left click
      if (e.button === 0) {
        const clickedFace = Math.floor((e.faceIndex || 0) / 2);
        const { x, y, z } = ref.current.position;
        switch (clickedFace) {
          case 0:
            addCube(x + 1, y, z);
            break;
          case 1:
            addCube(x - 1, y, z);
            break;
          case 2:
            addCube(x, y + 1, z);
            break;
          case 3:
            addCube(x, y - 1, z);
            break;
          case 4:
            addCube(x, y, z + 1);
            break;
          case 5:
            addCube(x, y, z - 1);
            break;
          default:
            break;
        }
      } else if (e.button === 2) {
        const { x, y, z } = ref.current.position;
        removeCube(x, y, z);
      }
    }
  };

  return (
    <mesh
      // @ts-ignore
      ref={ref}
      onClick={handleCubeClicked}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerLeave={() => setIsHovered(false)}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? "#c9c9c9" : "white"}
        map={dirtTexture}
        attach="material"
      />
    </mesh>
  );
};

export default Cube;
