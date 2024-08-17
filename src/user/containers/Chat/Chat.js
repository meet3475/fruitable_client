import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

function Chat(props) {

    const socket = useMemo(() => io('http://localhost:8080'));
    const [rec, setRec] = useState('');
    const [msg, setMsg] = useState('');
    const [allmsg, setAllmsg] = useState([]);
    const [gruop, setGruop] = useState('');


    useEffect(() => {
        socket.on('connect', () => {
            console.log('Cilent To Connenct', socket.id);
        });

        socket.on('welcome', (msg) => { console.log(msg) });

        socket.on('greeting', (msg) => { console.log(msg) });

        socket.on('rec-msg', (msg) => {setAllmsg(prev => [...prev, msg])});
       
    }, [gruop])




    const hendalsubmit = (event) => {
        event.preventDefault()
        socket.emit('message', {
            reciver: rec,
            message: msg
        })
    }

    const hendalgruopsubmit = (event) => {
        event.preventDefault()
        console.log("ggggg", gruop);
        
        socket.emit('join-gruop', gruop)
    }

    return (
        <div>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Chat</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Chat</li>
                </ol>
            </div>
            <br></br><br></br>

            {
                allmsg.map((v) => (
                    <p>{v}</p>
                ))
            }

            <form onSubmit={hendalgruopsubmit}>
                <input
                    type="text"
                    name="rec"
                    placeholder="Please Enter Gruop Name:"
                    onChange={(e) => setGruop(e.target.value)}
                />

                <input type='submit' />
            </form>

            <br></br>

            <form onSubmit={hendalsubmit}>
                <input
                    type="text"
                    name="rec"
                    placeholder="Please Enter Reciver id:"
                    onChange={(e) => setRec(e.target.value)}
                />


                <input
                    type="text"
                    name="msg"
                    placeholder="Please Enter a message"
                    onChange={(e) => setMsg(e.target.value)}
                />

                <input type='submit' />
            </form>

        </div>
    );
}

export default Chat;