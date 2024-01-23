import { Heading, Input, Center, FormControl, Box, Button, Flex, Text, Grid, GridItem, FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function() {
const [tipPercent, setTipPercent] = useState(0);
const [billTotal, setBillTotal] = useState(0);
const [business, setBusiness] = useState(null);
const [tip, setTip] = useState(0);
const [billAfterTip, setBillAfterTip] = useState(0);

useEffect(() => {

    function Calculate()
    {
        const parsedBillTotal = parseFloat(billTotal);
        const parsedTipPercent = parseFloat(tipPercent);

        if (!isNaN(parsedBillTotal) && !isNaN(parsedTipPercent)) 
        {
            const calculatedTip = parsedBillTotal * parsedTipPercent;
            const calculatedBillAfterTip = parseFloat((parsedBillTotal + calculatedTip).toFixed(2))  
            setTip(calculatedTip);
            setBillAfterTip(calculatedBillAfterTip);
        };
        console.log(tip);
        console.log(billAfterTip);
    }

    Calculate();

}, [billTotal, tipPercent]);

function handleSubmitForm()
{

    let historyArray = localStorage.getItem("history");
    historyArray = historyArray ? JSON.parse(historyArray) : [];
    const date = Date.now();
    const formattedDate = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit' }).format(date);
    historyArray = [...historyArray, {business, tipPercent, billTotal, billAfterTip, formattedDate}];
    localStorage.setItem("history", JSON.stringify(historyArray));
    console.log(localStorage.getItem("history"));

    setTip(0);
    setBillTotal(0);
    setBusiness(null);
}


    return (
        <Center bg='white' h='100vh' minW='100%' >
            <Flex direction="column" p="0px" m="0px">
                <Heading className="header" mt='5rem'>Enter your information below and press <em><u>Save</u></em> to add to your history</Heading>
                <FormControl>
                <form id="tip-form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmitForm();
                    }}>
                <Grid mt='10rem' w='100%' templateColumns='repeat(2, 1fr)' rowGap='4rem'>
                    <GridItem colSpan={2} justifySelf='center'>
                        <FormLabel className="label">Business Name (Optional)</FormLabel>
                        <Input className="input" variant='filled' placeholder="Joe's Clam Shack" value={business} onChange={(e) => setBusiness(e.target.value)}/>
                    </GridItem>
                    <GridItem justifySelf='center'>
                        <FormLabel className="label">Tip Percentage</FormLabel>
                        <Input className="input" type="number" isRequired variant='filled' placeholder=".25" step='0.01' min='.00' max='1'  value={tipPercent} onChange={(e) => setTipPercent(e.target.value)}/>
                    </GridItem>
                    <GridItem justifySelf='center'>
                        <FormLabel className="label">Bill Total</FormLabel>
                        <Input className="input" type="number" isRequired variant='filled' placeholder="65.24" step="0.01" min="0" value={billTotal} onChange={(e) => setBillTotal(e.target.value)}/>
                    </GridItem>
                </Grid>
                <Box>
                    <Flex flexDir='column' align='center' mt='3rem' rowGap='2rem'>
                        {tip && billAfterTip && <Text className="text" >Tip Amount: ${tip}</Text>}
                        {tip && billAfterTip && <Text className="text" >New Bill Total: ${billAfterTip > 0 ? "" : billAfterTip}</Text>}
                        <Button colorScheme='blue' variant='solid' type="submit" form='tip-form'>Calculate</Button>
                    </Flex>
                </Box>
                </form>
                </FormControl>
            </Flex>
        </Center>
    )
}