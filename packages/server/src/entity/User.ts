import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class Users extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ type: "varchar", unique: true, nullable: false, length: 255 })
  email: string;

  @Column()
  password: string;

  // Computed Values
  @Field()
  name(@Root() parent: Users): string {
    return `${parent.firstName} ${parent.lastName}`
  }
}
