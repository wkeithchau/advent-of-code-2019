import { getInput } from "../input";
import { advanceFuelRequired, totalFuel } from "./fuel";

const INPUT = getInput(import.meta.url);
const MODULE_MASSES = INPUT.map(data => Number(data));

const part1 = () => {
  const fuel = totalFuel(MODULE_MASSES);
  console.log(
    `Sum of the fuel requirements for all of the modules on your spacecraft: ${fuel}`
  );
};

const part2 = () => {
  const fuel = totalFuel(MODULE_MASSES, advanceFuelRequired);
  console.log(`Taking into account the mass of added fuel: ${fuel}`);
};

part1();
part2();
