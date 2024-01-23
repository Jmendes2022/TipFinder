import {useState } from 'react'
import { Box, Container, Flex,  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  Button,
  ModalBody,
  ModalCloseButton, useDisclosure, FormControl, FormHelperText, Heading} from "@chakra-ui/react"
import Sidebar from "./Components/Sidebar"
import Calculator from './Components/Calculator';
import History from './Components/History';

function App() {
  const [currPage, setCurrPage] = useState('Calculator');
  const {isOpen, onClose, onOpen} = useDisclosure();
  const [user, setUser] = useState(null);

 return (
  <Container maxW='100vw' ml='0px' p='0px' filter='auto' blur={`${isOpen && '3px'}`}>
          <Flex>
          <Sidebar flex="1" setCurrPage={setCurrPage} handleModalDisplay={onOpen} currUser={user} setUser={setUser}/>
          <Flex flex="7" direction='column' align='center'>
            {currPage === 'Calculator' && <Calculator/>}
            {currPage === 'History' && <History/>}
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
              <ModalContent bg='gray.300' m='auto' color='black'>
                <ModalHeader>
                  <Heading >Login</Heading>
                  <ModalCloseButton/>
                </ModalHeader>
                <ModalBody>
                  <form id="login-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    alert("Submitted");
                  }}>
                    <FormControl>
                      <Input type="email" variant='filled' placeholder='Enter your Email' />
                      <FormHelperText>Please check your email for a code</FormHelperText>
                    </FormControl>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" form='login-form' colorScheme='blue' variant='solid'>Submit</Button>
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          </Modal>
          </Flex>
  </Container>
)}
export default App
