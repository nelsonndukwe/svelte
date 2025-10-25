import Plane from 'lucide-svelte/icons/plane';
import { type Icon as IconType } from 'lucide-svelte';
import ChartLine from 'lucide-svelte/icons/chart-line';
import Wallet from 'lucide-svelte/icons/wallet';
import Layers from 'lucide-svelte/icons/layers';
import MessageCircleWarning from 'lucide-svelte/icons/message-circle-warning';
import Mail from 'lucide-svelte/icons/mail';
import Send from 'lucide-svelte/icons/send';
import Settings from 'lucide-svelte/icons/settings';
import House from 'lucide-svelte/icons/house';
import User from 'lucide-svelte/icons/user';

export const getAllRoutes = (
	orgId: string
): {
	title: string;
	Icon: any;
	href: string;
}[] => {
	return [
		{
			title: 'Overview',
			Icon: House,
			href: `/dashboard/${orgId}`
		},
		{
			title: 'Users',
			Icon: User,
			href: `/dashboard/${orgId}/users`
		},
		{
			title: 'Sales',
			Icon: ChartLine,
			href: `/dashboard/${orgId}/sales`
		},
		{
			title: 'Finance',
			Icon: Wallet,
			href: `/dashboard/${orgId}/finance`
		},
		{
			title: 'Contents',
			Icon: Layers,
			href: `/dashboard/${orgId}/contents`
		},
		{
			title: 'Disputes',
			Icon: MessageCircleWarning,
			href: `/dashboard/${orgId}/disputes`
		},
		{
			title: 'Inbox',
			Icon: Mail,
			href: `/dashboard/${orgId}/inbox`
		},
		{
			title: 'Outbox',
			Icon: Send,
			href: `/dashboard/${orgId}/outbox`
		},
		{
			title: 'Settings',
			Icon: Settings,
			href: `/dashboard/${orgId}/settings`
		}
	];
};

export const roles = [
	{ key: 'admin', label: 'Administrator' },
	{ key: 'editor', label: 'Editor' },
	{ key: 'viewer', label: 'Viewer' },
	{ key: 'moderator', label: 'Moderator' },
	{ key: 'support', label: 'Support Staff' }
];

export const status = [
	{ key: 'active', label: 'Active' },
	{ key: 'inactive', label: 'Inactive' }
];

export const graph = [
	{
		month: 'Jan',
		newUsers: 120,
		activeUsers: 95,
		deletedAccounts: 3
	},
	{
		month: 'Feb',
		newUsers: 150,
		activeUsers: 120,
		deletedAccounts: 5
	},
	{
		month: 'Mar',
		newUsers: 180,
		activeUsers: 140,
		deletedAccounts: 8
	},
	{
		month: 'Apr',
		newUsers: 200,
		activeUsers: 160,
		deletedAccounts: 4
	},
	{
		month: 'May',
		newUsers: 230,
		activeUsers: 190,
		deletedAccounts: 6
	},
	{
		month: 'Jun',
		newUsers: 260,
		activeUsers: 210,
		deletedAccounts: 5
	},
	{
		month: 'Jul',
		newUsers: 280,
		activeUsers: 220,
		deletedAccounts: 3
	},
	{
		month: 'Aug',
		newUsers: 310,
		activeUsers: 250,
		deletedAccounts: 4
	},
	{
		month: 'Sep',
		newUsers: 290,
		activeUsers: 240,
		deletedAccounts: 5
	},
	{
		month: 'Oct',
		newUsers: 320,
		activeUsers: 260,
		deletedAccounts: 6
	},
	{
		month: 'Nov',
		newUsers: 340,
		activeUsers: 280,
		deletedAccounts: 4
	},
	{
		month: 'Dec',
		newUsers: 380,
		activeUsers: 310,
		deletedAccounts: 7
	}
];
