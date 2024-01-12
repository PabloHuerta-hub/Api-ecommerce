import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Rol } from "./Rol";
import { Permiso } from "./Permisos";

@Entity({ name: 'permisos_por_rol' })
export class Permiso_por_Rol{
    @PrimaryGeneratedColumn()
    id_permiso_rol:number;
    
    @OneToOne(()=>Permiso)
    @JoinColumn({name: "permiso"})
    permiso:Permiso;

    @OneToOne(()=>Rol)
    @JoinColumn({name:"rol"})
    rol:Rol;

}