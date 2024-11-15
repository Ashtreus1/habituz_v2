'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import HabitForm from '@/components/client/form-habit';
import { useFetchHabit } from '@/hooks/useFetch';
import { useDeleteHabit } from '@/hooks/useCRUD';

export default function HabitList() {
  const { habits = [], error, isLoading } = useFetchHabit(); 
  const { mutate: deleteHabit } = useDeleteHabit();

  const [openHabitId, setOpenHabitId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = (habitId: string) => {
    setIsDeleting(true);

    deleteHabit(habitId, {
      onSuccess: () => {
        console.log("Delete successfully");
        setOpenHabitId(null);
        setIsDeleting(false);
      },
      onError: (err) => {
        console.error("Error deleting habit: ", err);
      },
    });
  };

  return (
    <>
      {error && (
        <Alert>
          <AlertTitle>Error Occurred!</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-5 border-b">
        <HabitForm />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {isLoading ? (
          [...Array(3)].map((_, idx) => (
            <div key={idx} className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
              </div>
            </div>
          ))
        ) : (
          <>
            {habits.length === 0 ? (
              <p className="font-black">No habits found. Add new ones!</p>
            ) : (
              habits.map((item) => (
                <Dialog
                  key={item.habit_id}
                  open={openHabitId === item.habit_id}
                  onOpenChange={(open) => open ? setOpenHabitId(item.habit_id) : setOpenHabitId(null)}
                >
                  <DialogTrigger asChild>
                    <Card className="w-full h-full cursor-pointer hover:bg-[#1e1e1e] transition-colors">
                      <CardHeader>
                        <CardTitle>
                          <div className="flex justify-between items-center">
                            {item.habit_name}
                          </div>
                        </CardTitle>
                        <CardDescription>{item.habit_desc}</CardDescription>
                      </CardHeader>
                    </Card>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete habit?</DialogTitle>
                      <DialogDescription>Are you sure you want to delete this habit?</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-between items-center">
                      <Button 
                        variant="destructive" 
                        disabled={isDeleting} 
                        onClick={() => handleDelete(item.habit_id)}>
                        {isDeleting ? "Deleting habit..." : "Delete"}
                      </Button>
                      <Button
                        variant="secondary"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => setOpenHabitId(null)}
                      >
                        Keep Habit
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ))
            )}
          </>
        )}
      </div>
    </>
  );
}
