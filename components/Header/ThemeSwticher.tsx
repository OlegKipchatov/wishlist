'use client';

import { useState } from 'react';

import { Button } from '@nextui-org/react';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';

import { useTheme } from '@/utils/themes/client';

export default function ThemeSwitcher() {
  const { themeMode, toggleThemeMode } = useTheme();
  const [themeIcon, setThemeIcon] = useState(themeMode);

  const toggleTheme = () => {
    const newTheme = toggleThemeMode();
    setThemeIcon(newTheme);
  };

  return (
    <Button
      isIconOnly
      variant="light"
      onClick={toggleTheme}
      className="ml-auto"
    >
      { themeIcon === 'dark'
        ? (
          <SunIcon
            width={24}
            height={24}
          />
        )
        : (
          <MoonIcon
            width={24}
            height={24}
          />
        ) }
    </Button>
  );
}
