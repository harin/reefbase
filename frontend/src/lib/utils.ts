
export function calculateMeterPerPixel(lat:number, zoom:number) {
    // console.log(lat, zoom)
    // console.log(Math.cos(lat * Math.PI / 180))
    // console.log(Math.pow(2,zoom))
    const meterPerPixel = 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom)
    return meterPerPixel
  }
