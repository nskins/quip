import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChannelMessage1737682713420 implements MigrationInterface {
    name = 'AddChannelMessage1737682713420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "channel_message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "channelId" integer, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_channel_message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "channelId" integer, "userId" integer, CONSTRAINT "FK_67e2cdb305529e00e7abfff8d77" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_65c489515cdf007c57fe42e469c" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_channel_message"("id", "text", "createdAt", "updatedAt", "channelId", "userId") SELECT "id", "text", "createdAt", "updatedAt", "channelId", "userId" FROM "channel_message"`);
        await queryRunner.query(`DROP TABLE "channel_message"`);
        await queryRunner.query(`ALTER TABLE "temporary_channel_message" RENAME TO "channel_message"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "channel_message" RENAME TO "temporary_channel_message"`);
        await queryRunner.query(`CREATE TABLE "channel_message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "channelId" integer, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "channel_message"("id", "text", "createdAt", "updatedAt", "channelId", "userId") SELECT "id", "text", "createdAt", "updatedAt", "channelId", "userId" FROM "temporary_channel_message"`);
        await queryRunner.query(`DROP TABLE "temporary_channel_message"`);
        await queryRunner.query(`DROP TABLE "channel_message"`);
    }

}
