import { Box } from '@chakra-ui/react'
const Card = ({
  maxW,
  w,
  height,
  color,
  children,
}: {
  maxW?: string,
  w?: string,
  color?: string,
  height?: string,
  children?: any;
})  => {
  let body = (
    <Box
        boxShadow={'0px 4px 20px 10px rgba(0, 0, 0, 0.12)'}
        maxW={maxW}
        bgColor={color}
        w={w}
        borderRadius= {'8px'}
        p={8}
        overflow={'auto'}
        height={height}
    >
        {children}
    </Box>
  );

  return body;
};

export default Card;