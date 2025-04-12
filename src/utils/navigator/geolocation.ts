


export async function GetLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Lokasyon Bilgisi Alınamadı. Desteklenmiyor olabilir.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (error) => {
        let errorMessage = 'Lokasyon bilgisi alınırken hata oluştu'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Lokasyon erişimi reddedildi'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Lokasyon bilgisi mevcut değil'
            break
          case error.TIMEOUT:
            errorMessage = 'Lokasyon bilgisi alımı zaman aşımına uğradı'
            break
        }
        reject(new Error(errorMessage))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  })
}
