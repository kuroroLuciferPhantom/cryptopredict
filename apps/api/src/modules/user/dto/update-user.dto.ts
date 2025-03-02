import { IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsUrl({}, { message: 'Please provide a valid URL for the image' })
  @IsOptional()
  image?: string;
}
