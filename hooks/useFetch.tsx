import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { useEffect } from 'react';

const supabase = createClient();

export const useFetchUser = () => {
	const { data, error } = useQuery({
		queryKey: ['user'],
		queryFn: async () => {
			const { data: { user }, error: userError } = await supabase.auth.getUser();
			if (userError)
				throw new Error(userError.message);
			return user;
		}
	});

	return { data, error };
}

export const useFetchHabit = () => {

	const queryClient = useQueryClient();

	const { data, error, isLoading } = useQuery({
		queryKey: ['habit'],
		queryFn: async () => {
			const { data: habits, error: habitError } = await supabase
				.from('habits')
				.select();

			if(habitError)
				throw new Error(habitError.message);

			return habits;
		}
	});

	useEffect(() => {
		const refetch = supabase
			.channel('public:habits')
			.on('postgres_changes', {
				event: '*',
				schema: 'public',
				table: 'habits',
			},
			(payload) => {
				queryClient.invalidateQueries(['habit']);
			})
			.subscribe();

		return () => {
			supabase.removeChannel(refetch);
		};
	}, [queryClient]);

	return { habits: data, error, isLoading };
}
