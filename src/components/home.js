import { useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import './Home.css'

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

function Home() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);

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
    
    const targetUrl = 'https://s22x6htsk0.execute-api.eu-central-1.amazonaws.com/prod/run';
  
    fetch(targetUrl, requestOptions).then(res => res.text())
      .then(res => {
        const result = JSON.parse(res);
        console.log(result);
        setResponse(result.body.join('\n'));
        setHistory(prevHistory => [...prevHistory, text]);
        setText('');
      });
  };
  

  return (
    <div>
      <header >
        <h1>Home</h1>
      </header>
      <div>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
        <button onClick={handleSend}>Send</button>
        <div>Response: {response}</div>
        <h1>Your last messages: </h1>
        <ul>
        {history.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default withAuthenticator(Home, { hideSignUp: true });