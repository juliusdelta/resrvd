import { Field, InputType } from "type-graphql";
import { Length, IsEmail, Validate } from "class-validator";
import { EmailIsUnique } from "./EmailIsUnique";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 45)
  firstName: string

  @Field()
  @Length(1, 45)
  lastName: string

  @Field()
  @IsEmail()
  @Validate(EmailIsUnique)
  email: string

  @Field()
  password: string
}