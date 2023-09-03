export type Education = {
    employee: {
        id: number,
        first_name: string,
        last_name: string
    },
    institution_name: string,
    award: {
        education_award_name: string
    },
    major: string,
    start_date: string,
    end_date: string,
    score: string
}