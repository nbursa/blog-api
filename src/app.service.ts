import { Injectable } from '@nestjs/common';
import data, { Report } from './data';

@Injectable()
export class AppService {
  getAllReports(): Report[] {
    return data;
  }

  getReportById(id: string): Report {
    return data.find((r) => r.id === parseInt(id, 10));
  }

  createReport(body: { title: string; description: string }): string {
    if (!body.title || !body.description)
      return 'Please provide title and description';
    try {
      const newReport: Report = {
        title: body.title,
        description: body.description,
        id: data.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      data.push(newReport);
      return 'Report created successfully';
    } catch (error) {
      return 'Something went wrong, please try again.';
    }
  }

  updateReport(report: Report): Report {
    const index = data.findIndex((r) => r.id === report.id);
    data[index] = { ...report, updatedAt: new Date().toISOString() };
    return data[index];
  }

  deleteReport(reportId: string): string {
    const index = data.findIndex((r) => r.id === parseInt(reportId, 10));
    data.splice(index, 1);
    return 'Report deleted successfully';
  }
}
