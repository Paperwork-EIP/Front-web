import { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [name, setName] = useState('Username');

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box boxSize='80px'>
          <Image src='logo.png' alt='PaperWork logo' />
        </Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                    <Avatar
                      size={'sm'}
                    />
                </MenuButton>
                <MenuList alignItems={'center'} mb={2}>
                  <Center mb={2}>
                    <Link to="/profile">
                        <Avatar
                          size={'2xl'}
                        />
                    </Link>
                  </Center>
                  <Center mb={2}>
                    <p>{name}</p>
                  </Center>
                  <MenuDivider />
                  <MenuItem>Start a process</MenuItem>
                  <MenuItem><Link to='/home'>Home</Link></MenuItem>
                  <MenuItem>Forum</MenuItem>
                  <MenuItem>Calendar</MenuItem>
                  <MenuItem>Find an association</MenuItem>
                  <MenuItem>Help</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Header;