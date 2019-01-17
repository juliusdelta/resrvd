import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { Users } from '../../entity/User';
import { MyContext } from '../../types/MyContext';

@Resolver()
export class LoginResolver {
  @Mutation(() => Users)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<Users | undefined> {
    const user = await Users.findOne({ where: { email }})
    if (!user) return undefined;

    const valid = bcrypt.compare(password, user.password);
    if (!valid) return undefined;

    ctx.req.session!.userId = user.id;

    return user;
  }
}
