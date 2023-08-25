export interface Report {
  id: number;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

const data: Report[] = [];

const mockData: Report[] = [
  {
    id: 1,
    title: 'Monthly Sales Report',
    description: 'This report contains sales data for the month of January.',
    createdAt: '2023-08-01T08:00:00Z',
  },
  {
    id: 2,
    title: 'Website Traffic Analysis',
    description: 'Analyze website traffic patterns and user behavior.',
    createdAt: '2023-08-02T08:00:00Z',
  },
  {
    id: 3,
    title: 'Product Performance Review',
    description: 'Evaluate the performance of newly launched products.',
    createdAt: '2023-08-03T08:00:00Z',
  },
  {
    id: 4,
    title: 'Customer Satisfaction Survey',
    description:
      'Survey results and insights from customer satisfaction survey.',
    createdAt: '2023-08-04T08:00:00Z',
  },
  {
    id: 5,
    title: 'Financial Quarterly Report',
    description: 'Financial overview and analysis for the second quarter.',
    createdAt: '2023-08-05T08:00:00Z',
  },
  {
    id: 6,
    title: 'Inventory Management Report',
    description: 'Inventory levels, turnover, and supply chain analysis.',
    createdAt: '2023-08-23T08:00:00Z',
  },
  {
    id: 7,
    title: 'Marketing Campaign Analytics',
    description: 'Analyze performance metrics of ongoing marketing campaigns.',
    createdAt: '2023-08-24T08:00:00Z',
  },
  {
    id: 8,
    title: 'Customer Support Ticket Analysis',
    description: 'Review of customer support tickets and resolutions.',
    createdAt: '2023-08-25T08:00:00Z',
  },
  {
    id: 9,
    title: 'Market Research Findings',
    description: 'Key findings from recent market research activities.',
    createdAt: '2023-08-20T08:00:00Z',
  },
  {
    id: 10,
    title: 'Competitor Analysis',
    description: 'Analysis of key competitors in the industry.',
    createdAt: '2023-08-26T08:00:00Z',
  },
  {
    id: 11,
    title: 'Quarterly Revenue Forecast',
    description: 'Projected revenue for the upcoming quarter.',
    createdAt: '2023-08-27T08:00:00Z',
  },
  {
    id: 12,
    title: 'Employee Training Evaluation',
    description: 'Assessment of the effectiveness of recent training programs.',
    createdAt: '2023-08-28T08:00:00Z',
  },
  {
    id: 13,
    title: 'Product Quality Assessment',
    description: 'Evaluate the quality and performance of products.',
    createdAt: '2023-08-29T08:00:00Z',
  },
  {
    id: 14,
    title: 'Supply Chain Efficiency Report',
    description: 'Analysis of supply chain operations and optimizations.',
    createdAt: '2023-08-30T08:00:00Z',
  },
  {
    id: 15,
    title: 'Customer Feedback Summary',
    description: 'Summarized feedback from customer surveys and reviews.',
    createdAt: '2023-08-31T08:00:00Z',
  },
  {
    id: 16,
    title: 'Website Performance Metrics',
    description: 'Performance metrics and loading times for the website.',
    createdAt: '2023-09-01T08:00:00Z',
  },
  {
    id: 17,
    title: 'Marketing Strategy Review',
    description: 'Review and assessment of current marketing strategies.',
    createdAt: '2023-09-02T08:00:00Z',
  },
  {
    id: 18,
    title: 'Project Budget Analysis',
    description: 'Analysis of project expenses and budget allocations.',
    createdAt: '2023-09-03T08:00:00Z',
  },
  {
    id: 19,
    title: 'Social Media Engagement Report',
    description: 'Engagement metrics for social media platforms.',
    createdAt: '2023-09-04T08:00:00Z',
  },
  {
    id: 20,
    title: 'Customer Retention Strategies',
    description: 'Strategies for improving customer retention rates.',
    createdAt: '2023-09-05T08:00:00Z',
  },
];

// if (data.length === 0) data.push(...mockData);

export default data;
