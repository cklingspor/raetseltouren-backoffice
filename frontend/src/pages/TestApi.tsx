import React, { ReactElement, FC } from "react";
import { Box, TextField, Button } from "@mui/material";

let body = {
    "ToCountry": "DE",
    "ToState": "",
    "SmsMessageSid": "SMdc7307a6f2b0534ab07bf5c32e21e7e4",
    "NumMedia": "0",
    "ToCity": "",
    "FromZip": "",
    "SmsSid": "SMdc7307a6f2b0534ab07bf5c32e21e7e4",
    "FromState": "",
    "SmsStatus": "received",
    "FromCity": "",
    "Body": "Test",
    "FromCountry": "DE",
    "To": "+4915735986865",
    "ToZip": "",
    "NumSegments": "1",
    "ReferralNumMedia": "0",
    "MessageSid": "SMdc7307a6f2b0534ab07bf5c32e21e7e4",
    "AccountSid": "AC2721a062eb43000b76a88df0ca9787ed",
    "From": "+4915170894541",
    "ApiVersion": "2010-04-01"
};

const TestApi: FC<any> = (): ReactElement => {
    const [response, setResponse] = React.useState<string>('');
    const [text, setText] = React.useState<string>('');
    const [history, setHistory] = React.useState<string[]>([]);


    const handleSend = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        body.Body = text

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(body),
            redirect: 'follow'
        };

        const targetUrl = 'https://7j6tg5e5mb.execute-api.eu-central-1.amazonaws.com/prod/run';

        fetch(targetUrl, requestOptions as RequestInit)
            .then(res => res.text())
            .then(res => {
                const result = JSON.parse(res);
                console.log(result);
                setResponse(result.body.join('\n'));
                setHistory(prevHistory => [...prevHistory, text]);
                setText('');
            });

    };

    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: "column",
        }}>
            <TextField
                    label="Enter text"
                    value={text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSend}>
                    Send
                </Button>
                <div>Response: {response}</div>
                <h1>Your last messages: </h1>
                <ul>
                    {history.map((text, index) => (
                        <li key={index}>{text}</li>
                    ))}
                </ul>
        </Box>
    );
}

export default TestApi;