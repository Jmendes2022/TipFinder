import { Heading, Input, Container, FormControl, Box, Button, Flex, Text, Grid, GridItem, FormLabel } from "@chakra-ui/react";
import { useState } from "react";

export default function({currUser}) {
const [tipPercent, setTipPercent] = useState(0);
const [billTotal, setBillTotal] = useState(0);
const [business, setBusiness] = useState(null);

const tip = billTotal * tipPercent;
const billAfterTip = billTotal + tip;

function handleSubmitForm()
{
    let historyArray = localStorage.getItem("history");
    historyArray = historyArray ? JSON.parse(historyArray) : [];
    const date = Date.now();
    historyArray = [...historyArray, {business, tipPercent, billTotal, billAfterTip, date}];
    localStorage.setItem("history", JSON.stringify(historyArray));

    setTip(0);
    setBillTotal(0);
    setBusiness(null);
    console.log(localStorage.getItem("history"));
}

    return (
        <Container bg='white' h='100vh' w='100%' >
            <Heading className="header">Enter your information below and press <em><u>Calculate</u></em> to find your tip percentage</Heading>
            <FormControl>
            <form id="tip-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmitForm();
                  }}>
            <Grid mt='10em' w='100%' templateColumns='repeat(2, 1fr)' rowGap='4rem'>
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
                    <Text className="text" >Tip Amount: ${tip.toFixed(2)}</Text>
                    <Text className="text" >New Bill Total: ${typeof billAfterTip === 'number' ? billAfterTip.toFixed(2) : parseFloat(billAfterTip).toFixed(2)}</Text>
                    <Button colorScheme='blue' variant='solid' type="submit" form='tip-form'>Calculate</Button>
                </Flex>
            </Box>
            </form>
            </FormControl>
        </Container>
    )
}