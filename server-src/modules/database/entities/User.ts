import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { AddEntity } from "../add-entity.decorator";

@AddEntity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@Column({
		unique: false,
		length: 24,
		type: "varchar",
	})
	username: string;
}
