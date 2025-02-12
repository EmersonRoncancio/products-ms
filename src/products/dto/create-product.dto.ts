import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Type(() => Number)
  price: string;

  @IsBoolean()
  active: boolean;
}
