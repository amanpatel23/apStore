
function TruncatedName({ name, maxLen }) {
  const MAX_NAME_LENGTH = maxLen; // Maximum number of characters for the product name

  const truncatedName =
    name.length > MAX_NAME_LENGTH
      ? name.slice(0, MAX_NAME_LENGTH) + "..."
      : name;

  return truncatedName;
}

export default TruncatedName;
