import { authModalState } from '@/atoms/authModalAtom'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/error';
import { addDoc, collection } from 'firebase/firestore';
const SignUp : React.FC = () => {
  
      const [signUpForm, setSignUpForm] = useState({
        email : "",
        password : "",
        confirmPassword: ""
      })
      const setModalState = useSetRecoilState(authModalState)
      const  [error, SetError] = useState('')
      const  [createUserWithEmailAndPassword, userCred, loading, userError] = useCreateUserWithEmailAndPassword(auth)
      
      //firebase logic
      const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        if(error) SetError('');
        if(signUpForm.password !== signUpForm.confirmPassword){
          SetError("Here is an error")
          return;
        }

        //password match
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
      }
      
      const onChange = (event : React.ChangeEvent<HTMLInputElement>) =>{
        setSignUpForm((prev) =>({
            ...prev,
            [event.target.name] : event.target.value
        }))
      }

      const createUserDocument = async (user : any) => {
        await addDoc(collection(firestore, "users"), JSON.parse(JSON.stringify(user)));
      }

      useEffect(() => {
        if(userCred){
            createUserDocument(userCred.user)
        }
      },[userCred])
  return (
    <form onSubmit={onSubmit}>
      <Input 
        required
        name="email"
        placeholder="email"
        mb={2}
        type='email'
        onChange={onChange}
        fontSize="20px"
        _placeholder={{ color : "gray.500" }}
        _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500"
        }}
        _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500"
        }}
        bg="gray.50"
      />
      <Input 
        required
        name="password"
        placeholder="password"
        mb={2}
        type='password'
        onChange={onChange}
        fontSize="20px"
        _placeholder={{ color : "gray.500" }}
        _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500"
        }}
        _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500"
        }}
        bg="gray.50"
      />
      <Input 
        required
        name="confirmPassword"
        placeholder="Confirm password"
        mb={2}
        type='password'
        onChange={onChange}
        fontSize="20px"
        _placeholder={{ color : "gray.500" }}
        _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500"
        }}
        _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500"
        }}
        bg="gray.50"
      />     
        <Text color="red" fontSize="10pt" align="center">{
        error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS] }</Text>
      <Button 
       width="100%"
       height="36px"
       mt={1}
       mb={2}
       type="submit"
       isLoading={loading}
      > Sign up</Button>
      <Flex justifyContent="center" fontSize="9pt">
        <Text mr={1}>Already a redditor?</Text>
        <Text 
         fontWeight={700} 
         cursor="pointer" 
         color="blue.500"
         onClick={() => 
          setModalState((prev) =>({
            ...prev,
            view: 'login'
            }
          ))}
         >Login</Text>
      </Flex>
    </form>
  )
}

export default SignUp
