import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Productos {
    @PrimaryGeneratedColumn()
    productoID: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    precio: number;

    @Column()
    stock: number;

    @Column()
    categoria: string;

    @Column()
    marca: string;

    @Column()
    fecha_creacion: Date;
    
    @Column()
    imagenUrl: string;

    @Column()
    activo : boolean
}