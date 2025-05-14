import React, { createContext, useState, useContext } from 'react';

const CreateContent = createContext();

const Content = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [isloading, setIsloading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [errors, Seterrors] = useState(null)
  const [islogin, SetIsLogin] = useState(false)
  const [username, setUsername] = useState(null)
  const [passwords, setPasswords] = useState(null)
  const [email, setEmail] = useState(null)
  const [generaltoken, setGeneraltoken] = useState(null)
  const [event_id, setEvent_id] = useState(0)
  const [eventregister, setEventRegister] = useState(null)

  const HandleSidbar = () => {
    setVisible(!visible);
  };

  

  return (
    <CreateContent.Provider value={{ visible, HandleSidbar, isloading, setIsloading,
     success, setSuccess, errors, Seterrors, islogin, SetIsLogin, username, setUsername,
     generaltoken, setGeneraltoken, passwords, setPasswords, email, setEmail, event_id, 
     setEvent_id, eventregister, setEventRegister }} >
      {children}
    </CreateContent.Provider>
  );
};

export default Content;

export const useGlobalContent = () => {
  return useContext(CreateContent);
};




