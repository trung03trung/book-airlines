const BASE_URL = 'https://kong-gateway-5295541796.asia-southeast1.run.app/flight-service/api/v1'

export interface Airport {
  countryName: string
  cityName: string
  airportName: string
  iataCode: string
  icaoCode: string | null
}

interface AirportResponse {
  success: boolean
  data: Airport[]
  timestamp: string
}

export async function fetchAirports(): Promise<Airport[]> {
  const res = await fetch(`${BASE_URL}/airports`)
  if (!res.ok) throw new Error('Failed to fetch airports')
  const json: AirportResponse = await res.json()
  return json.data
}
