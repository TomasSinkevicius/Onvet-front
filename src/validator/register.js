import validator from "validator";
import { isEmpty } from "lodash";

export const validateAndSanitizeRegisterForm = (data) => {
  let errors = {};
  let sanitizedData = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password_confirmation = !isEmpty(data.password_confirmation)
    ? data.password_confirmation
    : "";

  const addErrorAndSanitizedData = (
    fieldName,
    errorContent,
    min,
    max,
    type = "",
    required
  ) => {
    /**
     * Please note that this isEmpty() belongs to validator and not our custom function defined above.
     *
     * Check for error and if there is no error then sanitize data.
     */

    if (data.terms === false) {
      errors[fieldName] = `Prašome sutikti su sąlygomis`;
    }

    if (!validator.isLength(data[fieldName], { min, max })) {
      errors[
        fieldName
      ] = `${errorContent} turi būti nuo ${min} iki ${max} simbolių`;
    }

    if ("email" === type && !validator.isEmail(data[fieldName])) {
      errors[fieldName] = `${errorContent} netinkamas`;
    }

    if (data.password != data.password_confirmation) {
      errors[fieldName] = `Slaptažodžiai nesutampa`;
    }

    if (required && validator.isEmpty(data[fieldName])) {
      errors[fieldName] = `${errorContent} yra privalomas`;
    }

    // If no errors
    if (!errors[fieldName]) {
      sanitizedData[fieldName] = validator.trim(data[fieldName]);
      sanitizedData[fieldName] =
        "email" === type
          ? validator.normalizeEmail(sanitizedData[fieldName])
          : sanitizedData[fieldName];
      sanitizedData[fieldName] = validator.escape(sanitizedData[fieldName]);
    }
  };

  addErrorAndSanitizedData("name", "Vardas", 2, 35, "string", true);
  addErrorAndSanitizedData("email", "Email", 5, 50, "email", true);
  addErrorAndSanitizedData("password", "Slaptažodis", 6, 35, "string", true);
  addErrorAndSanitizedData(
    "password_confirmation",
    "Slaptažodis",
    6,
    35,
    "string",
    true
  );

  return {
    sanitizedData,
    errors,
    isValid: isEmpty(errors),
  };
};
