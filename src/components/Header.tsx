import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { useDispatch } from 'react-redux';
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiText, EuiTextColor } from '@elastic/eui';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/FirebaseConfig';
import { changeTheme } from '../app/slices/AuthSlice';
import { getCreateMeetingBreadCrumbs, getMeetingsBreadCrumbs, getMyMeetingsBreadCrumbs, getOneonOneMeetingBreadCrumbs, getVideoConferenceBreadCrumbs } from '../utils/BreadCrumbs';

const Header = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const username = useAppSelector((vroom) => vroom.auth.userInfo?.name);
   const isDarkTheme = useAppSelector((vroom)=>vroom.auth.isDarkTheme);
   const [breadCrumbs, setBreadCrumbs] = useState([{text: "Dashboard"}]);
   const [IsResponsive, setIsResponsive] = useState(false);
   const dispatch = useDispatch();
   const logout = () => {
      signOut(firebaseAuth);
   };

   useEffect(()=>{
      const {pathname} = location;
      if(pathname === "/create")
         setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
      else if (pathname === "/create1on1") 
         setBreadCrumbs(getOneonOneMeetingBreadCrumbs(navigate));
      else if (pathname === "/videoconference")
         setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
      else if (pathname === "/mymeetings")
         setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate));
      else if (pathname === "/meetings")
         setBreadCrumbs(getMeetingsBreadCrumbs(navigate));
   },[location, navigate]);

   const invertTheme = () => {
      const theme = localStorage.getItem("vroom-theme");
      localStorage.setItem("vroom-theme", theme === "light" ? "dark" : "light");
      dispatch(changeTheme({isDarkTheme: !isDarkTheme}))
   };
   const section = [
      {
      items:[
         <Link to="/">
            <EuiText>
               <h2 style={{padding: "0 1vw"}}>
                  <EuiTextColor color="#0b5cff">V-Room</EuiTextColor>
               </h2>
            </EuiText>
         </Link>
      ],
   },
   {
      items:[
         <>
         {username? (
            <EuiText>
               <h3>
                  <EuiTextColor color="white">Hello, </EuiTextColor>
                  <EuiTextColor color="#0b5cff">{username}</EuiTextColor>
               </h3>
            </EuiText>
         ): null}
         </>,
      ],
   },
   {
      items:[
         <EuiFlexGroup justifyContent="center" alignItems="center" direction="row" style={{gap: "2vw"}}>
            <EuiFlexItem grow={false} style={{flexBasis: "fit-content"}}>
               {isDarkTheme?(
                  <EuiButtonIcon 
                  onClick={invertTheme} 
                  iconType="sun" 
                  display="fill" 
                  color="warning"
                  size="s" 
                  aria-label="invert-theme-button"/>
               ):(
                  <EuiButtonIcon 
                  onClick={invertTheme} 
                  iconType="moon"
                  color="success" 
                  display="fill" 
                  size="s" 
                  aria-label="invert-theme-button"/>
               )}
            </EuiFlexItem>
            
            <EuiFlexItem grow={false} style={{flexBasis: "fit-content"}}>
               <EuiButtonIcon onClick={logout} iconType="lock" display="fill" size="s" aria-label="logout-button"/>
            </EuiFlexItem>
         </EuiFlexGroup>
      ]
   },
];
   const responsiveSection = [
      {
      items:[
         <Link to="/">
            <EuiText>
               <h2 style={{padding: "0 1vw"}}>
                  <EuiTextColor color="#0b5cff">V-Room</EuiTextColor>
               </h2>
            </EuiText>
         </Link>
      ],
   },
   {
      items:[
         <EuiFlexGroup justifyContent="center" alignItems="center" direction="row" style={{gap: "2vw"}}>
            <EuiFlexItem grow={false} style={{flexBasis: "fit-content"}}>
               {isDarkTheme?(
                  <EuiButtonIcon 
                  onClick={invertTheme} 
                  iconType="sun" 
                  display="fill" 
                  color="warning"
                  size="s" 
                  aria-label="invert-theme-button"/>
               ):(
                  <EuiButtonIcon 
                  onClick={invertTheme} 
                  iconType="moon"
                  color="accent" 
                  display="fill" 
                  size="s" 
                  aria-label="invert-theme-button"/>
               )}
            </EuiFlexItem>
            
            <EuiFlexItem grow={false} style={{flexBasis: "fit-content"}}>
               <EuiButtonIcon onClick={logout} iconType="lock" display="fill" size="s" aria-label="logout-button"/>
            </EuiFlexItem>
         </EuiFlexGroup>
      ]
   },
];
   useEffect(() => {
      if(window.innerWidth < 480) setIsResponsive(true);
   }, []);
   return <>
      <EuiHeader style={{minHeight: "8vh"}} theme="dark" sections={IsResponsive ? responsiveSection : section}/>
      <EuiHeader style={{minHeight: "8vh"}} sections={[{breadcrumbs: breadCrumbs}]}/>
   </> 
};

export default Header;