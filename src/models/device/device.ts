import { EnergyConsumption } from "../energy-consumption/energy-consumption";

export interface Device {
  id: number;
  description: string;
  address: string;
  maximumHourlyEnergyConsumption: number;
  currentHourlyEnergyConsumption?: number;
  userId?: number;
  energyConsumptions?: EnergyConsumption[];
}
