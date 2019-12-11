export type P = { lat: number, lng: number };

export type Spot = {
  name: string;
  position: P;
  description?: string;
  url?: string;
}

export async function fetchSpots(p: P): Promise<Array<Spot>> {
  return fetch(`https://api.ottop.org/tourist/spots?latitude=${p.lat}&longitude=${p.lng}&distance=10`,
    {
      method: 'GET',
      headers: {apiKey: process.env.VUE_APP_OTTOP_API_KEY}
    })
    .then(res => res.json())
    .then(spots => {
      return spots.map((s: any) => {
        return {
          name: s.name,
          position: {
            lat: s.geo.latitude,
            lng: s.geo.longitude
          },
          url: s.url
        }
      })
    });
}