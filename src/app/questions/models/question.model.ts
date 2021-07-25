export interface Question {
    id: number,
    question_text: string;
    answer_options: string[];
    correct_answer: string;
    author: string;
    stats: {last_asked_date: string, asked_count: number, percent_of_users_answered_correctly: number}
}