import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { query } from "express";

export default class CreateAnswer1594730817118 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'answers',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'poll_id',
              type: 'uuid',
            },
            {
              name: 'user_id',
              type: 'uuid',
              isNullable: true,
            },
            {
              name: 'option',
              type: 'uuid',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        })
      )

      await queryRunner.createForeignKey(
        'answers',
        new TableForeignKey({
          name: 'AnswerPoll',
          columnNames: ['poll_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'polls',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'answers',
        new TableForeignKey({
          name: 'AnswerUser',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('answers', 'AnswerPoll');
      await queryRunner.dropForeignKey('answers', 'AnswerUser');

      await queryRunner.dropTable('answers');
    }
}
