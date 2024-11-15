import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';


const supabase = createClient();

export const useDeleteHabit = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (habitId: string) => {
			const { error } = await supabase
				.from('habits')
				.delete()
				.eq('habit_id', habitId);

			if (error) throw new Error('Error deleting habit');
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['habit']);
		},
	});
};