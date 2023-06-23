// Define a helper function to validate email format
export const validateEmail = (email) => {
    // Use a regular expression to check if the email is valid
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
};