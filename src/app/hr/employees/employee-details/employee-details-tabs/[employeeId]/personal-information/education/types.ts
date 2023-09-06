export type EducationListData = {
    id: string,
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

export type EducationCreateData = {
    employee: number,
    institution_name: string,
    award: number,
    major: string,
    start_date: string,
    end_date: string,
    score: string
}

export type EducationAwardListData = {
    id: string,
    education_award_name: string
}