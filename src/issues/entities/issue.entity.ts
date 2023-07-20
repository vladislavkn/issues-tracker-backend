import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length, IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';
import { CreateIssueDto } from '../dto/create-issue.dto';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  senderFirstName: string;

  @Column()
  @IsNotEmpty()
  senderLastName: string;

  @Column()
  @Length(5, 128)
  subject: string;

  @Column()
  body: string;

  @Column()
  @IsEmail()
  email: string;

  @CreateDateColumn()
  dateCreated: number;

  @UpdateDateColumn()
  dateUpdated: number;

  @Column({ default: false })
  @IsBoolean()
  satisfied: boolean;

  static fromCreateIssueDto(createIssueDto: CreateIssueDto): Issue {
    const issue = new Issue();

    issue.senderFirstName = createIssueDto.senderFirstName;
    issue.senderLastName = createIssueDto.senderLastName;
    issue.email = createIssueDto.email;
    issue.subject = createIssueDto.subject;
    issue.body = createIssueDto.body;

    return issue;
  }
}
