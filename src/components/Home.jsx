import { Box, Heading, HStack, Button } from '@chakra-ui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import Card from './Card';
import axios from 'axios';
import Loader from './Loader/Loader';
import { useAlert } from "react-alert";
export const usercontext = React.createContext();


const initial = 'TAKING NOTE IS THE PRACTICE OF RECORDING INFORMATION FROM DIFFERENT SOURCES AND PLATFORMS. BY TAKING NOTES, THE WRITER RECORDS THE ESSENCE OF THE INFORMATION, FREEING THEIR MIND FROM HAVING TO RECALL EVERYTHING.NOTES ARE COMMONLY DRAWN FROM A TRANSIENT SOURCE, SUCH AS AN ORAL SUCH AS COLLEGE LECTURES, THE MAIN PURPOSE OF TAKING NOTES MAY BE TO IMPLANT THE MATERIAL IN THE MIND, THE WRITTEN NOTES THEMSELVES BEING OF SECONDARY IMPORTANCE.'
function Home() {
    const alert = useAlert();
    const [notes, setnotes] = useState([{ title: 'SAMPLE NOTES', discription: initial }]);
    const [data, setdata] = useState({ title: '', discription: '' });
    const [loading, setloading] = useState(true);
    const Navigate = useNavigate();
    const rewrite = (title, discription) => {
        setdata(
            {
                ...data,
                title: { title },
                discription: { discription },
            }
        )
    }
    useEffect(() => {
        const check = async () => {
            try {
                await axios.get(
                    `https://notes-backend-nu.vercel.app/api/v1/islogin`,
                    { withCredentials: true }
                );

            } catch (error) {

                Navigate('/login')
            }
        }
        check();
    }, [])
    const clickhandler = () => {
        Navigate('/add')
    }
    useEffect(() => {
        const submithandler = async () => {
            try {
                const { data } = await axios.get(
                    `https://notes-backend-nu.vercel.app/api/v1/notes`,
                    { withCredentials: true }
                );
                const notes1 = data.notes.notes
                const arr = [];
                notes1.map((i, index) => {
                    const title = i.title
                    const discription = i.discription
                    const id = i._id;

                    arr.push({
                        title: title,
                        discription: discription,
                        id: id
                    })

                })
                setloading(false)
                setnotes(arr)
            } catch (error) {
                // alert.error(error.response.data.message)
                setloading(false)
            }
        }
        submithandler();
    },[loading])
    return (<Fragment>
        {(loading) ? (
            <Loader />
        ) : (

            <usercontext.Provider value={{ loading, setloading }}>
                {(!notes.length) ? (
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} h={'70vh'} >
                        <Heading color={'purple.300'} opacity={'0.7'}>Empty! Add New Note</Heading>
                        <Box pos={'fixed'} bottom={'2vmax'} right={'2vmax'}><Button onClick={clickhandler} colorScheme='purple' mt={'6'} w={'3.5rem'} h={'3.5rem'} fontSize={'3rem'} borderRadius={'100%'}><IoMdAdd /></Button></Box>
                    </Box>
                ) : (
                    <Box display={'flex'} flexDirection={['column', 'row']} alignItems={['center', 'flex-start']} bgColor={'purple.100'} >
                        <Box w={['100%']} minH={['90vh', '120vh']} bgColor={'purple.100'} p={'8'} >

                            <Heading color={'purple.300'} w={'full'} pl={'2'}>YOUR NOTES</Heading>
                            <HStack w={'full'} flexWrap={'wrap'} justifyContent={'flex-start'}>

                                {
                                    notes.map((i, index) => {
                                        return <Card title={i.title} id={i.id} discription={i.discription} key={index} ind={index} rewrite={rewrite} setloading={setloading} loading={loading} />
                                    })
                                }

                            </HStack>


                        </Box>
                        <Box pos={'fixed'} bottom={'2vmax'} right={'2vmax'}><Button onClick={clickhandler} colorScheme='purple' mt={'6'} w={'3.5rem'} h={'3.5rem'} fontSize={'3rem'} borderRadius={'100%'}><IoMdAdd /></Button></Box>
                    </Box>)
                }
            </usercontext.Provider>
        )}
    </Fragment>
    )
}

export default Home
