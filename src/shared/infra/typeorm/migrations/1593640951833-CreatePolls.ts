import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreatePolls1593640951833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'polls',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'title',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'description',
              type: 'varchar',
            },
            {
              name: 'options',
              type: 'json',
            },
            {
              name: 'is_public',
              type: 'boolean',
              default: true,
            },
            {
              name: 'owner_id',
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
      );

      await queryRunner.createForeignKey(
        'polls',
        new TableForeignKey({
          name: 'PollOwner',
          columnNames: ['owner_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('polls', 'PollOwner');

      await queryRunner.dropTable('polls');
    }

}
