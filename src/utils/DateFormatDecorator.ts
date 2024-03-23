import {
  registerDecorator,
  ValidationOptions,
  IsDefined,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export function IsDateStringFormat(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    IsDefined()(object, propertyName);
    Transform((params: TransformFnParams) => String(params.value))(
      object,
      propertyName,
    );
    registerDecorator({
      name: 'isDateStringFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate: (value: string) => {
          // Check if the date string matches the format 'DD-MM-YYYY'
          const match = /^(\d{2})-(\d{2})-(\d{4})$/.test(value);
          if (!match) {
            return false;
          }

          // Parse the date parts
          const parts = value.split('-');
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const year = parseInt(parts[2], 10);

          // Check the ranges of day, month, and year
          if (
            year < 1000 ||
            year > 3000 ||
            month < 1 ||
            month > 12 ||
            day < 1 ||
            day > 31
          ) {
            return false;
          }

          // Check for February (leap years are taken into account)
          if (month == 2) {
            if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
              return day <= 29;
            } else {
              return day <= 28;
            }
          }

          // Check the days in the month
          return ![4, 6, 9, 11].includes(month) || day <= 30;
        },
        defaultMessage: () => {
          return 'Date must be in the format DD-MM-YYYY';
        },
      },
    });
  };
}
