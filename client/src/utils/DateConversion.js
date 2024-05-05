export default function DateConversion(timestamp) {
  const dateObj = new Date(timestamp);

  // Extract date components
  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);

  // Extract time components
  const hours = ("0" + dateObj.getHours()).slice(-2);
  const minutes = ("0" + dateObj.getMinutes()).slice(-2);

  // Format time as XX:YY
  const time = `${hours}:${minutes}`;

  // Formatted day
  const date = `${year}-${month}-${day}`;

  return { date, time };
}
// Convert timestamp to Date object
