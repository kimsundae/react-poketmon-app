import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import app from '../../firebase';

const NavBar = () => {

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [show, setShow] = useState(false);
  
  const {pathname} = useLocation();

  const handleAuth = ()=>{
    signInWithPopup(auth, provider)
    .then(result => {
      console.log(result);
    })
    .catch(error=>{
      console.error(error);
    });
  }

  const listener = ()=>{
    if(window.scrollY > 50)
      setShow(true);
    else
      setShow(false);
  }
  useEffect(()=>{
    window.addEventListener('scroll', listener)

    return ()=>{
      window.removeEventListener('scroll', listener);
    }
  },[])

  return (
    <NavWrapper show={show}>
      <Logo>
        <Image 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png" 
          onClick={()=>{window.location.href="/"}}
        />
      </Logo>
      {pathname === '/login' ? (
        <Login onClick={handleAuth}>로그인</Login>
      ) : null}
    </NavWrapper>

  )
}

const Login = styled.a`
  background-color: rgba(0,0,0,0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.55px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  color: white;
  &:hover{
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`
const Image = styled.img`
  cursor:pointer;
  width:100%;
`;
const Logo = styled.a`
  padding: 0;
  width: 50px;
  margin-top: 4px;
`

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  background-color: ${props => props.show ? "#090b13" : "transparent"};
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 100;
`

export default NavBar