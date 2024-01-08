import { HStack, Image, Heading, Button } from '@chakra-ui/react'
import { React, useState, useEffect } from 'react'
import img1 from '../assets/1.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
function Header() {
  const [login, setLogin] = useState(false)
  const alert = useAlert();
  const Navigate = useNavigate();
  const logouthandler = async () => {
    try {
      await axios.post(
        `https://notes-backend-nu.vercel.app/api/v1/logout`
      );
      Navigate('/login')
      setLogin(false)
    } catch (error) {
      alert.error(error.response.data.message)
    }
  }

  useEffect(() => {
    const check = async () => {
      try {
        await axios.get(
          `https://notes-backend-nu.vercel.app/api/v1/islogin`
          // { withCredentials: true }
        );
        setLogin(true);
      } catch (error) {
        console.log(error)
        // alert(error)
      }
    }
    check();
  })
  return (
    <HStack w={'full'} h={['10vh', '15vh']} pl={['3', '10']} bgColor={'purple.200'} alignItems={'center'} borderBottom={'1px solid purple'}>
      <Image src={img1} alt={'loading'} w={['10', '20']} h={['7', '20']} ></Image>
      <Heading fontSize={['3xl', '6xl']} color={'purple.500'} textTransform={'uppercase'}>Note-it</Heading>
      {login && <Button colorScheme='purple' mt={'6'} fontSize={['1.5vmax', '1vmax']} onClick={logouthandler} margin={'1vmax'} style={{ marginLeft: 'auto' }}>Logout</Button>}
    </HStack>
  )
}

export default Header
