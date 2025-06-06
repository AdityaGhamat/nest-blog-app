import { Entity } from 'typeorm';

@Entity()
export class PostMetaOptionsEntity {
  key: string;
  value: string;
}
