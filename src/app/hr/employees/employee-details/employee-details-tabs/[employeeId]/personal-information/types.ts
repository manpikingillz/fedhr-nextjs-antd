export type EmployeeDetailData = {
    first_name: string,
    middle_name: string,
    last_name: string,
    preferred_name: string,
    gender: string,
    date_of_birth: string,
    marital_status: string,
    nationality: string,
    avatar: string,
    hire_date: string,
    social_security_number: string,
    national_identification_number: string,
    tax_identification_number: string,
    email: string,
    home_email: string,
    mobile_number: string,
    work_phone: string,
    home_phone: string,
    street1: string,
    street2: string,
    city: string,
    province: string,
    country: string,
    zip_code: string,
    linked_in: string,
    facebook: string,
    twitter: string,
    instagram: string
}

export type PersonalInformationFormProps = {
    savePersonalInformationHandler: any,
    employee: EmployeeDetail
}

export type EmployeeUpdateData = {
    first_name?: string,
    middle_name?: string,
    last_name?: string,
    preferred_name?: string,
    gender?: string,
    date_of_birth?: string, //
    marital_status?: string,
    nationality?: number,
    hire_date?: string, //
    social_security_number?: string,
    national_identification_number?: string,
    tax_identification_number?: string,
    email?: string,
    home_email?: string,
    mobile_number?: string,
    work_phone?: string,
    home_phone?: string,
    street1?: string,
    street2?: string,
    city?: string,
    province?: string,
    country?: number,
    zip_code?: string,
    linked_in?: string,
    facebook?: string,
    twitter?: string,
    instagram?: string
}

export type EmployeeListData = {
    first_name?: string,
    middle_name?: string,
    last_name?: string,
    full_name?: string,
    gender?: string,
    email?: string
}
