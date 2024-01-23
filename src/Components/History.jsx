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
const [selectedData, setSelectedData] = useState();

useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(data);
    console.log(data);
}, [])


useEffect(() => {
    
    try {
        const billTotalArray = history.map(x => parseFloat(x.billTotal));
        const newBillTotalArray = history.map(x => parseFloat(x.billAfterTip));
        const foundGrandTotal = billTotalArray.reduce((acc, curr) => acc + curr, 0);
        const foundAverageBill = foundGrandTotal / billTotalArray.length;
        const foundAverageTip = (history.map(x => parseFloat(x.tipPercent)).reduce((acc, curr) => acc + curr, 0) / 2);
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

function handleDelete()
{   
    if (key === null) {
        
    }

    onClose();
    const newHistory = history.filter(x => x != key);
    console.log(newHistory);

}

    return (
        <Container bg='white' h='100vh' minW='100%'>
            <Flex direction='column' justify='flex-start'>
            <Heading className="header" mt='5rem' >Your Tip History</Heading>
                <TableContainer mt="8rem" w="70%" ml="auto" mr="auto">
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
                            <Td color="red.600"><FaRegTrashCan cursor="pointer" onClick={() => {setSelectedData(x); handleDelete();}}/></Td>
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
                <Center mt='5rem' color="black">
                    <SimpleGrid columns={2} spacingX='10em' spacingY='4rem'>
                        <Text>Most Expensive Bill: ${mostExpensiveBill}</Text>
                        <Text>Least Expensive Bill: ${leastExpensiveBill}</Text>
                        <Text>Highest Tip %: {highestTip}</Text>
                        <Text>Lowest Tip %: {lowestTip}</Text>
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