export interface Create_Lesson {
  title: string;
  content: string;
  duration: number; // Duración en minutos
  courseId: string; // ID del curso al que pertenece la lección
}
