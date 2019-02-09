export default {
  methods: {
    errorHandler: function(error, validationErrors) {
      if (error.response.data.errors) {
        const errorMessages = error.response.data.errors;
        for (const key in errorMessages) {
          if (errorMessages.hasOwnProperty(key)) {
            const errorMessage = errorMessages[key];
            validationErrors.push(errorMessage[0]);
          }
        }
      } else {
        validationErrors.push(error.response.data);
      }
    }
  }
};
