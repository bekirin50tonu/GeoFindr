import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// API route to get nearby places from Google Maps API
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const type = searchParams.get('type')
  const maxResults = searchParams.get('maxResults')
  const radius = searchParams.get('radius')

  if (!lat || !lng || !type || !radius) {
    return NextResponse.json(
      { error: 'Required parameters are missing (lat, lng, type, radius)' },
      { status: 400 }
    )
  }

  const apiKey = searchParams.get('key')
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'Google Maps API key is required. Provide it via key query parameter.',
      },
      { status: 400 }
    )
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&type=${type}&radius=${radius}&key=${apiKey}`

  try {
    const response = await axios.get(url)
    if (response.data.status === 'OK') {
      const results = maxResults
        ? response.data.results.slice(0, Number(maxResults))
        : response.data.results
      return NextResponse.json(results, { status: 200 })
    } else {
      return NextResponse.json(
        { error: `Nearby search error: ${response.data.status}` },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
