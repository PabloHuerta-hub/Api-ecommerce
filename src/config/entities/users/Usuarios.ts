import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Nombre } from "./extends entities/Nombres";
import { Rol } from "../roles/Rol";
import { Direccion } from "../direccion/Direccion";
import { Permiso_por_Rol } from "../roles/Permisos_por_Rol";
@Entity() 
export class Usuarios extends Nombre{
    @PrimaryGeneratedColumn()
    id: number;


    @OneToOne(() => Rol)
    @JoinColumn({ name: "rol" })
    rol: Rol;

    @OneToOne(()=>Direccion)
    @JoinColumn({name: "direccion"})   
    direccion: Direccion;

    @Column()
    correo:string;

    @Column()
    contraseña: string;
    
    @Column()
    rut:string;

    @Column()
    activo: boolean;
}
