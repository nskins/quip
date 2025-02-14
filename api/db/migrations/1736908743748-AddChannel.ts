import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChannel1736908743748 implements MigrationInterface {
    name = 'AddChannel1736908743748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "channel" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_800e6da7e4c30fbb0653ba7bb6c" UNIQUE ("name"))`);

        await queryRunner.query(`INSERT INTO "channel" (name) VALUES
            ('art'),
            ('cooking'),
            ('crafts'),
            ('exercise'),
            ('fashion'), 
            ('games'),
            ('languages'),
            ('literature'),
            ('music'),
            ('philosophy'),
            ('politics'),
            ('random'),
            ('religion'),
            ('sports'),
            ('television'),
            ('writing')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "channel"`);
    }

}
