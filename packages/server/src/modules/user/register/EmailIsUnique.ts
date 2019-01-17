import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { Users } from "../../../entity/User";

@ValidatorConstraint({ name: "EmailIsUnique", async: false })
export class EmailIsUnique implements ValidatorConstraintInterface {
  validate(email: string) {
    const user = Users.findOne({ where: { email } });
    if (user) return false;
    return true;
  }

  defaultMessage() {
    return "Email already exists!";
  }
}
