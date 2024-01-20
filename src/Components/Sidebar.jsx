import { Box, Container, Flex, Heading, Text,
    ListItem,
    UnorderedList,
    Button, } from "@chakra-ui/react";
import { useState } from "react";

export default function Sidebar({setCurrPage, handleModalDisplay, currUser, setUser}) {


    return (
            <Container bg='blue.600' h='100vh' w='25%' ml='0'>
                <Flex flexDir='column' alignItems='center' justifyContent='space-between'>
                    <Box>
                        <Text fontSize='1.5rem' textAlign='center' mt='2rem'>{currUser ? `Welcome ${currUser}!` : 'Welcome Guest!' }</Text>
                    </Box>
                    <Box mt='7em'>
                        <Heading fontSize='2.8rem'>TipFinder</Heading>
                    </Box>
                    <UnorderedList mt='10rem'>
                        <ListItem mb="1.5rem" fontSize='2rem' className="Nav-item" currUser={currUser} onClick={() => setCurrPage("Calculator")}>Tip Calculator</ListItem>
                        <ListItem fontSize='2rem' className="Nav-item" currUser={currUser} onClick={() => setCurrPage("History")}>Tip History</ListItem>
                    </UnorderedList>
                    <Box mt='5em'>
                        {currUser && <Button colorScheme='blackAlpha' variant='solid' size='lg'>Log Out</Button>}
                        {currUser || <Button colorScheme='blackAlpha' variant='solid' size='lg' onClick={handleModalDisplay}>Log In</Button>}
                    </Box>
                    <Box mt='5.5em'>
                        <Text fontSize='md'>JordanMendes©2024</Text>
                    </Box>
                </Flex>
            </Container>
    )
}