import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue } from './entities/issue.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private issuesRepository: Repository<Issue>,
  ) {}

  create(createIssueDto: CreateIssueDto) {
    const issue = Issue.fromCreateIssueDto(createIssueDto);
    return this.issuesRepository.save(issue);
  }

  findAll() {
    return this.issuesRepository.find();
  }

  findOne(id: number) {
    return this.issuesRepository.findOneBy({ id });
  }

  update(id: number, updateIssueDto: UpdateIssueDto) {
    return this.issuesRepository.update(id, updateIssueDto);
  }

  async remove(id: number) {
    await this.issuesRepository.delete(id);
  }
}
