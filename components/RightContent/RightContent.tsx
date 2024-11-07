import * as React from 'react';
import AuthButton from './AuthButton';
import AuthModal from '../Modal/AuthModal/AuthModal';
import { Button, Flex } from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';
import Icons from './Icons';
import UserMenu from './UserMenu';

type RighContentProps = {
  user? : User | null
}
const RightContent: React.FC<RighContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex>
        {user ? <Icons />: <AuthButton />}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};

export default RightContent;
