import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({name: 'permisos'})
export class Permiso{
    @PrimaryGeneratedColumn()
    id_permiso:number;
    
    @Column()
    permiso:string;
}