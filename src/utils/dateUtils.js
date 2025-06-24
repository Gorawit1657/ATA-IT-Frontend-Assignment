export const formatDate = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const isDateInRange = (date, fromDate, toDate) => {
  if (!date) return false;
  const checkDate = new Date(date);
  if (fromDate && checkDate < fromDate) return false;
  if (toDate && checkDate > toDate) return false;
  return true;
};