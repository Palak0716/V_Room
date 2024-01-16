import React from 'react';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import dashboard1 from '../logos/dashboard1.png';
import dashboard3 from '../logos/dashboard1.png';
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';
import { useNavigate } from 'react-router-dom';

function CreateMeeting() {
  useAuth();
  const navigate = useNavigate();
   return (
  <div style={{display: "flex", height: "100vh", flexDirection: "column",}}>
   <Header/>
   <EuiFlexGroup justifyContent="center" alignItems="center" style={{margin: "5vh 10vw"}}>
      <EuiFlexItem>
      <EuiCard
          icon={<EuiImage size="100%" alt="icon" src={dashboard1}/>}
          title={`Create 1 on 1 Meeting`}
          description="Create a personal meeting."
          onClick={() => navigate('/create1on1')}
          paddingSize="xl"/>
      </EuiFlexItem>
      <EuiFlexItem>
      <EuiCard
          icon={<EuiImage size="100%" alt="icon" src={dashboard3}/>}
          title={`Create Video Conference.`}
          description="Invite Multiple Persons to the Meeting."
          onClick={() => navigate('/videoconference')}
          paddingSize="xl"/>
      </EuiFlexItem>
   </EuiFlexGroup>
  </div>
  );
}

export default CreateMeeting;
