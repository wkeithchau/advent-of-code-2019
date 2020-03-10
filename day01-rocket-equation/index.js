import { getInput } from "../input.js";

const fuelRequired = mass => {
  return Math.floor(mass / 3) - 2;
};

const addedFuelRequired = mass => {
  let fuel = fuelRequired(mass);

  if (fuel > 0) {
    fuel += addedFuelRequired(fuel);
  }
  return Math.max(fuel, 0);
};

const part1 = () => {
  const moduleMasses = getInput(import.meta.url);

  let totalFuel = 0;
  moduleMasses.forEach(mass => {
    const fuel = fuelRequired(mass);
    totalFuel += fuel;
  });

  console.log(
    `Sum of the fuel requirements for all of the modules on your spacecraft: ${totalFuel}`
  );
  return totalFuel;
};

const part2 = () => {
  const moduleMasses = getInput(import.meta.url);

  let totalFuel = 0;
  moduleMasses.forEach(mass => {
    const fuel = addedFuelRequired(mass);
    totalFuel += fuel;
  });

  console.log(`Taking into account the mass of added fuel: ${totalFuel}`);
  return totalFuel;
};

part1();
part2();
