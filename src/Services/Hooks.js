import React, {useState} from "react";
// A custom hook to handle form input changes
export const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return { value, onChange: handleChange };
};

// A custom hook to handle cars form validation errors
export const useFormErrors = () => {
    const [errors, setErrors] = useState({});
    const validate = (values) => {
        let errors = {};
        // Check if the values are valid and set the errors accordingly
        if (!values.model) {
            errors.model = "Model is required";
        }
        if (!values.make) {
            errors.make = "Make is required";
        }
        if (!values.color) {
            errors.color = "Color is required";
        }
        if (!values.registrationNo) {
            errors.registrationNo = "Registration number is required";
        }
        if (!values.categoryId) {
            errors.category = "Category is required";
        }
        // Set the errors state
        setErrors(errors);
        // Return true if there are no errors, false otherwise
        return Object.keys(errors).length === 0;
    };
    return { errors, validate };
};

// A custom hook to handle Category Form Validation errors
export const useCatErrors = () => {
    const [errors, setErrors] = useState({});
    const validate = (values) => {
        let errors = {};
        if (!values.name) {
            errors.name = "Name is required";
        }
        
        // Set the errors state
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    return { errors, validate };
};

