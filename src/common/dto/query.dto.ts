import { Transform, TransformFnParams } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsOptional } from 'class-validator';

type Populate = Record<string, string | Record<string, boolean>>;
type TransformFnFields = {
  obj: { populate: Populate };
  value: string;
};

const splitAndMapFields = (fieldsStr: string): Record<string, any> =>
  fieldsStr.split(',').filter(Boolean);

function transformPopulate({ value }: TransformFnParams) {
  for (const [key, val] of Object.entries(value)) {
    if (['true', 'true,'].includes(val as string)) {
      value[key] = true;
      continue;
    } else {
      value[key] = splitAndMapFields(val as string);
    }
  }
  return value;
}

function transformFields({ value }: TransformFnFields): Record<string, any> {
  return splitAndMapFields(value);
}

export class QueryObjectDto {
  @Transform((values) => transformPopulate(values))
  @IsOptional()
  @IsObject()
  populate?: Record<string, string | string[] | boolean>;

  @Transform((values) => transformFields(values))
  @IsOptional()
  @IsArray()
  fields?: string | string[];

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  limit?: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsObject()
  filter?: Record<string, string>;

  @IsOptional()
  @IsObject()
  order?: Record<string, 'ASC' | 'DESC' | 'asc' | 'desc'>;
}
