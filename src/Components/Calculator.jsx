import { Heading, Input, Center, FormControl, Box, Button, Flex, Text, Grid, GridItem, FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function() {
const [tipPercent, setTipPercent] = useState();
const [billTotal, setBillTotal] = useState();
const [business, setBusiness] = useState("");
const [tip, setTip] = useState(0);
const [billAfterTip, setBillAfterTip] = useState(0);

useEffect(() => {

    function Calculate()
    {
        const parsedBillTotal = parseFloat(billTotal);
        const parsedTipPercent = parseFloat(tipPercent) >= 1 ? parseFloat(tipPercent) / 100 : parseFloat(tipPercent);

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

    setTipPercent(0);
    setBillTotal(0);
    setBusiness("");
    setTip(0);
    setBillAfterTip(0);
}


    return (
        <Center bg='white' h={{base: '70vh', md: '100vh'}} minW='100%'>
            <Flex direction="column" p="0px" m="0px">
                <Heading color={"black"} textAlign={"center"} mt={{base: '2rem', md: '3rem', xl: '0'}} fontSize={{base: 'lg', md: 'x-large', lg: 'xx-large'}} p={{base: '1rem'}}>Enter your information below and press <em><u>Save</u></em> to add to your history</Heading>
                <FormControl>
                <form id="tip-form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmitForm();
                    }}>
                <Grid mt={{base: '1rem', md: '5rem', xl: '10rem'}} w='100%' templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}} rowGap={{base: "1rem", md: '4rem'}}>
                    <GridItem colSpan={{base: 1, md: 2}} justifySelf='center' w={{base: '80%', md: '60%', lg: '45%', xl: '35%'}}>
                        <FormLabel className="label">Business Name (Optional)</FormLabel>
                        <Input className="input" variant='filled' placeholder="Joe's Clam Shack" value={business} onChange={(e) => setBusiness(e.target.value)}/>
                    </GridItem>
                    <GridItem justifySelf='center' w={{base: '80%', xl: '60%'}}>
                        <FormLabel className="label">Tip Percentage</FormLabel>
                        <Input className="input" type="number" isRequired variant='filled' placeholder=".25" step='0.01' min='.00' max='1'  value={tipPercent} onChange={(e) => setTipPercent(e.target.value)}/>
                    </GridItem>
                    <GridItem justifySelf='center' w={{base: '80%', xl: '60%'}}>
                        <FormLabel className="label">Bill Total</FormLabel>
                        <Input className="input" type="number" isRequired variant='filled' placeholder="65.24" step="0.01" min="0" value={billTotal} onChange={(e) => setBillTotal(e.target.value)}/>
                    </GridItem>
                </Grid>
                <Box>
                    <Flex flexDir='column' align='center' mt={{base: '2rem', md: '3rem'}} rowGap={{base: '1rem', md: '2rem'}}>
                        {tip && billAfterTip && <Text className="text" fontSize={{base: 'lg', md: 'lg', lg: 'x-large'}}>Tip Amount: ${tip.toFixed(2)}</Text>}
                        {tip && billAfterTip && <Text className="text" fontSize={{base: 'lg', md: 'lg', lg: 'x-large'}}>New Bill Total: ${billAfterTip < 0 ? "" : billAfterTip.toFixed(2)}</Text>}
                        <Button colorScheme='blue' variant='solid' type="submit" form='tip-form' w={{lg: '8rem'}}>Save</Button>
                    </Flex>
                </Box>
                </form>
                </FormControl>
            </Flex>
        </Center>
    )
}