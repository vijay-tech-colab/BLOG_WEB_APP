const readbleDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString("en-Us", {
    year: "numeric",
    month: "long", // August
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // AM/PM
  });
};

export default readbleDate;