import { Container, VStack, Input, FormControl, FormLabel, Textarea, Button, Heading } from '@chakra-ui/react'
import {React,useEffect} from 'react'

import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";
function Add() {
    
    const [data, setdata] = useState({ title: "", discription: "" })
    const Navigate= useNavigate();
    const alert = useAlert();
    useEffect(() => {
        const check = async () => {
            try {
                await axios.get(
                    `/api/v1/islogin`
                );

            } catch (error) {
                alert.error(error.response.data.message)
                Navigate('/login')
            }
        }
        check();
    }, [])
    const submithandler = (e) => {
        e.preventDefault();
        const submithandler = async () => {
            try {
                 await axios.put(
                    `/api/v1/addnotes`,
                    {
                        "title": data.title,
                        "discription": data.discription
                    }
                );
                alert.success('Added successfully');
                Navigate('/')
                
                setdata({ title: '', discription: '' })
            } catch (error) {
                alert.error(error.message)
            }
        }
        submithandler();
        
    }
    const changehandler = (e) => {
        setdata(
            {
                ...data,
                [e.target.name]: e.target.value
            }

        )
    }


    return (<Container minW={'full'} bgColor={'purple.100'} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} pt={['0', '2']} pb={'2'}>
        <VStack bgColor={'purple.200'} w={['full', '95%']} h={'95%'} borderRadius={['2vw','2rem']} p={['4vw']} pt={['7vw','2vw']} mt={['-6vw','0vw']}>
            <Heading fontSize={['1.5rem', '3rem']} color={'purple.300'} w={'full'} pl={['1', '2']} mb={['0','1']}>ADD NEW NOTE</Heading>
            <FormControl>
                <VStack alignItems={'flex-start'}>
                    <FormLabel color={'purple.500'} fontSize={'20'} textDecoration={'underline'}>Title :</FormLabel>
                    <Input id={'myText'} name={'title'} onChange={changehandler} value={data.title} placeholder='enter title here' type='text' borderColor={'purple.300'} borderWidth={'2px'} focusBorderColor={'purple.500'}></Input>
                </VStack>
                <VStack alignItems={'flex-start'} mt={'4'}>
                    <FormLabel color={'purple.500'} fontSize={'20'} textDecoration={'underline'}>Discription :</FormLabel>
                    <Textarea name={'discription'} onChange={changehandler} value={data.discription} placeholder='enter discription here' minH={'30vh'} borderColor={'purple.300'} borderWidth={'2px'} focusBorderColor={'purple.500'}></Textarea>
                </VStack>

                <Button onClick={submithandler} colorScheme='purple' mt={'6'} w={'3.5rem'} h={'3.5rem'} fontSize={'3rem'} borderRadius={'100%'}><IoMdAdd /></Button>
                {/* <Button colorScheme='purple' onClick={updatehandler} display={() => { return (check ? 'flex' : 'none') }} mt={'6'} w={'3.5rem'} h={'3.5rem'} fontSize={'3rem'} borderRadius={'100%'}><IoMdAdd /></Button> */}
            </FormControl>

        </VStack>

    </Container>
    )

}

export default Add
