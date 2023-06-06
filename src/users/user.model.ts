import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";

interface UserCreationAttributes {
  email: string;
  password: string
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({example: 'f327313k8', description: 'Unique identificatior'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example: 'hello.world@gmail.com', description: 'Email adress'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({example: 'af&31afsFzX8,1', description: 'Password'})
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]
}