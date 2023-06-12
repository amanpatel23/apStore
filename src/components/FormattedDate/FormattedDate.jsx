function FormattedDate({ date }) {
  const currentDate = new Date(date);
  const year = String(currentDate.getFullYear());
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export default FormattedDate;
