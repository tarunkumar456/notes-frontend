import { Box, VStack, FormControl, Input, Button, HStack, Text } from '@chakra-ui/react'
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";



function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const alert = useAlert();
    const Navigate = useNavigate();
    useEffect(() => {
        const check = async () => {
            try {
                await axios.get(
                    `https://notes-backend-nu.vercel.app/api/v1/islogin`
                    // { withCredentials: true }
                );
                Navigate('/')
            } catch (error) {
            }
        }
        check();
    }, [])
    const submithandler = async () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(loginEmail);

        if (isValid) {

            try {
                const { data } = await axios.post(
                    `https://notes-backend-nu.vercel.app/api/v1/login`,
                    {
                        "email": loginEmail,
                        "password": loginPassword
                    }
                    // { withCredentials: true }
                );
                alert.success('Logged In successfully')
                Navigate('/')


            } catch (error) {
                console.log(error)
                alert.error(error.response.data.message)
            }
        }
        else
        {
            alert.error('enter a valid email')
        }
    }
    return (
        <>
            <Box display={'flex'} alignItems={'Center'} justifyContent={'Center'} bgColor={'purple.100'} minH={'85vh'} >
                <VStack w={['80vw', '25vmax']} h={['50vmax', '30vmax']} bg={'white'} borderRadius={'1%'}>
                    <Box fontSize={'2vmax'} fontWeight={'0.1vmax'} textColor={'purple.300'} borderBottom={"2px"} borderBottomColor={'purple.400'} w={'full'} textAlign={'center'} p={'0.5vmax'} fontFamily={'sans-serif'}  >LOGIN</Box>
                    <FormControl onSubmit={submithandler}>
                        <HStack><Box opacity={'0.5'} pt={'12%'} pos={"absolute"} transform={'auto'} translateX={['9.5vw', '3.5vw']}><HiOutlineMail size={'30'} /></Box><Input placeholder='Email' type="email" id="mail" required onChange={(e) => setLoginEmail(e.target.value)} borderColor={'purple.300'} borderWidth={'1px'} pl={'15%'} ml={'10%'} mr={'10%'} h={['5vmax', '3vmax']} mt={'12%'} focusBorderColor='purple.300'></Input></HStack>
                        <HStack><Box opacity={'0.5'} pt={'12%'} pos={"absolute"} transform={'auto'} translateX={['9.5vw', '3.5vw']}><GoLock size={'30'} /></Box><Input placeholder='Password' type="password" id="pass" required onChange={(e) => setLoginPassword(e.target.value)} borderColor={'purple.300'} borderWidth={'1px'} pl={'15%'} ml={'10%'} mr={'10%'} h={['5vmax', '3vmax']} mt={'12%'} focusBorderColor='purple.300' ></Input></HStack>
                        <Button w={'80%'} h={['5vmax', '3vmax']} bgColor={'purple.500'} ml={'10%'} mr={'10%'} mt={'15%'} onClick={submithandler}>Login</Button>
                        <Text ml={'20%'} mr={'20%'} pt={'6%'} fontSize={['1vmax']}>Don't have an account? <a href='/register' style={{ color: 'orchid', fontWeight: "bold" }}>Register</a></Text>
                    </FormControl>
                </VStack>
            </Box>
        </>
    )
}

export default Login
