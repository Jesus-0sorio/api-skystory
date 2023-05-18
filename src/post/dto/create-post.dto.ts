import { IsEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsEmpty()
  description: string;
  fileName: string;
  @IsEmpty()
  create_by: string;
}
