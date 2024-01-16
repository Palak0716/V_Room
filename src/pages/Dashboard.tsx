import React from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';
import dashboard1 from "../logos/dashboard1.png";
import dashboard2 from "../logos/dashboard1.png";
import dashboard3 from "../logos/dashboard1.png";
import Header from '../components/Header';


const Dashboard = () => {
 useAuth();
 const navigate = useNavigate()
  return (
    <>
      <div style={{display: "flex", height: "100vh", flexDirection: "column",}}>
        <Header/>
        <EuiFlexGroup justifyContent="center" alignItems="center" style={{margin: "5vh 10vw"}}>
          <EuiFlexItem>
          <EuiCard
          icon={<EuiImage size="5rem" alt="icon" src={dashboard1}/>}
          title={`Create Meeting`}
          description="Create a new meeting and invite people."
          onClick={() => navigate('/create')}
          paddingSize="xl"/>
          </EuiFlexItem>
          
          <EuiFlexItem>
          <EuiCard
          icon={<EuiImage size="10rem" alt="icon" src={dashboard2}/>}
          title={`My Meetings`}
          description="View Your Created Meetings."
          onClick={() => navigate('/mymeetings')}
          paddingSize="xl"/>
          </EuiFlexItem>
          
          <EuiFlexItem>
          <EuiCard
          icon={<EuiImage size="5rem" alt="icon" src={dashboard3}/>}
          title={`Meetings`}
          description="View Meeting that you are invited."
          onClick={() => navigate('/meetings')}
          paddingSize="xl"/>
          </EuiFlexItem>

        </EuiFlexGroup>
      </div>
    </>
  );
}

export default Dashboard;