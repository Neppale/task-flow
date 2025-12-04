import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsOptional,
  IsObject,
} from 'class-validator';

export class RequestDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

  @IsObject()
  @IsOptional()
  headers?: Record<string, string>;

  @IsString()
  @IsOptional()
  body?: string;
}
