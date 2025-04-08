import { GET } from './route'
import { NextRequest } from 'next/server'

describe('GET /api/maps/location', () => {
  it('should require address parameter', async () => {
    const req = new NextRequest('http://localhost/api/maps/location')
    const response = await GET(req)
    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: 'Required parameters are missing (address)'
    })
  })

  it('should require key parameter', async () => {
    const req = new NextRequest('http://localhost/api/maps/location?address=test')
    const response = await GET(req)
    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: 'Google Maps API key is required. Provide it via key query parameter.'
    })
  })

  it('should return 200 with valid parameters', async () => {
    const req = new NextRequest('http://localhost/api/maps/location?address=test&key=test')
    const response = await GET(req)
    expect(response.status).toBe(200)
  })
})
