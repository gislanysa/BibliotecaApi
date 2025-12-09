import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Livro {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    titulo!: string;

    @Column()
    autor!: string;

    @Column({ nullable: true, default: '' })
    isbn!: string;

    @Column({ nullable: true })
    anoPublicacao!: number;

    @Column({ default: true })
    disponivel!: boolean;
}