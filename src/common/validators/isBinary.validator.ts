import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isBinaryArray', async: false })
export class IsBinaryArrayConstraint implements ValidatorConstraintInterface {
    validate(images: any[], args: ValidationArguments) {
        if (!Array.isArray(images)) {
            return false;
        }
        for (const image of images) {
            if (!(image instanceof Buffer)) {
                return false;
            }
        }
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Each element of the images array must be binary data (Buffer).';
    }
}