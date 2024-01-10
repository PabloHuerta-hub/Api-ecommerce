import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Region{
    @PrimaryGeneratedColumn()
    id_region:number;

    @Column()
    nombre: string;

    @Column()
    activo:BinaryType;

    @Column()
    codigo: string;
    
}