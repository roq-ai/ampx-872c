const mapping: Record<string, string> = {
  'car-owners': 'car_owner',
  'charging-requests': 'charging_request',
  'charging-sessions': 'charging_session',
  providers: 'provider',
  'service-vehicles': 'service_vehicle',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
