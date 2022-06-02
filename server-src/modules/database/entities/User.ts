import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@Column()
	username: string;

	@Column()
	discordId: string;

	@Column()
	discordAvatarId: string;

	@Column()
	lastIp: string;

	@Column()
	hwidHash: string;

	@Column()
	hwidHashEx: string;

	@CreateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
	})
	public created_at: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
		onUpdate: "CURRENT_TIMESTAMP(6)",
	})
	public updated_at: Date;
}
