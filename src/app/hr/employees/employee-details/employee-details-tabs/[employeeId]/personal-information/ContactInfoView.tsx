import { EmployeeDetailData } from './types';

export function ContactInfoView({
  employee,
}: {
  employee: EmployeeDetailData;
}) {
  return (
    <div className="flex">
      <div className="w-1/2">
        <div className="flex mb-2">
          <strong className="	 flex-1 p-1 w-1/3">Work Phone:</strong>
          <span className="flex-2 p-1 w-2/3 bg-gray-50">
            {employee?.work_phone}
          </span>
        </div>
        <div className="flex mb-2">
          <strong className=" flex-1 p-1  w-1/3">Mobile Phone:</strong>
          <span className="flex-2 p-1 w-2/3 bg-gray-50">
            {employee?.mobile_number}
          </span>
        </div>
        <div className="flex mb-2">
          <strong className=" flex-1 p-1 w-1/3">Home Phone:</strong>
          <span className="flex-2 p-1 w-2/3 bg-gray-50">
            {employee?.home_phone}
          </span>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex mb-2">
          <strong className="	 flex-1 p-1 w-1/3">Work Email:</strong>
          <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.email}</span>
        </div>
        <div className="flex mb-2">
          <strong className=" flex-1 p-1  w-1/3">Home Email:</strong>
          <span className="flex-2 p-1 w-2/3 bg-gray-50">
            {employee?.home_email}
          </span>
        </div>
      </div>
    </div>
  );
}
