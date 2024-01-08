import { Box, VStack, FormControl, Input, Button, HStack, Text } from '@chakra-ui/react'
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import { HiOutlineUserCircle } from "react-icons/hi";
import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from "react-alert";
function Register() {
    const alert = useAlert();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [name, setName] = useState("");
    const Navigate = useNavigate();
    useEffect(() => {
        const check = async () => {
            try {
                await axios.get(
                    `https://notes-backend-nu.vercel.app/api/v1/islogin`,
                    { withCredentials: true }
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
            if (loginPassword.length >= 8) {

                try {
                    const { data } = await axios.post(
                        `https://notes-backend-nu.vercel.app/api/v1/register`,
                        {
                            "name": name,
                            "email": loginEmail,
                            "password": loginPassword
                        },
                    { withCredentials: true }
                    );
                    alert.success('Registered successfully');
                    Navigate('/')

                } catch (error) {
                    console.log(error)
                    alert.error(error.response.data.message)
                }
            }
            else
            {
                alert.error('Password must contain atleast 8 character')
            }
        }
        else {
            alert.error('enter a valid email')
        }
    }
    return (
        <>
            <Box display={'flex'} alignItems={'Center'} justifyContent={'Center'} bgColor={'purple.100'} minH={['90vh', '85vh']} >
                <VStack w={['80vw', '25vmax']} h={['50vmax', '30vmax']} bg={'white'} borderRadius={'1%'}>
                    <Box fontSize={['3vmax', '2vmax']} fontWeight={'0.1vmax'} textColor={'purple.300'} borderBottom={"2px"} borderBottomColor={'purple.400'} w={'full'} textAlign={'center'} p={'0.5vmax'} fontFamily={'sans-serif'}  >REGISTER</Box>
                    <FormControl >
                        <HStack><Box opacity={'0.5'} pt={'8%'} pos={"absolute"} id="a" transform={'auto'} translateX={['9.5vw', '3.5vw']}><HiOutlineUserCircle size={'30'} /></Box><Input placeholder='Name' type='text' borderColor={'purple.300'} borderWidth={'1px'} onChange={(e) => setName(e.target.value)} pl={'15%'} ml={'10%'} mr={'10%'} h={['5vmax', '3vmax']} mt={'8%'} focusBorderColor='purple.300' ></Input></HStack>
                        <HStack><Box opacity={'0.5'} pt={'8%'} pos={"absolute"} id="b" transform={'auto'} translateX={['9.5vw', '3.5vw']}><HiOutlineMail size={'30'} /></Box><Input placeholder='Email' type='email' borderColor={'purple.300'} onChange={(e) => setLoginEmail(e.target.value)} borderWidth={'1px'} pl={'15%'} ml={'10%'} mr={'10%'} h={['5vmax', '3vmax']} mt={'8%'} focusBorderColor='purple.300' ></Input></HStack>
                        <HStack><Box opacity={'0.5'} pt={'8%'} pos={"absolute"} id="c" transform={'auto'} translateX={['9.5vw', '3.5vw']}><GoLock size={'30'} /></Box><Input placeholder='Password' type='password' borderColor={'purple.300'} onChange={(e) => setLoginPassword(e.target.value)} borderWidth={'1px'} pl={'15%'} ml={'10%'} mr={'10%'} h={['5vmax', '3vmax']} mt={'8%'} focusBorderColor='purple.300' ></Input></HStack>
                        <Button w={'80%'} h={['5vmax', '3vmax']} bgColor={'purple.500'} ml={'10%'} mr={'10%'} mt={'10%'} onClick={submithandler} >Register</Button>
                        <Text ml={'20%'} mr={'20%'} pt={'6%'} fontSize={['1vmax']}>Already have an account? <a href='/login' style={{ color: 'orchid', fontWeight: "bold" }}>Login</a></Text>
                    </FormControl>
                </VStack>
            </Box>
        </>
    )
}

export default Register
