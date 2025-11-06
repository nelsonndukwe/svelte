export type Priority = 'High' | 'Medium' | 'Low';
export type Category = 'Work' | 'Personal' | 'Finance' | 'Other';
export type Status = 'pending' | 'ongoing' | 'completed';

type Note = {
	id: string;
	note: string;
	createdAt: string;
};

export interface Task {
	id: string;
	title: string;
	description: string;
	isComplete: boolean;
	dueDate: Date;
	priority: Priority;
	category: Category;
	createdAt: Date;
	updatedAt?: Date;
	notes?: Note[];
	status?: Status;
}

export const tasks: Task[] = [
	{
		id: 'a1f23b9e-82d4-4b5a-bd27-6e2f08a6c001',
		title: 'Prepare quarterly financial report',
		description: 'Compile and analyze Q3 financial data for presentation to stakeholders.',
		isComplete: false,
		dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // due in 24 hours
		priority: 'High',
		category: 'Finance',
		createdAt: new Date(),
		updatedAt: new Date(),

		status: 'pending',
		notes: [
			{
				id: 'n101a',
				note: 'Check expense receipts for accuracy.',
				createdAt: new Date().toISOString()
			},
			{
				id: 'n101b',
				note: 'Coordinate with the accounting team for missing entries.',
				createdAt: new Date().toISOString()
			}
		]
	},
	{
		id: 'b3e6d220-5927-4d7c-9db3-3c50241c0202',
		title: 'Update portfolio case studies',
		description: 'Add new client projects and refresh visuals for the portfolio website.',
		isComplete: false,
		dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // due in 5 days
		priority: 'Medium',
		category: 'Work',
		createdAt: new Date(),
		updatedAt: new Date(),

		notes: [
			{
				id: 'n102a',
				note: 'Highlight the new SaaS design project.',
				createdAt: new Date().toISOString()
			}
		]
	},
	{
		id: 'c7cbe442-1de1-4cb4-923d-528f509c0303',
		title: 'Plan weekend trip',
		description: 'Book accommodation and prepare itinerary for the upcoming short vacation.',
		isComplete: false,
		dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // due in 2 days
		priority: 'Low',
		category: 'Personal',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'd821fae9-438c-4d8d-8cc5-00b4d4c40404',
		title: 'Review team OKRs',
		description: 'Assess progress on current objectives and plan adjustments for next quarter.',
		isComplete: false,
		dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // due in 3 days
		priority: 'High',
		category: 'Work',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'e9961a02-135c-4c8b-b789-20b5d0c50505',
		title: 'Organize tax receipts',
		description: 'Sort and scan all receipts for the upcoming tax filing deadline.',
		isComplete: true,
		dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // overdue by 2 days
		priority: 'High',
		category: 'Finance',
		status: 'ongoing',

		createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
		updatedAt: new Date(),

		notes: [
			{
				id: 'n103a',
				note: 'Mark missing invoices from September.',
				createdAt: new Date().toISOString()
			}
		]
	},
	{
		id: 'fbc72df7-911f-4e3a-8108-42e2e6d60606',
		title: 'Book dentist appointment',
		description: 'Schedule annual dental check-up and cleaning.',
		isComplete: false,
		dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // due in 10 days
		priority: 'Low',
		category: 'Personal',
		status: 'pending',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'g15a72ae-18e5-41d1-a71a-00ff7ed70707',
		title: 'Client feedback revisions',
		description:
			'Incorporate client revisions into the final deliverables for the branding project.',
		isComplete: false,
		dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000), // due in 12 hours
		priority: 'High',
		category: 'Work',
		status: 'pending',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: 'h3d5f2a9-2552-4c74-8149-bcb7b3d80808',
		title: 'Backup laptop files',
		description: 'Create a full system backup and sync with cloud storage.',
		isComplete: false,
		dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // due in 7 days
		priority: 'Medium',
		category: 'Other',
		status: 'completed',

		createdAt: new Date(),
		updatedAt: new Date()
	}
];

export const users: {
	id: number;
	name: string;
	email: string;
	password: string;
	role?: 'admin' | 'editor' | 'viewer';
	status?: 'active' | 'inactive';
	avatar?: string;
	lastLogin?: string;
	createdAt: string;
}[] = [
	{
		id: 1,
		name: 'Alice Johnson',
		email: 'alice.johnson@example.com',
		password: 'hashedpassword123',
		role: 'admin',
		status: 'active',
		avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
		lastLogin: '2025-10-18T10:45:00Z',
		createdAt: '2023-09-01T08:30:00Z'
	},
	{
		id: 2,
		name: 'Michael Smith',
		email: 'michael.smith@example.com',
		password: 'hashedpassword456',
		role: 'editor',
		status: 'active',
		avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
		lastLogin: '2025-10-19T09:00:00Z',
		createdAt: '2024-01-15T11:15:00Z'
	},
	{
		id: 3,
		name: 'Sophia Martinez',
		email: 'sophia.martinez@example.com',
		password: 'hashedpassword789',
		role: 'viewer',
		status: 'inactive',
		avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
		lastLogin: '2025-08-22T14:35:00Z',
		createdAt: '2023-10-12T10:00:00Z'
	},
	{
		id: 4,
		name: 'James Lee',
		email: 'james.lee@example.com',
		password: 'hashedpassword999',
		role: 'editor',
		status: 'active',
		avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
		lastLogin: '2025-10-19T19:10:00Z',
		createdAt: '2024-05-20T12:10:00Z'
	},
	{
		id: 5,
		name: 'Emma Wilson',
		email: 'emma.wilson@example.com',
		password: 'hashedpassword321',
		role: 'viewer',
		status: 'active',
		avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
		lastLogin: '2025-10-17T20:15:00Z',
		createdAt: '2023-12-11T09:45:00Z'
	}
];
