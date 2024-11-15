"use client";

import { useState } from 'react';

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { ICONS } from '@/constants/icons'; 

export default function IconGrid() {
  
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleToggleChange = (value: string) => {
    setSelectedIcon(value);
  }

  return (
    <div className="flex flex-row flex-wrap justify-center gap-2">
      {Object.entries(ICONS).map(([key, IconComponent]) => (
        <ToggleGroup 
          key={key} 
          type="single"
          onChange={handleToggleChange}>
          <ToggleGroupItem value={selectedIcon}>
            <IconComponent size={24} />
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  );
}
