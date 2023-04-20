import React from 'react';
import { useState } from 'react';


const Header = (props) => {
  
  return(
        <h1><a href='/' onClick={function(event){
          event.preventDefault();
          props.onChangeMode();
        }}>{props.title}</a></h1>
      )
}



function Nav(props) {
  const lis = []
   for (let i = 0; i < props.topices.length; i++) {
      let t = props.topices[i];
        lis.push(<li key={i}><a href={/read/+t.id} onClick={event=>{
          event.preventDefault();
          props.onChangeMode(t.id);
        }}>{t.title}</a></li>)
    }
    
  return(
    <ol>
      {lis}
    </ol>
  )
}

function Article(props) {
  return(
    <article>
      <h1>{props.title}</h1>
       {props.body} 
    </article>
  )
}

function Create(props) {
  return(
    <article>
      <h2>Create</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input name='title' type="text" placeholder="Title" /></p>
        <p><textarea name='body' placeholder="Body" /></p>
        <p><input type="submit" value="Create" /></p>
      </form>
    </article>
  )
}


const Update = (props) => {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return(
    <article>
      <h2>Update</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onUpdate(title, body);
      }}>
        <p><input name='title' type="text" value={title} onChange={event=>{
          console.log(event.target.value);
          setTitle(event.target.value);
        }} /></p>
        <p><textarea name='body' value={body} onChange={event=>{
          console.log(event.target.value);
          setBody(event.target.value);
        }} /></p>
        <p><input type="submit" value="Update" /></p>
      </form>
    </article>
  )
}



export default function App() {
  const [mode, setMode] = useState('WLECOME');
  const [id, setId] = useState(null);
  
  const [topics, setTopics] = useState([
    {id:1, title:"hddtml", body:"html..." },
    {id:2, title:"css", body:"css..." },
    {id:3, title:"jsvascript", body:"jsvascript..." },
  ]);
  let content = null;
  let contextControl = null;
  if(mode === 'WELCOME'){
     content = <Article title="Welcome" body="Hello, WELCOME" />
  }else if(mode === 'READ'){
      let title, body = null;
      for (let i = 0; i < topics.length; i++) {
        if(topics[i].id === id){
          title = topics[i].title;
          body = topics[i].body;
        }
      }
      content = <Article title={title} body={body} />
      contextControl = <>
        <li><a href={'/update/'+id} onClick={event=>{
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>

      <li><input type="button" value="Delete" onClick={()=>{
        const newTopics = [];
        for(let i = 0; i < topics.length; i++){
          if(topics[i].id!== id){
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME');
      }} /></li>
      </>
  }else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:topics.length+1, title:_title, body:_body}
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);

    }}/>
  }else if(mode === 'UPDATE'){
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      console.log(title, body);
      const newTopics = [...topics];
      const updatedTopic = {id:id, title:title, body:body}
      for (let i = 0; i < newTopics.length; i++) {
         if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
    }  
  }
  setTopics(newTopics);
  setMode('READ');
    }} />
  }
  return (
    <div>
      <Header title="REACT" onChangeMode={function(){
        setMode('WELCOME');
      }} />

      <Nav topices={topics} onChangeMode={(_id)=>{
        setMode('READ');
        console.log(setId);
        setId(_id);
      }} />
     
      {content}
     
     <li>
      <a href="/create" onClick={event=>{
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a>  
    </li> 

        {contextControl}
    </div>
  );
}
