import { dirtImg, grassImg } from "./images/images";
import { TextureLoader, RepeatWrapping, NearestFilter } from "three";

export const dirtTexture = new TextureLoader().load(dirtImg);
export const grassTexture = new TextureLoader().load(grassImg);

grassTexture.magFilter = NearestFilter;
grassTexture.wrapS = RepeatWrapping;
grassTexture.wrapT = RepeatWrapping;
grassTexture.repeat.set(100, 100);

dirtTexture.magFilter = NearestFilter;
