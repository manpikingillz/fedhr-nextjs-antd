import { EmployeeDetailData } from './types';

export function SocialLinksInfoView({
  employee,
}: {
  employee: EmployeeDetailData;
}) {
  return (
    <div className="flex">
      <div className="w-1/2">
        <div className="flex mb-2">
          <strong className="	 flex-1 p-1 w-1/3">LinkedIn:</strong>
          <span className="flex-2 p-1 w-2/3 bg-gray-50">
            {employee?.linked_in}
          </span>
        </div>
        <div className="flex mb-2">
          <strong className=" flex-1 p-1  w-1/3">Facebook:</strong>
          <span className="flex-2 p-1 w-2/3 bg-gray-50">
            {employee?.facebook}
          </span>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex mb-2">
          <strong className="	 flex-1 p-1 w-1/3">Twitter:</strong>
          <span className="flex-2 p-1 w-2/3 bg-gray-50">
            {employee?.twitter}
          </span>
        </div>
        <div className="flex mb-2">
          <strong className=" flex-1 p-1  w-1/3">Instagram:</strong>
          <span className="flex-2 p-1 w-2/3 bg-gray-50">
            {employee?.instagram}
          </span>
        </div>
      </div>
    </div>
  );
}
