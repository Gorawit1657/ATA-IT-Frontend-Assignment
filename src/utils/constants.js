export const PERIODS = [
  { value: 'transmission', label: 'Transmission' }
];

export const STATUSES = [
  { value: 'waiting', label: 'Waiting' }
];


export const TABLE_COLUMNS = {
  DESKTOP: [
    'Account', 'Operation', 'Symbol', 'Description', 'Qty.', 'Filled Qty', 
    'Price', 'Status', 'Date', 'Expiration', 'No. Ref.', 'Ext. Ref.'
  ],
  MOBILE: ['Account', 'Operation', 'Symbol', 'Status'] //  For mobile screens
};

export const RESPONSIVE_BREAKPOINT = 768;