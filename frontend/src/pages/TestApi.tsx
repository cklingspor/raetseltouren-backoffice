import React, { ReactElement, FC } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

let body = {
  ToCountry: "DE",
  ToState: "",
  SmsMessageSid: "SMdc7307a6f2b0534ab07bf5c32e21e7e4",
  NumMedia: "0",
  ToCity: "",
  FromZip: "",
  SmsSid: "SMdc7307a6f2b0534ab07bf5c32e21e7e4",
  FromState: "",
  SmsStatus: "received",
  FromCity: "",
  Body: "Test",
  FromCountry: "DE",
  To: "+4915735986865",
  ToZip: "",
  NumSegments: "1",
  ReferralNumMedia: "0",
  MessageSid: "SMdc7307a6f2b0534ab07bf5c32e21e7e4",
  AccountSid: "AC2721a062eb43000b76a88df0ca9787ed",
  From: "+4915170894541",
  ApiVersion: "2010-04-01",
};

const TestApi: FC<any> = (): ReactElement => {
  const [text, setText] = React.useState<string>("");
  const [history, setHistory] = React.useState<
    { text: string; response: string }[]
  >([]);

  const handleSend = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    body.Body = text;

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: "follow",
    };

    const targetUrl =
      "https://7j6tg5e5mb.execute-api.eu-central-1.amazonaws.com/prod/run";

    fetch(targetUrl, requestOptions as RequestInit)
      .then((res) => res.text())
      .then((res) => {
        const result = JSON.parse(res);
        console.log(result);
        setHistory((prevHistory) => [
          ...prevHistory,
          { text: text, response: result.body.join("\n") },
        ]);
        setText("");
      });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSend}>
            Send
          </Button>
        </Grid>
        <Grid item xs={12}>
          <h1>Your last messages: </h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Text</TableCell>
                <TableCell>Response</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...history].reverse().map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{item.text}</TableCell>
                  <TableCell>{item.response}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestApi;
