const BASE_URL = 'https://kong-gateway-5295541796.asia-southeast1.run.app/flight-service/api/v1'

export interface City {
  countryName: string
  cityName: string
  cityCode: string
}

interface CityResponse {
  success: boolean
  data: City[]
  timestamp: string
}

export async function fetchCities(): Promise<City[]> {
  const res = await fetch(`${BASE_URL}/cities`)
  if (!res.ok) throw new Error('Failed to fetch cities')
  const json: CityResponse = await res.json()
  return json.data
}
