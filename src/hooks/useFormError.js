// Helper Functions
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password) => password.length >= 8; // Example validation
const validatePostal = (postal) => /^[0-9]{5,6}$/.test(postal); // Example for postal code (US)
const validateDate = (date) => !isNaN(new Date(date).getTime()); // Simple date validation

// Form Validator
export const useFormError = (fieldDetail, formData) => {
  let errors = {};

  fieldDetail.forEach((field) => {
    const value = formData[field.field];

    // Check if the field is required and missing
    if (field.required && (!value || value.trim() === '')) {
      errors[field.field] = `${field.label} is required.`;
    } else {
      // Check field type-specific validation
      if (field.type === 'email' && value && !validateEmail(value)) {
        errors[field.field] = 'Please enter a valid email address.';
      } else if (
        field.type === 'password' &&
        value &&
        !validatePassword(value)
      ) {
        errors[field.field] = 'Password must be at least 8 characters long.';
      } else if (field.type === 'postal' && value && !validatePostal(value)) {
        errors[field.field] = 'Postal code must be 5-6 digits.';
      } else if (field.type === 'date' && value && !validateDate(value)) {
        errors[field.field] = 'Please enter a valid date.';
      }
    }
  });
  return errors;
};
