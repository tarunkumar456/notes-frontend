
import { Box, VStack, Text, Heading, HStack, Button, } from '@chakra-ui/react'
import React from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { FiShare } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import { useContext } from 'react'
import { usercontext } from './Home'

function Card({ title, discription, ind, id }) {
    const alert = useAlert();
    const { loading, setloading } = useContext(usercontext);
    const Navigate = useNavigate();
    const { notes, setnotes, data, setdata } = useContext(usercontext);
    const deletenote = (index) => {
        const submithandler = async () => {
            try {
                const { data } = await axios.put(
                    `https://notes-backend-nu.vercel.app/api/v1/deletenotes`,
                    {
                        "id": id
                    },
                    { withCredentials: true }
                );
                alert.success('Deleted successfully');
                setloading(true)
            } catch (error) {
                alert.error(error.response.data.message)
            }
        }
        submithandler();
    }
    const send = `Title : ${title} || Discription : ${discription}`;
    const editnote = (index) => {
        Navigate(`/edit/${id}`)

    }
    return (
        <VStack
            w={['95%', "20rem"]}
            h={['15rem', "20rem"]}
            boxShadow='lg'
            p={"4"}
            bgColor={'purple.200'}
            borderRadius={"lg"}
            transition={"all 0.3s"}
            m={['2', "4"]}
            _hover={{
                transform: "scale(1.05)"
            }}   
            alignItems={'flex-start'}
            justifyContent={'space-between'}
        >
            <Box m={'2'} h={"17rem"} overflow={'auto'} color={'purple'}>
                <Box>
                    <Text color={'purple.400'} size={'8'} textDecoration={'underline'} fontWeight={'bold'}>Title :</Text>
                    <Text>{title}</Text>
                </Box>
                <Box>
                    <Text color={'purple.400'} size={'8'} textDecoration={'underline'} fontWeight={'bold'}>Discription :</Text>
                    <Text>{discription}</Text>
                </Box>
            </Box>
            <HStack w={'full'} justifyContent={'space-evenly'}>
                <Button colorScheme='purple' onClick={() => editnote(ind)}><BiEdit /></Button>

                <Button colorScheme='purple' onClick={deletenote}><AiFillDelete /></Button>
                <a href={`whatsapp://send?text=${send}`} target='blank'>
                    <Button colorScheme='purple' ><FiShare /></Button>
                </a>
            </HStack>
        </VStack>
    )
}

export default Card
