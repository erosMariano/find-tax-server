  import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

  @Entity('accounts')
  export class Account {
    @PrimaryColumn({ type: 'uuid' })
    id!: string;
    
    @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name!: string;

    @Column({ type: 'varchar', length: 25, nullable: false })
    role!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    cargo!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    occupation!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    company!: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    phone!: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    website!: string;

    @Column({ type: 'date', nullable: true })
    birth!: Date;

    @Column({ type: 'varchar', length: 20, nullable: true })
    cep!: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    city!: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    state!: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    country!: string;

    @Column({ type: 'varchar', length: 200, nullable: true, name: 'recovery_email' })
    recoveryEmail!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @Column({ type: 'varchar', length: 100, nullable: true, name: 'creation_source' })
    creationSource!: string;

    @Column({ type: 'text', nullable: true, name: 'profile_picture' })
    profilePicture!: string;

    @Column({ type: 'int', nullable: true, generated: 'increment' })
    id_serial!: number;

    @Column({ type: 'timestamptz', nullable: true, name: 'last_logged_at' })
    lastLoggedAt!: Date;
  } 