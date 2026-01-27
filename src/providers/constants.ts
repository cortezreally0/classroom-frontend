import { Subject } from "@/types";

export const API_URL = "https://api.fake-rest.refine.dev";

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: 1,
        name: "Introduction to Quantum Mechanics",
        code: "PHYS201",
        description: "An exploration of wave-particle duality, the Schrödinger equation, and the fundamental principles governing the subatomic world.",
        department: "Physics",
        created_at: "2024-01-15T09:00:00Z"
    },
    {
        id: 2,
        name: "Data Structures and Algorithms",
        code: "CS302",
        description: "Comprehensive study of abstract data types, complexity analysis, and efficient problem-solving strategies using trees, graphs, and sorting.",
        department: "Computer Science",
        created_at: "2024-02-10T14:30:00Z"
    },
    {
        id: 3,
        name: "Macroeconomic Theory",
        code: "ECON105",
        description: "Analysis of national income, unemployment, inflation, and the impact of fiscal and monetary policy on global markets.",
        department: "Economics",
        created_at: "2024-03-05T11:15:00Z"
    }
];