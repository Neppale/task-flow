/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { BadRequestException, Injectable } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidateObjectService {
  /**
   * Validates an object against a class definition using class-validator decorators.
   * Automatically checks for required fields based on decorators like @IsNotEmpty(), @IsString(), etc.
   *
   * @param classConstructor - The class constructor to validate against
   * @param objectToValidate - The object to validate
   * @throws BadRequestException if validation fails
   */
  async validate<T extends object>(
    classConstructor: new () => T,
    objectToValidate: Record<string, any>,
  ): Promise<void> {
    const classInstance = plainToClass(classConstructor, objectToValidate);

    const errors: ValidationError[] = await validate(classInstance, {
      whitelist: true,
      forbidNonWhitelisted: false,
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      const errorMessages = this.formatValidationErrors(errors);
      throw new BadRequestException({
        message: 'Validation failed',
        errors: errorMessages,
      });
    }
  }

  /**
   * Formats validation errors into a readable array of messages.
   */
  private formatValidationErrors(errors: ValidationError[]): string[] {
    const messages: string[] = [];

    errors.forEach((error) => {
      if (error.constraints) {
        Object.values(error.constraints).forEach((message) => {
          messages.push(`${error.property}: ${message as string}`);
        });
      }

      if (error.children && error.children.length > 0) {
        const nestedMessages = this.formatValidationErrors(error.children);
        nestedMessages.forEach((msg) => {
          messages.push(`${error.property}.${msg}`);
        });
      }
    });

    return messages;
  }
}
