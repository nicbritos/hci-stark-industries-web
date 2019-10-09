const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 60;
const VALID_CHARACTERS = "A-Z, a-z, 0-9, _ and spaces";
const NAME_REGEX = /^[A-Za-z0-9_ ]*$/;

export default {
  MIN_NAME_LENGTH: MIN_NAME_LENGTH,
  MAX_NAME_LENGTH: MAX_NAME_LENGTH,

  validateName(name, fieldName) {
    let errors = [];
    if (typeof name !== "string" || name.length === 0) {
      errors.push(fieldName + " is required");
      return errors;
    }
    if (name.length < MIN_NAME_LENGTH) {
      errors.push(
        fieldName +
          " is too short. It needs to be at least " +
          MIN_NAME_LENGTH +
          " characters long"
      );
    } else if (name.length > MAX_NAME_LENGTH) {
      errors.push(
        fieldName +
          " is too long. It needs to be at most " +
          MAX_NAME_LENGTH +
          " characters long"
      );
    }
    if (!name.match(NAME_REGEX)) {
      errors.push(
        fieldName +
          " contains invalid characters. Valid ones are: " +
          VALID_CHARACTERS
      );
    }

    return errors;
  }
};
