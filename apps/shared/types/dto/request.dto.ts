import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsObject,
} from 'class-validator';

enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
export class RequestDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(RequestMethod)
  method: RequestMethod;

  @IsObject()
  @IsOptional()
  headers?: Record<string, string>;

  @IsString()
  @IsOptional()
  body?: Record<string, any>;
}
