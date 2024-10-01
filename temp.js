const error = {
  errors: {
    email: {
      name: "ValidatorError",
      message: "Path `email` is required.",
      properties: {
        message: "Path `email` is required.",
        type: "required",
        path: "email",
      },
      kind: "required",
      path: "email",
    },
    age: {
      name: "ValidatorError",
      message: "Path `age` is required.",
      properties: {
        message: "Path `age` is required.",
        type: "required",
        path: "age",
      },
      kind: "required",
      path: "age",
    },
    name: {
      name: "ValidatorError",
      message: "Name must be at most 255 characters long.",
      properties: {
        message: "Name must be at most 255 characters long.",
        type: "maxlength",
        maxlength: 3,
        path: "name",
        value: "sdfffffd",
      },
      kind: "maxlength",
      path: "name",
      value: "sdfffffd",
    },
    numb: {
      name: "ValidatorError",
      message: "Price must be at least 1.",
      properties: {
        message: "Price must be at least 1.",
        type: "min",
        min: 1,
        path: "numb",
        value: 0,
      },
      kind: "min",
      path: "numb",
      value: 0,
    },
  },
  _message: "brands validation failed",
  name: "ValidationError",
  message:
    "brands validation failed: email: Path `email` is required., age: Path `age` is required., name: Name must be at most 255 characters long., numb: Price must be at least 1.",
};

//


 
