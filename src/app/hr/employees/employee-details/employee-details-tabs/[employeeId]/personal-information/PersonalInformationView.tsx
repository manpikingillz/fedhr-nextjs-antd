import * as dayjs from 'dayjs'
import { EmployeeDetail } from './types'

export function PersonalInformationView({employee}: {employee: EmployeeDetail}) {
    return (
        <div className="flex">
          <div className="w-1/2">
            <div className="flex mb-2">
              <strong className="	 flex-1 p-1 w-1/3">First Name:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.first_name}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1  w-1/3">Middle Name:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.middle_name}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">Last Name:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.last_name}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">Preferred Name:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.preferred_name}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">Gender:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.gender}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">Date of Birth:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{dayjs(employee?.date_of_birth).format('MMM D, YYYY')}</span>
            </div>
          </div>

          <div className="w-1/2">
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">Marital Status:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.marital_status}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">Nationality:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.nationality}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">
                Social Security Number:
              </strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.social_security_number}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">
                National Identification Number:
              </strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.national_identification_number}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">
                Tax Identification Number:
              </strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.tax_identification_number}</span>
            </div>
          </div>
        </div> 
    )
}