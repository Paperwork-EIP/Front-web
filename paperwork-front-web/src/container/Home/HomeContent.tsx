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
  Button,
} from "@chakra-ui/react";
import { SVGProps } from "react";
import Card from "../../components/Card";
import { ChevronRightIcon } from "@chakra-ui/icons";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// interface TestimonialCardProps {
//   name: string;
//   role: string;
//   content: string;
//   avatar: string;
//   index: number;
// }

const CircleIcon = (
  prop: JSX.IntrinsicAttributes &
    OmitCommonProps<SVGProps<SVGSVGElement>, keyof IconProps> &
    IconProps & { as?: "svg" | undefined }
) => (
  <Icon viewBox="0 0 100 100" {...prop}>
    <path
      margin-top="2px"
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);



const Bg = (props: any) => {

  const api = "http://localhost:8080";
  var intSorter = 0;

  useEffect(() => {
    axios.get(`${api}/userProcess/getUserProcess`, {
      data: {process_title: 'test@test.test'},
    }) .then(res => {
      var process = [];
      for (var i = 0; i < res.data.response.length; i++) {
        process.push({
          name: res.data.response[i]['process_title'],
        })
      }
    }).catch(err => {
      console.log(err);
    })
  })

  const [activeAsc, setActiveAsc] = useState(false);
  const [activeAlp, setActiveAlp] = useState(false);
  const [activePriority, setActivePriority] = useState(false);

  const handleClickAsc = () => {
    setActiveAsc(!activeAsc);
    setActivePriority(true);
  }

  const handleClickAlp = () => {
    setActiveAlp(!activeAlp);
    setActivePriority(false);
  }
  
  const ascendingArray = [...props.ongoingProcess.ongoingProcess.list].sort((a, b) => a.percentage - b.percentage);
  const descendingArray = [...props.ongoingProcess.ongoingProcess.list].sort((a, b) => b.percentage - a.percentage);
  const alphabeticArray = [...props.ongoingProcess.ongoingProcess.list].sort((a, b) => a.process > b.process ? 1 : -1);
  const invertArray = [...props.ongoingProcess.ongoingProcess.list].sort((a, b) => a.process > b.process ? -1 : 1);

  const { colorMode } = useColorMode();
  console.log(props);
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
          <Link to="/quiz">
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
            </Link>
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
                      <Th>
                      <Button onClick={handleClickAlp}>
                      { activeAlp ? "Z...A" : "A...Z"}
                      </Button>
                      </Th>
                      <Th isNumeric>
                      <Button onClick={handleClickAsc}>
                      { activeAsc ? "Ascending" : "Descending"}
                      </Button>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {
                    activePriority === true ?
                    activeAsc ?
                    ascendingArray?.map((item: any) => {
                        return (
                          <Tr>
                            <Td>{item.process}</Td>
                            <Td isNumeric>{item.percentage}</Td>
                          </Tr>
                        );
                      })
                    :
                    descendingArray?.map((item: any) => {
                        return (
                          <Tr>
                            <Td>{item.process}</Td>
                            <Td isNumeric>{item.percentage}</Td>
                          </Tr>
                        );
                      })
                    :
                    activeAlp ?
                    alphabeticArray?.map((item: any) => {
                        return (
                          <Tr>
                            <Td>{item.process}</Td>
                            <Td isNumeric>{item.percentage}</Td>
                          </Tr>
                        );
                      })
                    :
                    invertArray?.map((item: any) => {
                        return (
                          <Tr>
                            <Td>{item.process}</Td>
                            <Td isNumeric>{item.percentage}</Td>
                          </Tr>
                        );
                    })
                  }
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
