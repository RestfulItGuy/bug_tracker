import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectCurrentUser } from '../features/userSlice';
import { PlainLink } from '../components/BasicElements';

const BackLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 50px;
`

const BoxLinks = styled(PlainLink)`
  background-color: ${props => props.color};
  height: 200px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: top;
  color: white;
  transition: .5s ease-in-out;
  
  &&:hover{
    transform: scale(1.1);
    transition: .5s ease-in-out;
    box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.29);
  }
`

export default function Dashboard(){
  const currentUser = useSelector(selectCurrentUser);

  return(
    <>
      <h1>Hi {currentUser.name}! Welcome to your dashboard</h1>
      <BackLinksContainer>
        <BoxLinks to='bugs/create' color='#0b9ee2'>Create new bug</BoxLinks>
        <BoxLinks to='bugs/view' color='#0b9ee2'>See all asigned bugs</BoxLinks>
      </BackLinksContainer>
      <Outlet />
    </>
  )
}