import { Flex } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type PageContentProps = {
    children : ReactNode
}

const PageContent :  React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex 
        border="1px solid red" 
        justify="center"
        p="16px 0px"
    >
      <Flex 
        width="95%"
        justify="center"
        border="1px solid green"
        maxWidth="860px"
      >
          
         {/* LMS */}
         <Flex 
          border="1px solid blue"
          direction="column"
          mr={{ base : 0, md: 6}}
          width={{ base : "100%", md: "65%"}}
         >{children && children[0 as keyof typeof children]}</Flex>

         {/* RMS */}
         <Flex 
           border="1px solid purple"
           width={{ base: "100%", md:"65%" }}
           display={{ base: "none", md: "flex"}}
           flexGrow={1}
         >{children && children[1 as keyof typeof children]}</Flex>
      </Flex>
    </Flex>
  )
}

export default PageContent
