import '@elastic/eui/dist/eui_theme_light.css';
import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiImage, EuiPanel, EuiProvider, EuiSpacer, EuiText, EuiTextColor } from '@elastic/eui';
import React from 'react';
import logo from '../logos/full_logo-bgr.png';
import gif from '../logos/vm meeting.gif'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { firebaseAuth, userRef } from '../utils/FirebaseConfig';
import { addDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setUser } from '../app/slices/AuthSlice';

const Login = () => {

  const Navigate = useNavigate();
  const dispatch = useAppDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser)=>{
    if(currentUser) Navigate("/");
  })

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {user: {displayName, email, uid},} = await signInWithPopup(firebaseAuth, provider);
    if(email){
      const firestoreQuery = query(userRef, where("uid", "==", uid));
      const fetchedUsers = await getDocs(firestoreQuery);
      if(fetchedUsers.docs.length === 0){
        await addDoc(userRef,{
          uid,
          name: displayName,
          email,
        });
      }
    }
    dispatch(setUser({uid, name: displayName, email}));
    Navigate("/");
  };

  return (
    <EuiProvider colorMode="DARK">
      <EuiFlexGroup justifyContent="center" alignItems="center" style={{margin: "10vh 10vw"}}>
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent="center" alignItems="center">
            <EuiFlexItem>
          <EuiImage src={gif} alt="gif" />
        </EuiFlexItem>
        <EuiFlexItem>
        <EuiImage src={logo} alt="logo" size="230px" />
        <EuiSpacer size="xs" />
        <EuiText textAlign='center' grow={false}>
          <h3>
            <EuiTextColor>One Platform to </EuiTextColor>
            <EuiTextColor color='#0b5cff'>Connect</EuiTextColor>
          </h3>
        </EuiText>
        <EuiSpacer size="l" />
        <EuiButton fill onClick={login}>Login with Google</EuiButton>
        </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
}

export default Login