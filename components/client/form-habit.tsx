"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import{ Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { BadgePlus } from 'lucide-react';

import IconGrid from '@/components/icon-grid';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function HabitForm() {

  const supabase = createClient();

  const [habitName, setHabitName] = useState<string>('');
  const [habitDesc, setHabitDesc] = useState<string>('');
  const [timeStreak, setTimeStreak] = useState<string[]>(['daily', 'weekly', 'monthly']);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('habits')
      .insert({
          user_id: user.id,
          habit_name: habitName,
          habit_desc: habitDesc,
        });

    if(error){
      console.error('Error inserting data: ', error);
    }else{
      console.log('Insert data successfully');
    }

    setOpen(false);
    setIsLoading(false);
  }

  return(
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger asChild>
        <div 
          className="border 
                     border-bg-[#1e1e1e] 
                     rounded-lg 
                     p-5
                     mb-5 
                     cursor-pointer 
                     hover:bg-[#1e1e1e] 
                     text-[#3b3b3b] 
                     hover:text-[#808080] 
                     transition-colors">
          <BadgePlus size={24}/>
        </div>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Set a habit</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col justify-center items-center">
            <form className="w-full" onSubmit={handleSubmit}>
              <Label htmlFor="habit_name">Habit Name</Label>
                <Input 
                  type="text" 
                  className="mb-5" 
                  placeholder="What is your habit name?" 
                  id="habit_name"
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  required
                />
              <Label htmlFor="habit_desc">Habit Description</Label>
                <Textarea 
                  className="mb-5" 
                  placeholder="Describe your habit..." 
                  id="habit_desc"
                  value={habitDesc}
                  onChange={(e) => setHabitDesc(e.target.value)}
                  required
                />
              <Label htmlFor="time_streak">Time Streak</Label>
              <ToggleGroup 
                type="single" 
                id="time_streak"
                onChange={(e) => setTimeStreak(e.target.value)} 
                className="mb-5 border p-2 rounded-lg"
                required
                >
                <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
                <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
                <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
              </ToggleGroup>
              <Label htmlFor="icon" className="mb-2">Icon</Label>
              <IconGrid/>
              <Button className="w-full mt-5" variant="secondary" disabled={isLoading}>
                {isLoading ? "Adding habit.." : "Set habit"}
              </Button>
            </form>
          </div>
      </DialogContent>
    </Dialog>
  )
}


/*
      
*/