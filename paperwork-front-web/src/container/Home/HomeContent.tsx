import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Icon,
  useColorModeValue,
  IconProps,
  OmitCommonProps,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { SVGProps, } from "react";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import "../../styles/HomeContent.css";
import { Link } from "react-router-dom";

const CircleIcon = (
  prop: JSX.IntrinsicAttributes &
    OmitCommonProps<SVGProps<SVGSVGElement>, keyof IconProps> &
    IconProps & { as?: "svg" | undefined }
) => (
  <Icon viewBox="0 0 100 100" {...prop}>
    <path
      margin-left="2px"
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);

const Bg = () => {
  const cookies = new Cookies();
  const cookieList = cookies.get('loginToken');
  const api = process.env.REACT_APP_BASE_URL;
  var index = -2;
  const [rdv, setRDV]= useState([[]]);
  const [userProcessInfo, setUserProcessInfo]:any = useState([{}]);
  const [activeAsc, setActiveAsc] = useState(false);
  const [activeAlp, setActiveAlp] = useState(false);
  const [activePriority, setActivePriority] = useState(false);
  const ascendingArray = [...userProcessInfo].sort((a, b) => a.percentage - b.percentage);
  const descendingArray = [...userProcessInfo].sort((a, b) => b.percentage - a.percentage);
  const alphabeticArray = [...userProcessInfo].sort((a, b) => a.process > b.process ? 1 : -1);
  const invertArray = [...userProcessInfo].sort((a, b) => a.process > b.process ? -1 : 1);

  useEffect(() => {
      axios.get(`${api}/calendar/getAll?token=${cookieList.loginToken}`)
      .then(res => {
      var rdvTmp =  [];
      for (var i = 0; i < res.data.appoinment.length; i++) {
          rdvTmp.push(res.data.appoinment[i]['date'], res.data.appoinment[i]['step_title'], res.data.appoinment[i]['step_description']);
      }
      setRDV(rdvTmp);
      }).catch(err => {
        console.log(err);
      })
  })

  useEffect(() => {
      axios.get(`${api}/userProcess/getUserProcesses?user_token=${cookieList.loginToken}`)
      .then(res => {
      var userProcessTmp = [];
      for (var j = 0; j < res.data.response.length; j++) {
        if (res.data.response[j]['pourcentage'] != null)
          userProcessTmp.push({process: res.data.response[j]['userProcess'].process_title, percentage: res.data.response[j]['pourcentage']});
        else
          userProcessTmp.push({process: res.data.response[j]['userProcess'].process_title, percentage: 0});;
      }
      setUserProcessInfo(userProcessTmp);

      }).catch(err => {
          console.log(err)
      });
  })
  
  const handleClickAsc = () => {
    setActiveAsc(!activeAsc);
    setActivePriority(true);
  }

  const handleClickAlp = () => {
    setActiveAlp(!activeAlp);
    setActivePriority(false);
  }

  const { colorMode } = useColorMode();
  const adaptedColor = useColorModeValue("rgba(228,228,228,1)", "rgba(45,45,55,1)");
  const adaptedTextColor = useColorModeValue("rgba(0,0,0,1)", "rgba(255,255,255,1)");

  return (
    <>

    {colorMode === "light" ?
    <div className="home-content-main-box-light">
    </div>
    :
    <div className="home-content-main-box-dark">
    </div>
    }
    
    <div className="home-content-box-percentages" style={{backgroundColor: useColorModeValue("rgba(255,255,255,0.75)", "rgba(228,228,228,0.20)")}}>
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>
            <Button onClick={handleClickAlp} aria-label="click-alp">
            { activeAlp ? "Z...A" : "A...Z"}
            </Button>
            </Th>
            <Th isNumeric>
            <Button onClick={handleClickAsc} aria-label="click-asc">
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
    
    
    <Link to="/quiz">
      <button className='home-content-start-process-button' aria-label="submit_button">
        New Process
      </button>
    </Link>
    </div>



    <div className="home-content-box-calendar" style={{backgroundColor: useColorModeValue("rgba(255,255,255,0.75)", "rgba(228,228,228,0.20)")}}>
    {
      rdv.length !== 0 ?
      <>
      
      <div className="home-content-box-calendar-icons-box">
        <div className="home-content-calendar-text"> Calendar </div>
        <CircleIcon className="home-content-box-calendar-icon" color="pink.400" mt={'3px'}/>
        <div className="home-content-calendar-icon-text"> Applied </div>
        <CircleIcon className="home-content-box-calendar-icon" color="green" mt={'23px'}/>
        <div className="home-content-calendar-icon-text" style={{marginTop:'20px'}}> Left </div>
      </div>
      
      <div className="home-content-line-calendar" style={{backgroundColor: adaptedColor}}></div>
      <div className="home-content-box-calendar-in">
      {
        rdv?.map((item: any) => {
            index += 3;
            if (index <= rdv.length) {
              return (
                //<Box m={3} bgColor="#dbdbdb" borderRadius='lg' borderWidth='1px'></Box>
                <div className="home-content-box-rendez-vous" style={{backgroundColor: adaptedColor}}>
                  <div className="home-content-rendez-vous-date-text" style={{color: adaptedTextColor}}> {rdv[index - 1].toString()?.split('T')[0] + " > " + rdv[index - 1].toString()?.split('T')[1]?.split('.')[0]} </div>
                  <div className="home-content-rendez-vous-process-name-text" style={{color: adaptedTextColor}}> {rdv[index]} </div>
                  <div className="home-content-rendez-vous-process-description-text" style={{color: adaptedTextColor}}> {rdv[index + 1]} </div>
                </div>
                //</Box>
              )
            } else
              return ('')
        })
      }
      </div>
      </>
      :
      <>
      <div className="home-content-calendar-text"> Calendar </div>
      <div className="home-content-line-calendar" style={{backgroundColor: adaptedColor}}></div>
      <div className="home-content-nothing-text"> Nothing to Show</div>
      </>
    } </div>
      </>
  );
};

export default Bg;