import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
    "https://jqxyquswkvchzzxfqdml.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxeHlxdXN3a3ZjaHp6eGZxZG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQyOTYxNDksImV4cCI6MTk4OTg3MjE0OX0.QTNcGw9juPPlFeMVUI3_VqyTC69nD_kemYWZDgPrxlU"
  );

const Chat = () => {
  const [msg, setmsg] = useState("");
  const [username, setUsername] = useState(" ");


  const [fullMessage, setFullMessage] = useState([]);

  const AllMeesage = async () => {
    let { data } = await supabase.from("chat-app").select("*");
    console.log(data);
    setFullMessage(data);
  };

  


  supabase.channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'chat-app' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

  
    // fetch all data --> insert --> subscribe event  --> update local state

  useEffect(() => {
    AllMeesage()
  }, []);
  const sendMessage = async (event) => {
    event.preventDefault();
    if (msg === "") {
      alert("Please Add Some message");
      return;
    }
    await supabase
      .from("chat-app")
      .insert({ message: msg, username: username })
      .single()
      .then(({ data, error }) => {
        console.log(data, error);
      });
   
  };
  return (
    <>
      <div className="todotitle">
        <h1>Chat app</h1>
      </div>
      <form className="message_form">
        <input
          className="input_form"
          placeholder="UserName"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          className="input_form"
          placeholder="Add your message"
          type="text"
          value={msg}
          onChange={(e) => setmsg(e.target.value)}
        />
        <button type="submit" onClick={sendMessage} className="add_button">
          Send
        </button>
      </form>

      <h1>all message</h1> <br />
      <div className="List-view">
          {fullMessage &&
            fullMessage.map((uname) => (
              <div key={uname.id}>
                <div  {...uname} >{uname.message}</div> 
              </div>
            ))}
        </div>
    </>
  );
};
export default Chat;