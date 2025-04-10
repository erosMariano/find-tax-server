import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AppFunctionalities } from "./AppFunctionalities";
import { AppMainFunctionalities } from "./AppMainFunctionalities";
import { AppRating } from "./AppRating";
import { AppTags } from "./AppTags";
import { AppProvider } from "./AppProvider";
import { AppsMedias } from "./AppsMedias";

@Index("apps_pkey", ["appUuid"], { unique: true })
@Entity("apps", { schema: "public" })
export class Apps {
  @Column("uuid", {
    primary: true,
    name: "app_uuid",
    default: () => "gen_random_uuid()",
  })
  appUuid: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("uuid", { name: "app_photo", nullable: true })
  appPhoto: string | null;

  @Column("text", { name: "description" })
  description: string;

  @Column("double precision", { name: "rating", nullable: true })
  rating: number | null;

  @Column("text", { name: "functionalities", nullable: true })
  functionalities: string | null;

  @Column("text", { name: "main_functionalities", nullable: true })
  mainFunctionalities: string | null;

  @Column("text", { name: "integrations", nullable: true })
  integrations: string | null;

  @Column("text", { name: "tags", nullable: true })
  tags: string | null;

  @Column("uuid", { name: "comments", nullable: true })
  comments: string | null;

  @Column("character varying", { name: "website", nullable: true, length: 255 })
  website: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;

  @OneToMany(
    () => AppFunctionalities,
    (appFunctionalities) => appFunctionalities.appUu
  )
  appFunctionalities: AppFunctionalities[];

  @OneToMany(
    () => AppMainFunctionalities,
    (appMainFunctionalities) => appMainFunctionalities.appUu
  )
  appMainFunctionalities: AppMainFunctionalities[];

  @OneToMany(() => AppRating, (appRating) => appRating.appUu)
  appRatings: AppRating[];

  @OneToMany(() => AppTags, (appTags) => appTags.appUu)
  appTags: AppTags[];

  @ManyToOne(() => AppProvider, (appProvider) => appProvider.apps)
  @JoinColumn([{ name: "app_provider_uuid", referencedColumnName: "uuid" }])
  appProviderUu: AppProvider;

  @OneToMany(() => AppsMedias, (appsMedias) => appsMedias.appUu)
  appsMedias: AppsMedias[];
}
