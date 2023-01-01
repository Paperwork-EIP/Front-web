import {
  Center,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Box,
  Tbody,
  Td,
  Stack,
  Divider,
  Spacer,
  Text,
  Icon,
  Heading,
  useColorModeValue,
  IconProps,
  OmitCommonProps,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { SVGProps } from "react";
import Card from "../../components/Card";
import { ChevronRightIcon } from "@chakra-ui/icons";
import React from "react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  index: number;
}

const CircleIcon = (
  props: JSX.IntrinsicAttributes &
    OmitCommonProps<SVGProps<SVGSVGElement>, keyof IconProps> &
    IconProps & { as?: "svg" | undefined }
) => (
  <Icon viewBox="0 0 100 100" {...props}>
    <path
      margin-top="2px"
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);

const Bg = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bgImage={
        colorMode === "light"
          ? "url('/background.png')"
          : "url('/dark-background.png')"
      }
      // filter='blur(8px)'
      zIndex="-1"
      pos="fixed"
      w="100%"
      h="100%"
      backgroundSize={"cover"}
      bgPosition="center"
    >
      <Box zIndex="2" pos="relative">
        <Stack spacing={16} mx={40} mt={20}>
          <Flex alignItems="center" justify="space-around">
            <Box
              bgColor={useColorModeValue("white", "gray.800")}
              as="button"
              height="206px"
              w="xl"
              zIndex="2"
              lineHeight="1.2"
              borderRadius="8px"
              fontSize="30px"
              fontWeight="semibold"
              boxShadow={"0px 4px 20px 10px rgba(0, 0, 0, 0.12)"}
              _hover={{ bg: "rgba(253, 115, 102, 0.07)" }}
              pos="relative"
              // onClick={() => void}
            >
              Start a process
              <ChevronRightIcon ml={35} w={55} h={55} />
            </Box>
            <Spacer />
            <Card
              maxW="700px"
              color={useColorModeValue("white", "gray.800")}
              w={"900px"}
              height="345px"
            >
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th><b>Ongoing process</b></Th>
                      <Th isNumeric>Descending</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Vital card</Td>
                      <Td isNumeric>25</Td>
                    </Tr>
                    <Tr>
                      <Td>Driver’s license</Td>
                      <Td isNumeric>30</Td>
                    </Tr>
                    <Tr>
                      <Td>Job center</Td>
                      <Td isNumeric>91</Td>
                    </Tr>
                    <Tr>
                      <Td>Residence permit</Td>
                      <Td isNumeric>55</Td>
                    </Tr>
                    <Tr>
                      <Td>Vital card</Td>
                      <Td isNumeric>25</Td>
                    </Tr>
                    <Tr>
                      <Td>Driver’s license</Td>
                      <Td isNumeric>30</Td>
                    </Tr>
                    <Tr>
                      <Td>Job center</Td>
                      <Td isNumeric>91</Td>
                    </Tr>
                    <Tr>
                      <Td>Residence permit</Td>
                      <Td isNumeric>55</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Card>
          </Flex>
          <Card
            maxW="full"
            color={useColorModeValue("white", "gray.800")}
            height="400px"
          >
            <Stack direction="column" p={2}>
              <Stack direction="row">
                <Heading size="lg">Calendar</Heading>
                <Spacer />
                <CircleIcon color="pink.400" mt="15" />
                <Text fontSize="md">Applied</Text>
                <CircleIcon color="green" />
                <Text fontSize="md">Left</Text>
              </Stack>
              <Divider />
              <Center>
                <Heading as="h2" size="2xl" colorScheme="grey" mt={100}>
                  Nothing to show
                </Heading>
              </Center>
            </Stack>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};

export default Bg;
