import { useState } from "react";

export type GradeResult = {
  result: number;
  missingGrade: number | string;
};

interface Grade {
  id: string;
  grade: number;
  value: number;
}

export default function useCalculator() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [minGrade, setMinGrade] = useState(3);

  const createEmptyGrade = () => {
    const newEmptyGrade = {
      id: String("Grade" + Math.random() * 10000000000),
      grade: 0,
      value: 0,
    };

    setGrades((grades) => [...grades, newEmptyGrade]);
  };

  const addGrade = (id: string, grade: number, value: number) => {
    const gradeIndex = grades.findIndex((el) => el.id === id);
    const updatedGrades = grades.fill(
      { id, grade, value },
      gradeIndex,
      gradeIndex + 1,
    );

    setGrades(() => [...updatedGrades]);
  };

  const calculateGrade = (): GradeResult => {
    let result = 0;
    result = grades.reduce(
      (acc, cur) => acc + cur.grade * (cur.value / 100),
      0,
    );

    const percent = grades.reduce((acc, cur) => acc + cur.value / 100, 0);

    const missingGrade =
      minGrade > result
        ? Number((minGrade - result) / (1 - percent)).toFixed(2)
        : 0;

    return { result, missingGrade };
  };

  return {
    grades,
    addGrade,
    createEmptyGrade,
    calculateGrade,
    minGrade: {
      value: minGrade,
      setMin: (value: number) => setMinGrade(value),
    },
  };
}
