import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class Rol{
    @PrimaryGeneratedColumn()
    id_rol:number;
    
    @Column()
    rol:string;
}