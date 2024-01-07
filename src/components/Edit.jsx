import { Container, VStack, Input, FormControl, FormLabel, Textarea, Button, Heading } from '@chakra-ui/react'
import React, { Fragment, useEffect } from 'react'

import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from './Loader/Loader';
import { useAlert } from "react-alert";
function Edit() {
    const alert = useAlert();
    const [data, setdata] = useState()
    const { id } = useParams();
    const Navigate = useNavigate();
    useEffect(() => {
        const check = async () => {
            try {
                await axios.get(
                    `https://notes-backend-nu.vercel.app/api/v1/islogin`
                );

            } catch (error) {
                alert.error(error.response.data.message)
                Navigate('/login')
            }
        }
        check();
    }, [])
    useEffect(() => {
        const submithandler = async () => {
            try {
                const { data } = await axios.post(
                    `https://notes-backend-nu.vercel.app/api/v1/getnote`,
                    {
                        "id": id
                    }
                );
                
                setdata({ title: data.Note.title, discription: data.Note.discription })

            } catch (error) {
                alert.error(error.response.data.message)
            }
        }
        submithandler();


    }, [])
    const submithandler = (e) => {
        e.preventDefault();
        const submithandler = async () => {
            try {
                await axios.put(
                    `https://notes-backend-nu.vercel.app/api/v1/editnotes`,
                    {
                        "id": id,
                        "title": data.title,
                        "discription": data.discription
                    }
                );
                alert.success('Updated successfully');
                Navigate('/')

                setdata({ title: '', discription: '' })
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }
        submithandler();

    }
    const cancelhandler = () => {
        Navigate('/');
    }
    const changehandler = (e) => {
        setdata(
            {
                ...data,
                [e.target.name]: e.target.value
            }

        )
    }


    return (
        <Fragment>
            {(!data) ? (
                <Loader />
            ) : (<Container minW={'full'} bgColor={'purple.100'} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} pt={['0', '2']} pb={'2'}>
                <VStack bgColor={'purple.200'} w={['full', '95%']} h={'95%'}  borderRadius={['2vw','2rem']} p={['4vw']} pt={['7vw','2vw']} mt={['-9vw','0vw']} >
                    <Heading fontSize={['1.5rem', '3rem']} color={'purple.300'} w={'full'} pl={['1', '2']} mb={['0','1']}>EDIT NOTE</Heading>
                    <FormControl>
                        <VStack alignItems={'flex-start'}>
                            <FormLabel color={'purple.500'} fontSize={'20'} textDecoration={'underline'}>Title :</FormLabel>
                            <Input id={'myText'} name={'title'} onChange={changehandler} value={data.title} placeholder='enter title here' type='text' borderColor={'purple.300'} borderWidth={'2px'} focusBorderColor={'purple.500'}></Input>
                        </VStack>
                        <VStack alignItems={'flex-start'} mt={'4'}>
                            <FormLabel color={'purple.500'} fontSize={'20'} textDecoration={'underline'}>Discription :</FormLabel>
                            <Textarea name={'discription'} onChange={changehandler} value={data.discription} placeholder='enter discription here' minH={'30vh'} borderColor={'purple.300'} borderWidth={'2px'} focusBorderColor={'purple.500'}></Textarea>
                        </VStack>

                        <Button onClick={submithandler} colorScheme='purple' mt={'6'} fontSize={'1vmax'} margin={'1vmax'}>Save</Button>
                        <Button onClick={cancelhandler} colorScheme='purple' mt={'6'} fontSize={'1vmax'} margin={'1vmax'}>Cancel</Button>

                    </FormControl>

                </VStack>

            </Container>
            )}
        </Fragment>
    )
}

export default Edit
