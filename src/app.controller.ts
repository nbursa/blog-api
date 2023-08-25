import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import data, { Report } from './data';

@Controller('api')
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
  createReport(@Body() body: { title: string; description: string }): string {
    try {
      data.push({
        ...body,
        id: data.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return 'Report created successfully';
    } catch (error) {
      return 'Something went wrong, please try again.';
      // throw new Error('Something went wrong, please try again.');
    }
  }

  @Put(':updateId')
  updateReport(@Param('update') report: Report): Report[] {
    const index = data.findIndex((r) => r.id === report.id);
    data[index] = { ...report, updatedAt: new Date().toISOString() };
    return data;
  }

  @Delete(':deleteId')
  deleteReport(@Param('reportId') deleteId: string): Report[] {
    const index = data.findIndex((r) => r.id === parseInt(deleteId, 10));
    data.splice(index, 1);
    return data;
  }
}
