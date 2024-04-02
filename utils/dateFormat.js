// Define a utility function 'dateFormat' that formats Date objects
const dateFormat = (date) => {
  // Convert the input 'date' into a more readable string format
  return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric', // Display the year as a four-digit number
      month: 'long', // Display the month as its full name (e.g., January, February)
      day: 'numeric', // Display the day as a number
      hour: '2-digit', // Display the hour in 2-digit format
      minute: '2-digit', // Display the minute in 2-digit format
      second: '2-digit', // Display the second in 2-digit format
      hour12: true, // Use 12-hour format (AM/PM) instead of 24-hour format
  });
};

// Export the 'dateFormat' function to make it available for import in other files
module.exports = dateFormat;
