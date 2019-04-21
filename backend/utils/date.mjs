export const toFormattedDateString = (date) => {
  return date.toISOString().slice(0, 10);
};

const isValidDate = /[0-9]+(-[0-9]+){0,2}/;

// checks if a date is valid
export const validate = (dateString) => isValidDate.test(dateString);