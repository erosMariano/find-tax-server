import { Column, Entity, Index, OneToMany } from "typeorm";
import { Apps } from "./Apps";
import { LeisIncentivo } from "./LeisIncentivo";

@Index("app_provider_pkey", ["uuid"], { unique: true })
@Entity("app_provider", { schema: "public" })
export class AppProvider {
  @Column("uuid", {
    primary: true,
    name: "uuid",
    default: () => "gen_random_uuid()",
  })
  uuid: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("text", { name: "photo" })
  photo: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @OneToMany(() => Apps, (apps) => apps.appProviderUu)
  apps: Apps[];

  @OneToMany(
    () => LeisIncentivo,
    (leisIncentivo) => leisIncentivo.appProviderUu
  )
  leisIncentivos: LeisIncentivo[];
}
