import { MigrationInterface, QueryRunner } from "typeorm";

export class Inicial1727180295234 implements MigrationInterface {
    name = 'Inicial1727180295234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "productIdId" uuid, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL DEFAULT 'https://via.placeholder.com/300', CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "phone" integer NOT NULL, "country" character varying(50) NOT NULL, "address" character varying(50) NOT NULL, "city" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "userIdId" uuid, "orderDetailId" uuid, CONSTRAINT "REL_749e30f71cc0d2d95f8546f459" UNIQUE ("orderDetailId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "orderIdId" uuid, CONSTRAINT "REL_7c9ccd7ac3a495a0dcfda2be83" UNIQUE ("orderIdId"), CONSTRAINT "PK_11d407f307ebf19af9702464e22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_order_detail_id_order_details" ("productsId" uuid NOT NULL, "orderDetailsId" uuid NOT NULL, CONSTRAINT "PK_b269c746519b0c76020c4a58edf" PRIMARY KEY ("productsId", "orderDetailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3cd58eb31f2d73b028477e263c" ON "products_order_detail_id_order_details" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_acd5781bdc66aee6f9332ce3a0" ON "products_order_detail_id_order_details" ("orderDetailsId") `);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_3c2fe2cbe6c306e34e191c81c3d" FOREIGN KEY ("productIdId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_916c66b74d50fe7cad01e3e5895" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592" FOREIGN KEY ("orderDetailId") REFERENCES "orderDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderDetails" ADD CONSTRAINT "FK_7c9ccd7ac3a495a0dcfda2be83e" FOREIGN KEY ("orderIdId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_order_detail_id_order_details" ADD CONSTRAINT "FK_3cd58eb31f2d73b028477e263c1" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_order_detail_id_order_details" ADD CONSTRAINT "FK_acd5781bdc66aee6f9332ce3a04" FOREIGN KEY ("orderDetailsId") REFERENCES "orderDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_order_detail_id_order_details" DROP CONSTRAINT "FK_acd5781bdc66aee6f9332ce3a04"`);
        await queryRunner.query(`ALTER TABLE "products_order_detail_id_order_details" DROP CONSTRAINT "FK_3cd58eb31f2d73b028477e263c1"`);
        await queryRunner.query(`ALTER TABLE "orderDetails" DROP CONSTRAINT "FK_7c9ccd7ac3a495a0dcfda2be83e"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_916c66b74d50fe7cad01e3e5895"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_3c2fe2cbe6c306e34e191c81c3d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_acd5781bdc66aee6f9332ce3a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3cd58eb31f2d73b028477e263c"`);
        await queryRunner.query(`DROP TABLE "products_order_detail_id_order_details"`);
        await queryRunner.query(`DROP TABLE "orderDetails"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
