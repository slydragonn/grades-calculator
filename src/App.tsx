import "@/App.css";
import { Grade } from "@/components";
import useCalculator, { type GradeResult } from "@/hooks/use-calculator";
import {
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  Input,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";

function App() {
  const { grades, addGrade, createEmptyGrade, calculateGrade, minGrade } =
    useCalculator();
  const [result, setResult] = useState<GradeResult | undefined>();
  const WIDTH = { base: "100%", sm: "calc(400px - 40px)" };

  const getCalculateGradeResult = () => {
    setResult(calculateGrade());
  };

  return (
    <Center>
      <Flex
        flexDir="column"
        maxW="400px"
        w="100%"
        p="20px"
        alignItems="start"
        justifyContent="center"
        gap="20px"
      >
        <Stack w="100%">
          <DataListRoot
            w={WIDTH}
            border="1px solid #d1d1d1"
            rounded="5px"
            p="20px"
          >
            <DataListItem label="Nota Final" value={result?.result ?? 0} />
            <DataListItem
              label="Nota Faltante"
              value={result?.missingGrade ?? 0}
            />
          </DataListRoot>
        </Stack>
        <Stack w="100%">
          <Input
            placeholder="Nota Mínima: 3.0"
            w={WIDTH}
            p="20px"
            type="number"
            onChange={(e) => minGrade.setMin(Number.parseFloat(e.target.value))}
          />
          <HStack w={WIDTH} justifyContent="space-between">
            <Text>Notas</Text>
            <Button onClick={createEmptyGrade} p="20px">
              Agregar
            </Button>
          </HStack>
        </Stack>
        <Stack w="100%">
          <Button onClick={getCalculateGradeResult} w={WIDTH}>
            Calcular
          </Button>

          {grades.map((grade) => (
            <Grade key={grade.id} id={grade.id} addGrade={addGrade} />
          ))}
        </Stack>
      </Flex>
    </Center>
  );
}

export default App;
