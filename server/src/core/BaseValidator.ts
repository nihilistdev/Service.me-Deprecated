import validator from "validator";

export type FieldTypes = {
  name: string;
  value: any;
  required: boolean;
  email?: boolean;
};

export class BaseValidator {
  constructor(
    private readonly fields: FieldTypes[],
    private readonly errors: ErrorValidation[] = []
  ) {}

  // Rewrite validation
  validate(): ErrorValidation[] {
    Array.from(this.fields).map((el: FieldTypes) => {
      switch (typeof el.value) {
        case "number":
          validator.isNumeric(el.value.toString()) ||
            this.errors.push({
              el: `${el.name}:${typeof el.value} is not number`,
            });
          if (el.required) {
            !validator.isEmpty(el.value.toString()) ||
              this.errors.push({
                el: `${el.name}:${typeof el.value} is empty`,
              });
          }
          break;
        case "string":
          if (el.email) {
            validator.isEmail(el.value) ||
              this.errors.push({
                el: `${el.name}:${typeof el.value} is not email`,
              });
            !validator.isEmpty(el.value) ||
              this.errors.push({
                el: `${el.name}:${typeof el.value} is cannot be empty`,
              });
          }
          if (el.required)
            !validator.isEmpty(el.value) ||
              this.errors.push({
                el: `${el.name}:${typeof el.value} is empty`,
              });
      }
    });
    return this.errors;
  }
}
