import {useState } from 'react'
import { Box, Center, Flex,  Modal,
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

function App() {
  const [currPage, setCurrPage] = useState('Calculator');
  const {isOpen, onClose, onOpen} = useDisclosure();
  const [user, setUser] = useState(null);


  return (
    <>
    <Box w='100%' filter='auto' blur={`${isOpen && '3px'}`}>
      <Flex>
          <Sidebar setCurrPage={setCurrPage} handleModalDisplay={onOpen} currUser={user} setUser={setUser}/>
          {currPage === 'Calculator' && <Calculator/>}
          {currPage === 'History' && <Center bg='red' h='100vh' w='100%' >
            </Center>
          }
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
    </Box>
    </>
  )
}

export default App
