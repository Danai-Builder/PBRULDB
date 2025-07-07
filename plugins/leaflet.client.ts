export default defineNuxtPlugin(() => {
  // This plugin only runs on client side due to .client.ts naming
  if (typeof window !== 'undefined') {
    // Import leaflet CSS and JS only on client side
    import('leaflet/dist/leaflet.css')
    import('leaflet').then((L) => {
      // Fix for default markers
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      })
    })
  }
}) 