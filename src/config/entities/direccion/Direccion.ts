import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Region } from "./Region";

@Entity()
export class Direccion{
    @PrimaryGeneratedColumn()
    id_direccion: number;

    @Column()
    comuna: string;

    @Column()
    nro_casa: number;

    @OneToOne(()=>Region, {eager:true})
    @JoinColumn({name: "region"})
    region: Region;

    @Column()
    calle: string;
}