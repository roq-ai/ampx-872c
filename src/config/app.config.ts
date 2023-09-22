interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Service Vehicle Operator', 'EV Car Owner'],
  tenantName: 'Provider',
  applicationName: 'AMPX',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage users',
    'Manage providers',
    'Manage car owners',
    'Manage service vehicles',
    'Manage charging requests',
    'Manage charging sessions',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/40daaaf7-aae4-4a5a-8511-eca036372262',
};
