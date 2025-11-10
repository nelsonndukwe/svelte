import { getTask } from '../../../../../../stores/task.store';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const uniqueTask = getTask(params.taskid);

	return {
		task: uniqueTask,
		taskId: params.taskid
	};
}) satisfies PageLoad;
