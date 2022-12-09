import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
	id: number

    @Column({ type: 'text', unique: true })
	email: string

    @Column({ type: 'text' })
	password: string

    @Column({ default: true })
	active: boolean

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}