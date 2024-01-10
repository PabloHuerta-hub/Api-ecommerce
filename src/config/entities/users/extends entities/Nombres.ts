import { Column } from "typeorm";

export class Nombre {
    @Column()
    nombre: string;

    @Column()
    apellido: string;
}
