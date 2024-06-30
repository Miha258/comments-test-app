import { IsNotEmpty, IsEmail, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'Username of the commenter' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Email of the commenter' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Homepage URL of the commenter', required: false })
  @IsOptional()
  @IsUrl()
  homepage?: string;

  @ApiProperty({ description: 'Comment text' })
  @IsNotEmpty()
  text: string;

  @ApiProperty({ description: 'Captcha response' })
  @IsNotEmpty()
  captcha: string;

  @ApiProperty({ description: 'ID of the parent comment', required: false })
  @IsOptional()
  parentId?: number;
}
