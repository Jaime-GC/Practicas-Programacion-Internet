//getweather.ts
type Weather = {
  ciudad: string;
  temperature: number;
  description: string;
};

import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts";
const env = await load();

export const getWeather = async (ciudad: string): Promise<Weather> => {
  const BASE_URL = "http://api.weatherapi.com/v1";

  const WEATHERAPI_API_KEY = env["WEATHERAPI_API_KEY"] || Deno.env.get("WEATHERAPI_API_KEY");

  if (!WEATHERAPI_API_KEY) {
    throw new Error("WEATHERAPI_API_KEY is not defined");
  }

  const url = `${BASE_URL}/current.json?key=${WEATHERAPI_API_KEY}&q=${ciudad}`;

  const response = await fetch(url);

  if (response.status !== 200) {
    throw new Error("Cannot fetch weather");
  }
  
  const data = await response.json();
  return {
    ciudad,
    temperature: data.current.temp_c,
    description: data.current.condition.text,
  };
};
