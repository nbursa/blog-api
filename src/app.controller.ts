import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import data, { Report } from './data';

@Controller('reports')
export class AppController {
  @Get()
  getAllReports(): Report[] {
    return data;
  }

  @Get(':id')
  getReportById(@Param('id') id: string): Report {
    return data.find((r) => r.id === parseInt(id, 10));
  }

  @Post()
  createReport(@Param('report') report: Report): Report[] {
    data.push({ ...report, id: data.length + 1 });
    return data;
  }

  @Put(':updateId')
  updateReport(@Param('update') report: Report): Report[] {
    const index = data.findIndex((r) => r.id === report.id);
    data[index] = report;
    return data;
  }

  @Delete(':deleteId')
  deleteReport(@Param('reportId') deleteId: string): Report[] {
    const index = data.findIndex((r) => r.id === parseInt(deleteId, 10));
    data.splice(index, 1);
    return data;
  }
}
