import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/user.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttributes {
  value: string;
  description: string;
}

@Table({ tableName: "roles" })
export class Role extends Model<Role, RoleCreationAttributes> {
  @ApiProperty({example: 'f327313k8', description: 'Unique identificatior'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example: 'ADMIN', description: 'User role value'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  @ApiProperty({example: 'Administrator', description: 'Role description'})
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}