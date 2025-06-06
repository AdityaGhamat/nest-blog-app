import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { POSTSTATUS, PostTypes } from '../enum/post.enum';
import { User } from 'src/users/entity/user.entity';
import { Tag } from 'src/tags/entity/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: PostTypes,
    nullable: false,
    default: PostTypes.POST,
  })
  postType: PostTypes;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: POSTSTATUS,
    nullable: false,
    default: POSTSTATUS.DRAFT,
  })
  status: POSTSTATUS;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredUrlImage?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishedOn?: Date;

  @ManyToOne(() => User, (user) => user.post)
  author: User;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags?: Tag[];
}
