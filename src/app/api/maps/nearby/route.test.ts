import { GET } from './route'
import { NextRequest } from 'next/server'

describe('GET /api/maps/nearby', () => {
  it('should require all parameters', async () => {
    const req = new NextRequest('http://localhost/api/maps/nearby')
    const response = await GET(req)
    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: 'Required parameters are missing (lat, lng, type, radius)'
    })
  })

  it('should require key parameter', async () => {
    const req = new NextRequest(
      'http://localhost/api/maps/nearby?lat=1&lng=1&type=test&radius=1000'
    )
    const response = await GET(req)
    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: 'Google Maps API key is required. Provide it via key query parameter.'
    })
  })

  it('should return 200 with valid parameters', async () => {
    const req = new NextRequest(
      'http://localhost/api/maps/nearby?lat=1&lng=1&type=test&radius=1000&key=test'
    )
    const response = await GET(req)
    expect(response.status).toBe(200)
  })
})
