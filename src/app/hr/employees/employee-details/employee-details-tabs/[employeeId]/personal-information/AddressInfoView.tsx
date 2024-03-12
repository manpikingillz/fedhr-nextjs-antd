import { EmployeeDetailData} from './types'

export function AddressInfoView({employee}: {employee: EmployeeDetailData}) {
    return (
<div className="flex">
          <div className="w-1/2">
            <div className="flex mb-2">
              <strong className="	 flex-1 p-1 w-1/3">Street 1:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.street1}
              </span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1  w-1/3">Street 2:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.street2}
              </span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">City:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.city}
              </span>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex mb-2">
              <strong className="	 flex-1 p-1 w-1/3">Province:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.province}
              </span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1  w-1/3">Zip Code:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.zip_code}
              </span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1  w-1/3">Country:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.country}
              </span>
            </div>
          </div>
        </div>
            )
        }