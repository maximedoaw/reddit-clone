import * as React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Flex,
    Text,
} from '@chakra-ui/react'
import { useRecoilState } from "recoil"
import { authModalState } from "../../../atoms/authModalAtom"
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import ResetPassword from './ResetPassword';

const AuhtModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalState)
    const [user, loading, error] = useAuthState(auth)
    const handleClose = () => {
      setModalState((prev) => ({ ...prev, open: false }));
    }

    React.useEffect(() => {
      if (user) handleClose()
      //console.log(user)
    }, [user])  

    return (
      <>

        <Modal isOpen={modalState.open} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">             
              {modalState.view === 'login' && 'Login'}
              {modalState.view === 'signup' && 'Sign up'}
              {modalState.view === 'resetPassword' && 'Reset password'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
             display="flex"
             flexDirection="column"
             alignItems="center"
             justifyContent="center"
            >
              <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
              >
                { modalState.view === "login" || modalState.view === "signup" ? (
                  <>
                    <OAuthButtons />    
                    <Text color="gray.500" fontWeight={700}>
                      OR
                    </Text>       
                    <AuthInputs />
                  </>
                ) : (
                 <ResetPassword />
                )}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
};

export default AuhtModal;
