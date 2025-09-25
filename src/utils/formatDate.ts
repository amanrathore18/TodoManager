/**
 * Format date as "hh:mm AM/PM • MM/DD/YYYY"
 * Example: "02:15 PM • 09/25/2025"
 */
export const formatDateTime = (date: Date): string => {
  const time = new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const day = new Date(date).toLocaleDateString();

  return `${time} • ${day}`;
};
