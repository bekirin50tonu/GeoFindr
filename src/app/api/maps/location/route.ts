import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// API route to get geocode from Google Maps API
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json(
      { error: 'Address is required and must be a string.' },
      { status: 400 }
    )
  }

  const apiKey = searchParams.get('key') || process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'Google Maps API key is missing. Provide it via key query parameter or environment variable.',
      },
      { status: 500 }
    )
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`

  try {
    const response = await axios.get(url)
    if (response.data.status === 'OK') {
      return NextResponse.json(response.data.results, { status: 200 })
    } else {
      return NextResponse.json(
        { error: `Geocoding error: ${response.data.status}` },
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
