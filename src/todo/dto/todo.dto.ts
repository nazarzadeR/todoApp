import {
    IsHexColor,
    IsString,
    IsNotEmpty,
    IsBoolean,
    IsOptional,
    IsDateString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OmitType, PickType } from '@nestjs/mapped-types';

class TagDto {
    @IsNotEmpty({ message: 'Tag name is not be empty' })
    @IsString({ message: 'Tag name must be string' })
    readonly name: string;

    @IsNotEmpty({ message: 'Tag description is not be empty' })
    @IsString({ message: 'Tag description must be string' })
    readonly description: string;
}

class ReminderDto {
    @IsNotEmpty({ message: 'Reminder start is not be empty' })
    @IsString({ message: 'Reminder start must be string' })
    readonly start: string;

    @IsNotEmpty({ message: 'Reminder end is not be empty' })
    @IsString({ message: 'Reminder end must be string' })
    readonly end: string;
}

export class TodoCreateDto {
    @IsNotEmpty({ message: 'Todo title is not be empty' })
    @IsString({ message: 'Todo title must be string' })
    readonly title: string;

    @IsNotEmpty({ message: 'Todo title is not be empty' })
    @IsString({ message: 'Todo title must be string' })
    readonly description: string;

    @IsNotEmpty({ message: 'Todo color is not be empty' })
    @IsHexColor({ message: 'Todo color must be string' })
    readonly color: string;

    @IsOptional()
    @IsBoolean({ message: 'Endless property must be boolean type' })
    readonly endless?: boolean;

    @IsOptional()
    @IsDateString()
    readonly endOfTheTime?: string;

    @IsOptional()
    @Type(() => TagDto)
    @ValidateNested({ each: true })
    readonly tags?: TagDto[];

    @IsOptional()
    @Type(() => ReminderDto)
    @ValidateNested({ each: true })
    readonly reminder?: ReminderDto;
}

export class UpdateTodoDto extends OmitType(TodoCreateDto, [
    'title',
    'color',
    'description',
] as const) {
    @IsOptional()
    @IsString({ message: 'Todo title must be string' })
    readonly title: string;

    @IsOptional()
    @IsString({ message: 'Todo description must be string' })
    readonly description: string;

    @IsOptional()
    @IsHexColor({ message: 'Todo color must be string' })
    readonly color: string;
}

export class AddTodoDto extends PickType(UpdateTodoDto, ['title'] as const) {}
