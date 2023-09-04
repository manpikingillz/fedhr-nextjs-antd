export type VisaInformationData = {
    id: number,
    employee: {
        id: number,
        first_name: string,
        last_name: string
    },
    date: string,
    visa: {
        visa_name: string
    },
    issued_date: string,
    issuing_country: {
        country_name: string
    },
    expiration_date: string,
    note: string
}