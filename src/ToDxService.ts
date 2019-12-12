export type P = { lat: number, lng: number };

export type Spot = {
  name: string;
  category?: string;
  position: P;
  description?: string;
  url?: string;
  recommendedStayMinutes?: number;
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

export async function fetchSpots2(p: P): Promise<Array<Spot>> {
  return fetch("https://todx-api.herokuapp.com/get/recommend" +
    `?latitude=${p.lat}` +
    `&longitude=${p.lng}` +
    `&seconds=360000` +
    `&departure_time=1200`)
    .then(res => res.json())
    .then(spots => {
      return spots.map((s: any) => {
        return {
          name: s.name,
          category: s.category,
          position: {
            lat: parseFloat(s.latitude),
            lng: parseFloat(s.longitude)
          },
          url: s.url
        }
      })
    });
}


export type Route = {
  mode: "WALK" | "BUS" | "FERRY";
  polyline: string;
}

export async function fetchRoutes(from: P, to: P, departure: Date): Promise<any> {
  const isoTime = departure.toISOString();
  return fetch("https://api.ottop.org/transit/routes?" +
    `origin_latitude=${from.lat}&origin_longitude=${from.lng}` +
    `&dest_latitude=${to.lat}&dest_longitude=${to.lng}` +
    `&departure_time=${isoTime.slice(0, isoTime.length - 8)}`,
    {
      method: 'GET',
      headers: {apiKey: process.env.VUE_APP_OTTOP_API_KEY}
    })
    .then(res => res.json())
    .then(res => {
      const legs: Array<Route> = [];
      if (!res || res.routes.length === 0) return legs;

      res.routes[0].legs.forEach((l: any) => {
        legs.push({
          mode: l.mode,
          polyline: l.polyline.points
        })
      });
      return legs;
    })
}