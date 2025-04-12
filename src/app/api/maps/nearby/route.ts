import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// API route to get nearby places from Google Maps API
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const types = searchParams.get('types')
  const maxResults = searchParams.get('maxResults')
  const radius = searchParams.get('radius')

  if (!lat || !lng || !types || !radius || !maxResults) {
    return NextResponse.json(
      { error: 'Required parameters are missing (lat, lng, type, radius,maxResults)' },
      { status: 400 }
    )
  }

  const typesArray = types.split(",")
  if (typesArray.length === 0) {
    return NextResponse.json(
      { error: 'At least one valid type must be provided' },
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

  const url = `https://places.googleapis.com/v1/places:searchNearby`



  try {
    const params = {
      "includedTypes": [...typesArray],
      "maxResultCount": maxResults,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": lat,
            "longitude": lng
          },
          "radius": radius
        }
      },
      "languageCode": "tr"
    }
    console.log("gelen", params);
    const response = await axios.post(url, params, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "*"
      }
    })
    if (response.status === 200) {
      return NextResponse.json(response.data.places, { status: 200 })
    } return NextResponse.json(
      { error: `Nearby search error: ${response.statusText}` },
      { status: 400 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' + error },
      { status: 500 }
    )
  }
}
