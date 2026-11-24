export type UnitId = 'unit1' | 'unit2' | 'unit3' | 'unit4' | 'unit5' | 'gaps';

export type QuestionCategory =
  | 'SAQ'
  | 'LAQ'
  | 'CIE2_SOLVED'
  | 'ASSIGNMENT'
  | 'SURPRISE_TEST'
  | 'PYQ';

export interface SyllabusTopic {
  id: string;
  title: string;
  btl: string;
  lectures?: string;
  keyTakeaway: string;
}

export interface CourseFormula {
  label: string;
  expression: string;
  note: string;
}

export interface CourseUnit {
  id: UnitId;
  shortLabel: string;
  title: string;
  co: string;
  btl: string;
  coDescription: string;
  examWeight: string;
  topics: SyllabusTopic[];
  formulas: CourseFormula[];
  revisionChecklist: string[];
  diagrams?: {
    src: string;
    caption: string;
    alt: string;
  }[];
}

export interface QuestionTable {
  headers: string[];
  rows: string[][];
}

export interface QuestionItem {
  id: string;
  unit: UnitId;
  category: QuestionCategory;
  sourceLabel: string;
  co: string;
  btl: string;
  marks: number;
  question: string;
  subparts?: string[];
  answerSummary: string;
  keyPoints: string[];
  workedExample?: string;
  rtlOrSteps?: string[];
  table?: QuestionTable;
  diagramType?:
    | 'von-neumann'
    | 'adder-subtractor'
    | 'rtl-bus'
    | 'microprogrammed-cu'
    | 'restoring-division'
    | 'io-organization'
    | 'dma'
    | 'memory-hierarchy'
    | 'cache-mapping'
    | 'pipeline-4stage'
    | 'pipeline-datapath'
    | 'raw-hazard';
}

export interface QuizQuestion {
  id: string;
  unit: Exclude<UnitId, 'gaps'>;
  source: 'Course File Quiz' | 'Quiz 01' | 'Class Form Quiz' | 'CIE-2 Practice';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ResourceFile {
  id: string;
  title: string;
  filename: string;
  path: string;
  category:
    | 'Syllabus & Course File'
    | 'Question Banks & Solutions'
    | 'Assignments & Surprise Tests'
    | 'Unit Lecture Notes'
    | 'Reference Diagrams';
  unit: UnitId | 'all';
  description: string;
  fileType: 'PDF' | 'TXT' | 'CSV' | 'JPG';
}

export interface StudyProgress {
  completedTopicIds: string[];
  reviewedQuestionIds: string[];
  bookmarkedQuestionIds: string[];
  quizBestScore: number | null;
  quizAttempts: number;
  unitMasteryScores: Record<string, number>;
}
