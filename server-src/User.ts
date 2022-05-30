import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({
        unique: false,
        length: 24,
        type: "varchar"
    })
    username: string;
}
