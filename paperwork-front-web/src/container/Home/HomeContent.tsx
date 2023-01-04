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
import { SVGProps, useLayoutEffect } from "react";
import Card from "../../components/Card";
import { ChevronRightIcon } from "@chakra-ui/icons";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  index: number;
}

const cookies = new Cookies();

const cookieList = cookies.get('loginToken');

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

  const api = "http://localhost:8282/";
  var index = -2;
  const [process, setProcess]= useState([[]]);

  const [rdv, setRDV]= useState([[]]);
  var listPercentage: { process: any; percentage: any; }[] = [];

  useEffect(() => {
      axios.get(`${api}calendar/getAll?email=${cookieList.email}`, {
      }) .then(res => {
      var rdvTmp =  [];
      for (var i = 0; i < res.data.appoinment.length; i++) {
          rdvTmp.push(res.data.appoinment[i]['date'], res.data.appoinment[i]['step_title'], res.data.appoinment[i]['step_description']);
      }
      setRDV(rdvTmp);
      //console.log(res.data.response[i].process_title)
        
      }).catch(err => {
        console.log(err);
      })
  }, rdv)

  useEffect(() => {
    axios.get(`${api}userProcess/getUserProcesses?user_email=${cookieList.email}`, {
    }) .then(res => {
      var processTmp =  [];
      for (var i = 0; i < res.data.response.length; i++) {
        processTmp.push(res.data.response[i]['process_title']);
      }
      setProcess(processTmp);

      process?.map((item: any) => {
        if (item.length != 0) {
          return (
            axios.get(`${api}userProcess/getUserSteps?process_title=${item}&user_email=${cookieList.email}`, {
            }) .then(res => {
              listPercentage.push({process: item, percentage: res.data.pourcentage});
              //console.log(listPercentage)
            }).catch(err => {
              console.log(err);
            })
          )
        }
    })

    }).catch(err => {
      console.log(err);
    })
    //console.log(listPercentage)
  }, process)

  console.log(listPercentage)
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
  
  //console.log(ascendingArray);
  
  const descendingArray = [...props.ongoingProcess.ongoingProcess.list].sort((a, b) => b.percentage - a.percentage);
  
  //console.log(descendingArray);
  
  const alphabeticArray = [...props.ongoingProcess.ongoingProcess.list].sort((a, b) => a.process > b.process ? 1 : -1);

  //console.log(listPercentage);
  //console.log([...props.ongoingProcess.ongoingProcess.list].sort((a, b) => a.process > b.process ? 1 : -1));

  const invertArray = [...props.ongoingProcess.ongoingProcess.list].sort((a, b) => a.process > b.process ? -1 : 1);

  //console.log(invertArray);

  const { colorMode } = useColorMode();
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
                              <Td key="{itemAscProcess}">{item.process}</Td>
                              <Td key="{itemAscPercent}" isNumeric>{item.percentage}</Td>
                            </Tr>
                          );
                        })
                      :
                      descendingArray?.map((item: any) => {
                          return (
                            <Tr>
                              <Td key="{itemDscProcess}">{item.process}</Td>
                              <Td key="{itemDscPercent}" isNumeric>{item.percentage}</Td>
                            </Tr>
                          );
                        })
                      :
                      activeAlp ?
                      alphabeticArray?.map((item: any) => {
                          return (
                            <Tr>
                              <Td key="{itemAlpProcess}">{item.process}</Td>
                              <Td key="{itemAlpPercent}" isNumeric>{item.percentage}</Td>
                            </Tr>
                          );
                        })
                      :
                      invertArray?.map((item: any) => {
                          return (
                            <Tr>
                              <Td key="{itemInvProcess}">{item.process}</Td>
                              <Td key="{itemInvPercent}" isNumeric>{item.percentage}</Td>
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
            {
              rdv.length != 0 ?

              
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
                  <Heading as="h2" size="2xl" colorScheme="grey" >
                  {
                    rdv?.map((item: any) => {
                        index += 3;
                        if (index <= rdv.length) {
                          return (
                              <Box m={3} bgColor="#dbdbdb" borderRadius='lg' borderWidth='1px'>
                                <Text fontSize='xs' mt='1' px='1'> {rdv[index - 1].toString()?.split('T')[0] + " > " + rdv[index - 1].toString()?.split('T')[1]?.split('.')[0]} </Text>
                                  <Text fontSize='small' mt='2' px='1'> {rdv[index]} </Text>
                                  <Text fontSize='2xs' px='1'> {rdv[index + 1]} </Text>
                              </Box>
                          )
                        }
                    })
                  }
                  </Heading>
                </Center>
                </Stack>

              :

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
            }
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};

export default Bg;