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
