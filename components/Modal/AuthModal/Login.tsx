import { authModalState } from '@/atoms/authModalAtom'
import { auth } from '@/firebase/clientApp'
import { FIREBASE_ERRORS } from '@/firebase/error'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useSetRecoilState } from 'recoil'

const Login: React.FC = () => {
  const [loginForm, setLoginForm] = useState({
    email : "",
    password : ""
  })
  const setModalState = useSetRecoilState(authModalState)
  const [signInWithEmailAndPassword, user, loading, userError] = useSignInWithEmailAndPassword(auth)
  //firebase logic
  const onSubmit = async (event : React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    await signInWithEmailAndPassword(loginForm.email, loginForm.password)
    //if(loginForm.email)
  }
  
  const onChange = (event : React.ChangeEvent<HTMLInputElement>) =>{
    setLoginForm((prev) =>({
        ...prev,
        [event.target.name] : event.target.value
    }))
  }

  return (
    <form onSubmit={onSubmit}>
      <Input 
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
      <Text color="red" fontSize="10pt" align="center">{
        FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]
        }</Text>
      <Button 
       width="100%"
       height="36px"
       mt={1}
       mb={2}
       type="submit"
       isLoading={loading}
       
      > Log in</Button>
      <Flex justifyContent="center" fontSize="9pt">
      <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          onClick={() => setModalState({ open: true, view: "resetPassword" })}
        >
          Reset
        </Text>
      </Flex>
    </form>
  )
}

export default Login
