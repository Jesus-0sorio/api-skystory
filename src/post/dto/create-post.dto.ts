import { IsEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsEmpty()
  description: string;
  fileName: string;
  @IsEmpty()
  @IsNumber()
  create_by: number;
}
