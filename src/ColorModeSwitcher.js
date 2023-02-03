import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = (props) => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      variant="outline"
      color="current"
      bgColor={"blue.100"}
      pos={"fixed"}
      top={4}
      right={4}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      zIndex = {"overlay"}
      {...props}
    />
  );
};
