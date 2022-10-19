export const hashtagSchema = (schema) => {
  return (req, res, next) => {
    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((v) => v.message);
      res.status(422).send(errors);
      return;
    }

    next();
  };
};
