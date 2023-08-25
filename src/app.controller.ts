import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Report } from './data';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(): Report[] {
    return this.appService.getAllReports();
  }

  @Get(':id')
  getReportById(@Param('id') id: string): Report {
    return this.appService.getReportById(id);
  }

  @Post()
  createReport(@Body() body: { title: string; description: string }): string {
    return this.appService.createReport(body);
  }

  @Put(':updateId')
  updateReport(@Param('update') report: Report): Report {
    return this.appService.updateReport(report);
  }

  @Delete(':deleteId')
  deleteReport(@Param('reportId') deleteId: string): string {
    return this.appService.deleteReport(deleteId);
  }
}
