import { useState, useEffect } from "react";
import { Box, Button, Text, VStack, Heading, Container, useToast } from "@chakra-ui/react";
import { FaTrophy } from "react-icons/fa";

const colors = ["red", "green", "blue", "yellow"];
const words = ["RED", "GREEN", "BLUE", "YELLOW"];

const getRandomIndex = () => Math.floor(Math.random() * colors.length);

const Index = () => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[getRandomIndex()]);
  const [currentColor, setCurrentColor] = useState(colors[getRandomIndex()]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const toast = useToast();

  useEffect(() => {
    if (endTime) {
      const reactionTime = endTime - startTime;
      console.log(`Reaction Time: ${reactionTime}ms`);
      setLeaderboard((prev) => [...prev, { score, reactionTime }]);
      toast({
        title: "Reaction Recorded",
        description: `Your reaction time was ${reactionTime}ms`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [endTime]);

  const startTest = () => {
    setCurrentWord(words[getRandomIndex()]);
    setCurrentColor(colors[getRandomIndex()]);
    setStartTime(new Date().getTime());
  };

  const checkAnswer = (color) => {
    setEndTime(new Date().getTime());
    if (color === currentColor) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore((prevScore) => (prevScore > 0 ? prevScore - 1 : 0));
    }
  };

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={8} py={10}>
        <Heading as="h1" size="xl">
          Reaction Speed Test
        </Heading>
        <Text fontSize="2xl" color={currentColor}>
          {currentWord}
        </Text>
        <Box>
          {colors.map((color, index) => (
            <Button key={index} colorScheme={color} m={1} onClick={() => checkAnswer(color)}>
              {color.toUpperCase()}
            </Button>
          ))}
        </Box>
        <Button leftIcon={<FaTrophy />} colorScheme="green" onClick={startTest}>
          Start Test
        </Button>
        <Text fontSize="xl">Score: {score}</Text>
        <VStack align="stretch">
          <Heading as="h2" size="lg">
            Leaderboard
          </Heading>
          {leaderboard.map((entry, index) => (
            <Text key={index}>
              Score: {entry.score}, Time: {entry.reactionTime}ms
            </Text>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
