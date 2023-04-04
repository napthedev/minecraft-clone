import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { FC } from "react";

const FirstPersonView: FC = () => {
  const { camera, gl } = useThree();
  return <PointerLockControls args={[camera, gl.domElement]} />;
};

export default FirstPersonView;
