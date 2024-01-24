import { Box, Container, Flex, Heading, Text,
    ListItem,
    UnorderedList,
    Button, } from "@chakra-ui/react";

export default function Sidebar({setCurrPage, handleModalDisplay, currUser, setUser}) {


    return (
            <Container bg='blue.600' maxH={{base: '30%', md:'100vh'}} maxW={{base: '100%' , md: '30%', lg: '27%', xl: "20%"}} ml='0'>
                <Flex flexDir='column' alignItems='center' h={{base: '12rem', md: '100vh'}} justifyContent='space-between'>
                    {/* <Box>
                        <Text fontSize={{base: '.8rem', md: '1rem', lg: '1.5rem'}} textAlign='center' mt={' 2rem'}>{currUser ? `Welcome ${currUser}!` : 'Welcome Guest!' }</Text>
                    </Box> */}
                    <Box mt={{base: '1.2rem', md: '7em'}}>
                        <Heading fontSize={{md: '2rem', lg: '2.8rem'}}>TipFinder</Heading>
                    </Box>
                    <UnorderedList mt={{base: '2rem', md: '10rem'}}>
                            <ListItem _hover={{"@media(min-width: 62em)": { cursor: 'pointer', fontSize: '2.1rem', color: 'gray.50'},}} mb={{base: '.5rem', md: "1.5rem"}} fontSize={{base: '1.2rem', md: '1.5rem', lg: '1.8rem'}} className="Nav-item" currUser={currUser} onClick={() => setCurrPage("Calculator")}>Tip Calculator</ListItem>
                            <ListItem _hover={{"@media(min-width: 62em)": { cursor: 'pointer', fontSize: '2.1rem', color: 'gray.50'},}} fontSize={{base: '1.2rem', md: '1.5rem', lg: '1.8rem'}} className="Nav-item" currUser={currUser} onClick={() => setCurrPage("History")}>Tip History</ListItem>
                    </UnorderedList>
                    <Box mt={{base: '0rem',md: '5em'}}>
                        {currUser && <Button colorScheme='blackAlpha' variant='solid' size='lg'>Log Out</Button>}
                        {currUser && <Button colorScheme='blackAlpha' variant='solid' size='lg' onClick={handleModalDisplay}>Log In</Button>}
                    </Box>
                    <Box mt={{base: '0px', md: '0px', lg: '0px'}} mb={{md: '1rem'}}>
                        <Text fontSize={{base: 'sm', md: 'md', lg: 'lg'}} mt={{base: '0'}}>JordanMendes©2024</Text>
                    </Box>
                </Flex>
            </Container>
    )
}