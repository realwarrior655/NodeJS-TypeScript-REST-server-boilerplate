export interface Create_Course {
  title: string;
  description: string;
  duration: number; // Duración en minutos
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  img?: string;
  status: boolean;
}
