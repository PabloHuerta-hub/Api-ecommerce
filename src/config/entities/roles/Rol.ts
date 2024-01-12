import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Permiso_por_Rol } from "./Permisos_por_Rol";

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id_rol: number;

    @Column()
    rol: string;

    @OneToMany(() => Permiso_por_Rol, permisoPorRol => permisoPorRol.rol)
    permisos_por_rol: Permiso_por_Rol[];
}
