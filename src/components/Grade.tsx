import { HStack, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface GradeProps {
  id: string;
  addGrade: (id: string, grade: number, value: number) => void;
}

export default function Grade({ id, addGrade }: GradeProps) {
  const [grade, setGrade] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    addGrade(id, grade, value);
  }, [grade, value]);

  return (
    <HStack w="100%">
      <Input
        type="number"
        onChange={(e) => setGrade(Number.parseFloat(e.target.value))}
        placeholder="Calificación"
        min={0}
        p="20px"
        w="50%"
      />
      <Input
        type="number"
        onChange={(e) => setValue(Number.parseFloat(e.target.value))}
        placeholder="0 - 100%"
        max={100}
        min={0}
        p="20px"
        w="50%"
      />
    </HStack>
  );
}
