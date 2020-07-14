import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import Poll from '@modules/polls/infra/typeorm/entities/Poll';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('answers')
class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  poll_id: string;

  @ManyToOne(() => Poll)
  @JoinColumn({ name: 'poll_id' })
  poll: Poll;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  option: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Answer;