import { getInput } from "../input.mjs";

const fuelRequired = mass => {
  return Math.floor(mass / 3) - 2;
};

const input = getInput(import.meta.url);
console.log(input);
