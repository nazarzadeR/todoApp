import { PickType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';

export class UserSignDto {
    @IsNotEmpty({ message: 'Username is must be not empty' })
    @IsString({ message: 'Username must be string type' })
    readonly username: string;

    @IsNotEmpty({ message: 'Username is must be not empty' })
    @IsString({ message: 'Username must be string type' })
    password: string;
}

export class UserUpdateDto extends PickType(UserSignDto, [
    'username',
] as const) {}
