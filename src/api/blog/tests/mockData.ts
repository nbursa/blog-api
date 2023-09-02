export interface MockBlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export const blogPosts: MockBlogPost[] = [
  {
    id: 1,
    title: 'Understanding SOLID Principles',
    content: 'The SOLID principles are fundamental to writing clean code...',
    createdAt: new Date('2023-01-01T10:30:00'),
    updatedAt: new Date('2023-01-02T11:30:00'),
  },
  {
    id: 2,
    title: 'Introduction to DRY Code',
    content: 'DRY stands for "Don\'t Repeat Yourself"...',
    createdAt: new Date('2023-01-05T12:30:00'),
    updatedAt: new Date('2023-01-06T09:30:00'),
  },
  {
    id: 3,
    title: 'Why TypeScript?',
    content: 'TypeScript offers type safety on top of JavaScript...',
    createdAt: new Date('2023-02-10T15:30:00'),
    updatedAt: new Date('2023-02-11T16:30:00'),
  },
];

export default blogPosts;
