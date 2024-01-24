import { FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState, useRef } from "react";
import {Center, Container, Heading, Flex, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer, 
    Text,
    SimpleGrid, 
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,} from '@chakra-ui/react'

export default function() {

const [history, setHistory] = useState([]);
const [origGrandTotal, setOrigGranTotal] = useState(0);
const [averageBill, setAverageBill] = useState(0);
const [averageTip, setAverageTip] = useState(0);
const [newGrandTotal, setNewGrandTotal] = useState(0);
const [newAverageBill, setNewAverageBill] = useState(0);
const [mostExpensiveBill, setMostExpensiveBill] = useState(0);
const [leastExpensiveBill, setLeastExpensiveBill] = useState(0);
const [highestTip, setHighestTip] = useState(0);
const [lowestTip, setLowestTip] = useState(0);

const { isOpen, onOpen, onClose } = useDisclosure();
const cancelRef = useRef();
const [selectedData, setSelectedData] = useState(null);

useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(data);
}, [])


useEffect(() => {
    
    try {
        const billTotalArray = history.map(x => parseFloat(x.billTotal));
        const newBillTotalArray = history.map(x => parseFloat(x.billAfterTip));
        const foundGrandTotal = billTotalArray.reduce((acc, curr) => acc + curr, 0);
        const foundAverageBill = foundGrandTotal / billTotalArray.length;
        const foundAverageTip = (history.map(x => parseFloat(x.tipPercent)).reduce((acc, curr) => acc + curr, 0) / history.length);
        const billTotalAfterTipArray = history.map(x => parseFloat(x.billAfterTip)); 
        const foundGrandTotalAfterTip = billTotalAfterTipArray.reduce((acc, curr) => acc + curr, 0);
        const foundAverageBillAfterTip = foundGrandTotalAfterTip / billTotalAfterTipArray.length;
        const foundMostExpensiveBill = newBillTotalArray.reduce((acc, curr) => curr > acc ? curr : acc, 0);
        const foundLeastExpensiveBill = newBillTotalArray.reduce((acc, curr) => curr < acc ? curr : acc);
        const foundHighestTip = (history.map(x => parseFloat(x.tipPercent)).reduce((acc, curr) => curr > acc ? curr : acc, 0));
        const foundLowestTip = (history.map(x => parseFloat(x.tipPercent)).reduce((acc, curr) => curr < acc ? curr : acc));

        setLowestTip(parseFloat(foundLowestTip).toFixed(2));
        setHighestTip(parseFloat(foundHighestTip).toFixed(2));
        setLeastExpensiveBill(parseFloat(foundLeastExpensiveBill).toFixed(2));
        setMostExpensiveBill(parseFloat(foundMostExpensiveBill).toFixed(2));
        setNewAverageBill(parseFloat(foundAverageBillAfterTip).toFixed(2));
        setNewGrandTotal(parseFloat(foundGrandTotalAfterTip).toFixed(2));
        setAverageTip(parseFloat(foundAverageTip).toFixed(2));
        setAverageBill(parseFloat(foundAverageBill).toFixed(2));
        setOrigGranTotal(parseFloat(foundGrandTotal).toFixed(2));
    }
    catch (error) {
        console.log(error);
    }
}, [history])

function handlePromptDelete(key)
{   
    setSelectedData(key);
    onOpen();
}

function handleDelete()
{
    const newHistory = history.filter(x => history.indexOf(x) != selectedData);
    localStorage.setItem("history", JSON.stringify(newHistory));
    setHistory(newHistory);
    onClose();
}


    return (
        <Container bg='white' h='100vh' maxW='100vw'>
            <Flex direction='column' justify='flex-start' maxW={{md: '60vw', xl: '100vw'}}>
            <Heading className="header" mt={{base: '2rem', md:'5rem', lg: '3.8rem', xl: '5rem'}} >Your Tip History</Heading>
                <TableContainer mt={{base: '3rem', md: "3rem", xl: "8rem"}} fontSize={{base: 'sm', md: 'lg', xl: 'x-large'}} maxW={{base: '100%' , md: "100%", xl: '90%'}} ml="auto" mr="auto">
                <Table variant='simple'>
                    <Thead color='gray.400'>
                    <Tr>
                        <Th>Business Name</Th>
                        <Th>Original Bill</Th>
                        <Th>Tip Percentage</Th>
                        <Th>New Total</Th>
                        <Th>Date</Th>
                        <Th></Th>
                    </Tr>
                    </Thead>
                    <Tbody color="black">
                    {history && history.map((x, index) => 
                        <Tr key={index}>
                            <Td>{x.business ?? ""}</Td>
                            <Td>{x.billTotal ?? ""}</Td>
                            <Td>{x.tipPercent ?? ""}</Td>
                            <Td>{x.billAfterTip ?? ""}</Td>
                            <Td>{x.formattedDate ?? ""}</Td>
                            <Td color="red.600"><FaRegTrashCan cursor="pointer" onClick={() => handlePromptDelete(index)}/></Td>
                        </Tr>
                    )}
                    </Tbody>
                    <Tfoot>
                    <Tr>
                        <Th>{history.length} Results</Th>
                        <Th><span>Grand Total: ${origGrandTotal}</span> <br/> <span>Average: ${averageBill}</span></Th>
                        <Th>Average Tip %: {averageTip}</Th>
                        <Th><span>Grand Total: ${newGrandTotal}</span> <br/> <span>Average: ${newAverageBill}</span></Th>
                    </Tr>
                    </Tfoot>
                </Table>
                </TableContainer>
                <Center mt={{base: '5rem', lg: '4.7rem'}} mb='2rem' color="black" maxW={{lg: '100%'}} >
                    <SimpleGrid columns={{base: 1, md: 2, lg: 2}} textAlign={{lg: 'center'}} spacingX={{md: '4rem', lg: '3em'}} spacingY={{md: '2rem', lg: '2rem'}} m={{lg: 'auto'}}>
                        <Text textAlign={{base: "center", md: 'auto'}} fontSize={{base: 'lg', xl: 'x-large'}}>Most Expensive Bill: ${mostExpensiveBill}</Text>
                        <Text textAlign={{base: "center", md: 'auto'}} fontSize={{base: 'lg', xl: 'x-large'}}>Least Expensive Bill: ${leastExpensiveBill}</Text>
                        <Text textAlign={{base: "center", md: 'auto'}} fontSize={{base: 'lg', xl: 'x-large'}}>Highest Tip %: {highestTip}</Text>
                        <Text textAlign={{base: "center", md: 'auto'}} fontSize={{base: 'lg', xl: 'x-large'}}>Lowest Tip %: {lowestTip}</Text>
                    </SimpleGrid>
                </Center>
            </Flex>
            <AlertDialog isOpen={isOpen} motionPreset="slideInBottom" blockScrollOnMount={true} isCentered leastDestructiveRef={cancelRef} onClose={onClose} >
                <AlertDialogOverlay>
                <AlertDialogContent >
                    <AlertDialogHeader fontSize='lg' fontWeight='bold' color="black">
                    Delete Input
                    </AlertDialogHeader>
                    <AlertDialogBody color="black" fontWeight='bold'>
                    Are you sure? <em><u>This can't be undone!</u></em>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' onClick={handleDelete} ml={3}>
                        Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Container>
    )

}