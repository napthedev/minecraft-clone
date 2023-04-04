import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

const SPEED = 4;
const JUMP_POWER = 5;

const Player: FC = () => {
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 0.5, 0],
  }));

  const vel = useRef([0, 0, 0]);
  const pos = useRef([0, 0.5, 0]);

  const actions = useKeyboard();

  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);
  useEffect(() => {
    api.velocity.subscribe((p) => (vel.current = p));
  }, [api.velocity]);

  useFrame(() => {
    camera.position.copy(new Vector3(...pos.current));

    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      +actions.moveBackward - +actions.moveForward
    );
    const sideVector = new Vector3(
      +actions.moveLeft - +actions.moveRight,
      0,
      0
    );
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (actions.jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], JUMP_POWER, vel.current[2]);
    }
  });

  return (
    // @ts-ignore
    <mesh ref={ref}>
      <sphereGeometry attach="geometry" args={[0.1]} />
      <meshStandardMaterial attach="material" color="red" />
    </mesh>
  );
};

export default Player;
